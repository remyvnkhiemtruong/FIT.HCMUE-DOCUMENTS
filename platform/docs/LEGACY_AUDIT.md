# BƯỚC 00 — Kiểm kê FIT HCMUE Learning Hub

Ngày kiểm kê: 21/10/2026 (Asia/Bangkok). Source: checkout cục bộ của `https://github.com/remyvnkhiemtruong/FIT.HCMUE-DOCUMENTS`, nhánh `main`, HEAD `233575eed1caacf55e2a8e9baf6aa4ee587a0db0`. Không fetch nên không khẳng định checkout bằng HEAD hiện tại trên GitHub. Git status đầu phiên sạch. Không tìm thấy AGENTS.md trong cây repository hoặc các thư mục tổ tiên đã kiểm tra.

## 1. Phạm vi và bằng chứng

Đã đọc README, package/lockfile, cấu hình TypeScript/Playwright/VitePress, toàn bộ module TS/MTS/Vue/CSS, ba scripts, hai test suites, workflow duy nhất; đọc dữ liệu JSON và quét toàn bộ Markdown/frontmatter/heading/liên kết/cấu trúc nội dung. Build thực tế và kiểm tra bảo toàn đọc toàn bộ corpus. Đây là audit phần mềm và dữ liệu, không phải xác nhận tính đúng học thuật hay quyền phân phối. Các phụ lục bên dưới sinh trực tiếp từ source và HTML của bản build này, không chép nội dung bài từ archive ra public.

| Vùng | Vai trò hiện tại |
| --- | --- |
| `docs/.vitepress/config.mts` | Base URL, Markdown math, sidebar, search, metadata, trước/sau |
| `docs/.vitepress/data/` | Danh mục chuẩn dùng chung, lọc, quiz, khóa checklist |
| `docs/.vitepress/page-content.mts` | Sinh Markdown trang môn/ngành/học kỳ |
| `docs/.vitepress/theme/` | 11 component Vue, layout hooks, CSS, đồng bộ query |
| `docs/mon-hoc/` | 34 Markdown gồm một template, index, trang cũ theo HK1–HK8 |
| `docs/chuong-trinh/` | Index, tra cứu, template và dynamic path generator |
| Bảy thư mục học liệu | Giải tích, đại số, toán rời rạc, đề thi, bài tập, công thức |
| `content-archive/` | Snapshot gốc, hash, nhật ký chuyển đổi, anchors, nghi vấn |
| `scripts/` | Kiểm tra liên kết, bảo toàn nội dung, migration một lần |
| `tests/` | 14 kiểm tra Node và 20 kiểm tra Playwright |
| `.github/workflows/deploy.yml` | Kiểm tra và xuất bản riêng VitePress |

Có 83 tệp Markdown trong docs, trong đó hai template trở thành 155 trang môn và 27 trang ngành/học kỳ; 81 trang Markdown còn lại + 182 trang sinh + 404 = 264 HTML. Không có ứng dụng Nuxt, API, database, tài khoản, RBAC, S3, Docker hay backend quản trị trong source hiện tại.

## 2. Mô hình dữ liệu hiện hành

Nguồn: `docs/.vitepress/data/catalog.mts`.

| Đối tượng | Số lượng | Trường phải giữ |
| --- | ---: | --- |
| Major | 3 | id, short, name, code, version, verified |
| Course | 155 | code, name, description, path |
| Placement | 217 | major, version, course, term, credits, requirement, source, verified |
| Resource | 32 | id, course, kind, section, title, order, path, source, status, verified, year nếu có |
| Cohort | 4 | id, startYear, programs, verified |

- Ngành: `cntt`/7480201 (84 placements), `sp-tin`/7140210 (60), `cngd`/7140103 (73). Mỗi ngành có đủ tám học kỳ.
- Phiên bản duy nhất đang dùng: `du-lieu-hien-co`, nằm trong Major và Placement, chưa có entity phiên bản độc lập.
- K52/2026, K51/2025, K50/2024, K49/2023 đều ánh xạ ba ngành về phiên bản trên. `academicYear = 2026`; năm thứ = academicYear − startYear + 1. Chọn khóa chỉ hiển thị bối cảnh, không lọc chương trình hay suy học kỳ.
- 3 ngành, 217 placements, 32 resources và 4 khóa đều `verified: false`. Không tự nâng thành dữ liệu chính thức khi import.
- Nguồn placements: 83 từ `khoa/nganh-cntt.md`, 59 từ `khoa/nganh-sp-tin.md`, 71 từ `khoa/nganh-cngd.md`, 4 từ `khoa/tra-cuu-hoc-phan.md`. Những trang hiện tại đã là chuyển tiếp; bảng gốc để đối chiếu nằm trong snapshot archive.
- 125 `Bắt buộc`, 90 `Tự chọn`, một `Tự chọn/Bắt buộc`, một `Bắt buộc/Tự chọn`. Hai chuỗi cuối không được tự ép thành boolean.
- 20 resources thuộc COMP1800, 12 thuộc COMP1801; 153 môn chưa có học liệu. Có 18 lý thuyết, 2 bài tập, 9 đề thi, 1 trắc nghiệm, 2 công thức. Tất cả `status: available`, nguồn cùng mô tả chưa đối chiếu độc lập. `available` biểu thị có nội dung, không biểu thị đã xác minh hay được cấp quyền.
- Tín chỉ, học kỳ, loại học phần thuộc placement; cùng môn có thể khác theo ngành. Khóa ghép đang kiểm tra: major/version/course/term.
- Mã không đồng nhất độ dài (ví dụ PHYL2, PHYL3, DOMS0); không áp regex chỉ cho COMP bốn chữ số. Có tên Unicode dạng dấu tổ hợp, cần bảo toàn chuỗi và xử lý tìm kiếm riêng.

## 3. Hành vi cần giữ

### Điều hướng, tra cứu và tìm kiếm

`config.mts` đặt `/FIT.HCMUE-DOCUMENTS/`, `cleanUrls: true`, ngôn ngữ vi-VN và `noindex, nofollow`. Sidebar sinh theo danh mục. `transformPageData` thêm resourceId/course/title và trước/sau theo `order` trong cùng môn; chuỗi này đi xuyên loại tài liệu. Tắt prefetch để giảm tải bài toán dài. Sidebar học liệu đang gắn theo thư mục cấp một; tương lai thêm nhiều môn cùng thư mục có thể bị ghi đè context.

Hai cơ chế tìm kiếm riêng: VitePress local full-text/MiniSearch và bộ lọc danh mục theo code/name/title. Cả hai chuẩn hóa NFD, bỏ combining marks, đ/Đ → d/D, lowercase và trim; có duplication thuật toán trong config vì hàm search được serialize. `matchesPlacement` bảo đảm ngành và kỳ cùng khớp một placement. Query contract: `q`, `major`, `term`, `cohort`, `course`, `kind`, `year`, `status`, `page`; 15 kết quả/trang. `useFilters` đọc khi mount/popstate, dùng replaceState nên không tạo một history entry cho mỗi lần gõ, giữ query ngoài defaults và fragment. Resource filter chưa áp status; cohort chỉ phục vụ lời chú thích. Các filter không hỗ trợ fuzzy/token ranking như full-text search.

### Học liệu, toán và đề thi

83 Markdown dùng YAML frontmatter, heading, bảng, liên kết, code fences, HTML nội tuyến, `<span id>`, `{#custom-id}`, containers `::: tip/warning/danger/info/details` và các component Vue. Hai template dùng `<!-- @content -->`. Không thể coi corpus là Markdown thuần rồi bỏ extension.

Công thức dùng `$...$` và `$$...$$`, có môi trường LaTeX như pmatrix/vmatrix/cases, lệnh fraction/limit/sum và ký hiệu Unicode. `markdown.math` dựng MathJax SVG với `fontCache: local`; không tải engine MathJax phía trình duyệt. Script bảo toàn nhận thêm `\\(...\\)` và `\\[...\\]`; việc regex hỗ trợ không có nghĩa mọi cú pháp đều xuất hiện trong corpus. Phụ lục BASELINE thống kê token thật. Không đổi dấu gạch chéo, whitespace công thức hoặc code trong migration nếu chưa có đối chiếu.

Đề tự luận vẫn là Markdown: thông tin môn/năm/thời gian; phần đề bài H2; câu H3, tiểu mục danh sách, công thức và điểm; phần lời giải trong details. `examQuestions()` so nguyên văn block đề bài giữa hai H2 theo các tên cũ/mới. Không có schema câu hỏi tự luận trong database hay parser cấu trúc tin cậy.

### Quiz

`quiz.json`: 10 câu, id số 1–10; mỗi câu có question, options[{id,text}], answer, explanation; bốn lựa chọn A–D, một đáp án đúng. Chuỗi JSON escape `\\` để lưu backslash LaTeX. `quiz.data.ts` dùng VitePress Markdown renderer để tạo questionHtml/explanationHtml/options.html; lựa chọn chưa có `$` và không có chữ có dấu được bọc toán tự động. Đây là heuristic, không phải kiểu dữ liệu chuẩn cho nội dung đóng góp mới.

`Quiz.vue` lazy-load, đợi mount, cho nộp chưa đủ, khóa lựa chọn sau nộp, hiện đáp án/lời giải, tính đúng/tổng và điểm thang 10, hỗ trợ làm lại. Không lưu attempt, không có giới hạn thời gian. Đáp án nằm trong dữ liệu tải về client: phù hợp ôn tập hiện tại; không dùng nguyên cơ chế này để chấm thi có tính bảo mật.

### Checklist

`roadmap.md` có 28 task, mỗi task có `data-task-key`. Khóa localStorage là `fit-hcmue:roadmap:v1`, giá trị object `{[taskKey]: boolean}`; hash dự phòng FNV-style 32 bit base36 từ text. Component chỉ chạy khi relativePath là roadmap.md, tìm text đầu li dạng `[ ]`, chèn checkbox, phục hồi/lưu và reset. Có xử lý storage bị chặn và dọn listener. Không có user identity hoặc đồng bộ thiết bị. Chuyển domain/origin sẽ không tự đọc được localStorage cũ; cần phương án chuyển tiến độ do người dùng chủ động ở bước sau.

## 4. Archive, routes và anchors

`original-pages.json`: 77 nội dung trang gốc; `migration.json`: 77 mục path/hash/action/target. Phân loại: 36 redirect, 32 retained, 4 cohort-overview, 2 retained-with-warning, 1 new-home, 1 corrected, 1 quiz-component. Hash snapshot được kiểm tra bằng SHA-256. Không sửa snapshot để vượt kiểm tra.

`editorial-anchors.json` có 83 khóa trang, 387 ID ghi nhận trước biên tập; có khóa template, được check-links bỏ qua. Đây là mốc trước biên tập văn phong, không phải danh sách toàn bộ anchor từng có trong snapshot gốc. Audit liệt kê cả manifest và heading/span ID thực tế sau build bên dưới.

Redirect hiện là component client-side và link dự phòng, không phải HTTP 301/308. Target chỉ chấp nhận đường dẫn nội bộ không bắt đầu `//`. Query target có ưu tiên; query nguồn được chép bằng set nếu chưa có key, nên query key lặp không được giữ đầy đủ. Fragment nguồn được giữ nguyên nhưng không có bản đồ đổi anchor. Vì vậy fragment từ trang gốc sang trang đích mới vẫn có nguy cơ không tồn tại; test hiện tại chưa chứng minh mọi anchor của 77 snapshot cũ hoạt động tại đích. Không coi check-links PASS là bảo đảm toàn bộ liên kết ngoài lịch sử còn đúng.

`content-archive` nằm ngoài docs và artifact workflow chỉ trỏ dist. Bước này không xuất bản archive hoặc tái phân phối bài học. Repo có archive để tra cứu không có nghĩa tài liệu đã có giấy phép công khai.

## 5. Technical debt và giới hạn

| Mã | Phát hiện từ source | Hệ quả |
| --- | --- | --- |
| D01 | Academic year, tám kỳ, ba ngành, goals hai môn, cảnh báo COMP1801, URL Issues hardcode nhiều nơi | Cần cấu hình và metadata khi mở rộng; không sửa trong bước 00 |
| D02 | Chuỗi kind/status/requirement dùng string; nhiều find(...)!; sidebar Record<string, any> | Thiếu validation runtime khi dữ liệu đi từ API |
| D03 | Filter/status/count/lookup lặp nhiều lần trên array, import toàn catalog vào UI | Đủ cho 155 môn nhưng cần query phân trang/index khi dữ liệu lớn |
| D04 | Markdown generator nối thẳng title/source/name thành bảng/link; Vue v-html nhận HTML renderer | Dữ liệu repo đang được tin cậy; không tái dùng trực tiếp với input người dùng |
| D05 | CSS nhiều !important và selector nội bộ .VP*, icon vpi-* | Coupling với VitePress; Nuxt cần layout/style adapter |
| D06 | Layout có hydration gate; checklist sửa DOM; useFilters truy cập location | Cần SSR-safe port, lifecycle/route tests; không chép router hook sang Nuxt |
| D07 | Build có chunk warning >500 kB | SVG toán và module trang dài; giữ tối ưu lazy-load và kiểm tra kích thước |
| D08 | Test dùng Function() để đọc literal quiz từ archive; migrate.py chạy Node trên dữ liệu trích xuất | Chỉ phù hợp fixture được kiểm soát, không phải parser cho upload; tuyệt đối không chạy migration cũ |
| D09 | check-links chỉ kiểm internal href/src dạng double quotes; bỏ URL external/javascript, kiểm anchor bằng chuỗi | Không phải security scanner hay kiểm toàn bộ remote links/redirect đích |
| D10 | Workflow chạy khi push main hoặc manual, chưa có pull_request; actions theo tag; quyền Pages ở cấp workflow | Chưa có kiểm tra PR và tách quyền build/deploy cho platform |
| D11 | Chưa có lint script/config, coverage threshold, DB/API/security tests | Không thể báo lint hay kiểm backend PASS |

Chưa thấy secret/mật khẩu hardcode qua kiểm tra các tệp text tracked và các điểm nhạy cảm; không kết luận đã kiểm sạch lịch sử Git, dependency CVE hay cấu hình production. Không có endpoint upload/auth nên chưa có lỗi upload/auth đang khai thác được để xác nhận. Nguy cơ XSS từ v-html/HTML/Markdown là ranh giới tin cậy phải giải quyết trước đóng góp động, chưa phải bằng chứng có stored XSS đang được khai thác. `robots noindex` không phải kiểm soát truy cập.

Chưa hoàn thiện theo mục tiêu V1: auth/session/RBAC, upload riêng tư, đóng góp–phản biện–duyệt, bookmark, lưu attempt/checklist theo người dùng, quản trị/thống kê/versioning. Nút đóng góp hiện dẫn GitHub Issues; các trang môn trống hiển thị đúng trạng thái, không phải lỗi mất học liệu.

## 6. Kiến trúc sơ bộ đề xuất — chưa triển khai

Đề xuất dưới đây suy ra từ nhu cầu và ranh giới source đã kiểm tra; không phải khẳng định repository đã có các thành phần này. Chưa chọn phiên bản Nuxt, Prisma hay thư viện auth; phải xác minh tài liệu chính thức, tình trạng hỗ trợ và tính tương thích trước khi cài ở bước được giao.

```text
platform/
  app/                  Nuxt Vue UI, layouts, pages, composables
  server/api/           Nitro handlers mỏng, validation + session + policy
  server/modules/       catalog, learning-content, moderation, identity,
                        learning-progress, storage, reporting
  server/infrastructure/ PostgreSQL repositories, storage adapter, render/cache
  shared/               DTO, identifier contracts, pure normalization
  prisma/               chỉ tạo nếu ORM được xác minh và chấp thuận
  tests/                Vitest domain/integration, Playwright luồng người dùng
  docs/                 audit và quyết định kiến trúc
```

Modular monolith, một ứng dụng triển khai; handler gọi application service rồi repository; policy backend kiểm vai trò và phạm vi khoa/trường ở từng thao tác. Không để UI import ORM, secrets hay answer key của bài đánh giá hạn chế. Giữ docs VitePress độc lập trong suốt phát triển song song. GitHub Pages chỉ phục vụ legacy tĩnh; ứng dụng server/PostgreSQL cần môi trường chạy riêng sau này.

Mô hình dữ liệu dự kiến:

