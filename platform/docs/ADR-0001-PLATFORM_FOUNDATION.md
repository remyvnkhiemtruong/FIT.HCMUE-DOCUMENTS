# ADR 0001 — Nền tảng Nuxt độc lập

Ngày: 21/10/2026. Trạng thái: áp dụng trong bước 01; chưa có quyết định ORM/auth/storage/deployment.

## Bối cảnh

Audit tại SHA `233575eed1caacf55e2a8e9baf6aa4ee587a0db0` xác nhận VitePress có catalog, Markdown và cơ chế bảo toàn độc lập. Nền tảng mới phải nằm trong platform, không đổi root package/lockfile, source docs, archive hoặc workflow deploy hiện tại. Node local là 24.18.0, npm 11.16.0.

## Quyết định

- Nuxt **4.6.2** stable (không nightly/alpha/rc), Vue **3.5.44**, Vue Router **5.4.0**. Xác minh trực tiếp `npm view nuxt dist-tags engines --json` và `npm view nuxt@4.6.2 version engines dependencies.vue dependencies.vue-router --json` trước cài: latest=4.6.2; engines Nuxt `^22.22.3 || ^24.15.0 || >=26.0.0`; Vue dependency `^3.5.44`, router `^5.4.0`. Node thực tế thỏa yêu cầu. Project giới hạn Node 24 >=24.15.0 và npm11 để có một baseline có thể lặp lại; không khẳng định đã test Node22/26.
- Khóa exact direct versions và npm lockfile riêng, private package, không tạo workspace hay nested git repository.
- Dùng Nuxt4 app directory và project references app/server/shared/node. Các directory UI nằm trong app; middleware chỉ giữ thư mục, không thêm logic ngoài phạm vi.
- TypeScript **5.9.3**, vue-tsc **3.3.13**, types Node24. Giữ TS5.9 là lựa chọn bảo thủ phù hợp baseline cũ; không tự nâng major TypeScript chỉ vì registry có bản mới. Tương thích được kiểm bằng typecheck/build thực tế.
- ESLint **10.13.0**, module Nuxt ESLint **1.17.0**, flat config sinh theo project và stylistic preset. Peer của module chấp nhận ESLint9 hoặc10; chọn nhánh10 còn được hỗ trợ, không dùng config cũ .eslintrc.
- Nitro `node-server` cho SSR + API. Route `health.get.ts` chỉ phục vụ GET liveness, không cache, có DTO dùng chung, không gọi DB hoặc S3.
- Vitest **5.0.5** kiểm bản build thật qua HTTP; engines registry chấp nhận Node24. Playwright **1.64.1** độc lập kiểm browser; cổng4319 không trùng legacy preview4173. Không dùng mocked health handler làm bằng chứng server thực sự chạy.
- Cấu hình public chỉ có URL legacy. Hai logo sao chép nguyên byte từ docs/public/brand; giữ default palette trường/khoa. Không sao chép hoặc public nội dung archive.
- Giữ robots noindex/nofollow phù hợp giai đoạn xây dựng và baseline legacy; không coi robots là access control. Error page không in raw error/stack ra UI.

## Hệ quả

Có hai installation/dependency tree và hai quy trình build riêng. Cần chạy typecheck riêng vì Nuxt build mặc định không kiểm type. Generated dirs, .env và artifacts bị ignore. Hosting tĩnh của GitHub Pages chưa phục vụ ứng dụng mới; không thay workflow hoặc publish. API liveness chưa thay cho readiness khi có DB trong tương lai.

Vitest yêu cầu `.output` hiện hành; `test:integration` luôn build trước. Browser suite cũng chạy production build, còn dev server được thử trực tiếp riêng trong báo cáo. Chưa có cache học liệu, tài khoản, middleware auth hay schema database.

## Nguồn chính thức đã đối chiếu

- [Nuxt installation](https://nuxt.com/docs/4.x/getting-started/installation): Node/runtime, khởi động local và lưu ý Windows/127.0.0.1.
- [Nuxt TypeScript](https://nuxt.com/docs/4.x/guide/concepts/typescript): prepare/typecheck, strict và project references.
- [Nuxt error.vue](https://nuxt.com/docs/4.x/directory-structure/app/error): error page nằm trong app, có thể dùng layout.
- [Nuxt server directory](https://nuxt.com/docs/4.x/directory-structure/server): Nitro handlers và tách client/server code.
- [Nuxt ESLint module](https://eslint.nuxt.com/packages/module): withNuxt flat config, lint script và stylistic preset.
- Metadata package/version/engine lấy từ npm registry bằng các lệnh npm view, không suy phiên bản từ trí nhớ. Kết quả vận hành cuối nằm trong STEP-01-REPORT.md.
