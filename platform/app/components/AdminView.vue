<script setup lang="ts">
interface Revision {
  id: string
  resource: string
  title: string
  markdown: string
  html: string
  source: string
  state: string
  author: string | null
  rights: string
  academic_verified: boolean
  review_note: string | null
}
interface StudentRecord {
  student_id: string
  display_id: string
  email: string
  name: string
  major: string
  class_name: string
  cohort: string
  role: string
  active: boolean
}
const rosterRows = ref<StudentRecord[]>([])
interface Account {
  id: string
  name: string
  email: string
  role: string
  disabled: boolean
  display_id: string
}
const { user } = await useViewer(),
  fetcher = useRequestFetch()
const adminPage = ref(1),
  total = ref(0)
const adminTabs = computed(() => [
  { id: 'revisions', name: 'Phiên bản nội dung' }, { id: 'resources', name: 'Danh mục tài liệu' },
  { id: 'curriculum', name: 'Chương trình' }, { id: 'reports', name: 'Báo lỗi' },
  ...(user.value?.role === 'admin'
    ? [
        { id: 'roster', name: 'Danh sách sinh viên' }, { id: 'users', name: 'Tài khoản' },
        { id: 'audit', name: 'Nhật ký' }, { id: 'jobs', name: 'Tác vụ nền' },
      ]
    : []),
])
const tab = useSectionTab(adminTabs, 'revisions'),
  message = ref(''),
  csv = ref(''),
  preview = ref<{
    items: {
      mssv: string
      email: string
      name: string
      major: string
      class: string
      cohort: string
    }[]
    conflicts: string[]
  } | null>(null)
const active = computed(
  () => !!user.value?.twoFactorEnabled && user.value.role !== 'student',
)
const { data: revisions, refresh: reload } = await useAsyncData(
  'admin-revisions',
  () =>
    active.value
      ? fetcher<{ items: Revision[], total: number }>(
          '/api/v1/admin/revisions',
          { query: { page: adminPage.value } },
        )
      : Promise.resolve(null),
)
const selected = ref<Revision | null>(null),
  note = ref(''),
  rights = ref('unreviewed'),
  verified = ref(false)
const accounts = ref<Account[]>([]),
  records = ref<Record<string, unknown>[]>([])
const email = ref(''),
  name = ref(''),
  role = ref('editor')
const curriculum = reactive({
  major: 'cntt',
  version: 'du-lieu-hien-co',
  course: '',
  term: 1,
  credits: 3,
  requirement: 'Bắt buộc',
  source: '',
  verified: false,
})
const profile = reactive({
  currentId: '',
  studentId: '',
  email: '',
  name: '',
  major: '',
  className: '',
  cohort: '',
})
const resource = reactive({
  id: '',
  title: '',
  course: '',
  topic: '',
  kind: 'ly-thuyet',
  year: '',
})
const pendingActions = ref(0)
async function action(fn: () => Promise<unknown>) {
  pendingActions.value++
  message.value = 'Đang xử lý…'
  try {
    await fn()
    message.value = 'Đã thực hiện.'
  }
  catch {
    message.value
      = 'Chưa thực hiện được. Kiểm tra quyền, nguồn, trạng thái tệp hoặc thông tin nhập.'
  }
  finally { pendingActions.value-- }
}
function select(r: Revision) {
  selected.value = r
  note.value = r.review_note || ''
  rights.value = r.rights
  verified.value = r.academic_verified
}
async function review(state: string) {
  await $fetch('/api/v1/admin/review', {
    method: 'POST',
    body: {
      id: selected.value?.id,
      state,
      note: note.value,
      rights: rights.value,
      academicVerified: verified.value,
    },
  })
  selected.value = null
  await reload()
}
async function importRoster(commit: boolean) {
  preview.value = await $fetch<{
    items: {
      mssv: string
      email: string
      name: string
      major: string
      class: string
      cohort: string
    }[]
    conflicts: string[]
  }>('/api/v1/admin/roster', {
    method: 'POST',
    body: { csv: csv.value, commit },
  })
}
let lastLoad = 0
async function changeTab(value: string, reset = true) {
  const load = ++lastLoad
  if (reset) adminPage.value = 1
  records.value = []
  if (value === 'revisions') {
    await reload()
    return
  }
  if (value === 'roster') {
    const result = await $fetch<{ items: StudentRecord[], total: number }>(
      '/api/v1/admin/roster',
      { query: { page: adminPage.value } },
    )
    if (load !== lastLoad) return
    rosterRows.value = result.items
    total.value = result.total
  }
  if (value === 'users') {
    const response = await $fetch<{ items: Account[], total: number }>(
      '/api/v1/admin/users',
      { query: { page: adminPage.value } },
    )
    if (load !== lastLoad) return
    accounts.value = response.items
    total.value = response.total
  }
  if (['audit', 'jobs', 'reports'].includes(value)) {
    const response = await $fetch<{
      items: Record<string, unknown>[]
      total: number
    }>(`/api/v1/admin/${value}`, { query: { page: adminPage.value } })
    if (load !== lastLoad) return
    records.value = response.items
    total.value = response.total
  }
}
async function movePage(offset: number) {
  adminPage.value += offset
  await changeTab(tab.value, false)
}
watch(tab, (value) => {
  if (active.value) void action(() => changeTab(value))
})
onMounted(() => {
  if (active.value && tab.value !== 'revisions') void action(() => changeTab(tab.value))
})
</script>