- Organization (trường/khoa), User, Membership/RoleAssignment có scope, Session server-side. Membership cho phép mở rộng phạm vi mà không nhân bản Course theo ngành.
- Major → ProgramVersion → Placement → Course; CohortProgram liên kết Cohort với từng phiên bản/ngành. Giữ credits/requirement/source/verified ở placement; lưu rawRequirement và evidence cho hai giá trị mơ hồ. Giữ code/slug/id cũ làm external key cùng unique constraint; không phát minh khóa học chính thức.
- Resource → ResourceRevision bất biến (Markdown gốc, hash, metadata nguồn/quyền, tác giả, rendererVersion), PublishedRevision pointer; Attachment có object key, checksum, trạng thái scan và visibility. AnchorAlias/LegacyRoute lưu đường dẫn và alias, không chỉ redirect text.
- Contribution/Review/ModerationEvent: draft → submitted → under_review → changes_requested hoặc reviewed → approved → published; rejected/withdrawn khi cần. Đây là state machine đề xuất; phản biện và duyệt tách nhau, transaction kiểm transition, revision hiện hành và quyền backend. Không tự publish sau scan upload hay sau ý kiến giảng viên.
- Quiz/Question/Option giữ legacy ID trong scope quiz; QuizRevision/Attempt/AttemptAnswer khi được giao. Checklist/Task giữ legacyTaskKey; TaskProgress unique user/task; Bookmark unique user/resource. AuditEvent ghi actor/action/entity/revision/time, tránh log secrets.
- Nguồn và quyền phân phối tách `verified` khỏi permissionToPublish; chỉ bản đã duyệt và có quyền mới vào API public/search/index. Không import nguyên archive vào bảng public.

PostgreSQL giữ quan hệ, constraints và transaction duyệt/xuất bản. Có thể bắt đầu tìm kiếm bằng trường normalized và index trong PostgreSQL; giữ chuẩn hóa tiếng Việt đã kiểm thử, full-text cần đánh giá với bộ query thật. Chưa cần search service riêng. Prisma chỉ là ứng viên: đánh giá mapping composite keys, migration không phá dữ liệu, transaction, index/extension cần SQL và tương thích Node/Nitro trước quyết định.

Auth cần thư viện còn được bảo trì được xác minh sau, password hashing tiêu chuẩn, opaque session ở server, cookie HttpOnly/Secure/SameSite, CSRF/Origin check cho mutation, rate limit và session revoke. Storage S3-compatible dùng bucket riêng tư, giới hạn size/loại thực tế, tên object do server cấp, quarantine/scan; API cấp URL đọc có thời hạn sau kiểm quyền. Giữ Markdown/MathJax render ở server với allowlist HTML/SVG/protocol và cache theo content hash, không compile Vue/script người dùng gửi.

API dự kiến theo module: catalog (ngành/chương trình/môn/học liệu), content/read, contributions/reviews/publication, auth, bookmarks/progress, admin/reporting. Đây chỉ là ranh giới thiết kế, không tạo endpoint/schema ở bước 00. Cache chỉ public published data; dữ liệu riêng tư không chia sẻ cache public. Docker Compose cho dev PostgreSQL/storage về sau, CI platform tách khỏi legacy, health check/backup/restore rehearsal trước production.

## 7. Điều kiện chuyển bước

Đã hoàn thành kiểm kê và chạy baseline; xem kết quả thật trong BASELINE và biện pháp trong MIGRATION_RISKS. Bước 01 nên chỉ khởi tạo nền tảng song song theo phạm vi người dùng giao, chốt runtime/ORM/auth bằng ADR và giữ legacy checks. Chưa tạo database, API, migration, cài package, đổi deploy hoặc commit. Dừng sau bước 00 để review.

<!-- INVENTORY_APPENDIX -->

## Phụ lục A — Toàn bộ 77 đường dẫn gốc

Mọi path dưới đây nằm sau base `/FIT.HCMUE-DOCUMENTS/`. .md tương ứng nguồn; URL clean và .html cần tiếp tục được hỗ trợ. Hash nội dung gốc có trong migration.json và được test 14/14 đối chiếu.

