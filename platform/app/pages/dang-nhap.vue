<script setup lang="ts">
import { safeReturn } from '#shared/utils/identity'

const route = useRoute(),
  { refresh } = await useViewer()
const authTabs = [{ id: 'login', name: 'Đăng nhập' }, { id: 'signup', name: 'Đăng ký' }]
const authTab = useSectionTab(authTabs, 'login')
const mode = ref(route.query.token ? 'reset' : route.query.invite ? 'signup' : authTab.value)
const showPassword = ref(false)
watch(authTab, (value) => {
  mode.value = value
  message.value = ''
  password.value = ''
  showPassword.value = false
})
function setMode(value: string) {
  mode.value = value
  message.value = ''
  showPassword.value = false
  if (value === 'login' || value === 'signup') authTab.value = value
}
const heading = computed(() => ({ login: 'Đăng nhập', signup: 'Đăng ký tài khoản', forgot: 'Quên mật khẩu', reset: 'Đặt lại mật khẩu', totp: 'Xác thực hai bước', backup: 'Nhập mã dự phòng' }[mode.value] || 'Đăng nhập'))
const email = ref(String(route.query.email || '')),
  studentId = ref(String(route.query.invite || '')),
  password = ref(''),
  code = ref(''),
  message = ref(''),
  busy = ref(false)
const destination = computed(() => safeReturn(route.query.return))
async function submit() {
  busy.value = true
  message.value = ''
  try {
    if (mode.value === 'login') {
      const result = await $fetch<{ twoFactorRedirect?: boolean }>(
        '/api/auth/sign-in/email',
        {
          method: 'POST',
          body: { email: email.value, password: password.value },
        },
      )
      if (result.twoFactorRedirect) {
        mode.value = 'totp'
        return
      }
      await refresh()
      await navigateTo(destination.value)
    }
    else if (mode.value === 'signup') {
      await $fetch('/api/auth/sign-up/email', {
        method: 'POST',
        body: {
          name: 'Sinh viên',
          email: email.value,
          studentId: studentId.value,
          password: password.value,
          callbackURL: '/dang-nhap',
        },
      })
      message.value
        = 'Nếu thông tin hợp lệ, email xác thực sẽ được gửi. Xác thực xong rồi đăng nhập.'
    }
    else if (mode.value === 'forgot') {
      await $fetch('/api/auth/request-password-reset', {
        method: 'POST',
        body: { email: email.value, redirectTo: '/dang-nhap' },
      })
      message.value
        = 'Nếu tài khoản tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi qua email.'
    }
    else if (mode.value === 'reset') {
      await $fetch('/api/auth/reset-password', {
        method: 'POST',
        body: { token: route.query.token, newPassword: password.value },
      })
      mode.value = 'login'
      message.value = 'Đã đặt lại mật khẩu.'
    }
    else {
      await $fetch(
        mode.value === 'backup'
          ? '/api/auth/two-factor/verify-backup-code'
          : '/api/auth/two-factor/verify-totp',
        {
          method: 'POST',
          body: { code: code.value },
        },
      )
      await refresh()
      await navigateTo(destination.value)
    }
  }
  catch {
    message.value
      = 'Chưa thể hoàn tất. Kiểm tra thông tin, xác thực email hoặc liên hệ quản trị.'
  }
  finally {
    busy.value = false
  }
}
async function resend() {
  if (!email.value.includes('@')) {
    message.value = 'Nhập email trường để gửi lại thư xác thực.'
    return
  }
  busy.value = true
  try {
    await $fetch('/api/auth/send-verification-email', {
      method: 'POST',
      body: { email: email.value, callbackURL: '/dang-nhap' },
    })
    message.value = 'Nếu tài khoản cần xác thực, thư mới sẽ được gửi.'
  }
  catch {
    message.value = 'Chưa gửi được thư. Vui lòng thử lại sau.'
  }
  finally {
    busy.value = false
  }
}
</script>

