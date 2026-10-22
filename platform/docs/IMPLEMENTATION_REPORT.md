# Báo cáo triển khai platform

Ngày22/10/2026, múi giờ Asia/Bangkok. Phát triển trên phần platform bước01–02 có sẵn. Báo cáo này không thay thế hoặc sửa các audit/bản lưu trước đó.

## Đã triển khai

- Frontend Nuxt/Vue, API Nitro,28 bảng PostgreSQL qua Drizzle và3 migration SQL có phiên bản; không reset database.
- Better Auth: roster email–MSSV, email xác thực, đăng nhập email/MSSV, mật khẩu, phiên, TOTP/mã dự phòng; MFA bắt buộc cho quản trị/biên tập.
- Sinh viên đọc bài đã xuất bản, tìm môn và nội dung có quyền, lưu tài liệu, tiến độ có version, checklist, quiz chấm server và lịch sử.
- Đóng góp Markdown, xem trước, phiên bản bất biến, worker dựng nội dung; editor không tự duyệt. Quyền sử dụng, xác minh học thuật và xuất bản độc lập.
- Upload private/quarantine, magic bytes, checksum, giới hạn, ClamAV INSTREAM, kiểm tra quyền khi tải và HTTP Range. Scanner lỗi không được đánh dấu clean.
- Quản trị CSV có xem trước, sửa hồ sơ có thu hồi phiên và xác thực lại email, khóa tài khoản/phân quyền, chương trình, học liệu, nhật ký và tác vụ nền.
- Docker app/ops, Compose production, Caddy, systemd timers, pg_dump/restic và công cụ restore vào database mới trống. Có workflow kiểm platform riêng; không tự đưa production lên khi push.
- Native local launcher tạo cluster riêng và cấu hình bị ignore, giữ nguyên service PostgreSQL hiện có, không tạo sẵn tài khoản xác thực.

## Nội dung và tương thích

Đối chiếu hiện tại:3 ngành,155 môn,217 phân bổ,87 học liệu,28 key checklist,10 câu quiz và40 alias (gồm4 trang khóa). Import nguyên UTF-8, hash từng bài, giữ Markdown nguồn riêng tư và dựng HTML an toàn. Import lặp không tạo bản sao hoặc xuất bản nháp. Các trang hỗ trợ cũng được lưu để đối chiếu.77 đường dẫn lịch sử và387 anchor trong fixture được giữ ở bài hoặc điểm tương thích tại đích chuyển tiếp.

Các cảnh báo học thuật và mã môn không bị xóa.55 bài bổ sung vẫn là bài biên soạn/bài tập tuyển chọn; không tuyên bố đã chuyển nguyên vẹn mọi ví dụ của1.288 trang nguồn. Không đưa content-archive vào public, API hoặc image ứng dụng.

## Bằng chứng kiểm tra tại máy

- Kiểm dữ liệu và bảo toàn website cũ:16/16 đạt.
- Lint và typecheck strict: đạt; production build đạt.
- HTTP integration:6/6; browser nền tảng:3/3.
- Business runner:14 nhóm end-to-end với PostgreSQL16 thật và cluster cô lập. Bao gồm import/hash/anchor/77 routes, đăng ký+xác thực, MFA khi đăng nhập lại, throttling, quyền đọc/CSRF, quiz, tiến độ/xung đột, ownership, publish gate, scanner unavailable, tải Range, khóa tài khoản, sửa định danh và pg_dump/pg_restore.
- Browser có cookie phiên thật, bốn kích thước360/768/1280/1440 và hai giao diện. Có chấm quiz bằng radio/nút thật, làm lại, checklist sau reload và kiểm công thức ở nền tối. Ảnh nằm trong test-results bị ignore.

Các fixture email .invalid và việc xác nhận scan bằng dữ liệu test chỉ phục vụ kiểm thử trong cluster riêng. Không dùng chúng làm danh sách sinh viên thật hoặc bằng chứng đã gửi email/diệt mã độc production.

## Chưa nghiệm thu vận hành thật

Chủ dự án xác nhận chưa có VPS/tên miền. Chưa có SMTP production, danh sách sinh viên và kho backup ngoài máy chủ. Vì vậy chưa triển khai production, chưa đổi tên/quyền repository, chưa thay GitHub Pages và chưa cấp tài khoản thật. Local Windows chưa có Docker Engine; chạy container/Caddy/ClamAV và restic ngoài VPS cần kiểm riêng ở môi trường Linux. pg_dump/restore đã chạy thật, không đồng nghĩa RPO24giờ/RTO4giờ đã đạt cho toàn hệ thống.

Kiểm npm audit đã phát hiện advisory trong cây dependency Nuxt/build, gồm braces/node-forge và esbuild nhánh cũ của tooling; không tự hạ Nuxt theo gợi ý audit fix --force. Đã khóa override xmldom0.9.12. Cần rà bản vá và phạm vi ảnh hưởng của image trước phát hành production, không khẳng định cây dependency không còn cảnh báo.

Hướng dẫn tiếp theo trong README, API.md và DEPLOYMENT.md. Chỉ cutover sau kiểm chứng container, email thực, roster thực, quyền chia sẻ, backup ngoài máy chủ và khôi phục toàn bộ.
