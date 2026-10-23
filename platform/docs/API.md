# API và ranh giới phân quyền

Contract OpenAPI 3.1 ở `public/openapi.json`; frontend sử dụng DTO trong `shared/types/platform.ts`. API có cùng origin với ứng dụng. Các thao tác POST/PUT/PATCH/DELETE yêu cầu Origin khớp BETTER_AUTH_URL. 400 cho đầu vào sai; 401 chưa đăng nhập; 403 thiếu quyền hoặc MFA; 404 không tồn tại/chưa được phép đọc; 409 xung đột phiên bản/trạng thái; 413 quá giới hạn; 503 dịch vụ chưa sẵn sàng. Lỗi không trả DSN, driver stack hay secrets.

## Xác thực

`/api/auth/*` gắn trực tiếp Better Auth. Sử dụng sign-up/email, sign-in/email, verify-email, request-password-reset, reset-password, change-password, sign-out, list-sessions, revoke-session và các endpoint two-factor. API gốc xác thực email và mật khẩu; wrapper sign-in/email nhận trường email là MSSV và chỉ ánh xạ phía server. Đăng ký bổ sung studentId, đối chiếu đúng cặp trong roster. Không chấp nhận role từ client.

Thư viện giữ cookie HttpOnly, SameSite=Lax; Secure trên HTTPS. IP rate limit lấy từ x-forwarded-for do Caddy ghi; không mở app trực tiếp ra Internet hoặc tin header do client gửi qua proxy cấu hình sai. Caddy giới hạn body kể cả chunked; app kiểm content-length và upload đếm byte thực tế. GET me kiểm database mỗi lần, không dùng role trong cookie cache.

## Danh mục và nội dung

GET catalog/resources/resolve và me công khai, không có nội dung bài/đáp án/tệp. resources có q/course/major/term/topic/kind/year/page, 15 kết quả/trang, bộ lọc major+term nằm trên cùng placement. Đóng góp chưa duyệt không lộ tiêu đề công khai; metadata học liệu cũ có thể hiển thị chờ biên tập.

GET resources/:id, support?path, roadmap và quiz yêu cầu tài khoản hợp lệ. Server chỉ trả phiên bản được resource.published_revision trỏ tới. Không có API công khai trả source Markdown. Khách tìm metadata; người đã đăng nhập có thể tìm trong nội dung bản đã xuất bản. Ưu tiên mã môn chính xác rồi tiêu đề; không đưa snippet riêng tư ra ngoài. Kind dùng mã hiện có: ly-thuyet, bai-tap, de-thi, cong-thuc, trac-nghiem.

## Dữ liệu học tập

PUT progress/:key nhận complete và version. Tạo mới dùng version=0; cập nhật phải khớp version trả về. Sai version trả409, không áp dụng last-write-wins. Bookmark dùng PUT/DELETE bookmarks/:id. GET me/state và me/export chỉ trả dữ liệu chủ tài khoản. POST me/import nhận schema=1, progress=[{key,complete}], commit=false để xem trước, true để ghi; chỉ thêm key checklist chưa có. Không ghi đè tiến độ cũ.

POST quiz/attempts nhận revision và answers theo ID câu hỏi; server kiểm đủ đáp án, chấm theo dữ liệu phiên bản rồi mới trả lời giải. GET quiz không có answer/explanation. Lượt làm là luyện tập, không phải điểm chính thức.

## Đóng góp và tệp

POST contributions tạo nháp; PUT contributions/:id yêu cầu version và ownership; chỉ sửa draft/changes_requested. POST :id/submit tạo revision bất biến và render job. Preview dùng cùng renderer/sanitizer. Không thực thi Vue/script trong Markdown.

POST files?contribution=ID gửi binary với X-File-Name đã encodeURIComponent. PDF tối đa50MiB, ảnh tối đa10MiB; tối đa10 tệp/đóng góp, ngưỡng quota1GiB/người. Tệp lưu tên UUID ngoài public, pending cho tới khi ClamAV kết luận. Chỉ tác giả được xem tệp clean của mình hoặc người học được xem tệp clean, approved gắn đúng revision hiện đang xuất bản. Hỗ trợ Range một khoảng, 206 hoặc416. Không dùng URL lưu trữ trực tiếp.

## Quản trị

Admin/editor cần MFA để truy cập admin APIs. Editor không quản lý roster/users/invite/audit/jobs và không tự duyệt revision của mình. Admin có thể xuất bản trực tiếp. Publish yêu cầu HTML đã dựng, quyền chia sẻ được xác nhận và toàn bộ tệp đính kèm clean. Review ghi actor, nhận xét, trạng thái và bằng chứng; academicVerified riêng với rights và publication.

GET admin/revisions/users/reports/audit/jobs và contributions có page, trả items/total/page/pageSize với50 kết quả mỗi trang. Màn hình quản trị có chuyển trang. Lịch sử tài khoản hiển thị100 lượt gần nhất; xuất JSON không cắt lịch sử. Admin cập nhật tài khoản sẽ thu hồi mọi phiên; không tự khóa/hạ quyền tài khoản đang quản trị. Email/MSSV không được tự đổi qua API Better Auth.

PUT admin/profile nhận currentId,studentId,email,name,major,className,cohort, chỉ dành cho quản trị có MFA. Đổi cặp định danh có transaction, giữ user ID/tiến độ, thu hồi phiên và token đặt lại mật khẩu cũ. Đổi email đặt emailVerified=false và xếp thư xác thực mới. Không tự thay đổi vai trò hoặc kích hoạt tài khoản đang khóa. GET admin/roster hỗ trợ phân trang để đối chiếu cả hồ sơ chưa tạo tài khoản.
