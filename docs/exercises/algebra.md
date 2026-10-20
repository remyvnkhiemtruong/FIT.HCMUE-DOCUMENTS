# 📚 Tuyển Tập Bài Tập Đại Số Tuyến Tính (Kèm Lời Giải)

Các bài tập được chọn lọc bám sát nội dung kiểm tra giữa kỳ và thi cuối kỳ môn Đại số tuyến tính trong học phần COMP1800.

---

## Dạng 1: Định Thức & Biến Đổi Sơ Cấp

### Bài 1.1:
Tính định thức cấp 4 sau bằng cách đưa về ma trận tam giác:
$$D = \begin{vmatrix}
1 & 1 & 1 & 1 \\
1 & 2 & 1 & 1 \\
1 & 1 & 3 & 1 \\
1 & 1 & 1 & 4
\end{vmatrix}$$

::: details 📖 Xem lời giải chi tiết
Lấy các dòng $2, 3, 4$ trừ đi dòng 1 ($d_2 \leftarrow d_2 - d_1; \; d_3 \leftarrow d_3 - d_1; \; d_4 \leftarrow d_4 - d_1$):
$$D = \begin{vmatrix}
1 & 1 & 1 & 1 \\
0 & 1 & 0 & 0 \\
0 & 0 & 2 & 0 \\
0 & 0 & 0 & 3
\end{vmatrix}$$
Đây là định thức của ma trận tam giác trên, do đó giá trị bằng tích các phần tử trên đường chéo chính:
$$D = 1 \cdot 1 \cdot 2 \cdot 3 = 6$$
:::

---

## Dạng 2: Biện Luận Hệ Phương Trình Tuyến Tính

### Bài 2.1:
Biện luận số nghiệm của hệ phương trình theo tham số $m$:
$$\begin{cases}
x + y + z = 1 \\
x + 2y + 3z = 2 \\
2x + 3y + mz = 3
\end{cases}$$

::: details 📖 Xem lời giải chi tiết
Lập ma trận mở rộng $\overline{A} = [A \mid B]$:
$$\overline{A} = \begin{pmatrix}
1 & 1 & 1 & \bigm| & 1 \\
1 & 2 & 3 & \bigm| & 2 \\
2 & 3 & m & \bigm| & 3
\end{pmatrix}$$
Biến đổi sơ cấp dòng:
- $d_2 \leftarrow d_2 - d_1$: dòng 2 thành $[0 \;\; 1 \;\; 2 \mid 1]$
- $d_3 \leftarrow d_3 - 2d_1$: dòng 3 thành $[0 \;\; 1 \;\; m-2 \mid 1]$
- $d_3 \leftarrow d_3 - d_2$: dòng 3 thành $[0 \;\; 0 \;\; m-4 \mid 0]$

Ma trận bậc thang thu được:
$$\begin{pmatrix}
1 & 1 & 1 & \bigm| & 1 \\
0 & 1 & 2 & \bigm| & 1 \\
0 & 0 & m - 4 & \bigm| & 0
\end{pmatrix}$$

**Biện luận:**
1. **Trường hợp $m \neq 4$:**
   $\text{rank}(A) = \text{rank}(\overline{A}) = 3$ (bằng số ẩn). Hệ có **nghiệm duy nhất**.
   Từ dòng 3: $(m-4)z = 0 \implies z = 0$.
   Từ dòng 2: $y + 2(0) = 1 \implies y = 1$.
   Từ dòng 1: $x + 1 + 0 = 1 \implies x = 0$.
   Nghiệm duy nhất: $(x, y, z) = (0, 1, 0)$.

2. **Trường hợp $m = 4$:**
   Dòng 3 trở thành $[0 \;\; 0 \;\; 0 \mid 0]$.
   $\text{rank}(A) = \text{rank}(\overline{A}) = 2 < 3$. Hệ có **vô số nghiệm** phụ thuộc 1 ẩn tự do.
   Chọn $z = t \in \mathbb{R}$:
   - $y = 1 - 2t$
   - $x = 1 - y - z = 1 - (1 - 2t) - t = t$
   Tập nghiệm: $(x, y, z) = (t, \; 1 - 2t, \; t)$ với $t \in \mathbb{R}$.
:::

---

## Dạng 3: Hệ Vectơ, Cơ Sở & Không Gian Con

### Bài 3.1:
Trong $\mathbb{R}^3$, cho hệ vectơ $S = \{v_1 = (1, 2, 3), \; v_2 = (2, 3, 4), \; v_3 = (3, 5, 7)\}$.
Tìm một cơ sở và số chiều của không gian con $W = \text{span}(S)$.

