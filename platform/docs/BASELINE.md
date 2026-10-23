# Baseline kiểm chứng — BƯỚC 00

Ngày 21/10/2026 (Asia/Bangkok). Thư mục: `C:\Users\Administrator\Downloads\HCMUE`.

## Git và môi trường

- Remote origin fetch/push: `https://github.com/remyvnkhiemtruong/FIT.HCMUE-DOCUMENTS.git`.
- Branch `main`; SHA `233575eed1caacf55e2a8e9baf6aa4ee587a0db0`.
- Commit: `Edit Vietnamese wording and preserve learning content and links`, author/committer remyvnkhiemtruong, 21/10/2026 02:01:46 +0700.
- Status đầu phiên sạch; không fetch/pull/checkout/reset/commit/push.
- Windows PowerShell; Node v24.18.0; npm 11.16.0. Yêu cầu README/package: Node >=24, đáp ứng.
- node_modules đã có sẵn. Không chạy npm ci vì không cần cài lại để audit; không đổi lockfile.
- `npm ls --depth=0` exit 0: @playwright/test 1.64.1, @types/node 26.6.5, markdown-it-mathjax3 4.3.2, typescript 5.9.3, vitepress 1.6.4, vue-tsc 3.3.13. package-lock chứa cây dependency thực tế; danh sách này chỉ là dependencies trực tiếp.

## Các lệnh kiểm tra thực tế

| Lệnh | Kết quả | Ghi chú |
| --- | --- | --- |
| `git status --short`, `git branch --show-current`, `git rev-parse HEAD`, `git remote -v`, `git log -1 --format=fuller` | PASS | Mốc Git trên |
| `node --version`, `npm --version`, `npm ls --depth=0` | PASS | Không cài package |
| `npm run build` | PASS, exit 0 | Tự chạy `npm run check` và `npm run check:types`, sau đó VitePress build |
| `npm run check` (qua build) | PASS | 14/14, zero failed/skipped; quan hệ, filters, 77 snapshot hashes/routes, toán/code/số liệu/quiz/checklist/title |
| `npm run check:types` (qua build) | PASS | vue-tsc --noEmit |
| `npm run check:links` | PASS, exit 0 | 264 HTML, internal links/assets, editorial anchors, 77 original routes |
| `npm run test:browser` | PASS, exit 0 | 20/20, 1.2 phút; Chrome, một worker thực tế theo log |
| Lint | KHÔNG CÓ | package.json không khai báo lint, không tạo hoặc cài linter trong audit |

Build VitePress báo `Some chunks are larger than 500 kB after minification`. Đây là warning, không phải build failure; chưa có đo hiệu năng thực địa. Mốc thời gian build log: 36.47 giây cho VitePress, không tính toàn bộ chuỗi npm. Playwright dùng Chrome theo config mặc định, webServer preview localhost:4173; không chạy dev/preview lâu dài riêng. Có warning NO_COLOR/FORCE_COLOR trong browser runner, không đồng nghĩa test failure. Không tuyên bố kết quả trên CI Linux vì chỉ chạy local.

Hai mươi bài browser bao gồm: ba ngành → học kỳ → môn → bài có toán; điều hướng sớm khi hydration chậm; URL filter/restore/empty state; phối hợp loại/năm/ngành; legacy redirect/base/query/.html; quiz chấm và reset; checklist lưu/reset/storage bị chặn; tìm kiếm full-text không dấu; tám tổ hợp 360/768/1280/1440 px × light/dark (logo, contrast, border, focus, overflow, navigation, print); home search; theme keyboard/system/reload; copy/select/context/print actions; phục hồi checklist sau biên tập. Không có test mới được thêm vì bước này chỉ tạo tài liệu.

## CI đã đọc

Workflow duy nhất `.github/workflows/deploy.yml`: push main/manual → checkout@v4 (fetch-depth 0), setup-node@v4/Node24/npm cache → npm ci → build (data+type checks) → check:links → install Chromium --with-deps → browser tests với PLAYWRIGHT_CHANNEL=chromium → diagnostics khi failure → upload-pages-artifact@v3 chỉ `docs/.vitepress/dist` → deploy-pages@v4. Có pages concurrency, không hủy run đang chạy. Quyền contents:read/pages:write/id-token:write ở workflow; deploy dùng environment github-pages. Không có pull_request trigger. Không gọi workflow trong audit.

## Giới hạn và trạng thái bàn giao

