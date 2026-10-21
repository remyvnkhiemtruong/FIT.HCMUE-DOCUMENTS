---
title: "Thực hành chéo hóa ma trận"
---

# Thực hành chéo hóa ma trận

## Thực hành trị riêng

```text
with(LinearAlgebra):
A := Matrix([[1,3],[3,1]]);
CharacteristicPolynomial(A,t);
Eigenvalues(A);
Eigenvectors(A);
```

Đọc riêng danh sách trị riêng, bội và các cột vectơ riêng. Thứ tự mà phần mềm trả về không nhất thiết trùng với thứ tự tính tay.

## Bài tập tuyển chọn từ nguồn

1. Tìm đa thức đặc trưng của các ma trận đã cho trong bài thực hành.
2. Xét tính chéo hóa; khi được, tìm $P,D$ sao cho $AP=PD$.
3. Chứng minh ma trận đối xứng thực cấp hai chéo hóa được trên $\mathbb R$.
4. Với dãy $F_0=1$, $F_1=3$, $F_{k+2}=F_{k+1}+F_k$, viết hệ truy hồi ma trận để tính số hạng tổng quát.

## Hướng dẫn bài dãy số

Đặt $X_k=(F_{k+1},F_k)^T$. Khi đó:

$$X_{k+1}=\begin{pmatrix}1&1\\1&0\end{pmatrix}X_k,\qquad X_0=(3,1)^T.$$

Ma trận có hai trị riêng phân biệt $(1+\sqrt5)/2$ và $(1-\sqrt5)/2$, nên chéo hóa được. Tính $X_k=A^kX_0$ rồi kiểm tra lại $F_0,F_1$ và hệ thức truy hồi.

Các điều kiện đầu $1,3$ là dữ kiện của bài nguồn, không thay bằng điều kiện đầu của dãy Fibonacci quen thuộc.

## Nguồn tài liệu

- `THDSTTChuong 5_Cheo hoa ma tran.pdf` · 3 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
