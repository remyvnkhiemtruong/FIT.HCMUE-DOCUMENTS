# Giao diện cổng học liệu

Cập nhật ngày 23/10/2026. Website tĩnh và platform dùng cùng nhận diện, nhưng giữ bộ dựng và phạm vi truy cập riêng.

## Thành phần và trạng thái

- `SectionTabs` nhận danh sách `{ id, name }`, giá trị đang chọn, nhãn và ID cố định. Mũi tên trái/phải, Home/End di chuyển focus; Enter hoặc Space chọn tab. Các tab dùng chung một panel có nhãn theo tab đang chọn.
- Platform dùng `useSectionTab`: tham số `tab` được thêm vào URL, giữ các tham số khác và hash; lựa chọn không hợp lệ quay về tab mặc định. Nút quay lại và tải lại khôi phục lựa chọn.
- Website tĩnh dùng `CourseMaterials` bọc các mục Markdown hiện có. Mọi nhóm vẫn có trong HTML và bản in. Liên kết mục lục/anchor tự mở nhóm chứa đích; không đổi tên heading hoặc đường dẫn.
- Trang môn platform lấy đủ các trang metadata của môn trước khi chia nhóm, chuẩn hóa mã URL thành mã môn viết hoa khi gọi API. Không tải nội dung bài để dựng tab.
- Thẻ xác thực giữ các bước đăng ký, xác thực email, khôi phục mật khẩu, TOTP và mã dự phòng. Website tĩnh không có biểu mẫu đăng nhập hoặc liên kết tới platform chưa được triển khai.
- Tài khoản chia thành hồ sơ, đã lưu, tiến độ, lịch sử luyện tập và bảo mật. Quản trị dùng các tab theo quyền hiện có; bỏ kết quả tải cũ nếu người dùng đã chuyển tab.

## Màu và chuyển động

Các tệp `interface.css` bổ sung cho theme hiện có. Màu nền/chữ/viền/nút lấy từ biến của từng chế độ, logo giữ nguyên ảnh gốc. Biên điều khiển tách khỏi đường phân cách để giữ tương phản.

Hiệu ứng hover/nhấn 160 ms, đổi panel 220 ms, chuyển trang 300–320 ms và xuất hiện theo nhóm 340 ms. Chuyển trang không chờ hiệu ứng; bài không bị remount chỉ để chạy hiệu ứng. Không dùng thư viện hoạt ảnh. `prefers-reduced-motion` tắt chuyển động; nội dung mặc định vẫn hiện khi JavaScript không chạy. Công thức dài cuộn trong vùng riêng, kể cả công thức nội dòng.

## Kiểm tra và xem trước

- Website tĩnh: kiểm dữ liệu/bảo toàn, kiểu dữ liệu, build, kiểm liên kết và browser. Các bài kiểm mới nằm trong `tests/browser/interface.spec.ts` ở thư mục gốc.
- Platform: lint, kiểu dữ liệu, build, 6 HTTP integration, 7 browser và 14 nhóm business với PostgreSQL cô lập. Business runner kiểm biểu mẫu đăng nhập, MFA, tab tài khoản/môn/quản trị, báo lỗi, quiz và checklist.
- Ảnh chụp trong `test-results/static-*.png` và `platform/test-results/platform-*.png`, gồm 360, 768, 1280, 1440 px, sáng và tối. Thư mục ảnh bị Git ignore; tài khoản và nội dung thử nghiệm chỉ nằm trong database cô lập.
- Kiểm tương phản tự động đo màu thực tế của chữ, nút, nhãn, biên input và focus trên trang chủ/trang môn/trang đọc hoặc thẻ đăng nhập; ngưỡng chữ 4,5:1 và điều khiển/focus 3:1. Kiểm này lấy mẫu các trạng thái chính, không thay thế rà soát trợ năng toàn bộ website.
- `npm run local` trong platform mở bản tại máy ở cổng 3100, dùng database riêng và học liệu nhập ở trạng thái nháp. Không tạo sẵn tài khoản thật hoặc tự xuất bản bài.

Giới hạn triển khai: chưa có VPS, tên miền và SMTP production. GitHub Pages tiếp tục phục vụ website tĩnh công khai; platform giữ trên nhánh/PR và bản xem trước tại máy. Không đổi API, schema database hoặc quyền repository trong đợt giao diện.
