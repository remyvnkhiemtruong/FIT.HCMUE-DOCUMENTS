# Thành phần có thể tái sử dụng

Mốc source: `233575eed1caacf55e2a8e9baf6aa4ee587a0db0`, 21/10/2026. Đây là đánh giá port, chưa sao chép hoặc sửa component. Mọi đường dẫn dưới đây tính từ repository root.

| Thành phần / source | Có thể giữ | Thay đổi cần thiết cho Nuxt | Kiểm tra bảo toàn |
| --- | --- | --- | --- |
| `docs/.vitepress/data/catalog.mts` | Identifier, quan hệ, metadata nguồn/trạng thái; normalize, cohortYear semantics | Tách DTO/domain khỏi mảng hardcode; data repository ở server; cấu hình năm học | 155/217/32/3/4 records, FK, raw strings, false verified |
| `docs/.vitepress/data/filtering.mts` | Quy tắc same-placement, normalize và phối hợp bộ lọc | Tách pure predicate hoặc chuyển thành query có validation, phân trang, publish policy | Các test Node tìm không dấu, ngành+kỳ, môn+loại+năm |
| `docs/.vitepress/theme/useFilters.ts` | Query contract, defaults/reset, bảo toàn query khác/hash | Dùng Nuxt route/router thay browser globals; đọc SSR query, navigation/back/forward; tránh watch loop | Reload, shared URL, invalid values, query lặp, SSR |
| `HomePortal.vue` | Form GET q/major/term, hiện môn thật có học liệu, empty semantics | withBase → adapter routing; dữ liệu API thay import catalog | Home form đến kết quả, keyboard/mobile |
| `MajorDirectory.vue` | Danh sách ngành và nhãn mã ngành | Props/data từ API; NuxtLink/base path | Ba ngành, đúng URL |
| `CohortSelector.vue` | Bối cảnh khóa/năm thứ, thông báo chương trình chưa xác minh | Query composable và API program-version mapping | Không tự lọc học kỳ theo năm thứ |
| `CohortOverview.vue` | Niên khóa và cảnh báo xác minh | Props hợp lệ, xử lý cohort không tồn tại | K49–K52, empty state |
| `CatalogBrowser.vue` | Form accessible, 15 items, empty state, pagination, nhãn placement | Server query + typed response; loading/error/cancellation; giữ filter semantics | Không dấu, URL restore, type/year/major, responsive |
| `LessonContext.vue` | Breadcrumb, source note, cảnh báo mã môn | useData/frontmatter → props/async data; metadata cảnh báo thay if code hardcode | Đúng course/resourceId và nguồn |
| `Quiz.vue` | Radio form, khóa sau nộp, score/reset và accessibility | Props typed thay VitePress loader; HTML đã sanitize; với bài đánh giá cần chấm server và không gửi answer sớm | 10 câu, 4 options, toán, submit thiếu, reset |
| `docs/.vitepress/data/quiz.data.ts` | Ý tưởng render toán trước, data lazy-load | Thay createMarkdownRenderer VitePress bằng pipeline kiểm soát; không đưa renderer build dependency vào browser | Đúng TeX/HTML, lựa chọn văn bản có dấu, mixed prose/numbers |
| `LearningChecklist.vue` | Stable task key, storage fallback, tổng/hoàn thành/reset | Viết UI reactive theo task data; bỏ phụ thuộc .vp-doc và relativePath; đồng bộ server sau; giữ import localStorage có chủ đích | 28 key đúng thứ tự, lưu cũ, storage bị chặn, quay lại trang |
| `LegacyRedirect.vue` | Internal-target guard, query ưu tiên target, giữ fragment, fallback link | Alias/route resolver Nitro và anchor mapping; xem xét HTTP redirect/canonical sau đánh giá lịch sử | 77 routes, .html/clean/index variants, query/hash, no JS |
| `BrandIdentity.vue` | Hai logo gốc, alt/ratio/no inversion, text | withBase → public asset path adapter | Hai ảnh load đúng, dark/light, tỷ lệ |
| `ThemeToggle.vue` | Role switch, keyboard, aria state sau mount | useData.isDark/icon classes → theme composable và icon độc lập | System preference, Enter/Space, reload/navigation, SSR |
| `docs/.vitepress/theme/index.ts` | Ý tưởng lazy component, bố cục context/checklist | Không dùng DefaultTheme, VitePress globals hoặc hydration gate nguyên trạng; tạo Nuxt layout | Slow navigation, hydration mismatch regression |
| `docs/.vitepress/theme/custom.css` | Brand tokens, focus 3px, light/dark/print/reduced-motion, math overflow | Tách token của sản phẩm; viết lại selector .VP* và !important theo layout Nuxt | 360/768/1280/1440, contrast/focus, print |
| `docs/.vitepress/page-content.mts` | Quy tắc nhóm kind, trước/sau, trạng thái trống, nguồn placement | Template Vue/SSR thay nối Markdown từ input động; extract goals/notes metadata | Title khớp H1, per-major credits/requirement, thứ tự |
| Hai `*.paths.ts` trong docs | Công thức sinh route và không nhân bản môn theo ngành | Nuxt dynamic routes + API; giữ toàn bộ path hiện hữu | 155 canonical course + 27 program/term routes |
| Corpus Markdown | Bài, công thức, code, đề tự luận, links, explicit anchors | Render extensions tương thích và an toàn; không compile component/script do contributor gửi | SHA fixtures, protectedContent/numericData/examQuestions, anchors |
| `scripts/content-preservation.mjs` | Token/code/math/numeric/exam regression checks | Giữ làm fixture/read-only gate; bổ sung parser khi có nhu cầu | Mutation tests hiện có vẫn bắt đổi toán/code/đề |
| `scripts/check-links.mjs` | Ý tưởng crawl output và so legacy ledger/anchors | Thêm crawler HTTP Nuxt, final redirect target+hash, variant routes; không dùng làm XSS scanner | Internal link/asset, base, route và anchor |
| `tests/catalog.test.mjs` | Domain invariants và fixture gốc | Port sang Vitest khi được giao, bỏ Function với input không tin cậy | 14 kiểm tra baseline |
| `tests/browser/portal.spec.ts` | Luồng học/quiz/checklist/search, accessibility checks | Thay selector layout và endpoint; tiếp tục test legacy riêng | 20 bài hiện tại và regression mới khi triển khai |

## Những gì không nên chuyển nguyên trạng

`scripts/migrate.py` là script một lần và chỉ được đọc trong audit. `content-archive/original-pages.json` là fixture gốc, không phải nội dung upload hay payload API công khai. Không biến `status: available` thành approved, không biến `verified: false` thành license hoặc tự xem chương trình là chính thức. Không tái sử dụng quiz client scoring cho bài thi cần giữ bí mật đáp án. Không mang mảng catalog/static search index có nội dung riêng tư vào browser bundle.

## Ranh giới port được đề xuất

Giữ logic thuần và identifier contract trước; dựng adapter route/data/render/theme sau; thay cơ chế lưu trữ cuối khi module được giao. Không cần viết lại nội dung toán để đổi framework. Các thư viện Nuxt/ORM/auth/render ở nền tảng mới cần kiểm chứng riêng trước chọn phiên bản; bước này chưa có kết luận tương thích đã thử nghiệm.
