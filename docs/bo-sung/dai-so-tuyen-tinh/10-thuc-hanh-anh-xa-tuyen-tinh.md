---
title: "Thực hành ánh xạ tuyến tính"
---

# Thực hành ánh xạ tuyến tính

## Tìm ánh xạ từ ảnh của một cơ sở

Cho $B=(b_1,\ldots,b_n)$ là cơ sở và biết $f(b_i)=w_i$. Với $x=\sum x_ib_i$, tính $f(x)=\sum x_iw_i$. Nếu viết ma trận trong cơ sở chuẩn, đặt $P=(b_1\ \cdots\ b_n)$, $Q=(w_1\ \cdots\ w_n)$ thì $A=QP^{-1}$.

## Tìm hạt nhân và ảnh

```text
with(LinearAlgebra):
A := Matrix([[1,1,0],[0,1,1]]);
NullSpace(A);
ColumnSpace(A);
Rank(A);
```

Đối chiếu số chiều hạt nhân cộng hạng bằng số cột của ma trận.

## Bài tập tuyển chọn từ nguồn

1. Tìm $f\in L(\mathbb R^3)$ sao cho $\ker f=\operatorname{span}\{(1,1,1),(0,1,2)\}$ và $\operatorname{Im}f=\operatorname{span}\{(1,1,1)\}$.
2. Tìm $f\in L(\mathbb R^3)$ sao cho $\ker f=\operatorname{span}\{(1,1,1)\}$ và $\operatorname{Im}f=\operatorname{span}\{(1,1,1),(0,1,2)\}$.
3. Với $f(x,y)=(x-2y,2x+y)$, tìm ma trận chuẩn, hạt nhân và ảnh.

::: details Cách dựng ánh xạ ở bài 1
Hai vectơ cho hạt nhân độc lập. Bổ sung một vectơ $v$ để tạo cơ sở của $\mathbb R^3$, quy định ảnh của hai vectơ đầu bằng $0$ và $f(v)=(1,1,1)$. Mở rộng tuyến tính sẽ cho một ánh xạ thỏa yêu cầu; nghiệm không duy nhất.
:::

## Nguồn tài liệu

- `THDSTT_Chuong 4_Anh xa tuyen tinh.pdf` · 6 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