<template>
  <h1>Quản trị học liệu</h1>
  <LoginNotice v-if="!user" />
  <p
    v-else-if="!active"
    class="notice"
  >
    Bạn cần quyền biên tập hoặc quản trị và bật xác thực hai bước tại
    <NuxtLink to="/tai-khoan">tài khoản</NuxtLink>.
  </p>
  <template v-else>
    <SectionTabs
      id="admin"
      v-model="tab"
      label="Quản trị"
      :options="adminTabs"
    />
    <div
      id="admin-panel"
      :aria-busy="pendingActions > 0"
      role="tabpanel"
      :aria-labelledby="`admin-tab-${tab}`"
      class="tab-panel"
    >
      <div
        v-if="
          ['revisions', 'roster', 'users', 'reports', 'audit', 'jobs'].includes(
            tab,
          )
        "
        class="actions"
      >
        <button
          class="quiet"
          :disabled="adminPage === 1"
          @click="action(() => movePage(-1))"
        >
          Trang trước
        </button><span>Trang {{ adminPage }}</span><button
          class="quiet"
          :disabled="
            adminPage * 50
              >= (tab === 'revisions' ? revisions?.total || 0 : total)
          "
          @click="action(() => movePage(1))"
        >
          Trang sau
        </button>
      </div>
      <p role="status">
        {{ message }}
      </p>
      <template v-if="tab === 'revisions'">
        <p><NuxtLink to="/dong-gop">Soạn bài hoặc tạo bản sửa</NuxtLink></p>
        <div class="editor-layout">
          <ul class="resource-list">
            <li
              v-for="r in revisions?.items"
              :key="r.id"
            >
              <button
                class="link-button"
                @click="select(r)"
              >
                {{ r.title }}
              </button><small>{{ publicationStateName(r.state) }} · {{ r.source }}</small>
            </li>
          </ul>
          <section v-if="selected">
            <h2>{{ selected.title }}</h2>
            <details>
              <summary>Nội dung nguồn Markdown</summary>
              <pre class="wrap">{{ selected.markdown }}</pre>
            </details>
            <SafeHtml
              as="div"
              class="article preview"
              :html="selected.html"
            />
            <form
              class="stack"
              @submit.prevent="action(() => review('published'))"
            >
              <label>Quyền sử dụng<select v-model="rights">
                <option value="unreviewed">Chưa kiểm tra</option>
                <option value="permitted">Được phép chia sẻ</option>
                <option value="restricted">Chưa được phép chia sẻ</option>
              </select></label><label class="choice"><input
                v-model="verified"
                type="checkbox"
              >Đã xác minh nội dung
                học thuật</label><label>Nhận xét và bằng chứng quyền sử dụng<textarea
                v-model="note"
                rows="3"
              />
              </label>
              <div class="actions">
                <button>Xuất bản phiên bản này</button><button
                  type="button"
                  class="quiet"
                  @click="action(() => review('changes_requested'))"
                >
                  Yêu cầu sửa
                </button><button
                  type="button"
                  class="quiet"
                  @click="action(() => review('archived'))"
                >
                  Lưu trữ
                </button>
              </div>
            </form>
          </section>
        </div>
      </template>
      <form
        v-else-if="tab === 'roster'"
        class="stack"
        @submit.prevent="action(() => importRoster(false))"
      >
        <h2>Nhập danh sách sinh viên</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Lớp</th>
                <th>Trạng thái</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="r in rosterRows"
                :key="r.student_id"
              >
                <td>{{ r.display_id }}</td>
                <td>{{ r.name }}</td>
                <td>{{ r.email }}</td>
                <td>{{ r.class_name }}</td>
                <td>{{ r.active ? "Đang hoạt động" : "Đã khóa" }}</td>
                <td>
                  <button
                    type="button"
                    class="quiet"
                    @click="
                      Object.assign(profile, {
                        currentId: r.display_id,
                        studentId: r.display_id,
                        email: r.email,
                        name: r.name,
                        major: r.major,
                        className: r.class_name,
                        cohort: r.cohort,
                      })
                    "
                  >
                    Chọn hồ sơ để sửa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <details>
          <summary>Sửa hồ sơ đã đối chiếu</summary>
          <p>
            Đổi email hoặc MSSV sẽ thu hồi phiên đăng nhập. Email mới cần xác thực
            lại.
          </p>
          <label
            v-for="key in [
              'currentId',
              'studentId',
              'email',
              'name',
              'major',
              'className',
              'cohort',
            ] as const"
            :key="key"
          >{{
            {
              currentId: "MSSV hiện tại",
              studentId: "MSSV mới",
              email: "Email đã đối chiếu",
              name: "Họ tên",
              major: "Ngành",
              className: "Lớp",
              cohort: "Khóa",
            }[key]
          }}<input v-model="profile[key]"></label><button
            type="button"
            @click="
              action(() =>
                $fetch('/api/v1/admin/profile', { method: 'PUT', body: profile }),
              )
            "
          >
            Cập nhật hồ sơ và thu hồi phiên
          </button>
        </details>
        <p>
          Cột CSV: mssv,email,name,major,class,cohort. Chỉ nhập dữ liệu từ nguồn
          được phép sử dụng.
        </p>
        <label>Chọn tệp CSV<input
          type="file"
          accept=".csv,text/csv"
          @change="
            action(async () => {
              const file = ($event.target as HTMLInputElement).files?.[0];
              if (file && file.size <= 2000000) {
                csv = await file.text();
                preview = null;
              }
            })
          "
        ></label>
        <label>Nội dung CSV<textarea
          v-model="csv"
          rows="12"
          required
          @input="preview = null"
        /></label><button>Xem trước và kiểm tra trùng</button>
        <div v-if="preview">
          <p>
            {{ preview.items.length }} dòng · {{ preview.conflicts.length }} xung
            đột.
          </p>
          <div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>MSSV</th>
                  <th>Email</th>
                  <th>Họ tên</th>
                  <th>Ngành</th>
                  <th>Lớp</th>
                  <th>Khóa</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="r in preview.items.slice(0, 50)"
                  :key="r.mssv"
                >
                  <td>{{ r.mssv }}</td>
                  <td>{{ r.email }}</td>
                  <td>{{ r.name }}</td>
                  <td>{{ r.major }}</td>
                  <td>{{ r.class }}</td>
                  <td>{{ r.cohort }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p v-if="preview.items.length > 50">
            Hiển thị50 dòng đầu. Hệ thống đã kiểm tra toàn bộ danh sách.
          </p>
          <p v-if="preview.conflicts.length">
            MSSV xung đột: {{ preview.conflicts.join(", ") }}
          </p>
          <button
            type="button"
            :disabled="!!preview.conflicts.length"
            @click="action(() => importRoster(true))"
          >
            Xác nhận nhập danh sách
          </button>
        </div>
      </form>
      <section v-else-if="tab === 'users'">
        <h2>Tài khoản</h2>
        <ul class="resource-list">
          <li
            v-for="a in accounts"
            :key="a.id"
          >
            <strong>{{ a.name }}</strong> {{ a.display_id }} · {{ a.email }}
            <div class="actions">
              <select
                v-model="a.role"
                :aria-label="`Vai trò ${a.name}`"
              >
                <option value="student">
                  Sinh viên
                </option>
                <option value="editor">
                  Biên tập viên
                </option>
                <option value="admin">
                  Quản trị
                </option>
              </select><label><input
                v-model="a.disabled"
                type="checkbox"
              >Khóa</label><button
                class="quiet"
                :disabled="a.id === user.id"
                @click="
                  action(() =>
                    $fetch(`/api/v1/admin/users/${a.id}`, {
                      method: 'PATCH',
                      body: { role: a.role, disabled: a.disabled },
                    }),
                  )
                "
              >
                Lưu và thu hồi phiên
              </button>
            </div>
          </li>
        </ul>
        <h3>Mời người quản lý</h3>
        <form
          class="stack narrow"
          @submit.prevent="
            action(() =>
              $fetch('/api/v1/admin/invite', {
                method: 'POST',
                body: { email, name, role },
              }),
            )
          "
        >
          <label>Họ tên<input
            v-model="name"
            required
          ></label><label>Email<input
            v-model="email"
            type="email"
            required
          ></label><label>Vai trò<select v-model="role">
            <option value="editor">Biên tập viên</option>
            <option value="admin">Quản trị</option>
          </select></label><button>Gửi lời mời</button>
        </form>
      </section>
      <form
        v-else-if="tab === 'curriculum'"
        class="stack narrow"
        @submit.prevent="
          action(() =>
            $fetch('/api/v1/admin/curriculum', {
              method: 'PUT',
              body: curriculum,
            }),
          )
        "
      >
        <h2>Cập nhật phân bổ môn</h2>
        <label
          v-for="key in [
            'major',
            'version',
            'course',
            'requirement',
            'source',
          ] as const"
          :key="key"
        >{{
          {
            major: "Mã ngành",
            version: "Phiên bản chương trình",
            course: "Mã môn",
            requirement: "Loại học phần",
            source: "Nguồn đối chiếu",
          }[key]
        }}<input
          v-model="curriculum[key]"
          required
        ></label><label>Học kỳ<input
          v-model.number="curriculum.term"
          type="number"
          min="1"
          max="8"
          required
        ></label><label>Tín chỉ<input
          v-model.number="curriculum.credits"
          type="number"
          min="0"
          max="30"
          required
        ></label><label><input
          v-model="curriculum.verified"
          type="checkbox"
        >Đã xác
          minh</label><button>Lưu phân bổ</button>
      </form>
      <form
        v-else-if="tab === 'resources'"
        class="stack narrow"
        @submit.prevent="
          action(() =>
            $fetch('/api/v1/admin/resources', {
              method: 'PUT',
              body: {
                ...resource,
                course: resource.course || null,
                topic: resource.topic || null,
                year: resource.year || null,
              },
            }),
          )
        "
      >
        <h2>Phân loại tài liệu</h2>
        <label
          v-for="key in [
            'id',
            'title',
            'course',
            'topic',
            'kind',
            'year',
          ] as const"
          :key="key"
        >{{
          {
            id: "Mã học liệu",
            title: "Tiêu đề",
            course: "Mã môn",
            topic: "Mã chủ đề",
            kind: "Loại tài liệu",
            year: "Năm đề thi",
          }[key]
        }}<input
          v-model="resource[key]"
          :required="['id', 'title', 'kind'].includes(key)"
        ></label><button>Lưu danh mục</button>
      </form>
      <section v-else>
        <ul class="resource-list">
          <li
            v-for="(record, index) in records"
            :key="index"
          >
            <template v-if="tab === 'reports'">
              <strong>Học liệu: {{ record.resource }}</strong>
              <p>{{ record.body }}</p>
              <small>{{
                record.state === "open" ? "Chưa xử lý" : "Đã xử lý"
              }}</small>
            </template><template v-else-if="tab === 'jobs'">
              <strong>{{
                {
                  email: "Gửi email",
                  scan: "Kiểm tra tệp",
                  render: "Dựng nội dung",
                }[String(record.kind)] || "Tác vụ"
              }}</strong>
              <p>
                {{ publicationStateName(String(record.state)) }} · Số lần thử:
                {{ record.tries }}
              </p>
              <button
                v-if="record.state === 'failed'"
                class="quiet"
                @click="
                  action(async () => {
                    await $fetch(`/api/v1/admin/jobs/${record.id}`, {
                      method: 'PATCH',
                      body: {},
                    });
                    await changeTab('jobs', false);
                  })
                "
              >
                Thử lại tác vụ
              </button>
            </template><template v-else>
              <strong>{{
                {
                  published: "Xuất bản bài",
                  archived: "Lưu trữ bài",
                  changes_requested: "Yêu cầu chỉnh sửa",
                  roster_import: "Nhập danh sách sinh viên",
                  account_update: "Cập nhật tài khoản",
                  profile_update: "Cập nhật hồ sơ",
                  curriculum_update: "Cập nhật chương trình",
                  resource_update: "Phân loại học liệu",
                  staff_invite: "Mời người quản lý",
                  report_closed: "Xử lý báo lỗi",
                  job_retry: "Thử lại tác vụ",
                }[String(record.action)] || "Thao tác quản trị"
              }}</strong>
              <p>{{ record.target }}</p>
              <small>Người thực hiện: {{ record.actor }} ·
                {{ record.created_at }}</small>
            </template>
            <button
              v-if="tab === 'reports' && record.state === 'open'"
              class="quiet"
              @click="
                action(async () => {
                  await $fetch(`/api/v1/admin/reports/${record.id}`, {
                    method: 'PATCH',
                    body: {},
                  });
                  await changeTab('reports');
                })
              "
            >
              Đánh dấu đã xử lý
            </button>
          </li>
        </ul>
        <p v-if="!records.length">
          Chưa có dữ liệu.
        </p>
      </section>
    </div>
  </template>
</template>
