---
title: "Hàm Boole và mạng logic"
---

# Hàm Boole và mạng logic

## Đại số Boole và hàm Boole

Biến Boole nhận $0$ hoặc $1$. Bài này dùng $\land$ cho AND, $\lor$ cho OR, dấu gạch trên cho NOT. Trong tích các biến, ký hiệu ghép như $xy$ nghĩa là $x\land y$.

Hàm $n$ biến là ánh xạ $\{0,1\}^n\to\{0,1\}$. Số hàm là $2^{2^n}$.

## Dạng nối rời chính tắc

Mỗi dòng đầu vào cho một minterm: biến nhận $1$ viết trực tiếp, biến nhận $0$ lấy phủ định. Nối OR các minterm tại những dòng hàm nhận $1$.

Ví dụ bổ sung, hàm nhận $1$ tại $101$ và $111$ có dạng $x\bar yz\lor xyz$, rút gọn thành $xz$.

## Mạng cổng

Phân tích công thức theo cây phép toán để dựng cổng. NAND là phủ định của AND; NOR là phủ định của OR. Mỗi loại NAND hoặc NOR riêng đều đủ để xây dựng các phép Boole cơ bản. Chẳng hạn $\bar x=\operatorname{NAND}(x,x)$.

## Biểu đồ Karnaugh

Các nhãn cột và dòng theo mã Gray, ví dụ $00,01,11,10$. Ô kề nhau khác đúng một bit; hai mép đối diện cũng kề nhau. Nhóm các ô $1$ thành hình chữ nhật có $2^k$ ô, có thể chồng nhau.

Một nhóm bỏ đi các biến thay đổi trong nhóm. Tế bào lớn tương ứng với một tích không thể bỏ thêm biến mà vẫn chỉ phủ các ô cho phép. Để tìm phủ tối thiểu, chọn các nhóm bắt buộc rồi phủ phần còn lại; không chỉ chọn tham lam nhóm lớn nhất một lần.

## Đối chiếu

Sau rút gọn, lập lại bảng chân trị của công thức mới và so sánh đủ $2^n$ dòng. Hai công thức có cách viết khác nhau vẫn có thể cùng hàm; tiêu chí là chân trị, không phải hình thức biểu thức.

## Nguồn tài liệu

- `Chuong 7_Ham Boole.pdf` · 46 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
