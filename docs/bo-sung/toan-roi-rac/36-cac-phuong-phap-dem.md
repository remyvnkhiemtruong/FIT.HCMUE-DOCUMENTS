---
title: "Các phương pháp đếm"
---

# Các phương pháp đếm

## Nguyên lý cộng và nhân

Nếu một lựa chọn thuộc các trường hợp rời nhau có lần lượt $a_i$ khả năng, tổng số là $\sum a_i$. Nếu một quá trình có các bước với số lựa chọn tương ứng, tổng số là tích, khi số lựa chọn của mỗi bước đã được xác định đúng theo các bước trước.

Khi các trường hợp giao nhau, với hai tập dùng $|A\cup B|=|A|+|B|-|A\cap B|$.

## Nguyên lý Dirichlet

Phân $N$ đối tượng vào $k>0$ hộp thì có hộp chứa ít nhất $\lceil N/k\rceil$ đối tượng. Muốn chắc chắn có một hộp chứa $r$ đối tượng, cần ít nhất $k(r-1)+1$ đối tượng.

## Chọn có thứ tự và không thứ tự

| Mô hình | Số cách |
| --- | --- |
| Sắp $n$ vật phân biệt | $n!$ |
| Chọn và sắp $r$ trong $n$ vật | $n!/(n-r)!$ |
| Chọn $r$ trong $n$ vật | $\binom nr$ |
| Dãy $r$ vị trí, mỗi vị trí có $n$ lựa chọn | $n^r$ |
| Hoán vị với số lần lặp $n_1,\ldots,n_k$ | $n!/(n_1!\cdots n_k!)$ |

## Tổ hợp lặp

Số nghiệm nguyên không âm của $x_1+\cdots+x_k=r$ là $\binom{r+k-1}{k-1}$. Với cận dưới $x_i\ge b_i$, đặt $y_i=x_i-b_i$ rồi kiểm tra tổng mới còn không âm.

## Khai triển đa thức

$$(x+y)^n=\sum_{k=0}^{n}\binom nkx^{n-k}y^k.$$

Trong $(x_1+\cdots+x_m)^n$, hệ số của $x_1^{a_1}\cdots x_m^{a_m}$ bằng $n!/(a_1!\cdots a_m!)$ nếu các số mũ không âm và tổng bằng $n$; nếu không thì hệ số bằng $0$.

## Ví dụ minh họa bổ sung

Chia $10$ vật giống nhau vào $4$ hộp phân biệt, mỗi hộp ít nhất một vật: trừ trước $4$ vật, còn tổng $6$, số cách là $\binom93=84$.

## Nguồn tài liệu

- `Chuong 3_Phuong phap dem.pdf` · 37 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
