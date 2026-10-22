# Báo cáo BƯỚC 01 — Khởi tạo nền tảng web động

Ngày 21/10/2026, Asia/Bangkok. Source legacy tại nhánh main, SHA `233575eed1caacf55e2a8e9baf6aa4ee587a0db0`. Git đầu bước đã có bốn tài liệu audit bước 00 chưa track; các tài liệu đó được giữ nguyên. Không commit/push/deploy.

## 1. Đã thực hiện

- Tạo ứng dụng độc lập Nuxt 4.6.2 + Vue 3.5.44 + TypeScript 5.9.3 trong platform, package/lockfile riêng, private package, không tạo workspace ảnh hưởng root.
- Dùng đúng Nuxt4 app directory: components/composables/pages/layouts/middleware ở app, server/shared/tests/docs ở gốc platform.
- Strict TypeScript và noUncheckedIndexedAccess trong các generated project contexts; test/config có tsconfig strict riêng.
- ESLint10.13.0 với Nuxt ESLint1.17.0/flat config/stylistic, zero lint warnings.
- DefaultLayout theo convention `app/layouts/default.vue`; AppIdentity tái sử dụng hai logo nguyên byte; trang chủ tạm có liên kết tới kho học liệu hiện tại; trang lỗi tùy biến cho404 và thông báo chung cho lỗi khác, không in raw stack lên UI.
- API GET health typed, JSON HTTP200, Cache-Control:no-store. Thêm .env.example/.gitignore, runtime public legacyUrl và README.
- Vitest kiểm Node/Nitro production artifact qua HTTP; Playwright kiểm giao diện, hydration/focus/ảnh/liên kết/404 và mobile. Đã xem screenshot desktop/mobile.
- Không tạo auth/DB/ORM/upload/bookmark hoặc tính năng học tập mới. Chưa chuyển Markdown/catalog/routes cũ vào platform.

Phiên bản được đối chiếu với npm registry và nguồn Nuxt chính thức trước cài, sau đó kiểm thực tế. Xem [ADR 0001](ADR-0001-PLATFORM_FOUNDATION.md). Nuxt engines chấp nhận Node hiện tại24.18.0; project giữ baseline Node24/npm11. Nitro2.13.5, Vite8.3.5 được xác nhận trong build log.

## 2. Danh sách file mới của bước 01

27 tệp, tính từ repository root:

```text
platform/.env.example
platform/.gitignore
platform/README.md
platform/package.json
platform/package-lock.json
platform/nuxt.config.ts
platform/tsconfig.json
platform/eslint.config.mjs
platform/vitest.config.ts
platform/playwright.config.ts
platform/app/app.vue
platform/app/error.vue
platform/app/assets/css/main.css
platform/app/components/AppIdentity.vue
platform/app/composables/useSiteLinks.ts
platform/app/layouts/default.vue
platform/app/middleware/.gitkeep
platform/app/pages/index.vue
platform/server/api/health.get.ts
platform/shared/types/health.ts
platform/public/brand/logo-truong.png
platform/public/brand/logo-khoa.png
platform/tests/tsconfig.json
platform/tests/integration/application.test.ts
platform/tests/browser/foundation.spec.ts
platform/docs/ADR-0001-PLATFORM_FOUNDATION.md
platform/docs/STEP-01-REPORT.md
```

Bốn audit bước00 vẫn có trong platform/docs, không thuộc các tệp mới nêu trên. Không chỉnh tệp tracked legacy, root package/lockfile, source docs hoặc `.github/workflows/deploy.yml`. Generated .nuxt/.output/node_modules/test-results không đưa vào source. `middleware/.gitkeep` giữ cấu trúc cho bước sau, chưa chứa middleware giả hay kiểm quyền frontend.

## 3. Database và API

Không có database/schema/migration thay đổi, không kết nối PostgreSQL hoặc S3.

API mới duy nhất:

```http
GET /api/health
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
```

```json
{"status":"ok","service":"fit-hcmue-learning-hub"}
```

