// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      // ─── Chống chuột phải ─────────────────────────────────────────────────
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        return false
      })

      // ─── Chống Ctrl+C / Ctrl+U / Ctrl+S / Ctrl+P / Ctrl+A / F12 ─────────
      document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase()
        const ctrl = e.ctrlKey || e.metaKey

        // Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, Ctrl+S, Ctrl+P
        if (ctrl && ['c', 'x', 'a', 'u', 's', 'p'].includes(key)) {
          e.preventDefault()
          return false
        }

        // F12 (DevTools)
        if (e.key === 'F12') {
          e.preventDefault()
          return false
        }

        // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
        if (ctrl && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
          e.preventDefault()
          return false
        }
      })

      // ─── Chống kéo thả chọn text ──────────────────────────────────────────
      document.addEventListener('selectstart', (e) => {
        // Cho phép chọn trong input / textarea
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        e.preventDefault()
        return false
      })

      // ─── Chống kéo-thả (drag) ────────────────────────────────────────────
      document.addEventListener('dragstart', (e) => {
        e.preventDefault()
        return false
      })

      // ─── Chống PrintScreen (hiển thị cảnh báo) ───────────────────────────
      document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
          navigator.clipboard.writeText('').catch(() => {})
        }
      })

      // ─── Anti-DevTools: detect bằng debugger timing (không false positive) ─
      let devToolsOpen = false
      const devToolsCheck = () => {
        const start = performance.now()
        // eslint-disable-next-line no-debugger
        debugger
        const elapsed = performance.now() - start
        // Nếu debugger bị pause (DevTools đang mở), elapsed sẽ > 100ms
        if (elapsed > 100 && !devToolsOpen) {
          devToolsOpen = true
          document.body.innerHTML =
            '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;flex-direction:column;gap:16px;background:#1e1e2e;color:#cdd6f4;">' +
            '<span style="font-size:48px;">🚫</span>' +
            '<h2 style="margin:0">Trang web không hỗ trợ DevTools</h2>' +
            '<p style="margin:0;opacity:.7">Vui lòng đóng Developer Tools để tiếp tục.</p>' +
            '</div>'
        }
      }
      setInterval(devToolsCheck, 3000)
    })
  }
}
