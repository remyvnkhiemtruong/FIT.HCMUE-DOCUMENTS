---
title: "Nhóm con và tâm của nhóm"
---

# Nhóm con và tâm của nhóm

## Nhóm con và các ví dụ

Tập khác rỗng $H\subseteq G$ là nhóm con nếu $xy^{-1}\in H$ với mọi $x,y\in H$. Với nhóm cộng, thay điều kiện này bằng $x-y\in H$.

Các bài dưới đây được chuyển từ bộ bài chương 2, phần 1; lời dẫn được biên tập, các tập và phép toán giữ theo nguồn.

1. Với $n\ge2$, chứng minh $A_n\le S_n$. Chứng minh $\sigma\mapsto\sigma(1\ 2)$ là song ánh từ $A_n$ đến $S_n\setminus A_n$, suy ra $|A_n|=n!/2$.
2. Chứng minh các tập sau là nhóm con với phép toán tương ứng:
   - $H=\{\begin{pmatrix}x&y\\2y&x\end{pmatrix}:x,y\in\mathbb Q\}$ dưới phép cộng.
   - $K=\{\begin{pmatrix}x&y\\2y&x\end{pmatrix}:x,y\in\mathbb Q,\ x^2+y^2>0\}$ trong $GL_2(\mathbb Q)$ dưới phép nhân.
   - Các căn bậc $n$ của đơn vị, hợp của các căn đơn vị và đường tròn đơn vị trong $\mathbb C^*$.
   - Các hoán vị cố định $1$ trong $S_n$.
   - Các ma trận thực vuông cấp $n$ có vết bằng $0$, dưới phép cộng.
3. Liệt kê các nhóm con của $S_3$ và các nhóm con cyclic của $S_4$.
4. Với $H\le G$, chứng minh $xHx^{-1}$ là nhóm con với mọi $x\in G$.
5. Nếu $G$ abel và $H,K\le G$, chứng minh $HK\le G$; viết dạng tương ứng $H+K$ cho nhóm cộng.
6. Chứng minh $m\mathbb Z\cap n\mathbb Z=\operatorname{lcm}(m,n)\mathbb Z$ và $m\mathbb Z+n\mathbb Z=\gcd(m,n)\mathbb Z$.

## Tâm và nhóm tâm hóa

Đặt $C(a)=\{x\in G:xa=ax\}$ và $Z(G)=\{x\in G:xy=yx\ \forall y\in G\}$. Nguồn ký hiệu tâm là $C(G)$; bài này dùng $Z(G)$ để phân biệt với $C(a)$.

7. Chứng minh $Z(G)\le C(a)\le G$, $Z(G)=\bigcap_{x\in G}C(x)$; chứng minh $G$ abel khi và chỉ khi $Z(G)=G$; tìm tâm của $GL_n(\mathbb R)$.
8. Với $G$ abel, $H\le G$, đặt $H_n=\{x:x^n\in H\}$. Chứng minh $H\le H_n\le G$ và $H_m\cap H_n=H_d$ với $d=\gcd(m,n)$.
9. Với $G$ abel, chứng minh $\{x:\exists n>0,\ x^n\in H\}$ là nhóm con chứa $H$.

::: warning Kiểm tra điều kiện ở bài 2
Điều kiện $x^2+y^2>0$ của bản nguồn chưa tự giải thích vì sao ma trận thuộc $GL_2(\mathbb Q)$. Cần kiểm tra $\det=x^2-2y^2\ne0$ bằng tính vô tỉ của $\sqrt2$ khi $(x,y)\ne(0,0)$.
:::

## Nguồn tài liệu

- `execises chapter 2.(P1).pdf` · 2 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-nhom/).
