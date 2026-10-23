<script setup lang="ts">
interface Contribution {
  id: string
  title: string
  body: string
  resource: string | null
  version: number
  state: string
  review_note: string | null
}
const myPage = ref(1)
const route = useRoute(),
  { user } = await useViewer(),
  fetcher = useRequestFetch()
const { data, refresh } = await useAsyncData(
  `my-contributions-${user.value?.id || 'guest'}`,
  () =>
    user.value
      ? fetcher<{ items: Contribution[], total: number }>(
          '/api/v1/contributions',
          { query: { page: myPage.value } },
        )
      : Promise.resolve(null),
)
watch(myPage, () => refresh())
const title = ref(''),
  content = ref(''),
  id = ref(''),
  version = ref(0),
  resource = ref(String(route.query.resource || '')),
  html = ref(''),
  message = ref(''),
  busy = ref(false)
function edit(c: Contribution) {
  id.value = c.id
  title.value = c.title
  content.value = c.body
  version.value = c.version
  resource.value = c.resource || ''
  html.value = ''
}
function insert(value: string) {
  content.value += '\n' + value + '\n'
}
async function run(fn: () => Promise<void>) {
  busy.value = true
  try {
    await fn()
  }
  catch {
    message.value
      = 'Chưa thể lưu. Bản có thể đã được gửi hoặc thay đổi; hãy tải lại để đối chiếu.'
  }
  finally {
    busy.value = false
  }
}
async function save() {
  const result = await $fetch<{ id: string, version: number }>(
    id.value ? `/api/v1/contributions/${id.value}` : '/api/v1/contributions',
    {
      method: id.value ? 'PUT' : 'POST',
      body: {
        title: title.value,
        body: content.value,
        resource: resource.value || null,
        version: version.value,
      },
    },
  )
  id.value = result.id
  version.value = result.version
  message.value = 'Đã lưu bản nháp.'
  await refresh()
}
async function upload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  await run(async () => {
    if (!id.value) await save()
    const result = await $fetch<{ id: string, scan: string }>('/api/v1/files', {
      method: 'POST',
      query: { contribution: id.value },
      body: file,
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-File-Name': encodeURIComponent(file.name),
      },
    })
    insert(
      `${file.type.startsWith('image/') ? '!' : ''}[${file.name}](/api/v1/files/${result.id})`,
    )
    message.value
      = 'Đã nhận tệp, đang chờ kiểm tra. Lưu lại bài để giữ liên kết.'
  })
}
</script>

<template>
  <h1>Đóng góp tài liệu</h1>
  <LoginNotice v-if="!user" /><template v-else>
    <p>
      Gửi bài viết, đề xuất sửa hoặc tài liệu nguồn. Nội dung và tệp chỉ xuất
      hiện với người học sau khi được duyệt.
    </p>
    <div class="editor-layout">
      <section>
        <form
          class="stack"
          @submit.prevent="run(save)"
        >
          <label>Tiêu đề<input
            v-model="title"
            required
            maxlength="1000"
          ></label><label>Mã học liệu cần sửa, nếu có<input
            v-model="resource"
            placeholder="Để trống nếu là bài mới"
          ></label>
          <div class="actions toolbar">
            <button
              type="button"
              class="quiet"
              @click="insert('$$\nx^2 + y^2 = 1\n$$')"
            >
              Công thức
            </button><button
              type="button"
              class="quiet"
              @click="insert('```python\nprint(1)\n```')"
            >
              Mã nguồn
            </button><label>Thêm PDF hoặc ảnh<input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.webp"
              :disabled="busy"
              @change="upload"
            ></label>
          </div>
          <label>Nội dung Markdown<textarea
            v-model="content"
            rows="18"
            required
          />
          </label>
          <div class="actions">
            <button :disabled="busy">
              Lưu nháp
            </button><button
              type="button"
              class="quiet"
              :disabled="!content || busy"
              @click="
                run(async () => {
                  html = (
                    await $fetch<{ html: string }>('/api/v1/preview', {
                      method: 'POST',
                      body: { markdown: content },
                    })
                  ).html;
                })
              "
            >
              Xem trước
            </button><button
              type="button"
              :disabled="busy || !id"
              @click="
                run(async () => {
                  await save();
                  await $fetch(`/api/v1/contributions/${id}/submit`, {
                    method: 'POST',
                    body: {},
                  });
                  await refresh();
                  id = '';
                  version = 0;
                  message = 'Đã gửi chờ duyệt.';
                })
              "
            >
              Gửi duyệt
            </button>
          </div>
        </form>
        <p role="status">
          {{ message }}
        </p>
        <SafeHtml
          v-if="html"
          as="div"
          class="article preview"
          :html="html"
        />
      </section>
      <aside>
        <h2>Bài đã gửi</h2>
        <ul class="resource-list">
          <li
            v-for="c in data?.items"
            :key="c.id"
          >
            <strong>{{ c.title }}</strong><small>{{ c.state
            }}<template v-if="c.review_note">
              · {{ c.review_note }}</template></small><button
              v-if="['draft', 'changes_requested'].includes(c.state)"
              class="quiet"
              @click="edit(c)"
            >
              Sửa bản nháp
            </button>
          </li>
        </ul>
        <div
          v-if="(data?.total || 0) > 50"
          class="actions"
        >
          <button
            class="quiet"
            :disabled="myPage === 1"
            @click="myPage--"
          >
            Trang trước
          </button><span>Trang {{ myPage }}</span><button
            class="quiet"
            :disabled="myPage * 50 >= (data?.total || 0)"
            @click="myPage++"
          >
            Trang sau
          </button>
        </div>
      </aside>
    </div>
  </template>
</template>
