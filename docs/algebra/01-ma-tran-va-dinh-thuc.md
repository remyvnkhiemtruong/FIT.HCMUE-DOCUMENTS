---
title: "Chuyên đề 1: Ma trận, định thức và hạng ma trận"
---

# Chuyên đề 1: Ma trận, định thức và hạng ma trận {#chuyen-đe-1-ma-tran-đinh-thuc-hang-ma-tran}

Ma trận và định thức là công cụ trong đại số tuyến tính, được dùng trong xử lý ảnh, đồ họa máy tính và các thuật toán học máy.

---

## 1. Phép toán trên ma trận {#_1-phep-toan-tren-ma-tran}

### 1.1. Nhân hai ma trận
Cho $A = (a_{ij})_{m \times p}$ và $B = (b_{jk})_{p \times n}$. Tích $C = AB$ là ma trận cấp $m \times n$ với:
$$c_{ik} = \sum_{j=1}^{p} a_{ij} b_{jk}$$
*(Lưu ý: Phép nhân ma trận nói chung **không có tính chất giao hoán**: $AB \neq BA$)*.

### 1.2. Chuyển vị và tính chất
- $(A + B)^T = A^T + B^T$
- $(AB)^T = B^T A^T$ *(đảo thứ tự)*
- $(A^T)^T = A$
- $(kA)^T = k A^T$

---

## 2. Định thức {#_2-đinh-thuc-determinant}

### 2.1. Định nghĩa và cách tính
Định thức chỉ áp dụng cho **ma trận vuông** cấp $n$: ký hiệu $\det(A)$ hoặc $|A|$.
- Ma trận cấp 2: $\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$.
- Ma trận cấp 3: Quy tắc Sarrus (đường chéo chính trừ đường chéo phụ).
- Ma trận cấp $n$: Khai triển Laplace theo dòng thứ $i$:
  $$\det(A) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} M_{ij}$$
  Trong đó $M_{ij}$ là định thức con bù của phần tử $a_{ij}$.

### 2.2. Tính chất quan trọng của định thức
1. $\det(A^T) = \det(A)$.
2. $\det(AB) = \det(A) \cdot \det(B)$.
3. $\det(kA) = k^n \det(A)$ với $A$ vuông cấp $n$.
4. Đổi chỗ 2 dòng (hoặc 2 cột) thì định thức **đổi dấu**.
5. Nhân một dòng với số $k$ thì định thức tăng lên $k$ lần.
6. Cộng một bội của dòng này vào dòng khác thì **định thức không đổi** (phép biến đổi sơ cấp dòng loại 3).
7. Nếu ma trận có 2 dòng tỉ lệ hoặc bằng nhau $\implies \det(A) = 0$.
8. Định thức của ma trận tam giác (trên hoặc dưới) bằng **tích các phần tử trên đường chéo chính**.

---

## 3. Ma trận khả nghịch và ma trận nghịch đảo $A^{-1}$ {#_3-ma-tran-kha-nghich-ma-tran-nghich-đao}

Ma trận vuông $A$ khả nghịch khi và chỉ khi $\det(A) \neq 0$.
Khi đó:
$$A^{-1} = \frac{1}{\det(A)} A^*$$
Trong đó $A^* = (C_{ij})^T$ là **ma trận phụ hợp**, với $C_{ij} = (-1)^{i+j} M_{ij}$ là phần bù đại số của $a_{ij}$.

### Phương pháp tìm $A^{-1}$ bằng biến đổi Gauss-Jordan:
Ghép ma trận đơn vị $I_n$ vào bên phải $A$:
$$[A \mid I_n] \xrightarrow{\text{BĐSC dòng}} [I_n \mid A^{-1}]$$

---

## 4. Hạng của ma trận {#_4-hang-cua-ma-tran-rank}

Hạng của ma trận $A$, ký hiệu $\text{rank}(A)$ hoặc $r(A)$, là:
- Cấp cao nhất của định thức con khác 0 của $A$.
- Số dòng khác 0 sau khi dùng các phép biến đổi sơ cấp đưa $A$ về **dạng bậc thang**.

---

## 5. Ví dụ trong đề thi {#_5-vi-du-bai-tap-tu-đe-thi-that}

### Ví dụ 1 (đề thi KTHP 2022 - 2023): {#vi-du-1-đe-thi-kthp-2022-2023}
Cho 2 ma trận:
$$A = \begin{pmatrix} 2 & 2 & -1 \\ 1 & 3 & -1 \\ 1 & -1 & 0 \end{pmatrix}, \quad B = \begin{pmatrix} -1 & -2 & 0 \\ 5 & 4 & -2 \\ -3 & 1 & 6 \end{pmatrix}$$
1. Tính $\det(A)$ và $\text{rank}(A)$.
2. Tìm ma trận $X$ thỏa mãn phương trình: $2I + AX = B^T$.

::: details Lời giải
**Câu 1: Tính $\det(A)$ và $\text{rank}(A)$:**
Khai triển định thức của $A$:
$$\det(A) = \begin{vmatrix} 2 & 2 & -1 \\ 1 & 3 & -1 \\ 1 & -1 & 0 \end{vmatrix}$$
Cộng dòng 2 nhân (-1) vào dòng 1:
$$\det(A) = \begin{vmatrix} 1 & -1 & 0 \\ 1 & 3 & -1 \\ 1 & -1 & 0 \end{vmatrix}$$
Dòng 1 và dòng 3 giống nhau hoàn toàn, do đó:
$$\det(A) = 0$$

Vì $\det(A) = 0$ nên $\text{rank}(A) < 3$.
Xét định thức con cấp 2 ở góc trên bên trái:
$$\begin{vmatrix} 2 & 2 \\ 1 & 3 \end{vmatrix} = 2 \cdot 3 - 2 \cdot 1 = 4 \neq 0$$
Do đó:
$$\text{rank}(A) = 2$$

