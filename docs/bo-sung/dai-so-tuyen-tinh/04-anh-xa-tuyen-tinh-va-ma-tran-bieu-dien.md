---
title: "Ánh xạ tuyến tính và ma trận biểu diễn"
---

# Ánh xạ tuyến tính và ma trận biểu diễn

Ánh xạ tuyến tính giữ tổ hợp tuyến tính. Khi chọn cơ sở ở miền nguồn và miền đích, ánh xạ được biểu diễn bằng một ma trận.

## Định nghĩa và cách kiểm tra

Ánh xạ $f:V\to W$ tuyến tính khi:

$$f(\alpha u+\beta v)=\alpha f(u)+\beta f(v).$$

Điều kiện $f(0)=0$ là cần nhưng chưa đủ. Với ánh xạ $\mathbb R^n\to\mathbb R^m$, tính tuyến tính tương đương với việc có dạng $f(x)=Ax$ cho một ma trận cố định $A$.

Ảnh của một cơ sở xác định duy nhất ánh xạ: nếu $x=\sum_i x_ib_i$ thì $f(x)=\sum_i x_if(b_i)$.

## Hạt nhân và ảnh

$$\ker f=\{v:f(v)=0\},\qquad \operatorname{Im}f=\{f(v):v\in V\}.$$

Đây lần lượt là không gian con của $V$ và $W$. Với $f(x)=Ax$, tìm hạt nhân bằng hệ $Ax=0$; tìm ảnh bằng không gian cột của $A$.

$$\dim V=\dim\ker f+\dim\operatorname{Im}f.$$

$f$ đơn ánh khi $\ker f=\{0\}$; toàn ánh khi $\operatorname{Im}f=W$. Đẳng cấu là ánh xạ tuyến tính vừa đơn ánh vừa toàn ánh.

## Ma trận biểu diễn

Cho $B=(b_1,\ldots,b_n)$, $C$ là cơ sở ở miền đích. Ma trận của $f$ có cột thứ $j$ là $[f(b_j)]_C$:

$$[f(v)]_C=A[v]_B.$$

Với $f:V\to W$ và $g:W\to U$, dùng các cơ sở tương thích thì ma trận của $g\circ f$ là $A_gA_f$.

## Đổi cơ sở

Nếu $[v]_B=P[v]_{B'}$ và $[w]_C=Q[w]_{C'}$, ma trận mới là $A'=Q^{-1}AP$. Với toán tử $V\to V$ và cùng một phép đổi cơ sở ở hai phía, $A'=P^{-1}AP$.

## Ví dụ minh họa bổ sung

Xét $f(x,y,z)=(x+y,y+z)$. Ma trận chuẩn là $\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$. Hạt nhân là $\operatorname{span}\{(-1,1,-1)\}$; ảnh bằng $\mathbb R^2$. Tổng số chiều là $1+2=3$.

## Nguồn tài liệu

- `Chuong 4_Anh xa tuyen tinh.pdf` · 32 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