Không có DB/API/schema/migration thay đổi. Chỉ tạo bốn Markdown trong platform/docs. Build/test có tạo lại dist/cache/test-results bị .gitignore, không phải sửa source tracked. Không chạy scripts/migrate.py (chỉ đọc), không đưa archive lên public, không deploy. Không thay thế baseline fixture hoặc test để làm PASS.

Kiểm tra bàn giao thực tế: `git diff --exit-code` và `git diff --check` exit 0; `git status --short --untracked-files=all` chỉ liệt kê bốn tài liệu yêu cầu. Kiểm tra SHA-256 lần cuối so với phụ lục B xác nhận cả 125 tệp tracked không đổi byte. Bốn tài liệu đọc được UTF-8, không có ký tự thay thế U+FFFD hoặc kết quả test còn chờ. Kiểm tra inventory xác nhận 77 routes, 155 môn, 217 placements, 32 resources, 27 program routes, 83 entries/387 anchors của manifest, 264 route rows của HTML và 28 task keys đã được ghi.

Không chạy CVE scanner, security penetration test, kiểm external URL, kiểm bản quyền hoặc xác minh chương trình với trường. Hiện không có backend để kiểm auth/RBAC/upload. Kết quả test không chứng minh mọi anchor của snapshot trước migration còn tại redirect destination.

Commit đề xuất: `docs(platform): audit legacy repository and record migration baseline`.

Bước tiếp theo: chờ người dùng giao bước 01; đề xuất nền tảng Nuxt song song và ADR runtime/ORM/auth, không tự triển khai.

<!-- BASELINE_APPENDIX -->

## Phụ lục A — Thống kê toàn bộ Markdown source

Đếm token bằng protectedContent hiện hữu, tránh nhầm dấu $ trong code. Cột cuối ghi số token math backslash-delimiter thật được nhận diện; hỗ trợ trong regex không đồng nghĩa xuất hiện trong source. Template chưa chứa heading trước khi generator chạy.