::: details 📖 Xem lời giải chi tiết
Xếp các vectơ thành các dòng của ma trận $A$:
$$A = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 3 & 4 \\ 3 & 5 & 7 \end{pmatrix}$$
Biến đổi sơ cấp đưa về ma trận bậc thang:
- $d_2 \leftarrow d_2 - 2d_1$: $[0 \;\; -1 \;\; -2]$
- $d_3 \leftarrow d_3 - 3d_1$: $[0 \;\; -1 \;\; -2]$
- $d_3 \leftarrow d_3 - d_2$: $[0 \;\; 0 \;\; 0]$

Ma trận bậc thang:
$$\begin{pmatrix} 1 & 2 & 3 \\ 0 & -1 & -2 \\ 0 & 0 & 0 \end{pmatrix}$$
Có 2 dòng khác 0, suy ra $\text{rank}(A) = 2 \implies \dim(W) = 2$.
Một cơ sở của $W$ là hai vectơ dòng đầu:
$$\mathcal{B}_W = \{(1, 2, 3), \; (0, -1, -2)\} \quad \text{hoặc} \quad \{v_1 = (1, 2, 3), \; v_2 = (2, 3, 4)\}$$
:::

---

## Dạng 4: Trực Chuẩn Hóa Gram - Schmidt

### Bài 4.1:
Trong $\mathbb{R}^3$ với tích vô hướng chính tắc, trực chuẩn hóa hệ vectơ độc lập tuyến tính sau:
$$v_1 = (1, 1, 0), \quad v_2 = (1, 0, 1)$$

::: details 📖 Xem lời giải chi tiết
**Bước 1: Trực giao hóa:**
- $u_1 = v_1 = (1, 1, 0)$.
- Tính $\langle v_2, u_1 \rangle = 1(1) + 0(1) + 1(0) = 1$.
- Tính $\|u_1\|^2 = 1^2 + 1^2 + 0^2 = 2$.
- $u_2 = v_2 - \frac{\langle v_2, u_1 \rangle}{\|u_1\|^2} u_1 = (1, 0, 1) - \frac{1}{2}(1, 1, 0) = \left(\frac{1}{2}, -\frac{1}{2}, 1\right)$.

**Bước 2: Chuẩn hóa độ dài:**
- $\|u_1\| = \sqrt{2} \implies e_1 = \frac{u_1}{\|u_1\|} = \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}, 0\right)$.
- $\|u_2\| = \sqrt{(1/2)^2 + (-1/2)^2 + 1^2} = \sqrt{\frac{1}{4} + \frac{1}{4} + 1} = \sqrt{\frac{6}{4}} = \frac{\sqrt{6}}{2}$.
- $e_2 = \frac{u_2}{\|u_2\|} = \frac{2}{\sqrt{6}} \left(\frac{1}{2}, -\frac{1}{2}, 1\right) = \left(\frac{1}{\sqrt{6}}, -\frac{1}{\sqrt{6}}, \frac{2}{\sqrt{6}}\right)$.

**Kết luận:** Hệ trực chuẩn cần tìm là $\{e_1, e_2\}$.
:::

---

## Dạng 5: Chéo Hóa Ma Trận

### Bài 5.1:
Chéo hóa ma trận đối xứng sau:
$$A = \begin{pmatrix} 1 & 3 \\ 3 & 1 \end{pmatrix}$$

::: details 📖 Xem lời giải chi tiết
**Bước 1: Tìm trị riêng:**
$$\det(A - \lambda I) = \begin{vmatrix} 1 - \lambda & 3 \\ 3 & 1 - \lambda \end{vmatrix} = (1 - \lambda)^2 - 9 = 0$$
$$\iff (1 - \lambda - 3)(1 - \lambda + 3) = 0 \iff (-\lambda - 2)(4 - \lambda) = 0 \iff \begin{cases} \lambda_1 = 4 \\ \lambda_2 = -2 \end{cases}$$

**Bước 2: Tìm vectơ riêng:**
- Với $\lambda_1 = 4$:
  $$(A - 4I)X = 0 \iff \begin{pmatrix} -3 & 3 \\ 3 & -3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = 0 \iff x_1 = x_2$$
  Chọn vectơ riêng $p_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$.
- Với $\lambda_2 = -2$:
  $$(A + 2I)X = 0 \iff \begin{pmatrix} 3 & 3 \\ 3 & 3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix} = 0 \iff x_1 = -x_2$$
  Chọn vectơ riêng $p_2 = \begin{pmatrix} -1 \\ 1 \end{pmatrix}$.

**Bước 3: Lập ma trận $P$ và ma trận đường chéo $D$:**
$$P = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}, \quad D = \begin{pmatrix} 4 & 0 \\ 0 & -2 \end{pmatrix}$$
Ta có: $P^{-1} A P = D$.
:::
