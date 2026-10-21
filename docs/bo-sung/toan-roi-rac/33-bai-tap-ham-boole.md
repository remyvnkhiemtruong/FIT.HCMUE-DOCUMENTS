---
title: "Bài tập hàm Boole"
---

# Bài tập hàm Boole

## Bảng chân trị và số lượng hàm Boole

Một hàm Boole $n$ biến có $2^n$ dòng đầu vào; tự do chọn giá trị tại mỗi dòng cho $2^{2^n}$ hàm. Khi có điều kiện đối xứng, các dòng nằm trong cùng một quỹ đạo phải nhận cùng giá trị.

## Bài tập tuyển chọn từ nguồn

1. Đếm hàm hai biến thỏa $f(x,y)=f(y,x)$.
2. Đếm hàm ba biến thỏa $f(x,y,z)=f(y,z,x)$.
3. Xét hàm sáu biến không phụ thuộc biến đầu, hoặc không phụ thuộc ba biến đầu.
4. Tìm dạng nối rời chính tắc của $f(x,y,z)=\bar x\lor\bar y\lor x(y\lor z)$.
5. Bài thi có bốn câu $A,B,C,D$, điểm tối đa tương ứng $8,5,4,3$. Mỗi câu đúng nhận toàn bộ điểm, sai nhận $0$. Đặt biến Boole cho việc trả lời đúng; lập hàm nhận $1$ khi tổng điểm ít nhất $10$.
6. Rút gọn hàm bằng Karnaugh và dựng mạng cổng NOT, AND, OR.

::: details Hướng dẫn bài 1 và bài 5
Ở bài 1 có ba lớp đầu vào: $\{00\}$, $\{01,10\}$, $\{11\}$. Vậy có $2^3=8$ hàm.

Ở bài 5, lập đủ $16$ dòng rồi kiểm tra $8a+5b+4c+3d\ge10$. Mỗi dòng đạt tạo một minterm. Chỉ rút gọn sau khi hoàn tất danh sách dòng đạt.
:::

Nguồn có những biểu đồ Karnaugh dạng hình. Bài viết tập trung phương pháp và các đề bài có dữ kiện văn bản rõ; không suy đoán ô tô màu từ bản trích chữ.

## Nguồn tài liệu

- `BT_Chuong 7_Ham Boole.pdf` · 2 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