| Tệp | UTF-8 bytes | Headings | Inline $ | Block $$ | Code fences | Math delimiters khác |
| --- | --- | --- | --- | --- | --- | --- |
| `docs/algebra/01-ma-tran-va-dinh-thuc.md` | 7150 | 13 | 75 | 22 | 0 | 0 |
| `docs/algebra/02-he-phuong-trinh-tuyen-tinh.md` | 5611 | 9 | 50 | 16 | 0 | 0 |
| `docs/algebra/03-khong-gian-vecto.md` | 6633 | 12 | 85 | 20 | 0 | 0 |
| `docs/algebra/04-khong-gian-euclide.md` | 5667 | 10 | 47 | 22 | 0 | 0 |
| `docs/algebra/05-anh-xa-tuyen-tinh-cheo-hoa.md` | 7078 | 10 | 66 | 23 | 0 | 0 |
| `docs/algebra/06-dang-toan-phuong.md` | 6087 | 13 | 48 | 19 | 0 | 0 |
| `docs/calculus/01-gioi-han-day-va-ham.md` | 6700 | 16 | 78 | 17 | 0 | 0 |
| `docs/calculus/02-dao-ham-vi-phan-taylor.md` | 6839 | 13 | 86 | 16 | 0 | 0 |
| `docs/calculus/03-tich-phan-va-ung-dung.md` | 5638 | 10 | 43 | 28 | 0 | 0 |
| `docs/calculus/04-tich-phan-suy-rong.md` | 4488 | 11 | 33 | 15 | 0 | 0 |
| `docs/calculus/05-ly-thuyet-chuoi.md` | 5326 | 15 | 42 | 13 | 0 | 0 |
| `docs/cheatsheet/cong-thuc-nhanh.md` | 4249 | 8 | 46 | 16 | 0 | 0 |
| `docs/cheatsheet/kien-thuc-thpt.md` | 2070 | 9 | 23 | 18 | 0 | 0 |
| `docs/chuong-trinh/[program].md` | 18 | 0 | 0 | 0 | 0 | 0 |
| `docs/chuong-trinh/index.md` | 418 | 2 | 0 | 0 | 0 | 0 |
| `docs/chuong-trinh/tra-cuu.md` | 228 | 1 | 0 | 0 | 0 | 0 |
| `docs/discrete-math/buoi-1-logic-menh-de.md` | 4950 | 9 | 33 | 14 | 0 | 0 |
| `docs/discrete-math/buoi-2-vi-tu-quy-nap.md` | 4586 | 9 | 47 | 8 | 0 | 0 |
| `docs/discrete-math/buoi-3-tap-hop-anh-xa.md` | 4489 | 11 | 50 | 11 | 0 | 0 |
| `docs/discrete-math/buoi-4-quan-he-dai-so-boole.md` | 5593 | 12 | 65 | 3 | 0 | 0 |
| `docs/discrete-math/buoi-5-to-hop-dem.md` | 4638 | 12 | 39 | 11 | 0 | 0 |
| `docs/discrete-math/buoi-6-he-thuc-truy-hoi.md` | 5533 | 10 | 60 | 21 | 0 | 0 |
| `docs/discrete-math/buoi-7-ly-thuyet-do-thi.md` | 6210 | 14 | 62 | 4 | 0 | 0 |
| `docs/exams-discrete/gk-2022-2023.md` | 5003 | 7 | 45 | 18 | 0 | 0 |
| `docs/exams-discrete/gk-2023-2024.md` | 5158 | 7 | 38 | 8 | 0 | 0 |
| `docs/exams-discrete/kthp-2022-2023.md` | 7283 | 8 | 168 | 9 | 0 | 0 |
| `docs/exams-discrete/kthp-2023-2024.md` | 7030 | 8 | 86 | 12 | 0 | 0 |
| `docs/exams-discrete/kthp-2024-2025.md` | 7045 | 8 | 99 | 10 | 0 | 0 |
| `docs/exams/de-2022-2023.md` | 6181 | 9 | 58 | 22 | 0 | 0 |
| `docs/exams/de-2023-2024.md` | 5157 | 9 | 41 | 18 | 0 | 0 |
| `docs/exams/de-2024-2025.md` | 5572 | 6 | 56 | 16 | 0 | 0 |
| `docs/exams/de-tham-khao-co-dap-an.md` | 6812 | 6 | 51 | 23 | 0 | 0 |
| `docs/exams/quiz-giua-ky.md` | 820 | 1 | 3 | 0 | 0 | 0 |
| `docs/exercises/algebra.md` | 6103 | 11 | 52 | 16 | 0 | 0 |
| `docs/exercises/calculus.md` | 3953 | 11 | 22 | 20 | 0 | 0 |
| `docs/exercises/index.md` | 1988 | 4 | 3 | 0 | 0 | 0 |
| `docs/hoc-lieu/index.md` | 219 | 1 | 0 | 0 | 0 | 0 |
| `docs/huong-dan.md` | 3194 | 6 | 0 | 0 | 0 | 0 |
| `docs/index.md` | 170 | 0 | 0 | 0 | 0 | 0 |
| `docs/khoa/index.md` | 203 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/khoa-49.md` | 76 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/khoa-50.md` | 76 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/khoa-51.md` | 76 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/khoa-52.md` | 76 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/nganh-cngd.md` | 213 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/nganh-cntt.md` | 213 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/nganh-sp-tin.md` | 217 | 1 | 0 | 0 | 0 | 0 |
| `docs/khoa/tra-cuu-hoc-phan.md` | 217 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/[course]/index.md` | 18 | 0 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk1/comp1010.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk1/comp1802.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk1/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk2/comp1013.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk2/comp1017.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk2/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk3/comp1016.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk3/comp1018.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk3/comp1019.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk3/comp1501.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk3/comp1701.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk3/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk4/comp1011.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk4/comp1015.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk4/comp1332.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk4/comp1401.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk4/comp1829.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk4/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk5/comp1044.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk5/comp1060.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk5/comp1314.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk5/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk6/comp1502.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk6/comp1803.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk6/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk7/comp1410.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk7/comp1809.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk7/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk7/psyc2803.md` | 211 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk8/comp1411.md` | 1189 | 3 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk8/comp1808.md` | 1162 | 3 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/hk8/index.md` | 231 | 1 | 0 | 0 | 0 | 0 |
| `docs/mon-hoc/index.md` | 203 | 1 | 0 | 0 | 0 | 0 |
| `docs/roadmap.md` | 7065 | 8 | 13 | 0 | 0 | 0 |

## Phụ lục B — SHA-256 của toàn bộ tệp tracked trước thay đổi

Hash tính trên bytes working tree ở mốc audit; line endings working tree có thể khác Git blob. Bốn tài liệu mới chưa được track không nằm trong danh sách. Không dùng snapshot này thay thế original-pages.json.

