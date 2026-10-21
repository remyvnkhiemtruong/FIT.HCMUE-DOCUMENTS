# Bộ nguồn ngày 20/10/2026

Nguồn: thư mục người dùng cung cấp `drive-download-20261020T172414Z-1-001`.
Có 55 tệp PDF, tổng cộng 1.288 trang. PDF gốc không được tải lên website.

- `sources.json`: đường dẫn tương đối, SHA-256 của tệp gốc, số trang, metadata
  và bài web tương ứng.
- `extracted-pages.json`: văn bản trích theo từng trang của toàn bộ 55 tệp,
  phục vụ tra cứu và đối chiếu. Đây không phải bản LaTeX chính xác: PDF có thể
  làm mất vị trí số mũ, phân số, hình vẽ hoặc dùng mã phông riêng.
- `docs/bo-sung/`: bài viết lại bằng Markdown, LaTeX và khối mã. Có tóm lược
  lý thuyết, ví dụ và bài tập tuyển chọn; không tuyên bố chép đủ từng ví dụ,
  hình vẽ hoặc câu hỏi của 1.288 trang.

Các tài liệu đại số tuyến tính và một số chương tổ hợp có bìa ghi Đại học
Khoa học Tự nhiên TP. Hồ Chí Minh. Không suy ra nguồn HCMUE chỉ từ việc tài
liệu được cung cấp cho website. Các bộ lý thuyết số và lý thuyết nhóm chưa
được gán mã học phần hay vị trí trong chương trình.

Các điểm cần đối chiếu riêng:

1. Nhóm, chương 2 phần 2, câu 1c: kết luận về cấp của tích thiếu điều kiện
   giao hoán; có phản ví dụ trong S3. Bài web có cảnh báo.
2. Nhóm, chương 2 phần 3, câu 4a: “it is similar to K” không xác định rõ
   quan hệ. Không chép lại thành một khẳng định đẳng cấu sai.
3. Tệp tham khảo chương 7, bài đệ quy 5: gợi ý `n! + C` không thỏa điều kiện
   đầu `a0 = C`. Bài web giữ lưu ý thay vì xác nhận đáp án.
4. Tệp ôn tập chương 1–2, tổ hợp cơ bản và tệp tham khảo chương 7 dùng
   phông cũ, khiến văn bản trích bị sai mã. Không xuất bản phần trích lỗi.
5. Hướng dẫn thực hành đường đi có mục “cập nhật sau” trong PDF. Bài web
   ghi rõ nguồn không có hướng dẫn Maple hoàn chỉnh ở phần đó.

Các ví dụ hoặc đoạn Python được biên soạn thêm được ghi rõ trong bài.
Không gắn nhãn lời giải chính thức hay nguồn đã xác minh.
