# Kho học liệu FIT HCMUE

Kho học liệu tiếng Việt xây bằng VitePress, tổ chức theo **Ngành → Học kỳ → Môn → Học liệu**. Chạy tĩnh trên GitHub Pages tại tiền tố `/FIT.HCMUE-DOCUMENTS/`.

## Khởi chạy và kiểm tra

Yêu cầu Node.js 24 trở lên.

```sh
npm ci
npm run dev
npm run check
npm run check:types
npm run build
npm run check:links
npm run test:browser
npm run preview
```

`test:browser` dùng Chrome đã cài trên máy và tự mở máy chủ xem trước ở cổng 4173. Chạy sau `build`. Để dùng Chromium trên CI, đặt `PLAYWRIGHT_CHANNEL=chromium` và cài bằng `npx playwright install --with-deps chromium`.

## Cấu trúc chính

- `docs/.vitepress/data/catalog.mts`: môn học, ngành, phiên bản chương trình, vị trí môn, khóa và học liệu. Đây là nguồn dữ liệu dùng chung cho điều hướng, bảng chương trình và bộ lọc.
- `docs/.vitepress/page-content.mts`: mẫu Markdown cho trang môn, ngành và học kỳ.
- `docs/mon-hoc/[course]/index.paths.ts` và `docs/chuong-trinh/[program].paths.ts`: tạo trang tĩnh từ dữ liệu; không phải chỉnh hàng trăm trang bằng tay.
- `docs/.vitepress/theme/components/`: trang chủ, bộ lọc, ngữ cảnh bài học, quiz và checklist.
- Các thư mục `calculus`, `algebra`, `discrete-math`, `exams`, `exams-discrete`, `exercises`, `cheatsheet`: nội dung Markdown gốc, giữ đường dẫn.
- `content-archive/`: bản gốc 77 trang, mã băm, nhật ký chuyển đổi và các khác biệt dữ liệu. Thư mục này không được xuất bản lên website.

## Thêm hoặc sửa học phần

1. Thêm môn vào `courses`, gồm mã duy nhất, tên, mô tả và đường dẫn `/mon-hoc/{ma-viet-thuong}/`.
2. Thêm từng vị trí vào `placements`: ngành, phiên bản chương trình, mã môn, học kỳ, tín chỉ, loại học phần, nguồn và trạng thái xác minh. Tín chỉ và loại học phần thuộc chương trình của ngành, không gắn cứng vào môn.
3. Không tạo bản sao trang môn theo ngành. Các ngành dùng chung một mã sẽ dẫn tới cùng trang môn.
4. Chạy kiểm tra dữ liệu, kiểu và bản dựng. Các trang và bảng được sinh tự động.

## Thêm học liệu

1. Viết một trang Markdown trong thư mục nội dung thích hợp; dùng LaTeX cho công thức, không nhúng PDF.
2. Thêm một mục `resources` với `id` ổn định, mã môn, loại, nhóm, tiêu đề, thứ tự, đường dẫn, nguồn và trạng thái.
3. Có thể dùng `ly-thuyet`, `bai-tap`, `de-thi`, `trac-nghiem`, `cong-thuc`. Thêm `year` dạng `2024-2025` cho đề thi có năm xác định.
4. Nguồn phải mô tả đúng tài liệu thật. Không gắn nhãn đã xác minh nếu chưa đối chiếu.
5. Trang môn, bộ lọc và sidebar tự cập nhật. `order` xác định thứ tự đọc và liên kết trước/sau trong cùng môn.

`quiz.json` giữ nguyên câu hỏi, lựa chọn, đáp án và giải thích. `quiz.data.ts` chuyển công thức thành HTML toán học trong lúc dựng trang; trình duyệt chỉ tải quiz khi cần.

## Khóa và năm học

Cập nhật `academicYear` là năm bắt đầu năm học. Năm thứ của khóa được tính từ `startYear`. `programs` liên kết khóa với phiên bản chương trình theo ngành. Hiện toàn bộ chương trình được đánh dấu chưa xác minh; chọn khóa cung cấp bối cảnh, không suy ra HK1/HK2 hoặc giới hạn học phần.

Khi có chương trình chính thức mới, tạo phiên bản và gắn nguồn trước khi cập nhật ánh xạ khóa; không sửa hồi tố dữ liệu cũ mà mất dấu vết.

## Bảo toàn nội dung và đường dẫn

