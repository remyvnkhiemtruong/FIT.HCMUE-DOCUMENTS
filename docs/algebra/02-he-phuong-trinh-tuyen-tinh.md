---
title: "Chuyên đề 2: Hệ phương trình tuyến tính"
---

# Chuyên đề 2: Hệ phương trình tuyến tính {#chuyen-đe-2-he-phuong-trinh-tuyen-tinh}

Giải hệ phương trình tuyến tính là bài toán xuất hiện trong hầu hết các đề thi học kỳ. Bài này trình bày phương pháp Cramer và khử Gauss, cùng điều kiện áp dụng.

---

## 1. Dạng tổng quát và định lý Kronecker - Capelli {#_1-dang-tong-quat-đinh-ly-kronecker-capelli}

Cho hệ $m$ phương trình tuyến tính $n$ ẩn:
$$\begin{cases}
a_{11}x_1 + a_{12}x_2 + \dots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \dots + a_{2n}x_n = b_2 \\
\dots\dots\dots\dots\dots\dots\dots\dots\dots\dots \\
a_{m1}x_1 + a_{m2}x_2 + \dots + a_{mn}x_n = b_m
\end{cases} \iff AX = B$$

- $A$: Ma trận hệ số cấp $m \times n$.
- $\overline{A} = [A \mid B]$: Ma trận mở rộng cấp $m \times (n+1)$.

::: tip Định lý Kronecker - Capelli
1. $\text{rank}(A) < \text{rank}(\overline{A}) \iff$ Hệ **vô nghiệm**.
2. $\text{rank}(A) = \text{rank}(\overline{A}) = n \iff$ Hệ có **nghiệm duy nhất**.
3. $\text{rank}(A) = \text{rank}(\overline{A}) = r < n \iff$ Hệ có **vô số nghiệm** phụ thuộc vào $n - r$ ẩn tự do.
:::

---

## 2. Phương pháp Cramer {#_2-phuong-phap-cramer}

### 2.1. Điều kiện áp dụng
- Số phương trình bằng số ẩn ($m = n$, ma trận $A$ vuông cấp $n$).
- Định thức ma trận hệ số khác 0: $D = \det(A) \neq 0$.

### 2.2. Công thức nghiệm
$$x_j = \frac{D_j}{D} \quad (j = 1, 2, \dots, n)$$
Trong đó $D_j$ là định thức của ma trận thu được từ $A$ bằng cách thay cột thứ $j$ bằng cột hệ số tự do $B$.

---

## 3. Phương pháp khử Gauss và Gauss - Jordan {#_3-phuong-phap-khu-gauss-gauss-jordan}

Phương pháp tổng quát áp dụng cho mọi hệ phương trình:
1. Lập ma trận mở rộng $\overline{A} = [A \mid B]$.
2. Dùng các phép biến đổi sơ cấp theo dòng để đưa $A$ về **dạng bậc thang** (hoặc bậc thang rút gọn).
3. Đọc số hạng $\text{rank}(A)$ và $\text{rank}(\overline{A})$:
   - Nếu xuất hiện dòng $[0 \; 0 \; \dots \; 0 \mid b_k]$ với $b_k \neq 0 \implies$ Hệ vô nghiệm.
   - Nếu hệ có nghiệm: Biểu diễn các ẩn cơ sở qua các ẩn tự do từ dòng dưới lên dòng trên.

---

## 4. Hệ phương trình thuần nhất $AX = 0$ {#_4-he-phuong-trinh-thuan-nhat}

Hệ luôn luôn có ít nhất một nghiệm là nghiệm tầm thường: $X = (0, 0, \dots, 0)^T$.
- Hệ có nghiệm không tầm thường (nghiệm khác 0) $\iff \text{rank}(A) < n$ (với ma trận vuông $\iff \det(A) = 0$).
- Tập hợp tất cả các nghiệm của hệ tạo thành một không gian con của $\mathbb{R}^n$, gọi là **không gian nghiệm** $W$.
- Số chiều của không gian nghiệm:
  $$\dim(W) = n - \text{rank}(A)$$
- Một cơ sở của $W$ được gọi là một **hệ nghiệm cơ bản**.

---

## 5. Ví dụ trong đề thi {#_5-vi-du-tu-đe-thi-that}

