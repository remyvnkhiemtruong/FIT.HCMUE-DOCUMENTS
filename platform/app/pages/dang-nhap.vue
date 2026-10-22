<script setup lang="ts">
import { safeReturn } from '#shared/utils/identity'

const route = useRoute(),
  { refresh } = await useViewer()
const mode = ref(
  route.query.invite ? 'signup' : route.query.token ? 'reset' : 'login',
)
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
  <section class="narrow">
    <h1>
      {{
        {
          login: "Đăng nhập",
          signup: "Đăng ký tài khoản",
          forgot: "Quên mật khẩu",
          reset: "Đặt lại mật khẩu",
          totp: "Xác thực hai bước",
        }[mode]
      }}
    </h1>
    <p>
      Tài khoản sinh viên cần khớp danh sách email và MSSV do quản trị cung cấp.
    </p>
    <form
      class="stack"
      @submit.prevent="submit"
    >
      <label v-if="['login', 'signup', 'forgot'].includes(mode)">{{ mode === "login" ? "Email hoặc MSSV" : "Email trường"
      }}<input
        v-model="email"
        :type="mode === 'login' ? 'text' : 'email'"
        autocomplete="username"
        required
      ></label>
      <label v-if="mode === 'signup'">MSSV<input
        v-model="studentId"
        required
        autocomplete="off"
      ></label>
      <label v-if="['login', 'signup', 'reset'].includes(mode)">Mật khẩu<input
        v-model="password"
        type="password"
        :minlength="mode === 'login' ? 1 : 12"
        :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
        required
      ></label>
      <label v-if="['totp', 'backup'].includes(mode)">{{ mode === "backup" ? "Mã dự phòng" : "Mã từ ứng dụng xác thực"
      }}<input
        v-model="code"
        :inputmode="mode === 'backup' ? 'text' : 'numeric'"
        autocomplete="one-time-code"
        required
      ></label>
      <button :disabled="busy">
        {{ busy ? "Đang xử lý…" : "Tiếp tục" }}
      </button>
      <p role="status">
        {{ message }}
      </p>
    </form>
    <button
      v-if="['totp', 'backup'].includes(mode)"
      class="quiet"
      @click="mode = mode === 'totp' ? 'backup' : 'totp'"
    >
      {{ mode === "totp" ? "Dùng mã dự phòng" : "Dùng ứng dụng xác thực" }}
    </button>
    <button
      v-if="['login', 'signup'].includes(mode)"
      class="quiet"
      :disabled="busy"
      @click="resend"
    >
      Gửi lại email xác thực
    </button>
    <div class="actions">
      <button
        class="quiet"
        @click="mode = 'login'"
      >
        Đăng nhập
      </button><button
        class="quiet"
        @click="mode = 'signup'"
      >
        Đăng ký
      </button><button
        class="quiet"
        @click="mode = 'forgot'"
      >
        Quên mật khẩu
      </button>
    </div>
  </section>
</template>
