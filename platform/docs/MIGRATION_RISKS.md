# Rủi ro chuyển đổi và dữ liệu bắt buộc giữ

Source baseline: `233575eed1caacf55e2a8e9baf6aa4ee587a0db0`, 21/10/2026. Mức độ dưới đây phục vụ lập kế hoạch, không đồng nghĩa đã phát hiện exploit hoặc sự cố production. Không sửa lỗi hoặc migration nào trong bước 00.

| ID / ưu tiên | Bằng chứng / rủi ro | Kiểm soát đề xuất và tiêu chí xác minh |
| --- | --- | --- |
| R01 / Cao | 77 legacy entries; redirect bằng JavaScript; fragment chỉ được chép, không map | Inventory routes/anchors trong LEGACY_AUDIT là contract; kiểm clean/.html/index/base/query/hash/no-JS và anchor ở đích cuối trước cutover |
| R02 / Cao | 387 editorial anchors không đại diện mọi anchor snapshot gốc; test bỏ template | Giữ explicit Unicode/emoji IDs, generated headings và span ID; bổ sung kiểm anchor gốc từ archive riêng, không coi current PASS là lịch sử đầy đủ |
| R03 / Cao | Markdown/LaTeX/code/đề thi có protected-content fixtures | Import nguyên UTF-8, không qua WYSIWYG làm đổi TeX; so hash và protected tokens, số liệu, đề bài, đáp án, snapshot render |
| R04 / Cao | 217 placements có credits/requirement theo ngành | FK/unique major-version-course-term; không đưa credits vào Course; so đủ records và raw values sau import thử |
| R05 / Cao | Toàn bộ chương trình và học liệu chưa verified | Giữ false/source và cảnh báo; tách xác minh học thuật, bản quyền và duyệt xuất bản; cấm tự publish khi import |
| R06 / Cao | `content-archive` có bài gốc nhưng ngoài docs | Không thêm vào public/, search index, S3 public, build assets/API public; kiểm archive paths và nội dung snapshot không rò sang artifact |
| R07 / Cao khi mở đóng góp | Markdown có raw HTML/Vue; Quiz v-html chưa có sanitizer riêng | Không compile Vue/script do user gửi; allowlist HTML/SVG/URL và giới hạn math render tài nguyên; test XSS payload, protocol, preview/public parity |
| R08 / Cao khi có upload | Chưa có storage/upload hoặc moderation | Bucket private/quarantine, size/type magic-byte check, checksum, scan; chỉ quyền backend mới đọc; không public trước duyệt và quyền phân phối |
| R09 / Cao khi có auth | Chưa có tài khoản/session/RBAC | Chọn thư viện sau xác minh; server session + HttpOnly cookie, hash password, CSRF/rate limit, ownership/scope policies; test 401/403/IDOR mọi mutation |
| R10 / Vừa | 28 task key, localStorage theo origin | Giữ key + schema v1, import chủ động không ghi đè; có chính sách conflict và consent khi đồng bộ; không tự giả định đọc được origin cũ |
| R11 / Vừa | Quiz 10 câu, answer có trong bundle, attempt chỉ RAM | Giữ quiz revision và option ID; quyết định ôn tập hay đánh giá trước thiết kế attempt; backend scoring nếu cần integrity |
| R12 / Vừa | SVG toán, build warning >500 kB, tắt prefetch | Đo bundle/page/gzip và render memory/time; cache hash/renderer version, lazy code; không bỏ công thức hoặc tăng ngưỡng để che warning |
| R13 / Vừa | useData/withBase/router hook và selector VP phụ thuộc framework | Port adapter SSR-safe, test hydration, query/history, dark/print/accessibility; tránh mang workaround VitePress vào Nuxt |
| R14 / Vừa | Năm học 2026, tám kỳ, ba ngành hardcode | Metadata có version; không suy học kỳ từ cohort; ngày/năm học cấu hình explicit, không tính hồi tố sai |
| R15 / Vừa | Action deploy main không path filter, không trigger PR | Docs-only push main vẫn có thể kích hoạt legacy deploy; bước này không push. Platform cần CI/hosting riêng, giữ legacy kiểm tra và quyền tối thiểu |
| R16 / Vừa | Chưa có DB/migration/backup | Import dry-run có report/hash/external keys và transaction/idempotency; restore rehearsal trước real import; cấm reset database hoặc migrate.py cũ |
| R17 / Vừa | .gitignore chặn PDF chứ không có giấy phép từng bài | ISC ở package không cấp quyền bài học/logo; thu evidence và visibility/license metadata từng resource trước public mới |
| R18 / Thấp–Vừa | Các actions dùng tag, dependency ranges khóa bằng lock, không có lint | Pin/review dependency và CI policies ở bước phù hợp; chưa chạy CVE scan nên không khẳng định dependencies an toàn |

