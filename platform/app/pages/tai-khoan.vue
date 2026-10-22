<script setup lang="ts">
interface State {
  profile: {
    display_id: string
    name: string
    major: string
    class_name: string
    cohort: string
  }
  bookmarks: { id: string, title: string, path: string }[]
  attempts: { id: string, score: number, total: number, created_at: string }[]
}
const { user, refresh: refreshUser } = await useViewer(),
  fetcher = useRequestFetch()
const { data } = await useAsyncData(
  `account-state-${user.value?.id || 'guest'}`,
  () =>
    user.value ? fetcher<State>('/api/v1/me/state') : Promise.resolve(null),
)
const password = ref(''),
  nextPassword = ref(''),
  code = ref(''),
  setup = ref<{ totpURI: string, backupCodes: string[] } | null>(null),
  message = ref('')
const sessions = ref<{ token: string, userAgent: string, createdAt: string }[]>(
  [],
)
const importText = ref(''),
  preview = ref<{ added: number, kept: number } | null>(null)
async function action(fn: () => Promise<unknown>) {
  try {
    await fn()
    message.value = 'Đã thực hiện.'
  }
  catch {
    message.value = 'Chưa thể thực hiện. Kiểm tra thông tin và thử lại.'
  }
}
async function listSessions() {
  sessions.value = await $fetch<
    { token: string, userAgent: string, createdAt: string }[]
  >('/api/auth/list-sessions')
}
async function importProgress(commit: boolean) {
  const parsed = JSON.parse(importText.value)
  preview.value = await $fetch<{ added: number, kept: number }>(
    '/api/v1/me/import',
    {
      method: 'POST',
      body: { ...parsed, commit },
    },
  )
  if (commit)
    message.value = 'Đã nhập các mục chưa có; giữ nguyên tiến độ hiện tại.'
}
async function loadFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file && file.size < 100000) {
    importText.value = await file.text()
    preview.value = null
  }
}
async function logout() {
  await $fetch('/api/auth/sign-out', { method: 'POST', body: {} })
  await refreshUser()
  await navigateTo('/')
}
</script>

<template>
  <section>
    <h1>Tài khoản</h1>
    <LoginNotice v-if="!user" /><template v-else>
      <p>{{ user.name }} · {{ user.email }}</p>
      <p v-if="data?.profile">
        MSSV: {{ data.profile.display_id }} · {{ data.profile.class_name }} ·
        {{ data.profile.cohort }}
      </p>
      <p>Liên hệ quản trị để sửa email hoặc MSSV.</p>
      <h2>Tài liệu đã lưu</h2>
      <ul>
        <li
          v-for="r in data?.bookmarks"
          :key="r.id"
        >
          <NuxtLink :to="r.path">{{ r.title }}</NuxtLink>
        </li>
      </ul>
      <p v-if="!data?.bookmarks.length">
        Bạn chưa lưu tài liệu nào.
      </p>
      <h2>Lịch sử luyện tập</h2>
      <ul>
        <li
          v-for="a in data?.attempts"
          :key="a.id"
        >
          {{ new Date(a.created_at).toLocaleDateString("vi-VN") }}:
          {{ a.score }}/{{ a.total }}
        </li>
      </ul>
      <h2>Bảo mật</h2>
      <form
        class="stack narrow"
        @submit.prevent="
          action(() =>
            $fetch('/api/auth/change-password', {
              method: 'POST',
              body: {
                currentPassword: password,
                newPassword: nextPassword,
                revokeOtherSessions: true,
              },
            }),
          )
        "
      >
        <label>Mật khẩu hiện tại<input
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
        ></label><label>Mật khẩu mới<input
          v-model="nextPassword"
          type="password"
          minlength="12"
          autocomplete="new-password"
          required
        ></label><button>Đổi mật khẩu</button>
      </form>
      <h3>Xác thực hai bước</h3>
      <p>
        {{
          user.twoFactorEnabled
            ? "Đang bật."
            : "Chưa bật. Bắt buộc với quản trị và biên tập viên."
        }}
      </p>
      <button
        v-if="!user.twoFactorEnabled"
        @click="
          action(async () => {
            setup = await $fetch('/api/auth/two-factor/enable', {
              method: 'POST',
              body: { password },
            });
          })
        "
      >
        Thiết lập bằng mật khẩu hiện tại
      </button>
      <div
        v-if="setup"
        class="notice"
      >
        <p>
          Thêm URI này vào ứng dụng xác thực. Lưu mã dự phòng ở nơi riêng tư.
        </p>
        <code class="wrap">{{ setup.totpURI }}</code>
        <ul>
          <li
            v-for="backup in setup.backupCodes"
            :key="backup"
          >
            <code>{{ backup }}</code>
          </li>
        </ul>
        <form
          class="stack narrow"
          @submit.prevent="
            action(async () => {
              await $fetch('/api/auth/two-factor/verify-totp', {
                method: 'POST',
                body: { code },
              });
              setup = null;
              await refreshUser();
            })
          "
        >
          <label>Mã xác thực<input
            v-model="code"
            inputmode="numeric"
            autocomplete="one-time-code"
            required
          ></label><button>Xác nhận</button>
        </form>
      </div>
      <h3>Phiên đăng nhập</h3>
      <button
        class="quiet"
        @click="action(listSessions)"
      >
        Xem các phiên
      </button>
      <ul>
        <li
          v-for="s in sessions"
          :key="s.token"
        >
          {{ s.userAgent || "Thiết bị" }}
          <button
            class="quiet"
            @click="
              action(async () => {
                await $fetch('/api/auth/revoke-session', {
                  method: 'POST',
                  body: { token: s.token },
                });
                await listSessions();
              })
            "
          >
            Thu hồi
          </button>
        </li>
      </ul>
      <h2>Tiến độ cá nhân</h2>
      <a
        href="/api/v1/me/export"
        download
      >Xuất dữ liệu học tập</a>
      <p>Nhập tệp tiến độ đã xuất. Mục hiện có được giữ nguyên.</p>
      <label>Chọn tệp JSON<input
        type="file"
        accept="application/json,.json"
        @change="loadFile"
      ></label>
      <div class="actions">
        <button
          class="quiet"
          :disabled="!importText"
          @click="action(() => importProgress(false))"
        >
          Xem trước
        </button><button
          v-if="preview"
          @click="action(() => importProgress(true))"
        >
          Nhập {{ preview.added }} mục mới
        </button>
      </div>
      <p v-if="preview">
        Giữ nguyên {{ preview.kept }} mục đã có.
      </p>
      <p><NuxtLink to="/dong-gop">Đóng góp của bạn</NuxtLink></p>
      <button
        class="quiet"
        @click="action(logout)"
      >
        Đăng xuất
      </button>
      <p role="status">
        {{ message }}
      </p>
    </template>
  </section>
</template>