<template>
  <section class="auth-page">
    <div class="auth-card">
      <AppIdentity />
      <SectionTabs
        v-if="['login', 'signup'].includes(mode)"
        id="auth"
        :model-value="mode"
        label="Tài khoản sinh viên"
        :options="authTabs"
        @update:model-value="setMode"
      />
      <section
        id="auth-panel"
        :role="['login', 'signup'].includes(mode) ? 'tabpanel' : undefined"
        :aria-labelledby="['login', 'signup'].includes(mode) ? `auth-tab-${mode}` : 'auth-heading'"
        class="auth-panel"
      >
        <h1 id="auth-heading">
          {{ heading }}
        </h1>
        <p
          v-if="mode === 'signup'"
          class="muted"
        >
          Dùng email trường và MSSV có trong danh sách sinh viên do quản trị nhập.
        </p>
        <p
          v-else-if="mode === 'login'"
          class="muted"
        >
          Đọc học liệu, luyện tập và lưu tiến độ của bạn.
        </p>
        <p
          v-else-if="mode === 'forgot'"
          class="muted"
        >
          Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.
        </p>
        <p
          v-else-if="mode === 'totp'"
          class="muted"
        >
          Nhập mã hiện tại từ ứng dụng xác thực.
        </p>
        <p
          v-else-if="mode === 'backup'"
          class="muted"
        >
          Mỗi mã dự phòng chỉ sử dụng được một lần.
        </p>
        <form
          class="stack"
          :aria-busy="busy"
          @submit.prevent="submit"
        >
          <label v-if="['login', 'signup', 'forgot'].includes(mode)"> {{ mode === 'login' ? 'Email hoặc MSSV' : 'Email trường' }}
            <input
              v-model="email"
              :type="mode === 'login' ? 'text' : 'email'"
              autocomplete="username"
              required
              :disabled="busy"
              autocapitalize="none"
              spellcheck="false"
            >
          </label>
          <label v-if="mode === 'signup'">MSSV
            <input
              v-model="studentId"
              required
              autocomplete="off"
              :disabled="busy"
              placeholder="52.01.104.040"
            >
          </label>
          <div v-if="['login', 'signup', 'reset'].includes(mode)">
            <label for="auth-password">{{ mode === 'reset' ? 'Mật khẩu mới' : 'Mật khẩu' }}</label>
            <div class="password-field">
              <input
                id="auth-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :minlength="mode === 'login' ? 1 : 12"
                :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
                :aria-describedby="mode !== 'login' ? 'password-help' : undefined"
                required
                :disabled="busy"
              >
              <button
                type="button"
                class="password-toggle"
                :aria-pressed="showPassword"
                aria-controls="auth-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Ẩn' : 'Hiện' }}
              </button>
            </div>
            <small
              v-if="mode !== 'login'"
              id="password-help"
            >Dùng ít nhất 12 ký tự.</small>
          </div>
          <label v-if="['totp', 'backup'].includes(mode)">{{ mode === 'backup' ? 'Mã dự phòng' : 'Mã xác thực' }}
            <input
              v-model="code"
              :inputmode="mode === 'backup' ? 'text' : 'numeric'"
              autocomplete="one-time-code"
              required
              :disabled="busy"
            >
          </label>
          <button
            type="submit"
            :disabled="busy"
          >
            {{ busy ? 'Đang xử lý…' : mode === 'login' ? 'Đăng nhập' : mode === 'signup' ? 'Đăng ký' : 'Tiếp tục' }}
          </button>
          <p
            v-if="message"
            class="form-message"
            role="status"
          >
            {{ message }}
          </p>
        </form>
        <div class="auth-links">
          <button
            v-if="mode === 'login'"
            class="link-button"
            :disabled="busy"
            @click="setMode('forgot')"
          >
            Quên mật khẩu?
          </button>
          <button
            v-if="['totp', 'backup'].includes(mode)"
            class="link-button"
            :disabled="busy"
            @click="setMode(mode === 'totp' ? 'backup' : 'totp')"
          >
            {{ mode === 'totp' ? 'Dùng mã dự phòng' : 'Dùng ứng dụng xác thực' }}
          </button>
          <button
            v-if="['login', 'signup'].includes(mode)"
            class="link-button"
            :disabled="busy"
            @click="resend"
          >
            Gửi lại email xác thực
          </button>
          <button
            v-if="!['login', 'signup', 'totp', 'backup'].includes(mode)"
            class="link-button"
            :disabled="busy"
            @click="setMode('login')"
          >
            Về đăng nhập
          </button>
        </div>
      </section>
    </div>
    <NuxtLink
      class="auth-back"
      to="/"
    >Về kho học liệu</NuxtLink>
  </section>
</template>
