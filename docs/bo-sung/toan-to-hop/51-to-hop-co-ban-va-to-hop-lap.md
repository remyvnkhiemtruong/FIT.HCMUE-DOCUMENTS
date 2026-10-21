---
title: "Tổ hợp cơ bản và tổ hợp lặp"
---

# Tổ hợp cơ bản và tổ hợp lặp

## Quy tắc đếm

Chương này phát triển nguyên lý cộng, nhân và Dirichlet, sau đó phân loại các cách chọn theo thứ tự và sự lặp. Các thuật ngữ tương tự bộ toán rời rạc nhưng ví dụ và trình tự trình bày của nguồn khác nhau.

## Hoán vị, chỉnh hợp và tổ hợp

Hoán vị $n$ vật phân biệt có $n!$ cách. Chỉnh hợp $k$ của $n$ vật có $n!/(n-k)!$ cách vì thứ tự quan trọng. Tổ hợp có $\binom nk$ cách vì mỗi tập con được sắp thành $k!$ dãy.

Nếu có $n_i$ vật cùng loại, số hoán vị của tổng $n=\sum n_i$ vật là $n!/\prod n_i!$. Nếu mỗi vị trí của dãy dài $k$ có $n$ lựa chọn và cho lặp, số dãy là $n^k$.

## Tổ hợp lặp và điều kiện dưới

Chọn $r$ vật từ $k$ loại không hạn chế số lượng tương ứng với $x_1+\cdots+x_k=r$, $x_i\ge0$. Số cách là $\binom{r+k-1}{k-1}$.

Nếu mỗi loại phải có ít nhất một, đặt $y_i=x_i-1$. Nếu có chặn trên, chỉ đổi biến chưa đủ; cần bù trừ hoặc hàm sinh.

## Hệ số đa thức

Trong $(c_1x_1+\cdots+c_kx_k)^n$, hệ số của $\prod x_i^{a_i}$ là:

$$\frac{n!}{a_1!\cdots a_k!}\prod_i c_i^{a_i},\qquad\sum_i a_i=n.$$

Khi biến xuất hiện dưới lũy thừa như $y^3$, trước tiên phải giải điều kiện số lần chọn hạng tử, không lấy trực tiếp số mũ đích làm số lần chọn.

## Ghi chú bản nguồn

Phông của PDF này làm chữ Việt sai mã khi trích văn bản. Nội dung bài được viết lại bằng Unicode và công thức toán, không dùng các chuỗi chữ lỗi như tên chương hoặc đề mục.

## Nguồn tài liệu

- `Chuong 4. To hop co ban.pdf` · 39 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