| Nguồn | URL clean | Action | Target |
| --- | --- | --- | --- |
| `index.md` | `/` | new-home | Giữ route/nội dung hoặc component hiện tại |
| `roadmap.md` | `/roadmap` | corrected | Giữ route/nội dung hoặc component hiện tại |
| `algebra/01-ma-tran-va-dinh-thuc.md` | `/algebra/01-ma-tran-va-dinh-thuc` | retained | Giữ route/nội dung hoặc component hiện tại |
| `algebra/02-he-phuong-trinh-tuyen-tinh.md` | `/algebra/02-he-phuong-trinh-tuyen-tinh` | retained | Giữ route/nội dung hoặc component hiện tại |
| `algebra/03-khong-gian-vecto.md` | `/algebra/03-khong-gian-vecto` | retained | Giữ route/nội dung hoặc component hiện tại |
| `algebra/04-khong-gian-euclide.md` | `/algebra/04-khong-gian-euclide` | retained | Giữ route/nội dung hoặc component hiện tại |
| `algebra/05-anh-xa-tuyen-tinh-cheo-hoa.md` | `/algebra/05-anh-xa-tuyen-tinh-cheo-hoa` | retained | Giữ route/nội dung hoặc component hiện tại |
| `algebra/06-dang-toan-phuong.md` | `/algebra/06-dang-toan-phuong` | retained | Giữ route/nội dung hoặc component hiện tại |
| `calculus/01-gioi-han-day-va-ham.md` | `/calculus/01-gioi-han-day-va-ham` | retained | Giữ route/nội dung hoặc component hiện tại |
| `calculus/02-dao-ham-vi-phan-taylor.md` | `/calculus/02-dao-ham-vi-phan-taylor` | retained | Giữ route/nội dung hoặc component hiện tại |
| `calculus/03-tich-phan-va-ung-dung.md` | `/calculus/03-tich-phan-va-ung-dung` | retained | Giữ route/nội dung hoặc component hiện tại |
| `calculus/04-tich-phan-suy-rong.md` | `/calculus/04-tich-phan-suy-rong` | retained | Giữ route/nội dung hoặc component hiện tại |
| `calculus/05-ly-thuyet-chuoi.md` | `/calculus/05-ly-thuyet-chuoi` | retained | Giữ route/nội dung hoặc component hiện tại |
| `cheatsheet/cong-thuc-nhanh.md` | `/cheatsheet/cong-thuc-nhanh` | retained | Giữ route/nội dung hoặc component hiện tại |
| `cheatsheet/kien-thuc-thpt.md` | `/cheatsheet/kien-thuc-thpt` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-1-logic-menh-de.md` | `/discrete-math/buoi-1-logic-menh-de` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-2-vi-tu-quy-nap.md` | `/discrete-math/buoi-2-vi-tu-quy-nap` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-3-tap-hop-anh-xa.md` | `/discrete-math/buoi-3-tap-hop-anh-xa` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-4-quan-he-dai-so-boole.md` | `/discrete-math/buoi-4-quan-he-dai-so-boole` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-5-to-hop-dem.md` | `/discrete-math/buoi-5-to-hop-dem` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-6-he-thuc-truy-hoi.md` | `/discrete-math/buoi-6-he-thuc-truy-hoi` | retained | Giữ route/nội dung hoặc component hiện tại |
| `discrete-math/buoi-7-ly-thuyet-do-thi.md` | `/discrete-math/buoi-7-ly-thuyet-do-thi` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams/de-2022-2023.md` | `/exams/de-2022-2023` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams/de-2023-2024.md` | `/exams/de-2023-2024` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams/de-2024-2025.md` | `/exams/de-2024-2025` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams/de-tham-khao-co-dap-an.md` | `/exams/de-tham-khao-co-dap-an` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams/quiz-giua-ky.md` | `/exams/quiz-giua-ky` | quiz-component | Giữ route/nội dung hoặc component hiện tại |
| `exams-discrete/gk-2022-2023.md` | `/exams-discrete/gk-2022-2023` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams-discrete/gk-2023-2024.md` | `/exams-discrete/gk-2023-2024` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams-discrete/kthp-2022-2023.md` | `/exams-discrete/kthp-2022-2023` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams-discrete/kthp-2023-2024.md` | `/exams-discrete/kthp-2023-2024` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exams-discrete/kthp-2024-2025.md` | `/exams-discrete/kthp-2024-2025` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exercises/algebra.md` | `/exercises/algebra` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exercises/calculus.md` | `/exercises/calculus` | retained | Giữ route/nội dung hoặc component hiện tại |
| `exercises/index.md` | `/exercises/` | retained | Giữ route/nội dung hoặc component hiện tại |
| `khoa/index.md` | `/khoa/` | redirect | `/chuong-trinh/` |
| `khoa/khoa-49.md` | `/khoa/khoa-49` | cohort-overview | Giữ route/nội dung hoặc component hiện tại |
| `khoa/khoa-50.md` | `/khoa/khoa-50` | cohort-overview | Giữ route/nội dung hoặc component hiện tại |
| `khoa/khoa-51.md` | `/khoa/khoa-51` | cohort-overview | Giữ route/nội dung hoặc component hiện tại |
| `khoa/khoa-52.md` | `/khoa/khoa-52` | cohort-overview | Giữ route/nội dung hoặc component hiện tại |
| `khoa/nganh-cngd.md` | `/khoa/nganh-cngd` | redirect | `/chuong-trinh/cngd/` |
| `khoa/nganh-cntt.md` | `/khoa/nganh-cntt` | redirect | `/chuong-trinh/cntt/` |
| `khoa/nganh-sp-tin.md` | `/khoa/nganh-sp-tin` | redirect | `/chuong-trinh/sp-tin/` |
| `khoa/tra-cuu-hoc-phan.md` | `/khoa/tra-cuu-hoc-phan` | redirect | `/chuong-trinh/tra-cuu` |
| `mon-hoc/index.md` | `/mon-hoc/` | redirect | `/chuong-trinh/` |
| `mon-hoc/hk1/comp1010.md` | `/mon-hoc/hk1/comp1010` | redirect | `/mon-hoc/comp1010/` |
| `mon-hoc/hk1/comp1802.md` | `/mon-hoc/hk1/comp1802` | redirect | `/mon-hoc/comp1802/` |
| `mon-hoc/hk1/index.md` | `/mon-hoc/hk1/` | redirect | `/chuong-trinh/tra-cuu?term=1` |
| `mon-hoc/hk2/comp1013.md` | `/mon-hoc/hk2/comp1013` | redirect | `/mon-hoc/comp1013/` |
| `mon-hoc/hk2/comp1017.md` | `/mon-hoc/hk2/comp1017` | redirect | `/mon-hoc/comp1017/` |
| `mon-hoc/hk2/index.md` | `/mon-hoc/hk2/` | redirect | `/chuong-trinh/tra-cuu?term=2` |
| `mon-hoc/hk3/comp1016.md` | `/mon-hoc/hk3/comp1016` | redirect | `/mon-hoc/comp1016/` |
| `mon-hoc/hk3/comp1018.md` | `/mon-hoc/hk3/comp1018` | redirect | `/mon-hoc/comp1018/` |
| `mon-hoc/hk3/comp1019.md` | `/mon-hoc/hk3/comp1019` | redirect | `/mon-hoc/comp1019/` |
| `mon-hoc/hk3/comp1501.md` | `/mon-hoc/hk3/comp1501` | redirect | `/mon-hoc/comp1501/` |
| `mon-hoc/hk3/comp1701.md` | `/mon-hoc/hk3/comp1701` | redirect | `/mon-hoc/comp1701/` |
| `mon-hoc/hk3/index.md` | `/mon-hoc/hk3/` | redirect | `/chuong-trinh/tra-cuu?term=3` |
| `mon-hoc/hk4/comp1011.md` | `/mon-hoc/hk4/comp1011` | redirect | `/mon-hoc/comp1011/` |
| `mon-hoc/hk4/comp1015.md` | `/mon-hoc/hk4/comp1015` | redirect | `/mon-hoc/comp1015/` |
| `mon-hoc/hk4/comp1332.md` | `/mon-hoc/hk4/comp1332` | redirect | `/mon-hoc/comp1332/` |
| `mon-hoc/hk4/comp1401.md` | `/mon-hoc/hk4/comp1401` | redirect | `/mon-hoc/comp1401/` |
| `mon-hoc/hk4/comp1829.md` | `/mon-hoc/hk4/comp1829` | redirect | `/mon-hoc/comp1829/` |
| `mon-hoc/hk4/index.md` | `/mon-hoc/hk4/` | redirect | `/chuong-trinh/tra-cuu?term=4` |
| `mon-hoc/hk5/comp1044.md` | `/mon-hoc/hk5/comp1044` | redirect | `/mon-hoc/comp1044/` |
| `mon-hoc/hk5/comp1060.md` | `/mon-hoc/hk5/comp1060` | redirect | `/mon-hoc/comp1060/` |
| `mon-hoc/hk5/comp1314.md` | `/mon-hoc/hk5/comp1314` | redirect | `/mon-hoc/comp1314/` |
| `mon-hoc/hk5/index.md` | `/mon-hoc/hk5/` | redirect | `/chuong-trinh/tra-cuu?term=5` |
| `mon-hoc/hk6/comp1502.md` | `/mon-hoc/hk6/comp1502` | redirect | `/mon-hoc/comp1502/` |
| `mon-hoc/hk6/comp1803.md` | `/mon-hoc/hk6/comp1803` | redirect | `/mon-hoc/comp1803/` |
| `mon-hoc/hk6/index.md` | `/mon-hoc/hk6/` | redirect | `/chuong-trinh/tra-cuu?term=6` |
| `mon-hoc/hk7/comp1410.md` | `/mon-hoc/hk7/comp1410` | redirect | `/mon-hoc/comp1410/` |
| `mon-hoc/hk7/comp1809.md` | `/mon-hoc/hk7/comp1809` | redirect | `/mon-hoc/comp1809/` |
| `mon-hoc/hk7/index.md` | `/mon-hoc/hk7/` | redirect | `/chuong-trinh/tra-cuu?term=7` |
| `mon-hoc/hk7/psyc2803.md` | `/mon-hoc/hk7/psyc2803` | redirect | `/mon-hoc/psyc2803/` |
| `mon-hoc/hk8/comp1411.md` | `/mon-hoc/hk8/comp1411` | retained-with-warning | Giữ route/nội dung hoặc component hiện tại |
| `mon-hoc/hk8/comp1808.md` | `/mon-hoc/hk8/comp1808` | retained-with-warning | Giữ route/nội dung hoặc component hiện tại |
| `mon-hoc/hk8/index.md` | `/mon-hoc/hk8/` | redirect | `/chuong-trinh/tra-cuu?term=8` |

## Phụ lục B — 155 môn và đường dẫn canonical

| Code | Tên | Path | Số học liệu |
| --- | --- | --- | --- |
| COMP1010 | Lập trình cơ bản | `/mon-hoc/comp1010/` | 0 |
| COMP1800 | Cơ sở toán trong công nghệ thông tin | `/mon-hoc/comp1800/` | 20 |
| COMP1801 | Toán rời rạc và ứng dụng | `/mon-hoc/comp1801/` | 12 |
| COMP1802 | Thiết kế web | `/mon-hoc/comp1802/` | 0 |
| EDTE1840 | Nhập môn công nghệ giáo dục | `/mon-hoc/edte1840/` | 0 |
| TECH1802 | Cơ sở vật lí | `/mon-hoc/tech1802/` | 0 |
| MILI2701 | Đường lối quốc phòng và an ninh của ĐCSVN | `/mon-hoc/mili2701/` | 0 |
| POLI1903 | Pháp luật đại cương | `/mon-hoc/poli1903/` | 0 |
| POLI2001 | Triết học Mác – Lênin | `/mon-hoc/poli2001/` | 0 |
| PSYC1001 | Tâm lý học đại cương | `/mon-hoc/psyc1001/` | 0 |
| PHYL2401 | Giáo dục thể chất 1 (thể dục - điền kinh) | `/mon-hoc/phyl2401/` | 0 |
| COMP1013 | Lập trình nâng cao | `/mon-hoc/comp1013/` | 0 |
| COMP1017 | Lập trình hướng đối tượng | `/mon-hoc/comp1017/` | 0 |
| COMP1827 | Xác suất thống kê và ứng dụng trong giáo dục | `/mon-hoc/comp1827/` | 0 |
| MATH1703 | Xác suất thống kê | `/mon-hoc/math1703/` | 0 |
| EDTE1841 | Giáo dục học đại cương | `/mon-hoc/edte1841/` | 0 |
| PSYC2802 | Tâm lý học giáo dục | `/mon-hoc/psyc2802/` | 0 |
| PSYC2804 | Phương pháp nghiên cứu khoa học | `/mon-hoc/psyc2804/` | 0 |
| COMP1810 | Trí tuệ nhân tạo trong giáo dục | `/mon-hoc/comp1810/` | 0 |
| COMP1812 | Trí tuệ nhân tạo và định hướng ứng dụng | `/mon-hoc/comp1812/` | 0 |
| POLI2002 | Kinh tế chính trị học Mác - Lênin | `/mon-hoc/poli2002/` | 0 |
| POLI2003 | Chủ nghĩa xã hội khoa học | `/mon-hoc/poli2003/` | 0 |
| MILI2702 | Công tác quốc phòng và an ninh | `/mon-hoc/mili2702/` | 0 |
| COMP1016 | Cấu trúc dữ liệu | `/mon-hoc/comp1016/` | 0 |
| COMP1018 | Cơ sở dữ liệu | `/mon-hoc/comp1018/` | 0 |
| COMP1019 | Lập trình trên Windows | `/mon-hoc/comp1019/` | 0 |
| COMP1501 | Xác suất thống kê và ứng dụng | `/mon-hoc/comp1501/` | 0 |
| COMP1701 | Lý thuyết đồ thị và ứng dụng | `/mon-hoc/comp1701/` | 0 |
| EDTE1843 | Phát triển chương trình công nghệ giáo dục | `/mon-hoc/edte1843/` | 0 |
| EDTE1844 | Lập trình cơ bản và thiết kế phần mềm | `/mon-hoc/edte1844/` | 0 |
| EDTE1845 | Khoa học dữ liệu và ứng dụng trong giáo dục | `/mon-hoc/edte1845/` | 0 |
| EDUC2802 | Giáo dục học | `/mon-hoc/educ2802/` | 0 |
| POLI2005 | Tư tưởng Hồ Chí Minh | `/mon-hoc/poli2005/` | 0 |
| MILI2703 | Quân sự chung | `/mon-hoc/mili2703/` | 0 |
| COMP1011 | Kiến trúc máy tính và hợp ngữ | `/mon-hoc/comp1011/` | 0 |
| COMP1015 | Nhập môn mạng máy tính | `/mon-hoc/comp1015/` | 0 |
| COMP1332 | Hệ điều hành | `/mon-hoc/comp1332/` | 0 |
| COMP1401 | Phân tích và thiết kế giải thuật | `/mon-hoc/comp1401/` | 0 |
| COMP1829 | Quản lý công việc hiệu quả theo Agile | `/mon-hoc/comp1829/` | 0 |
| EDUT2801 | Phương pháp nghiên cứu khoa học và sư phạm ứng dụng | `/mon-hoc/edut2801/` | 0 |
| EDUT2802 | Đại cương về lí luận dạy học | `/mon-hoc/edut2802/` | 0 |
| EDTE1842 | Đánh giá trong giáo dục | `/mon-hoc/edte1842/` | 0 |
| EDTE1846 | Mạng máy tính và internet | `/mon-hoc/edte1846/` | 0 |
| EDTE1847 | Tổ chức sự kiện giáo dục | `/mon-hoc/edte1847/` | 0 |
| EDTE1849 | Tiếng Anh chuyên ngành công nghệ giáo dục | `/mon-hoc/edte1849/` | 0 |
| POLI2004 | Lịch sử Đảng cộng sản Việt Nam | `/mon-hoc/poli2004/` | 0 |
| MILI2704 | Kỹ thuật chiến đấu bộ binh và chiến thuật | `/mon-hoc/mili2704/` | 0 |
| COMP1044 | Nhập môn công nghệ phần mềm | `/mon-hoc/comp1044/` | 0 |
| COMP1060 | Phân tích thiết kế hướng đối tượng | `/mon-hoc/comp1060/` | 0 |
| COMP1314 | Trí tuệ nhân tạo | `/mon-hoc/comp1314/` | 0 |
| COMP1818 | Phương pháp dạy học môn Tin học | `/mon-hoc/comp1818/` | 0 |
| COMP1819 | Phát triển chương trình môn Tin học | `/mon-hoc/comp1819/` | 0 |
| EDTE1802 | Tổ chức hoạt động dạy học và giáo dục | `/mon-hoc/edte1802/` | 0 |
| EDTE1803 | Thiết kế giảng dạy và mô hình | `/mon-hoc/edte1803/` | 0 |
| EDTE1806 | E-Learning và môi trường học tập ảo | `/mon-hoc/edte1806/` | 0 |
| EDTE1808 | Máy học và AI trong giáo dục | `/mon-hoc/edte1808/` | 0 |
| EDUC1810 | Dịch vụ giáo dục trong tổ chức giáo dục | `/mon-hoc/educ1810/` | 0 |
| COMP1712 | Học máy | `/mon-hoc/comp1712/` | 0 |
| COMP1804 | Lập trình Python | `/mon-hoc/comp1804/` | 0 |
| COMP1050 | Xử lý ảnh số | `/mon-hoc/comp1050/` | 0 |
| COMP1502 | Quy hoạch tuyến tính và ứng dụng | `/mon-hoc/comp1502/` | 0 |
| COMP1803 | Lập trình PHP | `/mon-hoc/comp1803/` | 0 |
| COMP1032 | Phân tích và thiết kế hệ thống thông tin | `/mon-hoc/comp1032/` | 0 |
| COMP1807 | Ứng dụng công nghệ thông tin trong dạy học môn Tin học | `/mon-hoc/comp1807/` | 0 |
| COMP1817 | Lập trình trực quan và Robotics | `/mon-hoc/comp1817/` | 0 |
| COMP1828 | Kiểm tra, đánh giá trong môn Tin học | `/mon-hoc/comp1828/` | 0 |
| EDTE1804 | Phát triển phần mềm giáo dục | `/mon-hoc/edte1804/` | 0 |
| EDTE1805 | Phân tích dữ liệu học tập và ứng dụng | `/mon-hoc/edte1805/` | 0 |
| EDTE1850 | Thực hành nghề nghiệp | `/mon-hoc/edte1850/` | 0 |
| COMP1031 | Công nghệ web | `/mon-hoc/comp1031/` | 0 |
| COMP1042 | Công nghệ Java | `/mon-hoc/comp1042/` | 0 |
| COMP1704 | Nhập môn DevOps | `/mon-hoc/comp1704/` | 0 |
| COMP1715 | Xử lý ngôn ngữ tự nhiên | `/mon-hoc/comp1715/` | 0 |
| COMP1410 | Thực tập nghề nghiệp 1 | `/mon-hoc/comp1410/` | 0 |
| COMP1809 | Thực hành nghề nghiệp | `/mon-hoc/comp1809/` | 0 |
| PSYC2803 | Khởi nghiệp | `/mon-hoc/psyc2803/` | 0 |
| COMP1808 | Thực hành dạy học môn Tin học | `/mon-hoc/comp1808/` | 0 |
| COMP1816 | Quản trị hệ thống thông tin | `/mon-hoc/comp1816/` | 0 |
| COMP1820 | Đào tạo điện tử (e-Learning) và ứng dụng | `/mon-hoc/comp1820/` | 0 |
| COMP1823 | Thực tập sư phạm 1 | `/mon-hoc/comp1823/` | 0 |
| EDTE1801 | Tích hợp công nghệ giáo dục vào dạy học | `/mon-hoc/edte1801/` | 0 |
| EDTE1807 | Học liệu số và truyền thông đa phương tiện | `/mon-hoc/edte1807/` | 0 |
| EDTE1851 | Thực tập nghề nghiệp 1 | `/mon-hoc/edte1851/` | 0 |
| COMP1313 | Điện toán đám mây | `/mon-hoc/comp1313/` | 0 |
| COMP1504 | Thị giác máy tính và ứng dụng | `/mon-hoc/comp1504/` | 0 |
| EDTE1836 | Công nghệ thực tế ảo/thực tế tăng cường (VR/AR) và ứng dụng | `/mon-hoc/edte1836/` | 0 |
| COMP1811 | Thực tập nghề nghiệp 2 | `/mon-hoc/comp1811/` | 0 |
| COMP1083 | Khóa luận tốt nghiệp | `/mon-hoc/comp1083/` | 0 |
| COMP1824 | Thực tập sư phạm 2 | `/mon-hoc/comp1824/` | 0 |
| COMP1040 | Khóa luận tốt nghiệp | `/mon-hoc/comp1040/` | 0 |
| EDTE1852 | Thực tập nghề nghiệp 2 | `/mon-hoc/edte1852/` | 0 |
| EDTE1864 | Khóa luận tốt nghiệp | `/mon-hoc/edte1864/` | 0 |
| PHYL2 | Giáo dục thể chất 2 | `/mon-hoc/phyl2/` | 0 |
| DOMS0 | Giáo dục đời sống | `/mon-hoc/doms0/` | 0 |
| EDUC2801 | Phương pháp học tập hiệu quả | `/mon-hoc/educ2801/` | 0 |
| PSYC1493 | Kỹ năng thích ứng và giải quyết vấn đề | `/mon-hoc/psyc1493/` | 0 |
| PSYC2801 | Kỹ năng làm việc nhóm và tư duy sáng tạo | `/mon-hoc/psyc2801/` | 0 |
| PHYL3 | Giáo dục thể chất 3 | `/mon-hoc/phyl3/` | 0 |
| COMP1024 | Các hệ cơ sở dữ liệu | `/mon-hoc/comp1024/` | 0 |
| COMP1041 | Cơ sở dữ liệu nâng cao | `/mon-hoc/comp1041/` | 0 |
| COMP1043 | Hệ thống mã nguồn mở | `/mon-hoc/comp1043/` | 0 |
| COMP1071 | Nghi thức giao tiếp mạng (CISCO 1) | `/mon-hoc/comp1071/` | 0 |
| COMP1304 | Phát triển ứng dụng trên thiết bị di động | `/mon-hoc/comp1304/` | 0 |
| COMP1305 | Quản lý dự án công nghệ thông tin | `/mon-hoc/comp1305/` | 0 |
| COMP1307 | Kiểm thử phần mềm cơ bản | `/mon-hoc/comp1307/` | 0 |
| COMP1308 | Phát triển ứng dụng trò chơi | `/mon-hoc/comp1308/` | 0 |
| COMP1709 | Hệ thống nhúng và ứng dụng | `/mon-hoc/comp1709/` | 0 |
| COMP1046 | Các hệ cơ sở tri thức | `/mon-hoc/comp1046/` | 0 |
| COMP1047 | Đồ hoạ máy tính | `/mon-hoc/comp1047/` | 0 |
| COMP1064 | Công nghệ .NET | `/mon-hoc/comp1064/` | 0 |
| COMP1065 | Chuyên đề Oracle | `/mon-hoc/comp1065/` | 0 |
| COMP1076 | Quản trị mạng với Linux | `/mon-hoc/comp1076/` | 0 |
| COMP1085 | Hệ thống quản trị doanh nghiệp | `/mon-hoc/comp1085/` | 0 |
| COMP1306 | Xây dựng dự án công nghệ thông tin | `/mon-hoc/comp1306/` | 0 |
| COMP1310 | Hệ tư vấn thông tin | `/mon-hoc/comp1310/` | 0 |
| COMP1311 | Bảo mật cơ sở dữ liệu | `/mon-hoc/comp1311/` | 0 |
| COMP1315 | Khai thác dữ liệu và ứng dụng | `/mon-hoc/comp1315/` | 0 |
| COMP1318 | Các phương pháp học thống kê | `/mon-hoc/comp1318/` | 0 |
| COMP1326 | Lắp ráp, cài đặt và bảo trì máy tính | `/mon-hoc/comp1326/` | 0 |
| COMP1069 | Công nghệ phần mềm nâng cao | `/mon-hoc/comp1069/` | 0 |
| COMP1084 | Thương mại điện tử | `/mon-hoc/comp1084/` | 0 |
| COMP1309 | Kiểm thử phần mềm nâng cao | `/mon-hoc/comp1309/` | 0 |
| COMP1325 | Máy học nâng cao | `/mon-hoc/comp1325/` | 0 |
| COMP1703 | Phát triển ứng dụng di động nâng cao | `/mon-hoc/comp1703/` | 0 |
| COMP1714 | Khai thác dữ liệu văn bản | `/mon-hoc/comp1714/` | 0 |
| COMP1813 | Hồ sơ tốt nghiệp | `/mon-hoc/comp1813/` | 0 |
| EDUC2803 | Khởi nghiệp và giáo dục khởi nghiệp | `/mon-hoc/educ2803/` | 0 |
| COMP1821 | Dạy học lập trình nâng cao ở trường PT | `/mon-hoc/comp1821/` | 0 |
| COMP1822 | Dạy học chuyên đề học tập môn Tin học | `/mon-hoc/comp1822/` | 0 |
| COMP1825 | Tổ chức dạy học chủ đề STEM ở trường PT | `/mon-hoc/comp1825/` | 0 |
| COMP1814 | Sản phẩm nghiên cứu | `/mon-hoc/comp1814/` | 0 |
| COMP1826 | Hồ sơ tốt nghiệp | `/mon-hoc/comp1826/` | 0 |
| EDTE1860 | Lãnh đạo và quản lí lớp học | `/mon-hoc/edte1860/` | 0 |
| EDTE1861 | Phương tiện và thiết bị dạy học trong môi trường số | `/mon-hoc/edte1861/` | 0 |
| EDTE1862 | An ninh mạng và bảo mật dữ liệu | `/mon-hoc/edte1862/` | 0 |
| EDTE1863 | Phân tích và thiết kế HTTT giáo dục | `/mon-hoc/edte1863/` | 0 |
| EDTE1811 | Thiết kế dạy học với các công cụ thông minh | `/mon-hoc/edte1811/` | 0 |
| EDTE1812 | Lựa chọn công nghệ và thiết kế HĐ trực tuyến | `/mon-hoc/edte1812/` | 0 |
| EDTE1813 | Dạy học phân hóa và tích hợp | `/mon-hoc/edte1813/` | 0 |
| EDTE1821 | Thiết kế và biên tập video số | `/mon-hoc/edte1821/` | 0 |
| EDTE1825 | Thiết kế đồ họa thông tin và hoạt hình 2D | `/mon-hoc/edte1825/` | 0 |
| EDTE1827 | Thiết kế và lập trình web đơn giản | `/mon-hoc/edte1827/` | 0 |
| EDTE1831 | Quản trị hệ thống đào tạo trực tuyến | `/mon-hoc/edte1831/` | 0 |
| EDTE1833 | Phát triển ứng dụng dựa trên công cụ AI | `/mon-hoc/edte1833/` | 0 |
| EDTE1834 | Công nghệ di động và ứng dụng trong GD | `/mon-hoc/edte1834/` | 0 |
| EDTE1815 | Thiết kế nội dung bài giảng tương tác | `/mon-hoc/edte1815/` | 0 |
| EDTE1816 | Thiết kế công cụ kiểm tra, đánh giá | `/mon-hoc/edte1816/` | 0 |
| EDTE1817 | Dạy học với các công cụ đa phương tiện | `/mon-hoc/edte1817/` | 0 |
| EDTE1822 | Biên tập và xuất bản nội dung học liệu số | `/mon-hoc/edte1822/` | 0 |
| EDTE1823 | Tương tác người - máy và ứng dụng trong GD | `/mon-hoc/edte1823/` | 0 |
| EDTE1826 | Robotics và lập trình trực quan | `/mon-hoc/edte1826/` | 0 |
| EDTE1835 | Trò chơi học tập và mô phỏng trong giáo dục | `/mon-hoc/edte1835/` | 0 |
| EDTE1837 | Cloud Computing và ứng dụng trong giáo dục | `/mon-hoc/edte1837/` | 0 |
| EDTE1865 | Hồ sơ tốt nghiệp | `/mon-hoc/edte1865/` | 0 |
| EDTE1866 | Sản phẩm nghiên cứu | `/mon-hoc/edte1866/` | 0 |

## Phụ lục C — Toàn bộ 217 placements

Tất cả version là du-lieu-hien-co và verified=false. Các giá trị requirement dưới đây giữ nguyên source.

| Ngành | Môn | Kỳ | TC | Requirement | Source |
| --- | --- | --- | --- | --- | --- |
| cntt | COMP1010 | 1 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1800 | 1 | 4 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1801 | 1 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1802 | 1 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | MILI2701 | 1 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | POLI1903 | 1 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | POLI2001 | 1 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | PSYC1001 | 1 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | PHYL2401 | 1 | 1 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1013 | 2 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1017 | 2 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | MILI2702 | 2 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | PHYL2 | 2 | 1 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | POLI2002 | 2 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | POLI2003 | 2 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | PSYC2804 | 2 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | DOMS0 | 2 | 2 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | EDUC2801 | 2 | 2 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | PSYC1493 | 2 | 2 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | PSYC2801 | 2 | 2 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1016 | 3 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1018 | 3 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1019 | 3 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1501 | 3 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1701 | 3 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | MILI2703 | 3 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | PHYL3 | 3 | 1 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | POLI2005 | 3 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1011 | 4 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1015 | 4 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1332 | 4 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1401 | 4 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1829 | 4 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | MILI2704 | 4 | 4 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | POLI2004 | 4 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1044 | 5 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1060 | 5 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1314 | 5 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1024 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1032 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1041 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1043 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1050 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1071 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1304 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1305 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1307 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1308 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1709 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1712 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1804 | 5 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1502 | 6 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1803 | 6 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1031 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1042 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1046 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1047 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1064 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1065 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1076 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1085 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1306 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1310 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1311 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1315 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1318 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1326 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1704 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1715 | 6 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1410 | 7 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1809 | 7 | 3 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | PSYC2803 | 7 | 2 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1069 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1084 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1309 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1313 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1325 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1504 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1703 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1714 | 7 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1811 | 8 | 5 | Bắt buộc | `khoa/nganh-cntt.md` |
| cntt | COMP1083 | 8 | 6 | Tự chọn | `khoa/nganh-cntt.md` |
| cntt | COMP1813 | 8 | 3 | Tự chọn | `khoa/nganh-cntt.md` |
| sp-tin | COMP1010 | 1 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1800 | 1 | 4 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1801 | 1 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1802 | 1 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | MILI2701 | 1 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | POLI1903 | 1 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | POLI2001 | 1 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | PSYC1001 | 1 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | PHYL2401 | 1 | 1 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1013 | 2 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1827 | 2 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | MILI2702 | 2 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | POLI2002 | 2 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | POLI2003 | 2 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | PSYC2802 | 2 | 4 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1810 | 2 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | DOMS0 | 2 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | EDUC2801 | 2 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | PHYL2 | 2 | 1 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | PSYC1493 | 2 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | PSYC2801 | 2 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1016 | 3 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1017 | 3 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1701 | 3 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | EDUC2802 | 3 | 4 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | MILI2703 | 3 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | POLI2005 | 3 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | PHYL3 | 3 | 1 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1011 | 4 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1018 | 4 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1401 | 4 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | EDUT2801 | 4 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | EDUT2802 | 4 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | MILI2704 | 4 | 4 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | POLI2004 | 4 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1015 | 5 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1044 | 5 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1314 | 5 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1332 | 5 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1818 | 5 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1819 | 5 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1019 | 6 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1032 | 6 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1712 | 6 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1807 | 6 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1817 | 6 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1828 | 6 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1808 | 7 | 3 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1816 | 7 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1820 | 7 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1823 | 7 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | EDUC2803 | 7 | 2 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1821 | 7 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1822 | 7 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1825 | 7 | 2 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1824 | 8 | 5 | Bắt buộc | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1040 | 8 | 6 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1814 | 8 | 3 | Tự chọn | `khoa/nganh-sp-tin.md` |
| sp-tin | COMP1826 | 8 | 3 | Tự chọn | `khoa/nganh-sp-tin.md` |
| cngd | COMP1800 | 1 | 4 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1840 | 1 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | MILI2701 | 1 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | PHYL2401 | 1 | 1 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | POLI1903 | 1 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | POLI2001 | 1 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | PSYC1001 | 1 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | TECH1802 | 1 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1841 | 2 | 4 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | MATH1703 | 2 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | MILI2702 | 2 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | POLI2002 | 2 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | POLI2003 | 2 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | POLI2005 | 2 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | PSYC2804 | 2 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | COMP1812 | 2 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | DOMS0 | 2 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDUC2801 | 2 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | PHYL2 | 2 | 1 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | PSYC1493 | 2 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | PSYC2801 | 2 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1843 | 3 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1844 | 3 | 4 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1845 | 3 | 4 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | MILI2703 | 3 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | PSYC2802 | 3 | 4 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | PHYL3 | 3 | 1 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1842 | 4 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1846 | 4 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1847 | 4 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1849 | 4 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | MILI2704 | 4 | 4 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | POLI2004 | 4 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1860 | 4 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1861 | 4 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1862 | 4 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1863 | 4 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1802 | 5 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1803 | 5 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1806 | 5 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1808 | 5 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDUC1810 | 5 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | PSYC2803 | 5 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1804 | 6 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1805 | 6 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1850 | 6 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1811 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1812 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1813 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1821 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1825 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1827 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1831 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1833 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1834 | 6 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1801 | 7 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1807 | 7 | 3 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1851 | 7 | 2 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1815 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1816 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1817 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1822 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1823 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1826 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1835 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1836 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1837 | 7 | 2 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1852 | 8 | 5 | Bắt buộc | `khoa/nganh-cngd.md` |
| cngd | EDTE1864 | 8 | 6 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1865 | 8 | 3 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | EDTE1866 | 8 | 3 | Tự chọn | `khoa/nganh-cngd.md` |
| cngd | POLI2005 | 3 | 2 | Bắt buộc | `khoa/tra-cuu-hoc-phan.md` |
| sp-tin | COMP1712 | 5 | 3 | Tự chọn/Bắt buộc | `khoa/tra-cuu-hoc-phan.md` |
| cntt | COMP1032 | 6 | 3 | Bắt buộc/Tự chọn | `khoa/tra-cuu-hoc-phan.md` |
| cngd | PSYC2803 | 7 | 2 | Bắt buộc | `khoa/tra-cuu-hoc-phan.md` |

## Phụ lục D — Toàn bộ 32 resources

Tất cả status=available, verified=false; source chung là nội dung biên soạn trong kho hiện có, chưa đối chiếu nguồn gốc độc lập.

| ID | Môn | Kind | Section | Order | Year | Title | Path |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `algebra--01-ma-tran-va-dinh-thuc` | COMP1800 | ly-thuyet | Đại số tuyến tính | 1 | — | Chuyên đề 1: Ma trận, định thức và hạng ma trận | `/algebra/01-ma-tran-va-dinh-thuc` |
| `algebra--02-he-phuong-trinh-tuyen-tinh` | COMP1800 | ly-thuyet | Đại số tuyến tính | 2 | — | Chuyên đề 2: Hệ phương trình tuyến tính | `/algebra/02-he-phuong-trinh-tuyen-tinh` |
| `algebra--03-khong-gian-vecto` | COMP1800 | ly-thuyet | Đại số tuyến tính | 3 | — | Chuyên đề 3: Không gian vectơ, cơ sở và đổi tọa độ | `/algebra/03-khong-gian-vecto` |
| `algebra--04-khong-gian-euclide` | COMP1800 | ly-thuyet | Đại số tuyến tính | 4 | — | Chuyên đề 4: Không gian Euclide và trực chuẩn hóa Gram - Schmidt | `/algebra/04-khong-gian-euclide` |
| `algebra--05-anh-xa-tuyen-tinh-cheo-hoa` | COMP1800 | ly-thuyet | Đại số tuyến tính | 5 | — | Chuyên đề 5: Ánh xạ tuyến tính, trị riêng và chéo hóa ma trận | `/algebra/05-anh-xa-tuyen-tinh-cheo-hoa` |
| `algebra--06-dang-toan-phuong` | COMP1800 | ly-thuyet | Đại số tuyến tính | 6 | — | Chuyên đề 6: Dạng toàn phương | `/algebra/06-dang-toan-phuong` |
| `calculus--01-gioi-han-day-va-ham` | COMP1800 | ly-thuyet | Giải tích | 7 | — | Chuyên đề 1: Dãy số, giới hạn và tính liên tục | `/calculus/01-gioi-han-day-va-ham` |
| `calculus--02-dao-ham-vi-phan-taylor` | COMP1800 | ly-thuyet | Giải tích | 8 | — | Chuyên đề 2: Phép tính vi phân, đạo hàm cấp cao và khai triển Taylor | `/calculus/02-dao-ham-vi-phan-taylor` |
| `calculus--03-tich-phan-va-ung-dung` | COMP1800 | ly-thuyet | Giải tích | 9 | — | Chuyên đề 3: Phép tính tích phân và tổng Riemann | `/calculus/03-tich-phan-va-ung-dung` |
| `calculus--04-tich-phan-suy-rong` | COMP1800 | ly-thuyet | Giải tích | 10 | — | Chuyên đề 4: Tích phân suy rộng (loại 1 và loại 2) | `/calculus/04-tich-phan-suy-rong` |
| `calculus--05-ly-thuyet-chuoi` | COMP1800 | ly-thuyet | Giải tích | 11 | — | Chuyên đề 5: Lý thuyết chuỗi số và chuỗi lũy thừa | `/calculus/05-ly-thuyet-chuoi` |
| `cheatsheet--cong-thuc-nhanh` | COMP1800 | cong-thuc | Sổ tay | 12 | — | Công thức nhanh | `/cheatsheet/cong-thuc-nhanh` |
| `cheatsheet--kien-thuc-thpt` | COMP1800 | cong-thuc | Sổ tay | 13 | — | Ôn tập kiến thức nền tảng THPT | `/cheatsheet/kien-thuc-thpt` |
| `discrete-math--buoi-1-logic-menh-de` | COMP1801 | ly-thuyet | Toán rời rạc | 14 | — | Buổi 1: Cơ sở logic mệnh đề và bảng chân trị | `/discrete-math/buoi-1-logic-menh-de` |
| `discrete-math--buoi-2-vi-tu-quy-nap` | COMP1801 | ly-thuyet | Toán rời rạc | 15 | — | Buổi 2: Vị từ, quy tắc suy diễn và quy nạp toán học | `/discrete-math/buoi-2-vi-tu-quy-nap` |
| `discrete-math--buoi-3-tap-hop-anh-xa` | COMP1801 | ly-thuyet | Toán rời rạc | 16 | — | Buổi 3: Lý thuyết tập hợp và ánh xạ | `/discrete-math/buoi-3-tap-hop-anh-xa` |
| `discrete-math--buoi-4-quan-he-dai-so-boole` | COMP1801 | ly-thuyet | Toán rời rạc | 17 | — | Buổi 4: Quan hệ tương đương, thứ tự và đại số Boole | `/discrete-math/buoi-4-quan-he-dai-so-boole` |
| `discrete-math--buoi-5-to-hop-dem` | COMP1801 | ly-thuyet | Toán rời rạc | 18 | — | Buổi 5: Đại số tổ hợp, bài toán đếm và nguyên lý Dirichlet | `/discrete-math/buoi-5-to-hop-dem` |
| `discrete-math--buoi-6-he-thuc-truy-hoi` | COMP1801 | ly-thuyet | Toán rời rạc | 19 | — | Buổi 6: Hệ thức truy hồi và phương trình sai phân | `/discrete-math/buoi-6-he-thuc-truy-hoi` |
| `discrete-math--buoi-7-ly-thuyet-do-thi` | COMP1801 | ly-thuyet | Toán rời rạc | 20 | — | Buổi 7: Lý thuyết đồ thị và các thuật toán cốt lõi | `/discrete-math/buoi-7-ly-thuyet-do-thi` |
| `exams--de-2022-2023` | COMP1800 | de-thi | Đề thi | 21 | 2022-2023 | Đề thi kết thúc học phần: Năm học 2022 – 2023 | `/exams/de-2022-2023` |
| `exams--de-2023-2024` | COMP1800 | de-thi | Đề thi | 22 | 2023-2024 | Đề thi kết thúc học phần: Năm học 2023 – 2024 | `/exams/de-2023-2024` |
| `exams--de-2024-2025` | COMP1800 | de-thi | Đề thi | 23 | 2024-2025 | Đề thi kết thúc học phần: Năm học 2024 – 2025 | `/exams/de-2024-2025` |
| `exams--de-tham-khao-co-dap-an` | COMP1800 | de-thi | Đề thi | 24 | — | Đề thi tham khảo kèm barem điểm chi tiết | `/exams/de-tham-khao-co-dap-an` |
| `exams--quiz-giua-ky` | COMP1800 | trac-nghiem | Đề thi | 25 | — | Trắc nghiệm ôn thi giữa kỳ | `/exams/quiz-giua-ky` |
| `exams-discrete--gk-2022-2023` | COMP1801 | de-thi | Đề thi | 26 | 2022-2023 | Đề thi giữa kỳ: Toán rời rạc (năm học 2022 – 2023) | `/exams-discrete/gk-2022-2023` |
| `exams-discrete--gk-2023-2024` | COMP1801 | de-thi | Đề thi | 27 | 2023-2024 | Đề thi giữa kỳ: Toán rời rạc (năm học 2023 – 2024) | `/exams-discrete/gk-2023-2024` |
| `exams-discrete--kthp-2022-2023` | COMP1801 | de-thi | Đề thi | 28 | 2022-2023 | Đề thi kết thúc học phần: Toán rời rạc (2022 – 2023) | `/exams-discrete/kthp-2022-2023` |
| `exams-discrete--kthp-2023-2024` | COMP1801 | de-thi | Đề thi | 29 | 2023-2024 | Đề thi kết thúc học phần: Toán rời rạc (2023 – 2024) | `/exams-discrete/kthp-2023-2024` |
| `exams-discrete--kthp-2024-2025` | COMP1801 | de-thi | Đề thi | 30 | 2024-2025 | Đề thi kết thúc học phần: Toán rời rạc (2024 – 2025) | `/exams-discrete/kthp-2024-2025` |
| `exercises--algebra` | COMP1800 | bai-tap | Bài tập | 31 | — | Tuyển tập bài tập đại số tuyến tính (kèm lời giải) | `/exercises/algebra` |
| `exercises--calculus` | COMP1800 | bai-tap | Bài tập | 32 | — | Tuyển tập bài tập giải tích (kèm lời giải) | `/exercises/calculus` |

## Phụ lục E — 27 đường dẫn chương trình sinh tự động

- `/chuong-trinh/cntt/`
- `/chuong-trinh/cntt/hk-1/`
- `/chuong-trinh/cntt/hk-2/`
- `/chuong-trinh/cntt/hk-3/`
- `/chuong-trinh/cntt/hk-4/`
- `/chuong-trinh/cntt/hk-5/`
- `/chuong-trinh/cntt/hk-6/`
- `/chuong-trinh/cntt/hk-7/`
- `/chuong-trinh/cntt/hk-8/`
- `/chuong-trinh/sp-tin/`
- `/chuong-trinh/sp-tin/hk-1/`
- `/chuong-trinh/sp-tin/hk-2/`
- `/chuong-trinh/sp-tin/hk-3/`
- `/chuong-trinh/sp-tin/hk-4/`
- `/chuong-trinh/sp-tin/hk-5/`
- `/chuong-trinh/sp-tin/hk-6/`
- `/chuong-trinh/sp-tin/hk-7/`
- `/chuong-trinh/sp-tin/hk-8/`
- `/chuong-trinh/cngd/`
- `/chuong-trinh/cngd/hk-1/`
- `/chuong-trinh/cngd/hk-2/`
- `/chuong-trinh/cngd/hk-3/`
- `/chuong-trinh/cngd/hk-4/`
- `/chuong-trinh/cngd/hk-5/`
- `/chuong-trinh/cngd/hk-6/`
- `/chuong-trinh/cngd/hk-7/`
- `/chuong-trinh/cngd/hk-8/`

## Phụ lục F — 387 anchor trong manifest trước biên tập

Liệt kê nguyên chuỗi Unicode từ editorial-anchors.json; giữ cả entry template làm bằng chứng, dù check-links hiện bỏ qua. Không trích bài gốc từ original-pages.json.

| Nguồn | Anchor IDs |
| --- | --- |
| `algebra/01-ma-tran-va-dinh-thuc.md` | `chuyen-đe-1-ma-tran-đinh-thuc-hang-ma-tran`; `_1-phep-toan-tren-ma-tran`; `_1-1-nhan-hai-ma-tran`; `_1-2-chuyen-vi-va-tinh-chat`; `_2-đinh-thuc-determinant`; `_2-1-đinh-nghia-va-cach-tinh`; `_2-2-tinh-chat-quan-trong-cua-đinh-thuc`; `_3-ma-tran-kha-nghich-ma-tran-nghich-đao`; `phuong-phap-tim-bang-bien-đoi-gauss-jordan`; `_4-hang-cua-ma-tran-rank`; `_5-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2022-2023`; `vi-du-2-đe-thi-kthp-2023-2024` |
| `algebra/02-he-phuong-trinh-tuyen-tinh.md` | `chuyen-đe-2-he-phuong-trinh-tuyen-tinh`; `_1-dang-tong-quat-đinh-ly-kronecker-capelli`; `_2-phuong-phap-cramer`; `_2-1-đieu-kien-ap-dung`; `_2-2-cong-thuc-nghiem`; `_3-phuong-phap-khu-gauss-gauss-jordan`; `_4-he-phuong-trinh-thuan-nhat`; `_5-vi-du-tu-đe-thi-that`; `vi-du-đe-thi-kthp-2023-2024` |
| `algebra/03-khong-gian-vecto.md` | `chuyen-đe-3-khong-gian-vecto-co-so-đoi-toa-đo`; `_1-khong-gian-con-đoc-lap-tuyen-tinh`; `_1-1-đieu-kien-kiem-tra-khong-gian-con`; `_1-2-đoc-lap-tuyen-tinh-đltt-phu-thuoc-tuyen-tinh-pttt`; `_2-co-so-so-chieu-toa-đo-vecto`; `_2-1-đinh-nghia-co-so-so-chieu`; `_2-2-toa-đo-cua-vecto-đoi-voi-co-so`; `_3-ma-tran-chuyen-co-so-cong-thuc-đoi-toa-đo`; `_3-1-ma-tran-chuyen-co-so-tu-sang`; `_3-2-cong-thuc-đoi-toa-đo`; `_4-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-đe-thi-kthp-2024-2025` |
| `algebra/04-khong-gian-euclide.md` | `chuyen-đe-4-khong-gian-euclide-truc-chuan-hoa-gram-schmidt`; `_1-tich-vo-huong-cac-tien-đe`; `_2-chuan-đo-dai-goc-giua-hai-vecto`; `_2-1-chuan-đo-dai-cua-vecto`; `_2-2-bat-đang-thuc-cauchy-schwarz-goc`; `_3-thuat-toan-truc-chuan-hoa-gram-schmidt`; `buoc-1-truc-giao-hoa-tim-he-truc-giao`; `buoc-2-chuan-hoa-đua-đo-dai-ve-1`; `_4-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-đe-thi-tham-khao-kthp-fit-hcmue` |
| `algebra/05-anh-xa-tuyen-tinh-cheo-hoa.md` | `chuyen-đe-5-anh-xa-tuyen-tinh-tri-rieng-cheo-hoa-ma-tran`; `_1-anh-xa-tuyen-tinh-ker-f-va-im-f`; `_1-1-đinh-nghia`; `_1-2-hat-nhan-va-anh`; `_2-ma-tran-cua-anh-xa-tuyen-tinh`; `_3-gia-tri-rieng-vecto-rieng`; `quy-trinh-tim-tri-rieng-vecto-rieng`; `_4-cheo-hoa-ma-tran`; `_5-vi-du-mau-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2023-2024` |
| `algebra/06-dang-toan-phuong.md` | `chuyen-đe-6-dang-toan-phuong-quadratic-forms`; `_1-khai-niem-dang-toan-phuong`; `_1-1-đinh-nghia`; `_1-2-bieu-dien-ma-tran-cua-dang-toan-phuong`; `_2-dang-chinh-tac-phuong-phap-lagrange`; `_2-1-dang-chinh-tac`; `_2-2-phuong-phap-đua-ve-dang-chinh-tac-cua-lagrange`; `_3-phep-bien-đoi-truc-giao-cheo-hoa-ma-tran-đoi-xung`; `_4-dau-cua-dang-toan-phuong-tieu-chuan-sylvester`; `_4-1-phan-loai-dau`; `_4-2-tieu-chuan-sylvester`; `_5-vi-du-bai-tap-mau`; `vi-du-1` |
| `calculus/01-gioi-han-day-va-ham.md` | `chuyen-đe-1-day-so-gioi-han-va-tinh-lien-tuc`; `_1-day-so-gioi-han-day-so`; `_1-1-cac-đinh-nghia-co-ban`; `_1-2-đinh-nghia-gioi-han-day-so`; `_1-3-cac-gioi-han-co-ban-can-nho`; `_2-gioi-han-ham-so-ky-thuat-khu-dang-vo-đinh`; `_2-1-bang-vo-cung-be-vcb-tuong-đuong-khi`; `_2-2-dang-vo-đinh-va-cong-thuc-tinh-nhanh`; `_2-3-quy-tac-l-hospital`; `_3-tinh-lien-tuc-cua-ham-so`; `_3-1-đinh-nghia`; `_3-2-điem-gian-đoan`; `_4-cac-vi-du-kinh-đien-trong-đe-thi`; `vi-du-1-đe-thi-kthp-2023-2024`; `vi-du-2-đe-thi-kthp-2022-2023`; `vi-du-3-đe-thi-kthp-2023-2024` |
| `calculus/02-dao-ham-vi-phan-taylor.md` | `chuyen-đe-2-phep-tinh-vi-phan-đao-ham-cap-cao-khai-trien-taylor`; `_1-đao-ham-vi-phan`; `_1-1-khai-niem-co-ban`; `_2-đao-ham-cap-cao-cong-thuc-leibniz`; `_2-1-đao-ham-cap-cua-mot-so-ham-so-co-ban`; `_2-2-cong-thuc-leibniz-cho-tich-cua-hai-ham-so`; `_3-cac-đinh-ly-ve-gia-tri-trung-binh`; `_4-cong-thuc-taylor-maclaurin`; `_4-1-cong-thuc-tong-quat`; `_4-2-khai-trien-maclaurin-cua-cac-ham-chuan`; `_5-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2023-2024`; `vi-du-2-đe-thi-kthp-2024-2025` |
| `calculus/03-tich-phan-va-ung-dung.md` | `chuyen-đe-3-phep-tinh-tich-phan-tong-riemann`; `_1-phuong-phap-tinh-nguyen-ham-tich-phan`; `_1-1-cong-thuc-tich-phan-tung-phan`; `_1-2-tich-phan-ham-phan-thuc-huu-ti`; `_2-đinh-nghia-tich-phan-xac-đinh-gioi-han-tong-riemann`; `_2-1-đinh-ly-tong-riemann`; `_3-cac-vi-du-trong-tam-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2022-2023`; `vi-du-2-đe-thi-kthp-2024-2025`; `vi-du-3-đe-thi-kthp-2024-2025` |
| `calculus/04-tich-phan-suy-rong.md` | `chuyen-đe-4-tich-phan-suy-rong-loai-1-loai-2`; `_1-tich-phan-suy-rong-loai-1-can-vo-han`; `_1-1-đinh-nghia`; `_1-2-tich-phan-mau-loai-1-chuan-so-sanh`; `_1-3-tieu-chuan-so-sanh-cho-ham-so-khong-am`; `_2-tich-phan-suy-rong-loai-2-ham-khong-bi-chan`; `_2-1-đinh-nghia`; `_2-2-tich-phan-mau-loai-2`; `_3-cac-vi-du-mau-phuong-phap-giai`; `vi-du-1`; `vi-du-2` |
| `calculus/05-ly-thuyet-chuoi.md` | `chuyen-đe-5-ly-thuyet-chuoi-so-chuoi-luy-thua`; `_1-chuoi-so-đieu-kien-hoi-tu-co-ban`; `_1-1-đinh-nghia`; `_2-cac-tieu-chuan-hoi-tu-cho-chuoi-so-duong`; `_2-1-chuoi-chuan-riemann-chuoi-series`; `_2-2-tieu-chuan-d-alembert-ti-so`; `_2-3-tieu-chuan-can-cauchy`; `_3-chuoi-đan-dau-chuoi-co-dau-bat-ky`; `_3-1-tieu-chuan-leibniz-cho-chuoi-đan-dau`; `_3-2-hoi-tu-tuyet-đoi-ban-hoi-tu`; `_4-chuoi-luy-thua`; `ban-kinh-hoi-tu`; `_5-vi-du-mau`; `vi-du-1`; `vi-du-2` |
| `cheatsheet/cong-thuc-nhanh.md` | `⚡-so-tay-tra-cuu-cong-thuc-than-toc`; `_1-gioi-han-vo-cung-be-tuong-đuong`; `_2-bang-đao-ham-cap-cao-thuong-gap`; `_3-khai-trien-maclaurin-cot-loi`; `_4-tich-phan-tong-riemann`; `_5-tich-phan-suy-rong-chuoi-so`; `_6-ma-tran-đinh-thuc`; `_7-khong-gian-vecto-anh-xa-tuyen-tinh` |
| `cheatsheet/kien-thuc-thpt.md` | `🎒-on-tap-kien-thuc-nen-tang-thpt`; `_1-cong-thuc-luong-giac-bat-buoc-nho`; `_1-1-he-thuc-co-ban`; `_1-2-cong-thuc-cong-nhan-đoi`; `_1-3-cong-thuc-ha-bac-rat-hay-dung-khi-tinh-tich-phan`; `_2-cong-thuc-luy-thua-logarit`; `_2-1-luy-thua`; `_2-2-logarit`; `_3-bang-nguyen-ham-co-ban` |
| `chuong-trinh/index.md` | `chuong-trinh-hoc`; `tra-cuu-theo-nhu-cau` |
| `chuong-trinh/tra-cuu.md` | `tra-cuu-hoc-phan` |
| `chuong-trinh/[program].md` |  |
| `discrete-math/buoi-1-logic-menh-de.md` | `buoi-1-co-so-logic-menh-đe-bang-chan-tri`; `_1-menh-đe-cac-phep-toan-logic-co-ban`; `_1-1-khai-niem-menh-đe`; `_1-2-bang-chan-tri-cac-phep-toan-logic`; `_2-cac-quy-luat-tuong-đuong-logic-quan-trong`; `_3-dang-chuan-tac-tuyen-dnf-hoi-cnf`; `_4-bai-tap-loi-giai-mau`; `bai-1`; `bai-2` |
| `discrete-math/buoi-2-vi-tu-quy-nap.md` | `buoi-2-vi-tu-quy-tac-suy-dien-quy-nap-toan-hoc`; `_1-logic-vi-tu-luong-tu`; `_1-1-vi-tu`; `_1-2-cac-luong-tu`; `_1-3-phu-đinh-menh-đe-chua-luong-tu-de-morgan-mo-rong`; `_2-cac-quy-tac-suy-dien-rules-of-inference`; `_3-nguyen-ly-quy-nap-toan-hoc-mathematical-induction`; `_4-bai-tap-mau`; `bai-1` |
| `discrete-math/buoi-3-tap-hop-anh-xa.md` | `buoi-3-ly-thuyet-tap-hop-anh-xa`; `_1-ly-thuyet-tap-hop`; `_1-1-cac-đinh-nghia-co-ban`; `_1-2-cac-phep-toan-tren-tap-hop`; `_1-3-nguyen-ly-bu-tru-inclusion-exclusion-principle`; `_2-anh-xa-ham-so`; `_2-1-phan-loai-anh-xa`; `_2-2-anh-xa-hop-thanh-composition`; `_3-bai-tap-mau`; `bai-1`; `bai-2` |
| `discrete-math/buoi-4-quan-he-dai-so-boole.md` | `buoi-4-quan-he-tuong-đuong-thu-tu-đai-so-boole`; `_1-quan-he-hai-ngoi-4-tinh-chat-co-ban`; `_2-quan-he-tuong-đuong-phan-hoach`; `_2-1-lop-tuong-đuong`; `_2-2-đinh-ly-phan-hoach`; `_3-quan-he-thu-tu-bieu-đo-hasse`; `_3-1-cac-phan-tu-đac-biet-trong-poset`; `_4-đai-so-boole-bang-karnaugh-k-map`; `_4-1-cau-truc-bang-karnaugh-thu-tu-ma-gray`; `_4-2-quy-tac-khoanh-nhom-k-map`; `_5-bai-tap-mau`; `bai-1` |
| `discrete-math/buoi-5-to-hop-dem.md` | `buoi-5-đai-so-to-hop-bai-toan-đem-nguyen-ly-dirichlet`; `_1-cac-quy-tac-đem-co-ban`; `_2-bang-phan-biet-cac-cau-hinh-to-hop`; `_3-nhi-thuc-newton-cac-đang-thuc-to-hop`; `_3-1-đinh-ly-nhi-thuc-newton`; `_3-2-mot-so-he-qua-kinh-đien`; `_4-nguyen-ly-long-chim-bo-cau-dirichlet`; `_4-1-dang-co-ban`; `_4-2-dang-mo-rong`; `_5-bai-tap-mau`; `bai-1`; `bai-2` |
| `discrete-math/buoi-6-he-thuc-truy-hoi.md` | `buoi-6-he-thuc-truy-hoi-phuong-trinh-sai-phan`; `_1-khai-niem-he-thuc-truy-hoi`; `_2-giai-he-thuc-tuyen-tinh-thuan-nhat-bac-2`; `_2-1-phuong-trinh-đac-trung`; `_2-2-cac-truong-hop-nghiem`; `_3-he-thuc-tuyen-tinh-khong-thuan-nhat`; `bang-du-đoan-nghiem-rieng-khi`; `_4-bai-tap-mau-tu-đe-thi-that`; `bai-1-đe-thi-kthp-toan-roi-rac`; `bai-2` |
| `discrete-math/buoi-7-ly-thuyet-do-thi.md` | `buoi-7-ly-thuyet-đo-thi-cac-thuat-toan-cot-loi`; `_1-cac-khai-niem-co-ban-ve-đo-thi`; `_1-1-bac-cua-đinh-bo-đe-bat-tay-handshaking-lemma`; `_1-2-bieu-dien-đo-thi`; `_2-đo-thi-euler-đo-thi-hamilton`; `_2-1-đo-thi-euler-đi-qua-moi-canh-đung-mot-lan`; `_2-2-đo-thi-hamilton-đi-qua-moi-đinh-đung-mot-lan`; `_3-cay-khung-nho-nhat-mst-minimum-spanning-tree`; `_3-1-thuat-toan-kruskal-uu-tien-canh-nho`; `_3-2-thuat-toan-prim-phat-trien-theo-cum-đinh`; `_4-thuat-toan-tim-đuong-đi-ngan-nhat-dijkstra`; `_5-bai-tap-mau`; `bai-1`; `bai-2` |
| `exams/de-2022-2023.md` | `đe-thi-ket-thuc-hoc-phan-nam-hoc-2022-–-2023`; `đe-bai-chinh-thuc`; `cau-1-4-0-điem`; `cau-2-2-0-điem`; `cau-3-4-0-điem`; `loi-giai-chi-tiet`; `loi-giai-cau-1`; `loi-giai-cau-2`; `loi-giai-cau-3` |
| `exams/de-2023-2024.md` | `đe-thi-ket-thuc-hoc-phan-nam-hoc-2023-–-2024`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-1-0-điem`; `cau-4-1-0-điem`; `cau-5-2-0-điem`; `cau-6-2-0-điem`; `loi-giai-chi-tiet` |
| `exams/de-2024-2025.md` | `đe-thi-ket-thuc-hoc-phan-nam-hoc-2024-–-2025`; `đe-bai-chinh-thuc`; `cau-1-4-0-điem`; `cau-2-2-0-điem`; `cau-3-4-0-điem`; `loi-giai-chi-tiet` |
| `exams/de-tham-khao-co-dap-an.md` | `đe-thi-tham-khao-kem-barem-điem-chi-tiet`; `bang-đe-bai-thang-điem-chuan`; `cau-1-4-0-điem-phep-tinh-giai-tich`; `cau-2-3-0-điem-khong-gian-euclide`; `cau-3-3-0-điem-anh-xa-tuyen-tinh-tri-rieng`; `đap-an-huong-dan-cham-tung-buoc` |
| `exams/quiz-giua-ky.md` | `📝-trac-nghiem-on-thi-giua-ky-interactive-quiz` |
| `exams-discrete/gk-2022-2023.md` | `đe-thi-giua-ky-toan-roi-rac-nam-hoc-2022-–-2023`; `đe-bai-chinh-thuc`; `cau-1-2-5-điem`; `cau-2-2-5-điem`; `cau-3-2-5-điem`; `cau-4-2-5-điem`; `loi-giai-chi-tiet` |
| `exams-discrete/gk-2023-2024.md` | `đe-thi-giua-ky-toan-roi-rac-nam-hoc-2023-–-2024`; `đe-bai-chinh-thuc`; `cau-1-2-5-điem`; `cau-2-2-5-điem`; `cau-3-2-5-điem`; `cau-4-2-5-điem`; `loi-giai-chi-tiet` |
| `exams-discrete/kthp-2022-2023.md` | `đe-thi-ket-thuc-hoc-phan-toan-roi-rac-2022-–-2023`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-2-0-điem`; `cau-4-2-0-điem`; `cau-5-2-0-điem`; `loi-giai-chi-tiet` |
| `exams-discrete/kthp-2023-2024.md` | `đe-thi-ket-thuc-hoc-phan-toan-roi-rac-2023-–-2024`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-2-0-điem`; `cau-4-2-0-điem`; `cau-5-2-0-điem`; `loi-giai-chi-tiet` |
| `exams-discrete/kthp-2024-2025.md` | `đe-thi-ket-thuc-hoc-phan-toan-roi-rac-2024-–-2025`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-2-0-điem`; `cau-4-2-0-điem`; `cau-5-2-0-điem`; `loi-giai-chi-tiet` |
| `exercises/algebra.md` | `📚-tuyen-tap-bai-tap-đai-so-tuyen-tinh-kem-loi-giai`; `dang-1-đinh-thuc-bien-đoi-so-cap`; `bai-1-1`; `dang-2-bien-luan-he-phuong-trinh-tuyen-tinh`; `bai-2-1`; `dang-3-he-vecto-co-so-khong-gian-con`; `bai-3-1`; `dang-4-truc-chuan-hoa-gram-schmidt`; `bai-4-1`; `dang-5-cheo-hoa-ma-tran`; `bai-5-1` |
| `exercises/calculus.md` | `📚-tuyen-tap-bai-tap-giai-tich-kem-loi-giai`; `dang-1-gioi-han-vo-cung-be-tuong-đuong`; `bai-1-1`; `bai-1-2`; `dang-2-đao-ham-cap-cao-cong-thuc-leibniz`; `bai-2-1`; `dang-3-tich-phan-tich-phan-suy-rong`; `bai-3-1`; `bai-3-2`; `dang-4-chuoi-so-ban-kinh-hoi-tu`; `bai-4-1` |
| `exercises/index.md` | `🎯-ngan-hang-bai-tap-phan-dang`; `🗂️-lua-chon-phan-luyen-tap`; `📈-bai-tap-giai-tich`; `🧮-bai-tap-đai-so-tuyen-tinh` |
| `hoc-lieu/index.md` | `kho-hoc-lieu` |
| `huong-dan.md` | `huong-dan-đong-gop`; `bat-đau-hoc`; `nguon-tai-lieu`; `ghi-chep-va-su-dung-tai-lieu`; `đong-gop-va-bao-loi`; `nhung-điem-đang-can-đoi-chieu` |
| `index.md` |  |
| `khoa/index.md` | `trang-đa-chuyen-vi-tri` |
| `khoa/khoa-49.md` | `khoa-49` |
| `khoa/khoa-50.md` | `khoa-50` |
| `khoa/khoa-51.md` | `khoa-51` |
| `khoa/khoa-52.md` | `khoa-52` |
| `khoa/nganh-cngd.md` | `trang-đa-chuyen-vi-tri` |
| `khoa/nganh-cntt.md` | `trang-đa-chuyen-vi-tri` |
| `khoa/nganh-sp-tin.md` | `trang-đa-chuyen-vi-tri` |
| `khoa/tra-cuu-hoc-phan.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk1/comp1010.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk1/comp1802.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk1/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk2/comp1013.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk2/comp1017.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk2/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk3/comp1016.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk3/comp1018.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk3/comp1019.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk3/comp1501.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk3/comp1701.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk3/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk4/comp1011.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk4/comp1015.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk4/comp1332.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk4/comp1401.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk4/comp1829.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk4/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk5/comp1044.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk5/comp1060.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk5/comp1314.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk5/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk6/comp1502.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk6/comp1803.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk6/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk7/comp1410.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk7/comp1809.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk7/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk7/psyc2803.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/hk8/comp1411.md` | `thuc-tap-nghe-nghiep-2-comp1411`; `🎯-muc-tieu-mon-hoc`; `📖-ke-hoach-hoc-tap-tai-lieu`; `📝-đong-gop-tai-lieu` |
| `mon-hoc/hk8/comp1808.md` | `ho-so-tot-nghiep-comp1808`; `🎯-muc-tieu-mon-hoc`; `📖-ke-hoach-hoc-tap-tai-lieu`; `📝-đong-gop-tai-lieu` |
| `mon-hoc/hk8/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/index.md` | `trang-đa-chuyen-vi-tri` |
| `mon-hoc/[course]/index.md` |  |
| `roadmap.md` | `🗺️-lo-trinh-on-tap-toan-dien-2-mon-toan-fit-hcmue`; `phan-a-co-so-toan-trong-cntt-comp1800`; `📅-giai-đoan-1-giai-tich-ham-mot-bien-6-buoi`; `📅-giai-đoan-2-đai-so-tuyen-tinh-dang-toan-phuong-6-chuyen-đe`; `📅-giai-đoan-3-luyen-đe-thi-co-so-toan`; `phan-b-toan-roi-rac-va-ung-dung-comp1801`; `📅-ly-thuyet-7-buoi-hoc-trong-tam`; `📅-luyen-đe-thi-toan-roi-rac` |

## Phụ lục G — Heading/span IDs thực tế của 264 HTML

Bao gồm heading do template sinh và explicit span ID; không thống kê glyph ID nội bộ của MathJax SVG. Đây là baseline sau build, không phải bản đồ anchor đã mất trước audit.

| Route không kèm base | Heading/span IDs |
| --- | --- |
| `/404` | — |
| `/algebra/01-ma-tran-va-dinh-thuc` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-1-ma-tran-đinh-thuc-hang-ma-tran`; `_1-phep-toan-tren-ma-tran`; `_1-1-nhan-hai-ma-tran`; `_1-2-chuyen-vi-va-tinh-chat`; `_2-đinh-thuc-determinant`; `_2-1-đinh-nghia-va-cach-tinh`; `_2-2-tinh-chat-quan-trong-cua-đinh-thuc`; `_3-ma-tran-kha-nghich-ma-tran-nghich-đao`; `phuong-phap-tim-bang-bien-đoi-gauss-jordan`; `_4-hang-cua-ma-tran-rank`; `_5-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2022-2023`; `vi-du-2-đe-thi-kthp-2023-2024`; `doc-footer-aria-label` |
| `/algebra/02-he-phuong-trinh-tuyen-tinh` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-2-he-phuong-trinh-tuyen-tinh`; `_1-dang-tong-quat-đinh-ly-kronecker-capelli`; `_2-phuong-phap-cramer`; `_2-1-đieu-kien-ap-dung`; `_2-2-cong-thuc-nghiem`; `_3-phuong-phap-khu-gauss-gauss-jordan`; `_4-he-phuong-trinh-thuan-nhat`; `_5-vi-du-tu-đe-thi-that`; `vi-du-đe-thi-kthp-2023-2024`; `doc-footer-aria-label` |
| `/algebra/03-khong-gian-vecto` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-3-khong-gian-vecto-co-so-đoi-toa-đo`; `_1-khong-gian-con-đoc-lap-tuyen-tinh`; `_1-1-đieu-kien-kiem-tra-khong-gian-con`; `_1-2-đoc-lap-tuyen-tinh-đltt-phu-thuoc-tuyen-tinh-pttt`; `_2-co-so-so-chieu-toa-đo-vecto`; `_2-1-đinh-nghia-co-so-so-chieu`; `_2-2-toa-đo-cua-vecto-đoi-voi-co-so`; `_3-ma-tran-chuyen-co-so-cong-thuc-đoi-toa-đo`; `_3-1-ma-tran-chuyen-co-so-tu-sang`; `_3-2-cong-thuc-đoi-toa-đo`; `_4-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-đe-thi-kthp-2024-2025`; `doc-footer-aria-label` |
| `/algebra/04-khong-gian-euclide` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-4-khong-gian-euclide-truc-chuan-hoa-gram-schmidt`; `_1-tich-vo-huong-cac-tien-đe`; `_2-chuan-đo-dai-goc-giua-hai-vecto`; `_2-1-chuan-đo-dai-cua-vecto`; `_2-2-bat-đang-thuc-cauchy-schwarz-goc`; `_3-thuat-toan-truc-chuan-hoa-gram-schmidt`; `buoc-1-truc-giao-hoa-tim-he-truc-giao`; `buoc-2-chuan-hoa-đua-đo-dai-ve-1`; `_4-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-đe-thi-tham-khao-kthp-fit-hcmue`; `doc-footer-aria-label` |
| `/algebra/05-anh-xa-tuyen-tinh-cheo-hoa` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-5-anh-xa-tuyen-tinh-tri-rieng-cheo-hoa-ma-tran`; `_1-anh-xa-tuyen-tinh-ker-f-va-im-f`; `_1-1-đinh-nghia`; `_1-2-hat-nhan-va-anh`; `_2-ma-tran-cua-anh-xa-tuyen-tinh`; `_3-gia-tri-rieng-vecto-rieng`; `quy-trinh-tim-tri-rieng-vecto-rieng`; `_4-cheo-hoa-ma-tran`; `_5-vi-du-mau-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2023-2024`; `doc-footer-aria-label` |
| `/algebra/06-dang-toan-phuong` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-6-dang-toan-phuong-quadratic-forms`; `_1-khai-niem-dang-toan-phuong`; `_1-1-đinh-nghia`; `_1-2-bieu-dien-ma-tran-cua-dang-toan-phuong`; `_2-dang-chinh-tac-phuong-phap-lagrange`; `_2-1-dang-chinh-tac`; `_2-2-phuong-phap-đua-ve-dang-chinh-tac-cua-lagrange`; `_3-phep-bien-đoi-truc-giao-cheo-hoa-ma-tran-đoi-xung`; `_4-dau-cua-dang-toan-phuong-tieu-chuan-sylvester`; `_4-1-phan-loai-dau`; `_4-2-tieu-chuan-sylvester`; `_5-vi-du-bai-tap-mau`; `vi-du-1`; `doc-footer-aria-label` |
| `/calculus/01-gioi-han-day-va-ham` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-1-day-so-gioi-han-va-tinh-lien-tuc`; `_1-day-so-gioi-han-day-so`; `_1-1-cac-đinh-nghia-co-ban`; `_1-2-đinh-nghia-gioi-han-day-so`; `_1-3-cac-gioi-han-co-ban-can-nho`; `_2-gioi-han-ham-so-ky-thuat-khu-dang-vo-đinh`; `_2-1-bang-vo-cung-be-vcb-tuong-đuong-khi`; `_2-2-dang-vo-đinh-va-cong-thuc-tinh-nhanh`; `_2-3-quy-tac-l-hospital`; `_3-tinh-lien-tuc-cua-ham-so`; `_3-1-đinh-nghia`; `_3-2-điem-gian-đoan`; `_4-cac-vi-du-kinh-đien-trong-đe-thi`; `vi-du-1-đe-thi-kthp-2023-2024`; `vi-du-2-đe-thi-kthp-2022-2023`; `vi-du-3-đe-thi-kthp-2023-2024`; `doc-footer-aria-label` |
| `/calculus/02-dao-ham-vi-phan-taylor` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-2-phep-tinh-vi-phan-đao-ham-cap-cao-khai-trien-taylor`; `_1-đao-ham-vi-phan`; `_1-1-khai-niem-co-ban`; `_2-đao-ham-cap-cao-cong-thuc-leibniz`; `_2-1-đao-ham-cap-cua-mot-so-ham-so-co-ban`; `_2-2-cong-thuc-leibniz-cho-tich-cua-hai-ham-so`; `_3-cac-đinh-ly-ve-gia-tri-trung-binh`; `_4-cong-thuc-taylor-maclaurin`; `_4-1-cong-thuc-tong-quat`; `_4-2-khai-trien-maclaurin-cua-cac-ham-chuan`; `_5-vi-du-bai-tap-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2023-2024`; `vi-du-2-đe-thi-kthp-2024-2025`; `doc-footer-aria-label` |
| `/calculus/03-tich-phan-va-ung-dung` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-3-phep-tinh-tich-phan-tong-riemann`; `_1-phuong-phap-tinh-nguyen-ham-tich-phan`; `_1-1-cong-thuc-tich-phan-tung-phan`; `_1-2-tich-phan-ham-phan-thuc-huu-ti`; `_2-đinh-nghia-tich-phan-xac-đinh-gioi-han-tong-riemann`; `_2-1-đinh-ly-tong-riemann`; `_3-cac-vi-du-trong-tam-tu-đe-thi-that`; `vi-du-1-đe-thi-kthp-2022-2023`; `vi-du-2-đe-thi-kthp-2024-2025`; `vi-du-3-đe-thi-kthp-2024-2025`; `doc-footer-aria-label` |
| `/calculus/04-tich-phan-suy-rong` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-4-tich-phan-suy-rong-loai-1-loai-2`; `_1-tich-phan-suy-rong-loai-1-can-vo-han`; `_1-1-đinh-nghia`; `_1-2-tich-phan-mau-loai-1-chuan-so-sanh`; `_1-3-tieu-chuan-so-sanh-cho-ham-so-khong-am`; `_2-tich-phan-suy-rong-loai-2-ham-khong-bi-chan`; `_2-1-đinh-nghia`; `_2-2-tich-phan-mau-loai-2`; `_3-cac-vi-du-mau-phuong-phap-giai`; `vi-du-1`; `vi-du-2`; `doc-footer-aria-label` |
| `/calculus/05-ly-thuyet-chuoi` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-5-ly-thuyet-chuoi-so-chuoi-luy-thua`; `_1-chuoi-so-đieu-kien-hoi-tu-co-ban`; `_1-1-đinh-nghia`; `_2-cac-tieu-chuan-hoi-tu-cho-chuoi-so-duong`; `_2-1-chuoi-chuan-riemann-chuoi-series`; `_2-2-tieu-chuan-d-alembert-ti-so`; `_2-3-tieu-chuan-can-cauchy`; `_3-chuoi-đan-dau-chuoi-co-dau-bat-ky`; `_3-1-tieu-chuan-leibniz-cho-chuoi-đan-dau`; `_3-2-hoi-tu-tuyet-đoi-ban-hoi-tu`; `_4-chuoi-luy-thua`; `ban-kinh-hoi-tu`; `_5-vi-du-mau`; `vi-du-1`; `vi-du-2`; `doc-footer-aria-label` |
| `/cheatsheet/cong-thuc-nhanh` | `main-nav-aria-label`; `sidebar-aria-label`; `⚡-so-tay-tra-cuu-cong-thuc-than-toc`; `_1-gioi-han-vo-cung-be-tuong-đuong`; `_2-bang-đao-ham-cap-cao-thuong-gap`; `_3-khai-trien-maclaurin-cot-loi`; `_4-tich-phan-tong-riemann`; `_5-tich-phan-suy-rong-chuoi-so`; `_6-ma-tran-đinh-thuc`; `_7-khong-gian-vecto-anh-xa-tuyen-tinh`; `doc-footer-aria-label` |
| `/cheatsheet/kien-thuc-thpt` | `main-nav-aria-label`; `sidebar-aria-label`; `🎒-on-tap-kien-thuc-nen-tang-thpt`; `_1-cong-thuc-luong-giac-bat-buoc-nho`; `_1-1-he-thuc-co-ban`; `_1-2-cong-thuc-cong-nhan-đoi`; `_1-3-cong-thuc-ha-bac-rat-hay-dung-khi-tinh-tich-phan`; `_2-cong-thuc-luy-thua-logarit`; `_2-1-luy-thua`; `_2-2-logarit`; `_3-bang-nguyen-ham-co-ban`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-1/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-1-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-2/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-2-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-3/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-3-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-4/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-4-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-5/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-5-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-6/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-6-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-7/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-7-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/hk-8/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-8-·-cong-nghe-giao-duc`; `doc-footer-aria-label` |
| `/chuong-trinh/cngd/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-giao-duc`; `chon-hoc-ky`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-1/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-1-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-2/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-2-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-3/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-3-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-4/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-4-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-5/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-5-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-6/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-6-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-7/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-7-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/hk-8/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-8-·-cong-nghe-thong-tin`; `doc-footer-aria-label` |
| `/chuong-trinh/cntt/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-thong-tin`; `chon-hoc-ky`; `doc-footer-aria-label` |
| `/chuong-trinh/` | `main-nav-aria-label`; `sidebar-aria-label`; `chuong-trinh-hoc`; `tra-cuu-theo-nhu-cau`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-1/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-1-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-2/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-2-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-3/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-3-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-4/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-4-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-5/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-5-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-6/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-6-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-7/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-7-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/hk-8/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-ky-8-·-su-pham-tin-hoc`; `doc-footer-aria-label` |
| `/chuong-trinh/sp-tin/` | `main-nav-aria-label`; `sidebar-aria-label`; `su-pham-tin-hoc`; `chon-hoc-ky`; `doc-footer-aria-label` |
| `/chuong-trinh/tra-cuu` | `main-nav-aria-label`; `sidebar-aria-label`; `tra-cuu-hoc-phan`; `doc-footer-aria-label` |
| `/discrete-math/buoi-1-logic-menh-de` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-1-co-so-logic-menh-đe-bang-chan-tri`; `_1-menh-đe-cac-phep-toan-logic-co-ban`; `_1-1-khai-niem-menh-đe`; `_1-2-bang-chan-tri-cac-phep-toan-logic`; `_2-cac-quy-luat-tuong-đuong-logic-quan-trong`; `_3-dang-chuan-tac-tuyen-dnf-hoi-cnf`; `_4-bai-tap-loi-giai-mau`; `bai-1`; `bai-2`; `doc-footer-aria-label` |
| `/discrete-math/buoi-2-vi-tu-quy-nap` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-2-vi-tu-quy-tac-suy-dien-quy-nap-toan-hoc`; `_1-logic-vi-tu-luong-tu`; `_1-1-vi-tu`; `_1-2-cac-luong-tu`; `_1-3-phu-đinh-menh-đe-chua-luong-tu-de-morgan-mo-rong`; `_2-cac-quy-tac-suy-dien-rules-of-inference`; `_3-nguyen-ly-quy-nap-toan-hoc-mathematical-induction`; `_4-bai-tap-mau`; `bai-1`; `doc-footer-aria-label` |
| `/discrete-math/buoi-3-tap-hop-anh-xa` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-3-ly-thuyet-tap-hop-anh-xa`; `_1-ly-thuyet-tap-hop`; `_1-1-cac-đinh-nghia-co-ban`; `_1-2-cac-phep-toan-tren-tap-hop`; `_1-3-nguyen-ly-bu-tru-inclusion-exclusion-principle`; `_2-anh-xa-ham-so`; `_2-1-phan-loai-anh-xa`; `_2-2-anh-xa-hop-thanh-composition`; `_3-bai-tap-mau`; `bai-1`; `bai-2`; `doc-footer-aria-label` |
| `/discrete-math/buoi-4-quan-he-dai-so-boole` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-4-quan-he-tuong-đuong-thu-tu-đai-so-boole`; `_1-quan-he-hai-ngoi-4-tinh-chat-co-ban`; `_2-quan-he-tuong-đuong-phan-hoach`; `_2-1-lop-tuong-đuong`; `_2-2-đinh-ly-phan-hoach`; `_3-quan-he-thu-tu-bieu-đo-hasse`; `_3-1-cac-phan-tu-đac-biet-trong-poset`; `_4-đai-so-boole-bang-karnaugh-k-map`; `_4-1-cau-truc-bang-karnaugh-thu-tu-ma-gray`; `_4-2-quy-tac-khoanh-nhom-k-map`; `_5-bai-tap-mau`; `bai-1`; `doc-footer-aria-label` |
| `/discrete-math/buoi-5-to-hop-dem` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-5-đai-so-to-hop-bai-toan-đem-nguyen-ly-dirichlet`; `_1-cac-quy-tac-đem-co-ban`; `_2-bang-phan-biet-cac-cau-hinh-to-hop`; `_3-nhi-thuc-newton-cac-đang-thuc-to-hop`; `_3-1-đinh-ly-nhi-thuc-newton`; `_3-2-mot-so-he-qua-kinh-đien`; `_4-nguyen-ly-long-chim-bo-cau-dirichlet`; `_4-1-dang-co-ban`; `_4-2-dang-mo-rong`; `_5-bai-tap-mau`; `bai-1`; `bai-2`; `doc-footer-aria-label` |
| `/discrete-math/buoi-6-he-thuc-truy-hoi` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-6-he-thuc-truy-hoi-phuong-trinh-sai-phan`; `_1-khai-niem-he-thuc-truy-hoi`; `_2-giai-he-thuc-tuyen-tinh-thuan-nhat-bac-2`; `_2-1-phuong-trinh-đac-trung`; `_2-2-cac-truong-hop-nghiem`; `_3-he-thuc-tuyen-tinh-khong-thuan-nhat`; `bang-du-đoan-nghiem-rieng-khi`; `_4-bai-tap-mau-tu-đe-thi-that`; `bai-1-đe-thi-kthp-toan-roi-rac`; `bai-2`; `doc-footer-aria-label` |
| `/discrete-math/buoi-7-ly-thuyet-do-thi` | `main-nav-aria-label`; `sidebar-aria-label`; `buoi-7-ly-thuyet-đo-thi-cac-thuat-toan-cot-loi`; `_1-cac-khai-niem-co-ban-ve-đo-thi`; `_1-1-bac-cua-đinh-bo-đe-bat-tay-handshaking-lemma`; `_1-2-bieu-dien-đo-thi`; `_2-đo-thi-euler-đo-thi-hamilton`; `_2-1-đo-thi-euler-đi-qua-moi-canh-đung-mot-lan`; `_2-2-đo-thi-hamilton-đi-qua-moi-đinh-đung-mot-lan`; `_3-cay-khung-nho-nhat-mst-minimum-spanning-tree`; `_3-1-thuat-toan-kruskal-uu-tien-canh-nho`; `_3-2-thuat-toan-prim-phat-trien-theo-cum-đinh`; `_4-thuat-toan-tim-đuong-đi-ngan-nhat-dijkstra`; `_5-bai-tap-mau`; `bai-1`; `bai-2`; `doc-footer-aria-label` |
| `/exams-discrete/gk-2022-2023` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-giua-ky-toan-roi-rac-nam-hoc-2022-–-2023`; `đe-bai-chinh-thuc`; `cau-1-2-5-điem`; `cau-2-2-5-điem`; `cau-3-2-5-điem`; `cau-4-2-5-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams-discrete/gk-2023-2024` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-giua-ky-toan-roi-rac-nam-hoc-2023-–-2024`; `đe-bai-chinh-thuc`; `cau-1-2-5-điem`; `cau-2-2-5-điem`; `cau-3-2-5-điem`; `cau-4-2-5-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams-discrete/kthp-2022-2023` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-ket-thuc-hoc-phan-toan-roi-rac-2022-–-2023`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-2-0-điem`; `cau-4-2-0-điem`; `cau-5-2-0-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams-discrete/kthp-2023-2024` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-ket-thuc-hoc-phan-toan-roi-rac-2023-–-2024`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-2-0-điem`; `cau-4-2-0-điem`; `cau-5-2-0-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams-discrete/kthp-2024-2025` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-ket-thuc-hoc-phan-toan-roi-rac-2024-–-2025`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-2-0-điem`; `cau-4-2-0-điem`; `cau-5-2-0-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams/de-2022-2023` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-ket-thuc-hoc-phan-nam-hoc-2022-–-2023`; `đe-bai-chinh-thuc`; `cau-1-4-0-điem`; `cau-2-2-0-điem`; `cau-3-4-0-điem`; `loi-giai-chi-tiet`; `loi-giai-cau-1`; `loi-giai-cau-2`; `loi-giai-cau-3`; `doc-footer-aria-label` |
| `/exams/de-2023-2024` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-ket-thuc-hoc-phan-nam-hoc-2023-–-2024`; `đe-bai-chinh-thuc`; `cau-1-2-0-điem`; `cau-2-2-0-điem`; `cau-3-1-0-điem`; `cau-4-1-0-điem`; `cau-5-2-0-điem`; `cau-6-2-0-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams/de-2024-2025` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-ket-thuc-hoc-phan-nam-hoc-2024-–-2025`; `đe-bai-chinh-thuc`; `cau-1-4-0-điem`; `cau-2-2-0-điem`; `cau-3-4-0-điem`; `loi-giai-chi-tiet`; `doc-footer-aria-label` |
| `/exams/de-tham-khao-co-dap-an` | `main-nav-aria-label`; `sidebar-aria-label`; `đe-thi-tham-khao-kem-barem-điem-chi-tiet`; `bang-đe-bai-thang-điem-chuan`; `cau-1-4-0-điem-phep-tinh-giai-tich`; `cau-2-3-0-điem-khong-gian-euclide`; `cau-3-3-0-điem-anh-xa-tuyen-tinh-tri-rieng`; `đap-an-huong-dan-cham-tung-buoc`; `doc-footer-aria-label` |
| `/exams/quiz-giua-ky` | `main-nav-aria-label`; `sidebar-aria-label`; `📝-trac-nghiem-on-thi-giua-ky-interactive-quiz`; `doc-footer-aria-label` |
| `/exercises/algebra` | `main-nav-aria-label`; `sidebar-aria-label`; `📚-tuyen-tap-bai-tap-đai-so-tuyen-tinh-kem-loi-giai`; `dang-1-đinh-thuc-bien-đoi-so-cap`; `bai-1-1`; `dang-2-bien-luan-he-phuong-trinh-tuyen-tinh`; `bai-2-1`; `dang-3-he-vecto-co-so-khong-gian-con`; `bai-3-1`; `dang-4-truc-chuan-hoa-gram-schmidt`; `bai-4-1`; `dang-5-cheo-hoa-ma-tran`; `bai-5-1`; `doc-footer-aria-label` |
| `/exercises/calculus` | `main-nav-aria-label`; `sidebar-aria-label`; `📚-tuyen-tap-bai-tap-giai-tich-kem-loi-giai`; `dang-1-gioi-han-vo-cung-be-tuong-đuong`; `bai-1-1`; `bai-1-2`; `dang-2-đao-ham-cap-cao-cong-thuc-leibniz`; `bai-2-1`; `dang-3-tich-phan-tich-phan-suy-rong`; `bai-3-1`; `bai-3-2`; `dang-4-chuoi-so-ban-kinh-hoi-tu`; `bai-4-1`; `doc-footer-aria-label` |
| `/exercises/` | `main-nav-aria-label`; `sidebar-aria-label`; `🎯-ngan-hang-bai-tap-phan-dang`; `🗂️-lua-chon-phan-luyen-tap`; `📈-bai-tap-giai-tich`; `🧮-bai-tap-đai-so-tuyen-tinh`; `doc-footer-aria-label` |
| `/hoc-lieu/` | `main-nav-aria-label`; `kho-hoc-lieu` |
| `/huong-dan` | `main-nav-aria-label`; `huong-dan-đong-gop`; `bat-đau-hoc`; `nguon-tai-lieu`; `ghi-chep-va-su-dung-tai-lieu`; `đong-gop-va-bao-loi`; `nhung-điem-đang-can-đoi-chieu` |
| `/` | `main-nav-aria-label`; `lookup-title`; `available-title` |
| `/khoa/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/khoa/khoa-49` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-49`; `doc-footer-aria-label` |
| `/khoa/khoa-50` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-50`; `doc-footer-aria-label` |
| `/khoa/khoa-51` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-51`; `doc-footer-aria-label` |
| `/khoa/khoa-52` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-52`; `doc-footer-aria-label` |
| `/khoa/nganh-cngd` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/khoa/nganh-cntt` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/khoa/nganh-sp-tin` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/khoa/tra-cuu-hoc-phan` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/comp1010/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-co-ban`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1011/` | `main-nav-aria-label`; `sidebar-aria-label`; `kien-truc-may-tinh-va-hop-ngu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1013/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-nang-cao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1015/` | `main-nav-aria-label`; `sidebar-aria-label`; `nhap-mon-mang-may-tinh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1016/` | `main-nav-aria-label`; `sidebar-aria-label`; `cau-truc-du-lieu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1017/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-huong-đoi-tuong`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1018/` | `main-nav-aria-label`; `sidebar-aria-label`; `co-so-du-lieu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1019/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-tren-windows`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1024/` | `main-nav-aria-label`; `sidebar-aria-label`; `cac-he-co-so-du-lieu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1031/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-web`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1032/` | `main-nav-aria-label`; `sidebar-aria-label`; `phan-tich-va-thiet-ke-he-thong-thong-tin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1040/` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-luan-tot-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1041/` | `main-nav-aria-label`; `sidebar-aria-label`; `co-so-du-lieu-nang-cao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1042/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-java`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1043/` | `main-nav-aria-label`; `sidebar-aria-label`; `he-thong-ma-nguon-mo`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1044/` | `main-nav-aria-label`; `sidebar-aria-label`; `nhap-mon-cong-nghe-phan-mem`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1046/` | `main-nav-aria-label`; `sidebar-aria-label`; `cac-he-co-so-tri-thuc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1047/` | `main-nav-aria-label`; `sidebar-aria-label`; `đo-hoa-may-tinh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1050/` | `main-nav-aria-label`; `sidebar-aria-label`; `xu-ly-anh-so`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1060/` | `main-nav-aria-label`; `sidebar-aria-label`; `phan-tich-thiet-ke-huong-đoi-tuong`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1064/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-net`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1065/` | `main-nav-aria-label`; `sidebar-aria-label`; `chuyen-đe-oracle`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1069/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-phan-mem-nang-cao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1071/` | `main-nav-aria-label`; `sidebar-aria-label`; `nghi-thuc-giao-tiep-mang-cisco-1`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1076/` | `main-nav-aria-label`; `sidebar-aria-label`; `quan-tri-mang-voi-linux`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1083/` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-luan-tot-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1084/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuong-mai-đien-tu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1085/` | `main-nav-aria-label`; `sidebar-aria-label`; `he-thong-quan-tri-doanh-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1304/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-ung-dung-tren-thiet-bi-di-đong`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1305/` | `main-nav-aria-label`; `sidebar-aria-label`; `quan-ly-du-an-cong-nghe-thong-tin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1306/` | `main-nav-aria-label`; `sidebar-aria-label`; `xay-dung-du-an-cong-nghe-thong-tin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1307/` | `main-nav-aria-label`; `sidebar-aria-label`; `kiem-thu-phan-mem-co-ban`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1308/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-ung-dung-tro-choi`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1309/` | `main-nav-aria-label`; `sidebar-aria-label`; `kiem-thu-phan-mem-nang-cao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1310/` | `main-nav-aria-label`; `sidebar-aria-label`; `he-tu-van-thong-tin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1311/` | `main-nav-aria-label`; `sidebar-aria-label`; `bao-mat-co-so-du-lieu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1313/` | `main-nav-aria-label`; `sidebar-aria-label`; `đien-toan-đam-may`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1314/` | `main-nav-aria-label`; `sidebar-aria-label`; `tri-tue-nhan-tao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1315/` | `main-nav-aria-label`; `sidebar-aria-label`; `khai-thac-du-lieu-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1318/` | `main-nav-aria-label`; `sidebar-aria-label`; `cac-phuong-phap-hoc-thong-ke`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1325/` | `main-nav-aria-label`; `sidebar-aria-label`; `may-hoc-nang-cao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1326/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-rap-cai-đat-va-bao-tri-may-tinh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1332/` | `main-nav-aria-label`; `sidebar-aria-label`; `he-đieu-hanh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1401/` | `main-nav-aria-label`; `sidebar-aria-label`; `phan-tich-va-thiet-ke-giai-thuat`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1410/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-nghe-nghiep-1`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1501/` | `main-nav-aria-label`; `sidebar-aria-label`; `xac-suat-thong-ke-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1502/` | `main-nav-aria-label`; `sidebar-aria-label`; `quy-hoach-tuyen-tinh-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1504/` | `main-nav-aria-label`; `sidebar-aria-label`; `thi-giac-may-tinh-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1701/` | `main-nav-aria-label`; `sidebar-aria-label`; `ly-thuyet-đo-thi-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1703/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-ung-dung-di-đong-nang-cao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1704/` | `main-nav-aria-label`; `sidebar-aria-label`; `nhap-mon-devops`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1709/` | `main-nav-aria-label`; `sidebar-aria-label`; `he-thong-nhung-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1712/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-may`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1714/` | `main-nav-aria-label`; `sidebar-aria-label`; `khai-thac-du-lieu-van-ban`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1715/` | `main-nav-aria-label`; `sidebar-aria-label`; `xu-ly-ngon-ngu-tu-nhien`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1800/` | `main-nav-aria-label`; `sidebar-aria-label`; `co-so-toan-trong-cong-nghe-thong-tin`; `ly-thuyet`; `bai-tap`; `đe-thi`; `trac-nghiem`; `cong-thuc`; `muc-tieu-hoc-tap`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1801/` | `main-nav-aria-label`; `sidebar-aria-label`; `toan-roi-rac-va-ung-dung`; `ly-thuyet`; `đe-thi`; `muc-tieu-hoc-tap`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1802/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-web`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1803/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-php`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1804/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-python`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1807/` | `main-nav-aria-label`; `sidebar-aria-label`; `ung-dung-cong-nghe-thong-tin-trong-day-hoc-mon-tin-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1808/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-hanh-day-hoc-mon-tin-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1809/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-hanh-nghe-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1810/` | `main-nav-aria-label`; `sidebar-aria-label`; `tri-tue-nhan-tao-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1811/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-nghe-nghiep-2`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1812/` | `main-nav-aria-label`; `sidebar-aria-label`; `tri-tue-nhan-tao-va-đinh-huong-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1813/` | `main-nav-aria-label`; `sidebar-aria-label`; `ho-so-tot-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1814/` | `main-nav-aria-label`; `sidebar-aria-label`; `san-pham-nghien-cuu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1816/` | `main-nav-aria-label`; `sidebar-aria-label`; `quan-tri-he-thong-thong-tin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1817/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-truc-quan-va-robotics`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1818/` | `main-nav-aria-label`; `sidebar-aria-label`; `phuong-phap-day-hoc-mon-tin-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1819/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-chuong-trinh-mon-tin-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1820/` | `main-nav-aria-label`; `sidebar-aria-label`; `đao-tao-đien-tu-e-learning-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1821/` | `main-nav-aria-label`; `sidebar-aria-label`; `day-hoc-lap-trinh-nang-cao-o-truong-pt`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1822/` | `main-nav-aria-label`; `sidebar-aria-label`; `day-hoc-chuyen-đe-hoc-tap-mon-tin-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1823/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-su-pham-1`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1824/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-su-pham-2`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1825/` | `main-nav-aria-label`; `sidebar-aria-label`; `to-chuc-day-hoc-chu-đe-stem-o-truong-pt`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1826/` | `main-nav-aria-label`; `sidebar-aria-label`; `ho-so-tot-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1827/` | `main-nav-aria-label`; `sidebar-aria-label`; `xac-suat-thong-ke-va-ung-dung-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1828/` | `main-nav-aria-label`; `sidebar-aria-label`; `kiem-tra-đanh-gia-trong-mon-tin-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/comp1829/` | `main-nav-aria-label`; `sidebar-aria-label`; `quan-ly-cong-viec-hieu-qua-theo-agile`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/doms0/` | `main-nav-aria-label`; `sidebar-aria-label`; `giao-duc-đoi-song`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1801/` | `main-nav-aria-label`; `sidebar-aria-label`; `tich-hop-cong-nghe-giao-duc-vao-day-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1802/` | `main-nav-aria-label`; `sidebar-aria-label`; `to-chuc-hoat-đong-day-hoc-va-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1803/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-giang-day-va-mo-hinh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1804/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-phan-mem-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1805/` | `main-nav-aria-label`; `sidebar-aria-label`; `phan-tich-du-lieu-hoc-tap-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1806/` | `main-nav-aria-label`; `sidebar-aria-label`; `e-learning-va-moi-truong-hoc-tap-ao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1807/` | `main-nav-aria-label`; `sidebar-aria-label`; `hoc-lieu-so-va-truyen-thong-đa-phuong-tien`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1808/` | `main-nav-aria-label`; `sidebar-aria-label`; `may-hoc-va-ai-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1811/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-day-hoc-voi-cac-cong-cu-thong-minh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1812/` | `main-nav-aria-label`; `sidebar-aria-label`; `lua-chon-cong-nghe-va-thiet-ke-hđ-truc-tuyen`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1813/` | `main-nav-aria-label`; `sidebar-aria-label`; `day-hoc-phan-hoa-va-tich-hop`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1815/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-noi-dung-bai-giang-tuong-tac`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1816/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-cong-cu-kiem-tra-đanh-gia`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1817/` | `main-nav-aria-label`; `sidebar-aria-label`; `day-hoc-voi-cac-cong-cu-đa-phuong-tien`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1821/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-va-bien-tap-video-so`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1822/` | `main-nav-aria-label`; `sidebar-aria-label`; `bien-tap-va-xuat-ban-noi-dung-hoc-lieu-so`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1823/` | `main-nav-aria-label`; `sidebar-aria-label`; `tuong-tac-nguoi-may-va-ung-dung-trong-gd`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1825/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-đo-hoa-thong-tin-va-hoat-hinh-2d`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1826/` | `main-nav-aria-label`; `sidebar-aria-label`; `robotics-va-lap-trinh-truc-quan`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1827/` | `main-nav-aria-label`; `sidebar-aria-label`; `thiet-ke-va-lap-trinh-web-đon-gian`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1831/` | `main-nav-aria-label`; `sidebar-aria-label`; `quan-tri-he-thong-đao-tao-truc-tuyen`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1833/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-ung-dung-dua-tren-cong-cu-ai`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1834/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-di-đong-va-ung-dung-trong-gd`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1835/` | `main-nav-aria-label`; `sidebar-aria-label`; `tro-choi-hoc-tap-va-mo-phong-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1836/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-nghe-thuc-te-ao-thuc-te-tang-cuong-vr-ar-va-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1837/` | `main-nav-aria-label`; `sidebar-aria-label`; `cloud-computing-va-ung-dung-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1840/` | `main-nav-aria-label`; `sidebar-aria-label`; `nhap-mon-cong-nghe-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1841/` | `main-nav-aria-label`; `sidebar-aria-label`; `giao-duc-hoc-đai-cuong`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1842/` | `main-nav-aria-label`; `sidebar-aria-label`; `đanh-gia-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1843/` | `main-nav-aria-label`; `sidebar-aria-label`; `phat-trien-chuong-trinh-cong-nghe-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1844/` | `main-nav-aria-label`; `sidebar-aria-label`; `lap-trinh-co-ban-va-thiet-ke-phan-mem`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1845/` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-hoc-du-lieu-va-ung-dung-trong-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1846/` | `main-nav-aria-label`; `sidebar-aria-label`; `mang-may-tinh-va-internet`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1847/` | `main-nav-aria-label`; `sidebar-aria-label`; `to-chuc-su-kien-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1849/` | `main-nav-aria-label`; `sidebar-aria-label`; `tieng-anh-chuyen-nganh-cong-nghe-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1850/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-hanh-nghe-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1851/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-nghe-nghiep-1`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1852/` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-nghe-nghiep-2`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1860/` | `main-nav-aria-label`; `sidebar-aria-label`; `lanh-đao-va-quan-li-lop-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1861/` | `main-nav-aria-label`; `sidebar-aria-label`; `phuong-tien-va-thiet-bi-day-hoc-trong-moi-truong-so`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1862/` | `main-nav-aria-label`; `sidebar-aria-label`; `an-ninh-mang-va-bao-mat-du-lieu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1863/` | `main-nav-aria-label`; `sidebar-aria-label`; `phan-tich-va-thiet-ke-httt-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1864/` | `main-nav-aria-label`; `sidebar-aria-label`; `khoa-luan-tot-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1865/` | `main-nav-aria-label`; `sidebar-aria-label`; `ho-so-tot-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edte1866/` | `main-nav-aria-label`; `sidebar-aria-label`; `san-pham-nghien-cuu`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/educ1810/` | `main-nav-aria-label`; `sidebar-aria-label`; `dich-vu-giao-duc-trong-to-chuc-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/educ2801/` | `main-nav-aria-label`; `sidebar-aria-label`; `phuong-phap-hoc-tap-hieu-qua`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/educ2802/` | `main-nav-aria-label`; `sidebar-aria-label`; `giao-duc-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/educ2803/` | `main-nav-aria-label`; `sidebar-aria-label`; `khoi-nghiep-va-giao-duc-khoi-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edut2801/` | `main-nav-aria-label`; `sidebar-aria-label`; `phuong-phap-nghien-cuu-khoa-hoc-va-su-pham-ung-dung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/edut2802/` | `main-nav-aria-label`; `sidebar-aria-label`; `đai-cuong-ve-li-luan-day-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/hk1/comp1010` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk1/comp1802` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk1/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk2/comp1013` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk2/comp1017` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk2/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk3/comp1016` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk3/comp1018` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk3/comp1019` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk3/comp1501` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk3/comp1701` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk3/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk4/comp1011` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk4/comp1015` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk4/comp1332` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk4/comp1401` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk4/comp1829` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk4/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk5/comp1044` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk5/comp1060` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk5/comp1314` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk5/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk6/comp1502` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk6/comp1803` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk6/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk7/comp1410` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk7/comp1809` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk7/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk7/psyc2803` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/hk8/comp1411` | `main-nav-aria-label`; `sidebar-aria-label`; `thuc-tap-nghe-nghiep-2-comp1411`; `🎯-muc-tieu-mon-hoc`; `📖-ke-hoach-hoc-tap-tai-lieu`; `📝-đong-gop-tai-lieu`; `doc-footer-aria-label` |
| `/mon-hoc/hk8/comp1808` | `main-nav-aria-label`; `sidebar-aria-label`; `ho-so-tot-nghiep-comp1808`; `🎯-muc-tieu-mon-hoc`; `📖-ke-hoach-hoc-tap-tai-lieu`; `📝-đong-gop-tai-lieu`; `doc-footer-aria-label` |
| `/mon-hoc/hk8/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/` | `main-nav-aria-label`; `sidebar-aria-label`; `trang-đa-chuyen-vi-tri`; `doc-footer-aria-label` |
| `/mon-hoc/math1703/` | `main-nav-aria-label`; `sidebar-aria-label`; `xac-suat-thong-ke`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/mili2701/` | `main-nav-aria-label`; `sidebar-aria-label`; `đuong-loi-quoc-phong-va-an-ninh-cua-đcsvn`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/mili2702/` | `main-nav-aria-label`; `sidebar-aria-label`; `cong-tac-quoc-phong-va-an-ninh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/mili2703/` | `main-nav-aria-label`; `sidebar-aria-label`; `quan-su-chung`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/mili2704/` | `main-nav-aria-label`; `sidebar-aria-label`; `ky-thuat-chien-đau-bo-binh-va-chien-thuat`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/phyl2401/` | `main-nav-aria-label`; `sidebar-aria-label`; `giao-duc-the-chat-1-the-duc-đien-kinh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/phyl2/` | `main-nav-aria-label`; `sidebar-aria-label`; `giao-duc-the-chat-2`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/phyl3/` | `main-nav-aria-label`; `sidebar-aria-label`; `giao-duc-the-chat-3`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/poli1903/` | `main-nav-aria-label`; `sidebar-aria-label`; `phap-luat-đai-cuong`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/poli2001/` | `main-nav-aria-label`; `sidebar-aria-label`; `triet-hoc-mac-–-lenin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/poli2002/` | `main-nav-aria-label`; `sidebar-aria-label`; `kinh-te-chinh-tri-hoc-mac-lenin`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/poli2003/` | `main-nav-aria-label`; `sidebar-aria-label`; `chu-nghia-xa-hoi-khoa-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/poli2004/` | `main-nav-aria-label`; `sidebar-aria-label`; `lich-su-đang-cong-san-viet-nam`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/poli2005/` | `main-nav-aria-label`; `sidebar-aria-label`; `tu-tuong-ho-chi-minh`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/psyc1001/` | `main-nav-aria-label`; `sidebar-aria-label`; `tam-ly-hoc-đai-cuong`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/psyc1493/` | `main-nav-aria-label`; `sidebar-aria-label`; `ky-nang-thich-ung-va-giai-quyet-van-đe`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/psyc2801/` | `main-nav-aria-label`; `sidebar-aria-label`; `ky-nang-lam-viec-nhom-va-tu-duy-sang-tao`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/psyc2802/` | `main-nav-aria-label`; `sidebar-aria-label`; `tam-ly-hoc-giao-duc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/psyc2803/` | `main-nav-aria-label`; `sidebar-aria-label`; `khoi-nghiep`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/psyc2804/` | `main-nav-aria-label`; `sidebar-aria-label`; `phuong-phap-nghien-cuu-khoa-hoc`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/mon-hoc/tech1802/` | `main-nav-aria-label`; `sidebar-aria-label`; `co-so-vat-li`; `thong-tin-hoc-phan`; `doc-footer-aria-label` |
| `/roadmap` | `main-nav-aria-label`; `🗺️-lo-trinh-on-tap-toan-dien-2-mon-toan-fit-hcmue`; `phan-a-co-so-toan-trong-cntt-comp1800`; `📅-giai-đoan-1-giai-tich-ham-mot-bien-6-buoi`; `📅-giai-đoan-2-đai-so-tuyen-tinh-dang-toan-phuong-6-chuyen-đe`; `📅-giai-đoan-3-luyen-đe-thi-co-so-toan`; `phan-b-toan-roi-rac-va-ung-dung-comp1801`; `📅-ly-thuyet-7-buoi-hoc-trong-tam`; `📅-luyen-đe-thi-toan-roi-rac` |

## Phụ lục H — 28 data-task-key và nhãn hiện tại

Storage: `fit-hcmue:roadmap:v1`. Thứ tự theo roadmap và checklist-keys.json.

| Thứ tự | Key | Nhãn source |
| --- | --- | --- |
| 1 | `5z4qje` | **Buổi 1 - giới hạn và tính liên tục:** Dãy số, Weierstrass, vô cùng bé tương đương, dạng vô định $1^\infty, \left[\frac{0}{0}\right]$, quy tắc L'Hospital, khảo sát tính liên tục. |
| 2 | `954ot8` | **Buổi 2 - vi phân và đạo hàm cấp cao:** Bảng đạo hàm sơ cấp, đạo hàm hàm hợp, công thức Leibniz $(uv)^{(n)}$, định lý Fermat, Rolle, Lagrange, Cauchy. |
| 3 | `1lem4bu` | **Buổi 3 - khai triển Taylor và Maclaurin:** Bảng khai triển Maclaurin của $e^x, \sin x, \cos x, \ln(1+x), (1+x)^\alpha$, ứng dụng tính giới hạn và xấp xỉ. |
| 4 | `1twpc7k` | **Buổi 4 - phép tính tích phân:** Đổi biến, từng phần, tích phân phân thức hữu tỉ, định nghĩa tổng Riemann. |
| 5 | `hw5iom` | **Buổi 5 - tích phân suy rộng:** Phân biệt loại 1 (cận vô hạn) và loại 2 (hàm không bị chặn), tiêu chuẩn so sánh với tích phân chuẩn $\alpha$. |
| 6 | `wztcnn` | **Buổi 6 - lý thuyết chuỗi:** Chuỗi số dương (D'Alembert, Cauchy), chuỗi đan dấu (tiêu chuẩn Leibniz), chuỗi lũy thừa và bán kính hội tụ $R$. |
| 7 | `1ai3324` | **Chuyên đề 1 - ma trận và định thức:** Nhân ma trận, ma trận nghịch đảo $A^{-1}$ (phụ hợp và Gauss-Jordan), các tính chất định thức, hạng ma trận. |
| 8 | `1232ivk` | **Chuyên đề 2 - hệ phương trình tuyến tính:** Định lý Kronecker-Capelli, phương pháp Cramer, phương pháp khử Gauss, hệ thuần nhất $AX = 0$. |
| 9 | `ud3tfc` | **Chuyên đề 3 - không gian vectơ:** Hệ sinh, độc lập/phụ thuộc tuyến tính, cơ sở, số chiều, tọa độ và ma trận chuyển cơ sở $P_{E \to F}$. |
| 10 | `tt4pt5` | **Chuyên đề 4 - không gian Euclide:** Tích vô hướng (4 tiên đề), độ dài (chuẩn), góc giữa 2 vectơ, trực chuẩn hóa Gram - Schmidt. |
| 11 | `10hg59r` | **Chuyên đề 5 - ánh xạ tuyến tính và chéo hóa:** Nhân $\ker(f)$, ảnh $\text{Im}(f)$, đa thức đặc trưng, trị riêng, vectơ riêng, điều kiện chéo hóa. |
| 12 | `bxyl6h` | **Chuyên đề 6 - dạng toàn phương:** Ma trận đối xứng thực, đưa về dạng chính tắc bằng phương pháp Lagrange và biến đổi trực giao, tiêu chuẩn Sylvester xét dấu. |
| 13 | `1xuw05w` | Giải đề **[KTHP 2022 - 2023](/exams/de-2022-2023)** (120 phút). |
| 14 | `wv7sho` | Giải đề **[KTHP 2023 - 2024](/exams/de-2023-2024)** (120 phút). |
| 15 | `1kgnv9w` | Giải đề **[KTHP 2024 - 2025](/exams/de-2024-2025)** (90 phút). |
| 16 | `1w9pha9` | Giải đề **[Đề tham khảo kèm hướng dẫn chấm điểm](/exams/de-tham-khao-co-dap-an)**. |
| 17 | `13mkogg` | **[Buổi 1: Cơ sở logic mệnh đề và bảng chân trị](/discrete-math/buoi-1-logic-menh-de)**: Các phép toán logic, phép kéo theo $p \to q$, luật De Morgan, luật phân phối, dạng chuẩn tắc DNF/CNF. |
| 18 | `17ax189` | **[Buổi 2: Vị từ, quy tắc suy diễn và quy nạp toán học](/discrete-math/buoi-2-vi-tu-quy-nap)**: Lượng từ $\forall, \exists$, các quy tắc suy diễn (Modus Ponens, Modus Tollens, tam đoạn luận), chứng minh quy nạp toán học. |
| 19 | `1bj9og` | **[Buổi 3: Lý thuyết tập hợp và ánh xạ](/discrete-math/buoi-3-tap-hop-anh-xa)**: Tập con, tập lũy thừa $2^n$, nguyên lý bù trừ, đơn ánh, toàn ánh, song ánh và hàm ngược. |
| 20 | `g8rco` | **[Buổi 4: Quan hệ tương đương, thứ tự và đại số Boole](/discrete-math/buoi-4-quan-he-dai-so-boole)**: 4 tính chất của quan hệ, quan hệ tương đương và lớp tương đương, quan hệ thứ tự và biểu đồ Hasse, tối thiểu hóa hàm Boole bằng bảng Karnaugh (K-map). |
| 21 | `1yizq3h` | **[Buổi 5: Đại số tổ hợp, bài toán đếm và nguyên lý Dirichlet](/discrete-math/buoi-5-to-hop-dem)**: Quy tắc cộng/nhân, hoán vị, chỉnh hợp, tổ hợp, tổ hợp lặp (chia kẹo Euler), nguyên lý lồng chim bồ câu Dirichlet. |
| 22 | `8kwq9` | **[Buổi 6: Hệ thức truy hồi và phương trình sai phân](/discrete-math/buoi-6-he-thuc-truy-hoi)**: Phương trình đặc trưng bậc 2 thuần nhất và không thuần nhất, xác định hằng số từ điều kiện ban đầu. |
| 23 | `xb2hfw` | **[Buổi 7: Lý thuyết đồ thị và các thuật toán cốt lõi](/discrete-math/buoi-7-ly-thuyet-do-thi)**: Bậc của đỉnh, định lý bắt tay, chu trình Euler và Hamilton, thuật toán Dijkstra tìm đường đi ngắn nhất, thuật toán Kruskal và Prim tìm cây khung nhỏ nhất (MST). |
| 24 | `1e2lc0t` | Đề thi giữa kỳ: **[GK 2022 - 2023](/exams-discrete/gk-2022-2023)**. |
| 25 | `1pckd4x` | Đề thi giữa kỳ: **[GK 2023 - 2024](/exams-discrete/gk-2023-2024)**. |
| 26 | `jvehpm` | Đề thi kết thúc học phần: **[KTHP 2022 - 2023 kèm lời giải](/exams-discrete/kthp-2022-2023)**. |
| 27 | `1tqzzta` | Đề thi kết thúc học phần: **[KTHP 2023 - 2024 kèm lời giải](/exams-discrete/kthp-2023-2024)**. |
| 28 | `mlbwhm` | Đề thi kết thúc học phần: **[KTHP 2024 - 2025 kèm lời giải](/exams-discrete/kthp-2024-2025)**. |
