# Kho học liệu FIT HCMUE — platform

Ứng dụng Nuxt độc lập với website VitePress đang phục vụ tại `../docs`. Frontend, API Nitro, PostgreSQL/Drizzle và Better Auth dùng cùng một ứng dụng. Website cũ và workflow xuất bản cũ được giữ nguyên trong giai đoạn kiểm chứng.

## Chạy ngay tại máy

Yêu cầu Node 24, npm 11, PostgreSQL 16 native và Chrome. Với máy Windows hiện tại đã có PostgreSQL tại `C:/Program Files/PostgreSQL/16/bin`:

```sh
cd platform
npm ci
npm run build
npm run local
```

Mở `http://127.0.0.1:3100`. Lệnh `local` tạo một cluster PostgreSQL riêng trong `.data/local-development`, tự sinh cấu hình riêng tư, chạy migration và nhập học liệu dạng nháp. Chạy lại giữ dữ liệu. Không sử dụng hoặc chỉnh service PostgreSQL đã có. Ctrl+C dừng ứng dụng và cluster do phiên này khởi động. Không xóa `.data` nếu cần giữ dữ liệu.

Nếu PostgreSQL ở vị trí khác, đặt `PG_BIN` tới thư mục bin. Linux không chạy initdb bằng root. `PORTAL_LOCAL_PORT` đổi cổng giao diện; giữ cùng cổng cho email callback trong một đợt thử.

Không tạo sẵn sinh viên, mật khẩu chung hoặc tài khoản đã xác thực. Người chưa đăng nhập vẫn xem được danh mục. Bài đã nhập cần được duyệt, vì vậy chưa có quyền đọc không phải lỗi mất nội dung.

## Phát triển với database tự cấu hình

Sao chép `.env.example` thành `.env`, điền DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET ngẫu nhiên ít nhất 32 byte và cấu hình SMTP. Không đưa secrets vào NUXT_PUBLIC hoặc Git.

```sh
npm run db:migrate
npm run content:check
npm run content:import
npm run dev
```

Trong terminal khác cùng môi trường:

```sh
npm run worker
npm run admin:init -- --email EMAIL_THAT --name "Ten quan tri"
```

`admin:init` chỉ thêm lời mời đầu tiên vào danh sách được phép và xếp email vào hàng đợi; không tạo mật khẩu hay bỏ qua xác thực. Sau khi xác thực email, quản trị phải bật MFA trước khi dùng trang quản trị. Worker cần chạy để gửi thư, dựng bài đóng góp và kiểm tra tệp. SMTP chưa cấu hình hoặc scanner lỗi không được coi là thành công.

Khi dùng `npm run local`, cấu hình database và secret nằm trong `.data/local-development/profile.json`, không dùng `.env` database ngoài để quản trị nhầm cluster. Cần cấu hình email và danh sách thật trước khi sử dụng với sinh viên; bản local mặc định dùng để xem và phát triển giao diện. Sau khi điền SMTP_URL/MAIL_FROM trong .env, giữ local đang chạy và dùng hai terminal khác:

```sh
npm run local:worker
npm run local:admin -- --email EMAIL_THAT --name "Ten quan tri"
```

Hai lệnh này tự đọc đúng cấu hình cluster local riêng tư; không cần chép mật khẩu database vào terminal. Việc xác thực email và MFA vẫn bắt buộc.

## Chức năng

- Danh mục ba ngành, tám học kỳ, khóa và môn; tín chỉ và loại học phần thuộc từng chương trình.
- Đọc bài, tìm kiếm, quiz và tệp có kiểm tra quyền server; khách chỉ nhận metadata.
- Đăng ký theo cặp email–MSSV trong CSV, xác thực email; đăng nhập bằng email hoặc MSSV; đặt lại mật khẩu, quản lý phiên, MFA.
- Tiến độ có kiểm tra phiên bản, bookmark, lịch sử quiz và nhập checklist không ghi đè.
- Markdown, công thức web, xem trước, đóng góp, hàng đợi duyệt, phiên bản và báo lỗi.
- Upload PDF/PNG/JPEG/WebP vào khu cách ly; kiểm tra định dạng, kích thước, checksum, mã độc và quyền tải từng phần.
- Quản trị danh sách sinh viên, phân quyền, chương trình, học liệu, nhật ký và tác vụ nền.

Nhập CSV với cột `mssv,email,name,major,class,cohort`. Mỗi lần phải xem trước; email và MSSV đã ghép với người khác sẽ bị từ chối. Không dùng MSSV để tự xác nhận danh tính. Tài khoản biên tập được mời riêng.

## Kiểm tra

```sh
npm run lint
npm run typecheck
npm run content:check
npm run test:integration
npm run test:browser
npm run test:business
```

`test:business` cần bản build hiện tại. Tự tạo cluster riêng, migration/import thật, tài khoản fixture ở miền `.invalid`, kiểm email xác thực trong outbox, MFA TOTP, API, browser và pg_dump/pg_restore. Các fixture chỉ tồn tại trong cluster thử riêng; không phải nghiệm thu danh sách sinh viên hay gửi email production. Scanner lỗi được kiểm thử theo nguyên tắc giữ cách ly; chưa thay thế thử nghiệm ClamAV thật.

`test:browser` chạy server riêng cổng 4319, không tái dùng dev server. `PLAYWRIGHT_CHANNEL=chromium` nếu dùng Chromium. Ảnh nằm trong `test-results`, không được commit. Các báo cáo bước 00–02 giữ nguyên làm lịch sử, không dùng số liệu cũ làm kết quả hiện tại.

## Tài liệu vận hành

- [API và phân quyền](docs/API.md), [OpenAPI](public/openapi.json).
- [Triển khai, backup và chuyển đổi](docs/DEPLOYMENT.md).
- [Báo cáo triển khai hiện tại](docs/IMPLEMENTATION_REPORT.md).

Không chạy script migrate.py cũ. Không phục vụ content-archive, source Markdown hoặc .data qua thư mục public. Không đổi repository/Pages trước khi có hệ thống thay thế đã nghiệm thu.

Giao diện, các tab và cách kiểm tra sáng/tối: [INTERFACE.md](docs/INTERFACE.md).