Endpoint liveness công khai không trả secrets/environment/dependency versions. Chưa có readiness check hạ tầng.

## 4. Lệnh đã chạy và kết quả thực tế

Các lệnh platform chạy trong platform, các lệnh legacy chạy ở root.

| Kiểm tra / lệnh | Kết quả cuối | Bằng chứng/giới hạn |
| --- | --- | --- |
| Git status/SHA, node/npm, đọc source và audit | PASS | Node24.18.0/npm11.16.0; HEAD không đổi |
| npm view Nuxt/Vue/router/ESLint/Vitest versions/engines/peers | PASS | Chọn stable exact versions trước cài |
| `npm install` | PASS, exit0 | Tạo lock riêng; có audit warnings, xem mục6 |
| `npm ls --depth=0` | PASS, exit0 | Nuxt4.6.2, Vue3.5.44, router5.4.0, ESLint10.13.0, TS5.9.3, vue-tsc3.3.13, Vitest5.0.5, Playwright1.64.1, @nuxt/eslint1.17.0, @types/node24.19.2 |
| `npm ci --dry-run --ignore-scripts --no-audit` | PASS, exit0 | Kiểm resolver/lock consistency; đây là dry-run, không tuyên bố đã cài sạch bằng npm ci |
| `npm run lint:fix` | PASS, exit0 | Chuẩn hóa Vue/style/config theo preset |
| `npm run lint` | PASS, exit0 | Đã chạy lại sau chỉnh test; zero warnings |
| `npm run typecheck` | PASS, exit0 | Nuxt app/server/shared/node + tests/config strict |
| `npm run test:integration` | PASS, exit0 | Build Nuxt/Nitro rồi5/5 Vitest qua HTTP; build cuối11.1s, output2.09MB/529kB gzip |
| `npm run test:browser` | PASS, exit0 | 3/3 Playwright,4.5s, Chrome/2 workers; screenshot được xem |
| HTTP tới dev `127.0.0.1:3000/` và `/api/health` | PASS | Cả hai200; home có nội dung, health đúng JSON/no-store |
| Legacy `npm run build` | PASS, exit0 | 14/14 data tests, vue-tsc, VitePress build46.46s |
| Legacy `npm run check:links` | PASS, exit0 | 264HTML, anchors/assets/internal links và77 original routes |
| Legacy `npm run test:browser` | PASS, exit0 | 20/20,2.6 phút, Chrome |
| `git diff --exit-code`, `git diff --check` | PASS | Không thay đổi tracked source |
| SHA-256 đối chiếu125 tệp tracked với BASELINE | PASS | Từng byte legacy không đổi; hai logo sao chép giống bản gốc |
| Ignore checks | PASS | .env/.env.local/.nuxt/.output/node_modules bị ignore; .env.example được giữ |

Các lỗi/cảnh báo xuất hiện trong quá trình làm:

- Lần Vitest đầu4/5 PASS, một test đòi HTML404 nhưng gửi Accept mặc định `*/*`; Nitro trả JSON404 đúng content negotiation. Đã sửa test gửi `Accept: text/html`, giữ assertion HTTP404 và nội dung trang lỗi; chạy lại5/5 PASS, bao gồm lệnh build+test cuối.
- Cài lần đầu ESLint9.39.5 báo hết hỗ trợ và có peer warning. Đã chuyển10.13.0 tương thích peer module và kiểm lint/typecheck/build; không giữ phiên bản9 làm direct dependency.
- Thử `npm run dev -- --port 3001` exit1 vì đã có dev server của cùng project ở3000 (PID11360). Không bypass lock hoặc dừng process có sẵn; kiểm HTTP trực tiếp server đang chạy. Nuxt build dùng cache build riêng và không yêu cầu tắt dev server này. Đây là xung đột khởi động server thứ hai, không được ghi nhầm thành lệnh dev PASS. Test servers tự khởi động/dừng process riêng; không để lại test server4319.
- Browser test404 in Vue Router warning không tìm route, đúng route cố tình kiểm tra; không có pageerror trong test home. NO_COLOR/FORCE_COLOR warning không ảnh hưởng kết quả.
- VitePress vẫn có warning chunk>500kB như baseline; không sửa hoặc tăng ngưỡng để che.
- npm báo install scripts của esbuild/unrs-resolver chưa thuộc allowScripts policy của máy. Không nới quyền chạy scripts toàn cục; native packages/build/typecheck/tests vẫn chạy thành công trong môi trường hiện tại. Cài trên máy khác cần theo policy package scripts của máy đó.