| Tệp | Bytes | SHA-256 |
| --- | --- | --- |
| `.github/workflows/deploy.yml` | 1600 | `f68592922431e24639a1d7b2a1dd2d8d589a146badbbee25142520ff9b3dec59` |
| `.gitignore` | 318 | `d859c1ba6fdf7c496cf6164d96db51b92f64e05c30afafe1e45de06fa26b207a` |
| `README.md` | 9051 | `7ca1c8ae483f2fac439ebb90bdf3f06513b002317bbd7e46cde704007f455a95` |
| `content-archive/data-issues.json` | 3494 | `c5a20ec46523947e83cee9a37920719f73ad141901507c0a90f32e869635ca06` |
| `content-archive/editorial-anchors.json` | 16856 | `9ef4139970d57cee142f3c00738e4f4c47c0594057f679387b5d7b05ce1a7d3f` |
| `content-archive/editorial-review.md` | 1291 | `cf436a267bce16a18f7623eaab6d78f9c41f31a830879020e6f2e61b2777c1ef` |
| `content-archive/migration.json` | 14820 | `6db3458ae5730fa953fea2ca3dd1cbb11c554b18d54e979d129b54d091053b14` |
| `content-archive/original-pages.json` | 312630 | `218139f91dbe9e7b1c0d2d1a85f4c407117ade25b4ce488b063bd6fd7cc50ffc` |
| `docs/.vitepress/config.mts` | 4490 | `bf096980f3127ffdeab606da289f37daeeb3d8e4426c46434e9824027da6f409` |
| `docs/.vitepress/data/catalog.mts` | 97498 | `0735b92a94ea209b21fd57d880177b0c6f1c36a14a0baf179afd5bb1ffcaf459` |
| `docs/.vitepress/data/checklist-keys.json` | 351 | `a0b8138ab14b3e1fd72735d29d8e5d944f2e6d8adf1d92076c89e2784fcfd761` |
| `docs/.vitepress/data/filtering.mts` | 1135 | `68dd41876d71f77ce179a36c96e35b8abacfd99529efd496650345cd28808d8d` |
| `docs/.vitepress/data/quiz.data.ts` | 835 | `2ed997f3dfe705874007bba977eef61b9e02815a5dcef31b61a4aa82f0459e9d` |
| `docs/.vitepress/data/quiz.json` | 5966 | `de88e70e2ba9ec5536ef95a8ab7289d1ee5679083f18c4ae5caa44554903a187` |
| `docs/.vitepress/page-content.mts` | 4208 | `eb557de0c24817ae5c81539746d513a183200d05dac2761b49f8f43e3eac7822` |
| `docs/.vitepress/theme/components/BrandIdentity.vue` | 502 | `e262304d29f1bdb8de11af086c0ce3c7a6d11acc1eb802212b7f74bb9711ee7c` |
| `docs/.vitepress/theme/components/CatalogBrowser.vue` | 5783 | `dc4db45d24587a60884fccb97f9a4ab76ff9b59976d79cc31fd039bfc19dc4de` |
| `docs/.vitepress/theme/components/CohortOverview.vue` | 764 | `7a0277275bca7bd748eb681778af30854caa393e4b9cdc1cc941b79a4f09bb6a` |
| `docs/.vitepress/theme/components/CohortSelector.vue` | 785 | `4c190537f5e059a1204c845e3de61ceeaa66c05edfa1eefa20bf40bb96dd3dea` |
| `docs/.vitepress/theme/components/HomePortal.vue` | 2929 | `c0be184cd195c3076febfa38a9bf89bfa3ad6fba1958e242bec5d99b91b656ff` |
| `docs/.vitepress/theme/components/LearningChecklist.vue` | 2717 | `2c9bbce37b411f39ba51a7f9fc74969b736b361e81eac060af871db93169c170` |
| `docs/.vitepress/theme/components/LegacyRedirect.vue` | 730 | `3ae5eb58dcf188b8d2e06a11c293f0c753d6d0fc6de0167c47d1ab7c8b4d44f9` |
| `docs/.vitepress/theme/components/LessonContext.vue` | 1118 | `eb10a8dcf72ab98f63c3c0ad6510bd9a51c9c80007216b196d7fec5bacb2b956` |
| `docs/.vitepress/theme/components/MajorDirectory.vue` | 438 | `cbde6ff2d940c3c84237f401b47e482bd643812279129059fd05603483597596` |
| `docs/.vitepress/theme/components/Quiz.vue` | 1811 | `7744ff7579422d1440d5f63d81bda5e6cd6c87b3d932859fd76e6c5fbfe684aa` |
| `docs/.vitepress/theme/components/ThemeToggle.vue` | 815 | `8455fd4547ffd145e6d65f7dc66330db44f6057ac6b1d0e3ad5fe6d2e7c156cf` |
| `docs/.vitepress/theme/custom.css` | 14537 | `979d1179fb64ddba98df06918443815e5f5592bbfb4c366c9c562e08f766ff56` |
| `docs/.vitepress/theme/index.ts` | 2208 | `a1a20255e48e59fbf3f10b59efb5d577fbb88475016d469fee11185adc28ff72` |
| `docs/.vitepress/theme/useFilters.ts` | 911 | `0c796613e92fd8ac0f166fe31f3e9ad0d35b6cbb443095dd419be39f1d183ae3` |
| `docs/algebra/01-ma-tran-va-dinh-thuc.md` | 7150 | `5dc14a273324916a8e4de6de0e55d6cbe216d74fb8e1fb09746722846b8ea84c` |
| `docs/algebra/02-he-phuong-trinh-tuyen-tinh.md` | 5611 | `938aac960d591416d91deb197c9be8fa51bc93953d60160d7e39fe92c71bb531` |
| `docs/algebra/03-khong-gian-vecto.md` | 6633 | `2091e73033a2796b70bc7f79720e3556bc87f1259061957b6b05b35e915a562b` |
| `docs/algebra/04-khong-gian-euclide.md` | 5667 | `86d31ea3f44ec108260439712322d80e8d7c43319b966e8e5a1eaa4f8d6a8e21` |
| `docs/algebra/05-anh-xa-tuyen-tinh-cheo-hoa.md` | 7078 | `f63cdd2322ccb2e05fdf6a46d2f3c89bd38434c435fbb35efc5eb4428425c8c2` |
| `docs/algebra/06-dang-toan-phuong.md` | 6087 | `7db52487dba6752ad4e2cd17db7a9081307b73747ef80b41b107a20bd2df2d7b` |
| `docs/calculus/01-gioi-han-day-va-ham.md` | 6700 | `a035a733e04941618e660a8fc387b07cb9050352a1b7336fc75c6d1d5e78eed6` |
| `docs/calculus/02-dao-ham-vi-phan-taylor.md` | 6839 | `43ba8753c6e27278fed96a830f5acfd2c60ef117dd8fd067b2fbc251002e0b3a` |
| `docs/calculus/03-tich-phan-va-ung-dung.md` | 5638 | `29592468769641e0466dfae422ce4dcb0a872257412137496c9aaf588d48a55b` |
| `docs/calculus/04-tich-phan-suy-rong.md` | 4488 | `162505323061493a1f999c21eace41cce1e7cd42a3aa647688166bd680a61921` |
| `docs/calculus/05-ly-thuyet-chuoi.md` | 5326 | `fbb9284dc45aab2243e943485940c98b6bb02f3406762380f6ac2508340a4c77` |
| `docs/cheatsheet/cong-thuc-nhanh.md` | 4249 | `f5695ba1f3d06bcca6adaab8d1bcfdc27be6c6451595ee9f485af5b34ed7897a` |
| `docs/cheatsheet/kien-thuc-thpt.md` | 2070 | `1b10cf3575b1ef9c1a2165b3b16da04ce1cdc5feb250ca462cc5ff510b0866a1` |
| `docs/chuong-trinh/[program].md` | 18 | `e670e1976ad7b7a2daf04b3bdecdf0dc4e74b36fe6c680c127c1a6e63879a282` |
| `docs/chuong-trinh/[program].paths.ts` | 407 | `2ee0a5867a4e1903f4c6ba5ea397c57b7f1e05941ee675d0bd01f766b81c7578` |
| `docs/chuong-trinh/index.md` | 418 | `97f981fae851fa7b3c958660a3c66053889b5b347916e3d905ec46314fe77569` |
| `docs/chuong-trinh/tra-cuu.md` | 228 | `627c85c0c1a02312187fadf6bc72d3b1afdba9fa0d7dac9646b31f85f143697e` |
| `docs/discrete-math/buoi-1-logic-menh-de.md` | 4950 | `68f7ae7f18aceaf6987009f773d3b0a1777722d4b841e4057362b7f2874b052d` |
| `docs/discrete-math/buoi-2-vi-tu-quy-nap.md` | 4586 | `466e9bf873ca9bd466bd20504078742e9b5d44b363bdfaf147d7d829fd7d815c` |
| `docs/discrete-math/buoi-3-tap-hop-anh-xa.md` | 4489 | `c25f73dd3e3e5ad82d715259fd6da0e6ffad222fb9944da62a48bc634f42051b` |
| `docs/discrete-math/buoi-4-quan-he-dai-so-boole.md` | 5593 | `d654c9ac8047a7cd8b07d93e49d72c323ca9fed2ad3ea4760c1f4854bfc1efbb` |
| `docs/discrete-math/buoi-5-to-hop-dem.md` | 4638 | `5294dda185e7c93feb89bc26490f3f8a01453488393a8bbb430a881e9e63f575` |
| `docs/discrete-math/buoi-6-he-thuc-truy-hoi.md` | 5533 | `75218b0c5d1377fcafc3219e947f8eaffc432c4dcd6c361d7f2ef4ac721a4399` |
| `docs/discrete-math/buoi-7-ly-thuyet-do-thi.md` | 6210 | `5968a1dd511047c50e3ab93def84dd3c870b5e6732b204e3621be18dbea52cd6` |
| `docs/exams-discrete/gk-2022-2023.md` | 5003 | `5b6f623053f24f11035403731edbf0fff81c3718eb9743db995d20c590ab6f11` |
| `docs/exams-discrete/gk-2023-2024.md` | 5158 | `5c3121128d51178157dc1954f949ef4dab63318fb756a5444a64d23263c303fd` |
| `docs/exams-discrete/kthp-2022-2023.md` | 7283 | `53dea56d4c3bf06c10c371bddb3132da9e1604fa7b66c6ef140b1df003c72495` |
| `docs/exams-discrete/kthp-2023-2024.md` | 7030 | `b91a6059352850027c1ad806b3d6a509ff0746fc100887ece4f5b9aaedece8cd` |
| `docs/exams-discrete/kthp-2024-2025.md` | 7045 | `165ff3205957c4633bd1323bb15468444649d9fe9aafc29705ea839d5df543e6` |
| `docs/exams/de-2022-2023.md` | 6181 | `d29c11892de50ec88805dc199fbdb5351eebd116edec98ef1220de179cf39e90` |
| `docs/exams/de-2023-2024.md` | 5157 | `214db0e8fe43aa8d7abe4d0b605f2c11872e360ac69b736710f8d6e37833d2f9` |
| `docs/exams/de-2024-2025.md` | 5572 | `da073fe9655d4a8b95a62258b603ef89e5e295deef4383f97faa172e5a171ab3` |
| `docs/exams/de-tham-khao-co-dap-an.md` | 6812 | `6e189596de767192a16bb25375077204261bf1de273b3d7a2c190cffe2cb7ed3` |
| `docs/exams/quiz-giua-ky.md` | 820 | `88ac9ac9fde83b6885176f255b518aedadaa69e442095ae6cde7d498736875f2` |
| `docs/exercises/algebra.md` | 6103 | `a76987bafe34ffae50f13474a46b50b844760b6d1523c4c38929e87f7518e43c` |
| `docs/exercises/calculus.md` | 3953 | `53a921f40f0450fde72a5e0f42c6455dbe3511a324dc7d5d227954fc1e69f8cc` |
| `docs/exercises/index.md` | 1988 | `24d0e9f9ccea02af97e8e0eee88146ac50436f56073d50c4371e4dd3ae489ade` |
| `docs/hoc-lieu/index.md` | 219 | `b8437867e77e62512785140861eeade81db3443acf3c2688775862871db4250e` |
| `docs/huong-dan.md` | 3194 | `be96ef7e9c53eecb19072408f0af8d638ae35b442429a2e9e4faaacfb703ae51` |
| `docs/index.md` | 170 | `13b33f64a789d45dc5613d4327e3d07c5952b5121db2706d63aec1740c6ef875` |
| `docs/khoa/index.md` | 203 | `02a18e1dd453d12e98f01efc10f73db43098ad1a2c7ff2a14d6aa5d218dc7453` |
| `docs/khoa/khoa-49.md` | 76 | `16168c7740d45ea20f102901ad59c40fcb4c2173735391439afd2573ff9b7c73` |
| `docs/khoa/khoa-50.md` | 76 | `425621b1d00afe4d33f7da399d553ee6496e78ead29acd461e4624930257fc89` |
| `docs/khoa/khoa-51.md` | 76 | `7a8d89673d330172dfa57015fe5c39c4c4aa1b928c4d085ec1d0d6c2a259c8ca` |
| `docs/khoa/khoa-52.md` | 76 | `7c4500c7f036fedb7513600baf7a223cf28f8fc1ff0bda550c672a4262ff3be8` |
| `docs/khoa/nganh-cngd.md` | 213 | `8d710dd603708075ce0cc56cf98397c28cd06c77954e93efab974560555b64f1` |
| `docs/khoa/nganh-cntt.md` | 213 | `d4bc016ab7ab559291c048c61d1d452698d05097219a8ac88ae31e93cd177833` |
| `docs/khoa/nganh-sp-tin.md` | 217 | `e4bd276ef66637f103e085e40cd79b3f0c90c448bed81a34832e71db2bd95f96` |
| `docs/khoa/tra-cuu-hoc-phan.md` | 217 | `dc750ad0d83f46277c65d9bbadb18236446e6f4d6b1c148e42af917380c1a018` |
| `docs/mon-hoc/[course]/index.md` | 18 | `e670e1976ad7b7a2daf04b3bdecdf0dc4e74b36fe6c680c127c1a6e63879a282` |
| `docs/mon-hoc/[course]/index.paths.ts` | 263 | `51a5411c90d0a0b9b14133c06a4114e12331638224016163d702fc0506da012b` |
| `docs/mon-hoc/hk1/comp1010.md` | 211 | `4d4d479c292c121fc7fc487c7ae0ed974cba9b1e28c1a95e913b230be874c2c7` |
| `docs/mon-hoc/hk1/comp1802.md` | 211 | `7e2a0fbb8fee207336e04ce948b7acf5cecd5606b18d300a3d42f8c6279d4453` |
| `docs/mon-hoc/hk1/index.md` | 231 | `cb510ced12fe46e4b1af90697f891006aad45d6d8873ff259fc01d0d5a5a9612` |
| `docs/mon-hoc/hk2/comp1013.md` | 211 | `9183442504dfe705cdfc4a70304233f5e19c0c727967c315385b3a9aa908aa36` |
| `docs/mon-hoc/hk2/comp1017.md` | 211 | `fdc8a560962ba6bc2723d074db3a1b1f7db1c1346028a215b30fa4881cb0fad5` |
| `docs/mon-hoc/hk2/index.md` | 231 | `f8ff19a0374febd50d4f18bf3a7b6a2c1b08f00e80311774fb75c5f0cfb25ff4` |
| `docs/mon-hoc/hk3/comp1016.md` | 211 | `83f677ae14ad5f6c4a2b3be779d26159071bc0bc71f0ec716e73daf3d6329e5c` |
| `docs/mon-hoc/hk3/comp1018.md` | 211 | `e4fe5f6fc8641f48c112b28a737131be984ae1c5741787fc1113d95b58d67fe6` |
| `docs/mon-hoc/hk3/comp1019.md` | 211 | `f428282005ad2ed6c45a1bfecc16df18ac8b234d0d1870f8cefeb12497f4c33c` |
| `docs/mon-hoc/hk3/comp1501.md` | 211 | `309a9269036263a7371d7b66a051ed7b13dd7319a2633fcb4a84181cfeb77ccb` |
| `docs/mon-hoc/hk3/comp1701.md` | 211 | `9c792c053967717bcf2a60a34fee7567679598d5c4c783c859d6fda65fb83717` |
| `docs/mon-hoc/hk3/index.md` | 231 | `cc1e3343cf949ace1f1758a11a5194371191ec86bd7833b4389a96b573da2484` |
| `docs/mon-hoc/hk4/comp1011.md` | 211 | `3977972ac93777e5ec385168d3fd83281f82fbb240382c177de1195a4c1268a8` |
| `docs/mon-hoc/hk4/comp1015.md` | 211 | `71d0f7071a73999ad4234933e7d65980290348102378a5011e4f35a3be0a1b6f` |
| `docs/mon-hoc/hk4/comp1332.md` | 211 | `acb65763ffcaf65cc1ec68b983a59cb5061f19c4ffd8a71ac95637560d5e9049` |
| `docs/mon-hoc/hk4/comp1401.md` | 211 | `4b9070995718accda36e4ee654fab9625cd6fccb9401c0d1d12a37b8d08e925a` |
| `docs/mon-hoc/hk4/comp1829.md` | 211 | `795e8b306b997674f11a3a893b15fc6ed6294b336055bdb03c6b5f2bc9e68336` |
| `docs/mon-hoc/hk4/index.md` | 231 | `f0a678c0b6ae3a4a3a8ab89c72982a26d7a5d87415285adfb7ead83f7fbf2be2` |
| `docs/mon-hoc/hk5/comp1044.md` | 211 | `efbdf69b3be03a5c1994194cd766cb679abd86cab689698c1c228fa43f0050fb` |
| `docs/mon-hoc/hk5/comp1060.md` | 211 | `93def4c734b417927e338482974d3954c64f90b237d80617c2cf304d4460398a` |
| `docs/mon-hoc/hk5/comp1314.md` | 211 | `cdc5ea11ff329402166cc0693d5348175c246e3d9d00102908fd7f6e7516f6f7` |
| `docs/mon-hoc/hk5/index.md` | 231 | `cb21e21055a06738c0e4cdb88197a6df15402ff08c94c44e2c5f20f8b2b2fe54` |
| `docs/mon-hoc/hk6/comp1502.md` | 211 | `2d3d3c560359218f2a6476d754fbc800d1193f3383a102284058fb702cc761eb` |
| `docs/mon-hoc/hk6/comp1803.md` | 211 | `1819e87f08fe3b6cd9e066f6390b0b40946a13c5fafea13aaecae9b812c80757` |
| `docs/mon-hoc/hk6/index.md` | 231 | `6b01e3c8ff3ac70fc109aa4a74b523a338119cdc4d47af468cc1c4f217ed696d` |
| `docs/mon-hoc/hk7/comp1410.md` | 211 | `f87cd83ca0b386b5c8034212d90cd4040db6c3577d136c141739c22921d33c02` |
| `docs/mon-hoc/hk7/comp1809.md` | 211 | `1550c039ab4cacbe7d114313035faf9d11be680e72ac48f09a025f4b432d432b` |
| `docs/mon-hoc/hk7/index.md` | 231 | `4eab59eb2bec8afd6b7b368cb5827e5b838136d3a9707a9405b987af687e0a9d` |
| `docs/mon-hoc/hk7/psyc2803.md` | 211 | `06543e7eab406db5fec7af7450be1579e58f5a5e6f749e13b5e3aab2b061e408` |
| `docs/mon-hoc/hk8/comp1411.md` | 1189 | `32459bc197174669f234529bbcfb8f4849bc2e219547ecb69c91919569a3283b` |
| `docs/mon-hoc/hk8/comp1808.md` | 1162 | `0c819b61845a7df68b955fc951afd0fdba5148727284ad9a188b4ba989036245` |
| `docs/mon-hoc/hk8/index.md` | 231 | `4aa638ef15ef74e08ebc99de2f623be575376296914e315c575e1c9fade30ac4` |
| `docs/mon-hoc/index.md` | 203 | `02a18e1dd453d12e98f01efc10f73db43098ad1a2c7ff2a14d6aa5d218dc7453` |
| `docs/public/brand/logo-khoa.png` | 35138 | `deeeb6e467a6dfe0275e626f013ced42dbad8c22cec97f8cd671f95948b2a4df` |
| `docs/public/brand/logo-truong.png` | 60225 | `5e7a7bd981d79d55b847a4f3192a87098341f64f46b051abed28524cf410cdd9` |
| `docs/roadmap.md` | 7065 | `b395428623df28482b89e30d65ebef5959b8638eb13774f02f3ffb419fc9bb17` |
| `package-lock.json` | 113131 | `537426b6977f3d7cfd0ca2693bb23bde0cfd1037700167b0035e4b7d91d7596b` |
| `package.json` | 768 | `bc1314161bee95d8b321705930678cfc6b13e6795edf966c8abd960f5228dd72` |
| `playwright.config.ts` | 537 | `da022948c258a87f04b01e451911ce5402d8413c4c4847761f513f965ba84e8b` |
| `scripts/check-links.mjs` | 2892 | `06762875a366f7ed6e523525de17725974bf9b7f93db07b64e6249f513091ff7` |
| `scripts/content-preservation.mjs` | 914 | `5a2b448a300e8a4c97701e327d89dd73947f9b6d7e77d737895f1d9f03bd1328` |
| `scripts/migrate.py` | 9810 | `600a9bbe1a45e2f0407cfb364ca230cb679a31d62b4e8a553971dcc08550881f` |
| `tests/browser/portal.spec.ts` | 15254 | `22e8382c5612fa99cf3513c1a13152118eb7c8222fd5ca706b4bec227130d703` |
| `tests/catalog.test.mjs` | 7860 | `e22c509fbdff500f14fab6b4cef97436ac17e9220935485e280ca5509072decc` |
| `tsconfig.json` | 439 | `26c4fb48113e303794506f3e2f72246fd634a1611f36576cb2badd2196543327` |

## Phụ lục C — Kiểm tra artifact và phạm vi

| Kiểm tra | Giá trị |
| --- | --- |
| Tracked files tại mốc audit | 125 |
| Markdown source | 83 |
| HTML sau build | 264 |
| File output chứa path content-archive | 0 |
