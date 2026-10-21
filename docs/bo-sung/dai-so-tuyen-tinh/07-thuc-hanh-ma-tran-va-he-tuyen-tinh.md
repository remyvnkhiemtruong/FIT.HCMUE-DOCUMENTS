---
title: "Thực hành ma trận và hệ tuyến tính"
---

# Thực hành ma trận và hệ tuyến tính

## Thực hành tạo ma trận

```text
with(LinearAlgebra):
A := Matrix([[1,2],[3,4]]);
B := IdentityMatrix(2);
A+B;
2*A;
A . B;
Transpose(A);
Rank(A);
RowEchelonForm(A);
ReducedRowEchelonForm(A);
```

Đây là cách viết với gói `LinearAlgebra`; tài liệu cũ còn dùng `linalg` và các tên lệnh chữ thường. Không trộn hai hệ tên mà không kiểm tra trợ giúp.

## Giải hệ và phương trình ma trận

```text
b := Vector([3,0]);
LinearSolve(A,b);
MatrixInverse(A);
```

Sau khi nhận nghiệm $x$, kiểm tra $Ax-b=0$. Trước khi lấy nghịch đảo, kiểm tra ma trận vuông và hạng đầy đủ.

## Bài tập tuyển chọn từ nguồn

1. Tìm hai ma trận $A,B$ khác ma trận không sao cho $AB=0$.
2. Tìm ma trận $A\ne0$ nhưng $A^2=0$.
3. Với $A=\operatorname{diag}(a_1,\ldots,a_n)$, chứng minh $A^k=\operatorname{diag}(a_1^k,\ldots,a_n^k)$.
4. Chứng minh nếu $A,B$ vuông cùng cấp và $AB$ khả nghịch thì cả $A,B$ khả nghịch.
5. Chứng minh nếu $AB=A+B$ thì $A$ và $B$ giao hoán.

::: details Hướng dẫn bài 5
Ta có $(A-I)(B-I)=I$. Với ma trận vuông, có nghịch đảo một phía thì có nghịch đảo hai phía; do đó $(B-I)(A-I)=I$, suy ra $BA=B+A=AB$.
:::

## Khi bài có tham số

Giữ tham số ở dạng ký hiệu; tách các trường hợp làm phần tử dẫn đầu bằng $0$. Một phép khử có chia cho tham số chỉ hợp lệ khi đã ghi điều kiện tham số khác $0$.

## Nguồn tài liệu

- `THDSTT_Chuong 1_Ma tran va he PTTT.pdf` · 14 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