## 5. Acceptance criteria

| Tiêu chí | Trạng thái |
| --- | --- |
| Nuxt chạy local | PASS — dev home200, SSR/build production và browser đều kiểm thật |
| Health hợp lệ | PASS — JSON schema literal/status200/no-store |
| Strict typecheck thành công | PASS |
| Build thành công | PASS |
| Có layout, home tạm,404, environment, ESLint, README, cấu trúc thư mục | PASS |
| Package/lockfile độc lập | PASS — root không đổi, lock resolver dry-run thành công |
| Website VitePress hoạt động | PASS — build/data/types/links/20browser tests |
| Không đổi deployment cũ | PASS — workflow/hash không đổi, không push hoặc gọi deploy |

## 6. Rủi ro và phụ thuộc chưa giải quyết

`npm audit` báo **11 high,0 critical**, là các package chịu ảnh hưởng lan truyền từ hai advisory, không phải11 exploit đã xác nhận trong ứng dụng. Root causes:

- Nuxt → @nuxt/nitro-server → nitropack2.13.5 → globby16.2.4 → micromatch4.0.8 → **braces3.0.3**. [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm): stack exhaustion với brace pattern lồng sâu; patched versions hiện ghi None.
- Nuxt → @nuxt/nitro-server → nitropack2.13.5 → listhen1.10.1 → **node-forge1.4.0**. [GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv): vấn đề xác minh RSA signature; patched versions hiện ghi None.

Đã đối chiếu advisory chính thức và npm view: latest của hai gói vẫn3.0.3/1.4.0. Không tự override sang phiên bản chưa tồn tại, patch dependency chưa được kiểm chứng hoặc chạy audit fix --force (npm đề xuất đổi/hạ Nuxt). Chưa có upload, pattern do người dùng cung cấp hay xác minh RSA signature trong mã bước01; không coi đó là kết luận toàn hệ thống miễn nhiễm.

Kiểm22 package manifests trong `.output/server/node_modules` hiện không có braces/node-forge. Điều này thu hẹp artifact runtime đã build, không xóa rủi ro dependency tree/dev/build. Đây là vấn đề còn mở cần theo dõi bản vá upstream và kiểm lại trước mở rộng hoặc triển khai production. Audit an toàn dependency **chưa PASS**; không báo zero vulnerabilities.

Chưa thử cài sạch trên máy khác/CI Linux. PostgreSQL/ORM/auth/S3/Docker/CI/deployment chưa thực hiện theo phạm vi. Chưa migrate routes/anchors/quiz/checklist và chưa công khai tài liệu nào từ archive. Những việc này không bị giả lập bằng tính năng placeholder hoặc database giả.

## 7. Hướng dẫn review, commit và bước tiếp theo

- Chạy/cài/kiểm tra: xem [README](../README.md). Dev URL hiện được kiểm tra tại `http://127.0.0.1:3000`; yêu cầu mở browser panel đã được app xếp hàng, không coi queued là bằng chứng UI đã mở.
- Commit đề xuất: `feat(platform): initialize Nuxt foundation with health endpoint and tests`.
- Bước tiếp theo đề xuất: chốt thiết kế PostgreSQL và ORM bằng ADR, chuẩn bị môi trường phát triển theo nhiệm vụ bước02 người dùng giao; xử lý/đánh giá lại dependency advisories trước production. Chưa thực hiện bước02.
- Dừng sau bước01 để người dùng review. Không thay đổi production, reset database, force push hoặc chạy scripts/migrate.py.