## Các mâu thuẫn dữ liệu đã được ghi trong repository

Nguồn: `content-archive/data-issues.json` gồm tám mục:

1. PHYL2401/cntt: lookup `Bắt buộc/Tự chọn`, selected `Tự chọn`, một tín chỉ, kỳ 1.
2. PHYL2401/sp-tin: tương tự, selected `Tự chọn`.
3. PHYL2401/cngd: selected `Bắt buộc`, một tín chỉ, kỳ 1.
4. COMP1712/cntt: lookup `Tự chọn/Bắt buộc`, selected `Tự chọn`, ba tín chỉ, kỳ 5.
5. COMP1032/sp-tin: lookup `Bắt buộc/Tự chọn`, selected `Bắt buộc`, ba tín chỉ, kỳ 6.
6. COMP1801: roadmap gốc ghi COMP1802; hiện chuẩn hóa tạm theo bảng ngành/lookup; bài và đề cũ vẫn có mã cần đối chiếu.
7. COMP1808: trang HK8 ghi Hồ sơ tốt nghiệp, bảng SP Tin ghi Thực hành dạy học môn Tin học HK7. Giữ warning page, không tự gộp.
8. COMP1411: trang HK8 ghi Thực tập nghề nghiệp 2, bảng ngành dùng COMP1811. Chưa xác nhận tương đương.

Audit thấy thêm hai giá trị mơ hồ đang còn trong catalog (khác các selected nêu trên): COMP1712/sp-tin/HK5 là `Tự chọn/Bắt buộc`; COMP1032/cntt/HK6 là `Bắt buộc/Tự chọn`. Phải giữ raw value và đánh dấu cần xác minh, không tự suy từ ngành khác.

`content-archive/editorial-review.md` ghi cần rà lời giải `exams/de-2022-2023.md` câu 1d (phân thức/nguyên hàm), câu 3a (cơ sở không gian zero), và mã môn Toán rời rạc. Chưa sửa toán trong audit. Build/test bảo toàn PASS chỉ xác nhận giống baseline, không chứng nhận lời giải đúng.

## Hợp đồng bảo toàn trước mọi migration sau này

- Giữ 155 code/path môn, 217 placements đầy đủ nguồn và phiên bản, ba ngành, bốn khóa và mapping.
- Giữ 32 resource IDs, path, title khớp H1, kind/section/year/order/source/status/verified; không đánh đồng số môn với số học liệu.
- Giữ 83 tệp Markdown gồm cả template/redirect/warning, 77 snapshot/hash/ledger entries và năm tệp trong data (catalog.mts, filtering.mts, quiz.json, quiz.data.ts, checklist-keys.json); các interface nằm trong catalog.
- Giữ công thức, code fence/inline code, số liệu đề/bài, quiz question/options/answer/explanation; giữ 28 task keys và localStorage v1 contract.
- Giữ routes/anchors kể cả Unicode, emoji, .html và trailing slash conventions; query ưu tiên target và cảnh báo cần đối chiếu. Lập map riêng cho anchor lịch sử chưa được test.
- Giữ hai logo nguyên tỷ lệ/màu, focus/contrast, chế độ sáng/tối/in, copy/select và hỗ trợ storage bị chặn.

## Phụ thuộc cần giải quyết ở bước được giao

Chương trình/đề cương và mã môn cần người có thẩm quyền cung cấp bằng chứng chính thức. Quyền chia sẻ cần evidence theo tài liệu. Nuxt/Prisma/auth cần kiểm tra tài liệu và proof-of-compatibility; S3/host/PostgreSQL cần môi trường riêng. Quy trình phản biện/duyệt, phạm vi vai trò khoa/trường, chuyển domain/base URL, thời gian lưu upload/attempt và kế hoạch chuyển tiến độ cần quyết định sản phẩm. Các phụ thuộc này không ngăn hoàn thành audit và chưa được biến thành chức năng mới.