---

**Câu 2: Tìm ma trận $X$:**
Từ phương trình:
$$2I + AX = B^T \iff AX = B^T - 2I$$
Chuyển vị ma trận $B$:
$$B^T = \begin{pmatrix} -1 & 5 & -3 \\ -2 & 4 & 1 \\ 0 & -2 & 6 \end{pmatrix}$$
$$B^T - 2I = \begin{pmatrix} -3 & 5 & -3 \\ -2 & 2 & 1 \\ 0 & -2 & 4 \end{pmatrix}$$
Vì $\det(A) = 0$, $A$ không khả nghịch nên không thể nhân $A^{-1}$ vào hai vế. Ta giải theo phương trình ma trận bằng cách xét ma trận mở rộng:
$$[A \mid B^T - 2I] = \begin{pmatrix} 2 & 2 & -1 & \bigm| & -3 & 5 & -3 \\ 1 & 3 & -1 & \bigm| & -2 & 2 & 1 \\ 1 & -1 & 0 & \bigm| & 0 & -2 & 4 \end{pmatrix}$$
Thực hiện biến đổi sơ cấp dòng:
- Đổi $d_1 \leftrightarrow d_3$:
  $$\begin{pmatrix} 1 & -1 & 0 & \bigm| & 0 & -2 & 4 \\ 1 & 3 & -1 & \bigm| & -2 & 2 & 1 \\ 2 & 2 & -1 & \bigm| & -3 & 5 & -3 \end{pmatrix}$$
- $d_2 \leftarrow d_2 - d_1$; $d_3 \leftarrow d_3 - 2d_1$:
  $$\begin{pmatrix} 1 & -1 & 0 & \bigm| & 0 & -2 & 4 \\ 0 & 4 & -1 & \bigm| & -2 & 4 & -3 \\ 0 & 4 & -1 & \bigm| & -3 & 9 & -11 \end{pmatrix}$$
- $d_3 \leftarrow d_3 - d_2$:
  $$\begin{pmatrix} 1 & -1 & 0 & \bigm| & 0 & -2 & 4 \\ 0 & 4 & -1 & \bigm| & -2 & 4 & -3 \\ 0 & 0 & 0 & \bigm| & -1 & 5 & -8 \end{pmatrix}$$
Dòng cuối cùng của ma trận hệ số toàn số 0 trong khi vế phải khác 0.
Suy ra $\text{rank}(A) = 2 \neq \text{rank}([A \mid B^T - 2I]) = 3$.
**Kết luận:** Phương trình ma trận **vô nghiệm** (không tồn tại ma trận $X$).
:::

### Ví dụ 2 (đề thi KTHP 2023 - 2024): {#vi-du-2-đe-thi-kthp-2023-2024}
Tìm ma trận nghịch đảo của:
$$A = \begin{pmatrix} 0 & 2 & 3 \\ 1 & 0 & -1 \\ 4 & 5 & 0 \end{pmatrix}$$

::: details Lời giải
**Bước 1: Tính định thức $\det(A)$:**
Khai triển theo dòng 1:
$$\det(A) = 0 - 2 \begin{vmatrix} 1 & -1 \\ 4 & 0 \end{vmatrix} + 3 \begin{vmatrix} 1 & 0 \\ 4 & 5 \end{vmatrix}$$
$$= -2(0 - (-4)) + 3(5 - 0) = -8 + 15 = 7 \neq 0$$
Do $\det(A) = 7 \neq 0$ nên $A$ khả nghịch.

**Bước 2: Tìm ma trận phụ hợp $A^*$:**
Tính 9 phần bù đại số $C_{ij} = (-1)^{i+j} M_{ij}$:
- $C_{11} = +\begin{vmatrix} 0 & -1 \\ 5 & 0 \end{vmatrix} = 5$
- $C_{12} = -\begin{vmatrix} 1 & -1 \\ 4 & 0 \end{vmatrix} = -4$
- $C_{13} = +\begin{vmatrix} 1 & 0 \\ 4 & 5 \end{vmatrix} = 5$
- $C_{21} = -\begin{vmatrix} 2 & 3 \\ 5 & 0 \end{vmatrix} = 15$
- $C_{22} = +\begin{vmatrix} 0 & 3 \\ 4 & 0 \end{vmatrix} = -12$
- $C_{23} = -\begin{vmatrix} 0 & 2 \\ 4 & 5 \end{vmatrix} = 8$
- $C_{31} = +\begin{vmatrix} 2 & 3 \\ 0 & -1 \end{vmatrix} = -2$
- $C_{32} = -\begin{vmatrix} 0 & 3 \\ 1 & -1 \end{vmatrix} = 3$
- $C_{33} = +\begin{vmatrix} 0 & 2 \\ 1 & 0 \end{vmatrix} = -2$

Ma trận phụ hợp $A^* = (C_{ij})^T$:
$$A^* = \begin{pmatrix} 5 & 15 & -2 \\ -4 & -12 & 3 \\ 5 & 8 & -2 \end{pmatrix}$$

**Bước 3: Ma trận nghịch đảo:**
$$A^{-1} = \frac{1}{7} \begin{pmatrix} 5 & 15 & -2 \\ -4 & -12 & 3 \\ 5 & 8 & -2 \end{pmatrix} = \begin{pmatrix} 5/7 & 15/7 & -2/7 \\ -4/7 & -12/7 & 3/7 \\ 5/7 & 8/7 & -2/7 \end{pmatrix}$$
*(Thử lại: $A \cdot A^{-1} = I_3$)*.
:::