### Ví dụ (đề thi KTHP 2023 - 2024): {#vi-du-đe-thi-kthp-2023-2024}
Kiểm chứng hệ phương trình sau có phải là hệ Cramer hay không. Nếu đúng là hệ Cramer thì giải hệ theo phương pháp Cramer, ngược lại thì giải bằng phương pháp Gauss:
$$\begin{cases}
x_1 + x_2 - 2x_3 = 6 \\
2x_1 + 3x_2 - 7x_3 = 16 \\
5x_1 + 2x_2 + x_3 = 16
\end{cases}$$

::: details Lời giải
Ma trận hệ số của hệ là:
$$A = \begin{pmatrix} 1 & 1 & -2 \\ 2 & 3 & -7 \\ 5 & 2 & 1 \end{pmatrix}, \quad B = \begin{pmatrix} 6 \\ 16 \\ 16 \end{pmatrix}$$
Số phương trình $m = 3$ bằng số ẩn $n = 3$.

**Bước 1: Tính định thức $D = \det(A)$:**
Tính theo quy tắc Sarrus hoặc biến đổi sơ cấp dòng:
$$D = \begin{vmatrix} 1 & 1 & -2 \\ 2 & 3 & -7 \\ 5 & 2 & 1 \end{vmatrix}$$
Biến đổi $d_2 \leftarrow d_2 - 2d_1$; $d_3 \leftarrow d_3 - 5d_1$:
$$D = \begin{vmatrix} 1 & 1 & -2 \\ 0 & 1 & -3 \\ 0 & -3 & 11 \end{vmatrix} = 1 \cdot \begin{vmatrix} 1 & -3 \\ -3 & 11 \end{vmatrix} = 11 - 9 = 2$$
Vì $D = 2 \neq 0$ và số phương trình bằng số ẩn nên **đây là hệ Cramer**.

---

**Bước 2: Giải hệ theo phương pháp Cramer:**
- Tính $D_1$ (thay cột 1 bằng $B$):
  $$D_1 = \begin{vmatrix} 6 & 1 & -2 \\ 16 & 3 & -7 \\ 16 & 2 & 1 \end{vmatrix}$$
  Biến đổi $d_2 \leftarrow d_2 - 3d_1$; $d_3 \leftarrow d_3 - 2d_1$:
  $$D_1 = \begin{vmatrix} 6 & 1 & -2 \\ -2 & 0 & -1 \\ 4 & 0 & 5 \end{vmatrix} = -1 \cdot \begin{vmatrix} -2 & -1 \\ 4 & 5 \end{vmatrix} = -1 \cdot (-10 - (-4)) = 6$$

- Tính $D_2$ (thay cột 2 bằng $B$):
  $$D_2 = \begin{vmatrix} 1 & 6 & -2 \\ 2 & 16 & -7 \\ 5 & 16 & 1 \end{vmatrix}$$
  Biến đổi $d_2 \leftarrow d_2 - 2d_1$; $d_3 \leftarrow d_3 - 5d_1$:
  $$D_2 = \begin{vmatrix} 1 & 6 & -2 \\ 0 & 4 & -3 \\ 0 & -14 & 11 \end{vmatrix} = \begin{vmatrix} 4 & -3 \\ -14 & 11 \end{vmatrix} = 44 - 42 = 2$$

- Tính $D_3$ (thay cột 3 bằng $B$):
  $$D_3 = \begin{vmatrix} 1 & 1 & 6 \\ 2 & 3 & 16 \\ 5 & 2 & 16 \end{vmatrix}$$
  Biến đổi $d_2 \leftarrow d_2 - 2d_1$; $d_3 \leftarrow d_3 - 5d_1$:
  $$D_3 = \begin{vmatrix} 1 & 1 & 6 \\ 0 & 1 & 4 \\ 0 & -3 & -14 \end{vmatrix} = \begin{vmatrix} 1 & 4 \\ -3 & -14 \end{vmatrix} = -14 - (-12) = -2$$

---

**Bước 3: Kết luận nghiệm:**
$$x_1 = \frac{D_1}{D} = \frac{6}{2} = 3$$
$$x_2 = \frac{D_2}{D} = \frac{2}{2} = 1$$
$$x_3 = \frac{D_3}{D} = \frac{-2}{2} = -1$$

Vậy hệ có nghiệm duy nhất: $(x_1, x_2, x_3) = (3, 1, -1)$.
:::