77 đường dẫn cũ còn được dựng. Trang cũ đã thay thế có trang chuyển tiếp cùng liên kết dự phòng khi không có JavaScript; query và fragment được giữ khi chuyển trang. Các bài học, bài tập và đề thi giữ nguyên nội dung gốc; quiz giữ toàn bộ dữ liệu câu hỏi.

Hai trang cũ COMP1808 ở HK8 và COMP1411 được giữ kèm cảnh báo, do mã hoặc tên không thống nhất với bảng ngành. Toán rời rạc trong lộ trình được sửa từ COMP1802 sang COMP1801 theo bảng hiện có; vẫn cần đối chiếu đề cương chính thức. Xem `content-archive/data-issues.json`.

`scripts/migrate.py` là công cụ chuyển đổi một lần từ cây gốc. Không chạy lại trên dự án đã chuyển đổi. Không sửa `original-pages.json`; bản này phục vụ đối chiếu và khôi phục nội dung trước đây.

## Kiểm thử và xuất bản

- `check`: kiểm tra quan hệ dữ liệu, mã trùng, 3 ngành × 8 học kỳ, tìm kiếm tiếng Việt, bộ lọc, khác biệt theo ngành, 77 đường dẫn gốc và bảo toàn bài học/quiz.
- `check:types`: kiểm tra TypeScript và các thành phần Vue.
- `check:links`: đọc toàn bộ HTML đã dựng, kiểm tra liên kết, anchor, tài nguyên và tiền tố GitHub Pages.
- `test:browser`: kiểm tra luồng học, URL bộ lọc, chuyển trang cũ, tìm kiếm toàn trang không dấu, quiz, checklist, lưu trữ bị chặn và bố cục 360/768/1280/1440 px ở cả hai chế độ sáng/tối; kiểm tra logo, tương phản chữ, viền điều khiển và focus.

Chỉ có `.github/workflows/deploy.yml` xuất bản VitePress khi đẩy vào `main`. Workflow kiểm tra dữ liệu, kiểu, bản dựng và liên kết trước khi tải sản phẩm lên Pages. Chưa đẩy mã hoặc xuất bản chỉ bằng việc chỉnh sửa dự án trên máy.

Giao diện lấy màu xanh từ logo trường và khoa, hỗ trợ tối và in; cho phép chọn chữ, sao chép, chuột phải và các phím trình duyệt. Quyền sử dụng từng tài liệu phụ thuộc tác giả/nguồn, không suy từ giấy phép mã nguồn.

## Tải học liệu toán

Công thức được dựng sẵn bằng MathJax, không tải bộ máy MathJax trên trình duyệt. SVG dùng bộ đệm glyph trong từng công thức để giảm lặp; quiz và bộ lọc được tải theo nhu cầu. Tắt tải trước các trang liên kết để danh mục nhiều công thức không chiếm băng thông của bài đang mở. Các trang công thức dài vẫn có thể phát cảnh báo gói JavaScript lớn hơn 500 kB trước nén. Ở bản chuyển đổi, trang lớn nhất giảm từ khoảng 963 kB xuống 753 kB trước nén (khoảng 79 kB khi gzip); nội dung bài học được giữ nguyên. Cảnh báo này không được che bằng cách tăng ngưỡng cảnh báo.

## Nhận diện và giao diện

Hai ảnh nguyên bản nằm ở `docs/public/brand/logo-truong.png` và `logo-khoa.png`. Giữ tỷ lệ và màu ảnh; không áp dụng bộ lọc đảo màu cho chế độ tối. `BrandIdentity.vue` sử dụng cùng hai tài nguyên trong header trên mọi trang.

Màu gốc: trường `#0054A6`, khoa `#00668F`, vàng `#FDB813` và đỏ `#EC2028` trong logo. Các biến màu trong `custom.css` định nghĩa riêng nền, chữ, viền, liên kết và hành động cho light/dark mode. Khi sửa màu, chạy bộ kiểm tra tương phản ở cả hai chế độ.

`ThemeToggle.vue` sử dụng trạng thái giao diện của VitePress, đồng thời dựng lại nút sau khi khởi tạo để `aria-checked` khớp lựa chọn đã lưu. Nút hỗ trợ Enter/Space và dùng tùy chọn hệ thống khi người dùng chưa tự chọn giao diện.

Sau mỗi lần build lại, dừng và khởi động lại `npm run preview`. Máy chủ xem trước có thể giữ danh sách tài nguyên từ bản dựng cũ, dẫn tới lỗi 404 cho tệp JavaScript có tên băm mới. Kiểm tra trang cùng các tài nguyên tải qua HTTP trước khi chia sẻ bản xem trước.
