---
title: "Cây, cây khung và phép duyệt"
---

# Cây, cây khung và phép duyệt

## Cây và rừng

Cây là đồ thị vô hướng liên thông không chu trình; rừng không có chu trình nhưng có thể nhiều thành phần. Với đồ thị đơn $n\ge1$ đỉnh, các tính chất sau tương đương: là cây; liên thông có $n-1$ cạnh; không chu trình có $n-1$ cạnh; có đúng một đường đi đơn giữa mỗi cặp đỉnh.

Mỗi cây có ít nhất hai đỉnh bậc $1$ nếu có từ hai đỉnh trở lên. Bỏ một lá và cạnh kề là cách thường dùng cho chứng minh quy nạp.

## Cây khung và trọng số

Cây khung chứa toàn bộ đỉnh của đồ thị và là một cây. Mọi đồ thị vô hướng liên thông có cây khung. Đồ thị đầy đủ $K_n$ có $n^{n-2}$ cây khung khi $n\ge2$, theo công thức Cayley.

Kruskal chọn cạnh tăng dần và bỏ cạnh tạo chu trình. Prim bắt đầu từ một đỉnh rồi chọn cạnh nhẹ nhất nối phần đã chọn với phần chưa chọn. Cả hai dùng tính chất lát cắt; trọng số bằng nhau có thể tạo nhiều kết quả tối ưu.

## Cây có gốc

Chọn gốc làm phát sinh quan hệ cha, con, tổ tiên, hậu duệ. Cây nhị phân có vị trí con trái và con phải, không chỉ là cây mà mỗi đỉnh có tối đa hai cạnh kề. Chiều cao phải theo quy ước đếm cạnh hay đếm đỉnh đã ghi trong bài.

## Duyệt cây và cây biểu thức

- Duyệt trước: gốc, cây con trái, cây con phải.
- Duyệt giữa: cây con trái, gốc, cây con phải.
- Duyệt sau: cây con trái, cây con phải, gốc.

Cây biểu thức có toán tử ở nút trong, toán hạng ở lá. Duyệt trước cho tiền tố, duyệt sau cho hậu tố; dạng trung tố cần ngoặc để giữ thứ tự phép toán.

## Kiểm tra

Với cây $n$ đỉnh, tổng bậc bằng $2(n-1)$. Một cây khung nhỏ nhất không nhất thiết là cây các đường đi ngắn nhất từ một đỉnh nguồn.

## Nguồn tài liệu

- `Chuong 2. Cay.pdf` · 64 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
