# Triển khai và chuyển đổi

## Điều kiện trước khi xuất bản

Cần VPS Linux, tên miền, SMTP gửi được email xác thực, danh sách email–MSSV từ nguồn được phép và kho backup ngoài máy chủ. Chủ dự án hiện chưa có VPS/tên miền, nên chưa thực hiện cutover hoặc thay đổi quyền repository.

Dự kiến2vCPU/8GiB/80GiB. Phải đo lại dung lượng, tải và scanner trước khi chọn gói. App chạy cổng3000 trong network Docker, chỉ Caddy mở80/443. Database không publish port. App không có đường phục vụ tệp nguồn/public uploads. Staging phải được chặn truy cập bằng firewall/VPN trước khi cấp DNS; robots không phải cơ chế bảo vệ.

## Image, cấu hình và migration

Workflow platform.yml chạy lint/types/content/integration/browser/business; workflow_dispatch có thể tạo hai image app/ops theo SHA. Không có bước tự triển khai production khi push. Trước phát hành cần image build và smoke container đạt trên Linux, xác minh tag/digest thực tế. Local Windows chưa có Docker Engine nên không coi Compose config hoặc native PostgreSQL là bằng chứng chạy container.

Sao chép .env.production.example thành .env.production, điền secrets tại VPS với quyền file0600. APP_IMAGE/OPS_IMAGE dùng image theo commit, không dùng latest. DATABASE_URL có hostname postgres. BETTER_AUTH_URL dùng đúng https://tên-miền. Secrets và backup password lưu bản an toàn ngoài VPS, không trong Git. Khởi tạo kho restic mã hóa từ trước bằng restic init, dùng kho riêng cho hệ thống này.

```sh
docker compose --env-file .env.production -f docker-compose.production.yml up -d postgres
docker compose --env-file .env.production -f docker-compose.production.yml --profile ops run --rm ops node --import tsx scripts/migrate.ts
```

Import nội dung chạy từ checkout riêng tư có cả docs và platform, kết nối PostgreSQL qua SSH tunnel bằng tài khoản migration giới hạn. Không mở cổng database công khai và không chép archive vào image/public:

```sh
npm run content:check
npm run content:import
```

Kiểm manifest, hash, số lượng và cảnh báo sau import. Tất cả bài ở nháp. Không dùng UPDATE hàng loạt để bỏ bước duyệt. Sau đó khởi động app/worker/scanner/proxy và kiểm /api/health/database:

```sh
docker compose --env-file .env.production -f docker-compose.production.yml up -d app worker scanner proxy
```

Mời quản trị đầu tiên qua ops với admin:init, cấu hình SMTP, xác thực email và MFA. Nhập roster bằng CSV qua quản trị, xem trước rồi mới ghi. Thử bằng tài khoản nghiệm thu được phép trước khi mở sinh viên. Không tự biến fixture test thành tài khoản thật.

## Sao lưu và khôi phục

scripts/backup.mjs dùng pg_dump16 và restic; mã hóa, lưu ngoài VPS, giữ14 bản ngày/8 bản tuần, kiểm tra dữ liệu một phần mỗi Chủ nhật. Cấu hình RESTIC_REPOSITORY/RESTIC_PASSWORD và thông tin truy cập kho trong env. Script chỉ ghi marker thành công sau khi backup và retention đạt. Không dùng chung restic host/repository với hệ thống khác.

Cài hai cặp service/timer trong deploy vào systemd, điều chỉnh WorkingDirectory nếu khác /opt/fit-hcmue/platform, bật timer backup và monitor. Monitor kiểm HTTP/database, tệp backup mới, dung lượng và jobs chậm/lỗi. ALERT_WEBHOOK_URL là đích HTTPS do chủ dự án tự cấu hình; nếu chưa có, lỗi được ghi qua systemd và cần người vận hành theo dõi.

Khôi phục vào database mới trống bằng scripts/restore.mjs và RESTORE_DATABASE_URL riêng; không drop/reset database cũ. Khôi phục uploads từ cùng snapshot restic, kiểm checksum, migration, số tài liệu, đọc bài có quyền, quiz và tiến độ. pg_dump/pg_restore đã được diễn tập native; restic/S3 và khôi phục toàn bộ VPS cần diễn tập ở môi trường vận hành. Mục tiêu RPO24giờ/RTO4giờ chỉ được xác nhận sau diễn tập đó.

## Chuyển từ GitHub Pages

Chỉ thực hiện khi platform được nghiệm thu và có backup: đóng băng biên tập ngắn, chốt manifest, nhập bản cuối, kiểm links/hash/anchor và thử tài khoản. Đổi repository hiện có thành FIT.HCMUE-PLATFORM riêng tư. Tạo repository công khai FIT.HCMUE-DOCUMENTS mới chỉ chứa trang dẫn/redirect và manifest đường dẫn, không mang lịch sử bài học. Giữ query/hash và quay lại bài sau đăng nhập. Không thể thu hồi fork hoặc bản tải trước đó.

Không có script tự đổi tên, đổi visibility hoặc xóa Pages hiện tại. Các thao tác này phụ thuộc URL production và kết quả nghiệm thu, chưa đủ điều kiện hiện nay.

## Quay lui

Giữ SHA image trước và backup trước migration. Ưu tiên migration bổ sung tương thích; khi ứng dụng lỗi, quay về image trước nếu schema tương thích. Nếu cần khôi phục DB, đưa hệ thống vào bảo trì, phục hồi sang database mới, đối chiếu uploads rồi mới chuyển kết nối. Không tự chạy migration ngược hoặc ghi đè database đang có bài làm mới.

## Nguồn kỹ thuật đã đối chiếu

- [Better Auth tích hợp Nuxt](https://better-auth.com/docs/integrations/nuxt), [Drizzle adapter](https://better-auth.com/docs/adapters/drizzle), [MFA](https://better-auth.com/docs/plugins/2fa).
- [PostgreSQL16 unaccent](https://www.postgresql.org/docs/16/unaccent.html).
- [Caddy request body limit](https://caddyserver.com/docs/caddyfile/directives/request_body).
- [ClamAV Docker và cổng clamd3310](https://github.com/Cisco-Talos/clamav/blob/main/README.Docker.md).
