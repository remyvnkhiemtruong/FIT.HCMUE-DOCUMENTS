# Chuyên Đề 6: Dạng Toàn Phương (Quadratic Forms)

Dạng toàn phương là một đa thức thuần nhất bậc hai nhiều biến, có vai trò cốt lõi trong hình học giải tích (nhận dạng mặt bậc hai), tối ưu hóa hàm nhiều biến và các thuật toán học máy (Machine Learning).

---

## 1. Khái Niệm Dạng Toàn Phương

### 1.1. Định nghĩa
Một **dạng toàn phương** $\omega$ trên không gian $\mathbb{R}^n$ là một hàm số đa thức thuần nhất bậc 2 đối với $n$ biến số $X = (x_1, x_2, \dots, x_n)^T$:
$$\omega(x) = \sum_{i=1}^{n} a_{ii} x_i^2 + 2 \sum_{1 \le i < j \le n} a_{ij} x_i x_j$$

### 1.2. Biểu diễn ma trận của dạng toàn phương
Mọi dạng toàn phương đều được viết duy nhất dưới dạng tích ma trận:
$$\omega(x) = X^T A X$$
Trong đó:
- $X = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$ là vectơ cột các biến.
- $A = (a_{ij})_{n \times n}$ là **ma trận đối xứng thực** ($A = A^T$), với các phần tử:
  - $a_{ii}$: hệ số của $x_i^2$ trên đường chéo chính.
  - $a_{ij} = a_{ji} = \frac{1}{2} \times (\text{hệ số của } x_i x_j)$ với $i \neq j$.

::: tip VÍ DỤ XÁC ĐỊNH MA TRẬN ĐỐI XỨNG $A$
Cho $\omega(x_1, x_2, x_3) = x_1^2 + 4x_2^2 - 2x_3^2 + 6x_1 x_2 - 4x_1 x_3 + 2x_2 x_3$.
- Đường chéo: $a_{11} = 1, a_{22} = 4, a_{33} = -2$.
- Ngoài đường chéo:
  - $x_1 x_2 \to a_{12} = a_{21} = 3$
  - $x_1 x_3 \to a_{13} = a_{31} = -2$
  - $x_2 x_3 \to a_{23} = a_{32} = 1$
$$A = \begin{pmatrix} 1 & 3 & -2 \\ 3 & 4 & 1 \\ -2 & 1 & -2 \end{pmatrix}$$
:::

---

## 2. Dạng Chính Tắc & Phương Pháp Lagrange

### 2.1. Dạng chính tắc
Dạng toàn phương được gọi là có **dạng chính tắc** nếu ma trận của nó là ma trận đường chéo (chỉ chứa các bình phương, không chứa tích chéo):
$$\omega(y) = c_1 y_1^2 + c_2 y_2^2 + \dots + c_n y_n^2$$

### 2.2. Phương pháp đưa về dạng chính tắc của Lagrange
1. **Trường hợp 1 (Tồn tại ít nhất một $a_{ii} \neq 0$):**
   - Gom tất cả các số hạng chứa biến $x_i$ đó thành bình phương đúng:
     $$\omega = a_{ii} \left(x_i + \frac{1}{2a_{ii}} \sum_{j \neq i} a_{ij} x_j\right)^2 + \omega_1(x_{j \neq i})$$
   - Đặt biến mới $y_i = x_i + \frac{1}{2a_{ii}} \sum_{j \neq i} a_{ij} x_j$.
   - Tiếp tục lặp lại quá trình với $\omega_1$.

2. **Trường hợp 2 (Mọi $a_{ii} = 0$, nhưng có $a_{ij} \neq 0$):**
   - Đổi biến phụ: $x_i = u_i + u_j$, $x_j = u_i - u_j$.
   - Khi đó $x_i x_j = u_i^2 - u_j^2$, xuất hiện các số hạng bình phương $u_i^2, u_j^2 \implies$ quay về Trường hợp 1.

---

## 3. Phép Biến Đổi Trực Giao (Chéo Hóa Ma Trận Đối Xứng)

Vì ma trận $A$ là đối xứng thực ($A = A^T$), luôn tồn tại một **ma trận trực giao** $P$ ($P^{-1} = P^T, \det P = \pm 1$) sao cho:
$$P^T A P = D = \begin{pmatrix} \lambda_1 & 0 & \dots & 0 \\ 0 & \lambda_2 & \dots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & \lambda_n \end{pmatrix}$$
Trong đó các $\lambda_i$ là các trị riêng của $A$.

Thực hiện phép đổi biến trực giao $X = P Y$, dạng toàn phương được đưa về dạng chính tắc:
$$\omega(Y) = \lambda_1 y_1^2 + \lambda_2 y_2^2 + \dots + \lambda_n y_n^2$$

---

## 4. Dấu Của Dạng Toàn Phương & Tiêu Chuẩn Sylvester

### 4.1. Phân loại dấu
- **Xác định dương:** $\omega(x) > 0, \; \forall X \neq 0$.
- **Xác định âm:** $\omega(x) < 0, \; \forall X \neq 0$.
- **Bán xác định dương (Nửa xác định dương):** $\omega(x) \ge 0, \; \forall X$.
- **Bán xác định âm (Nửa xác định âm):** $\omega(x) \le 0, \; \forall X$.
- **Không xác định dấu:** $\omega(x)$ nhận cả giá trị dương và âm.

### 4.2. Tiêu chuẩn Sylvester
Xét các định thức con chính dẫn đầu của ma trận $A$:
$$\Delta_1 = a_{11}, \quad \Delta_2 = \begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix}, \quad \dots, \quad \Delta_n = \det(A)$$

::: tip TIÊU CHUẨN SYLVESTER XÉT DẤU
1. $\omega$ **xác định dương** $\iff$ Tất cả các định thức con chính đều dương:
   $$\Delta_1 > 0, \; \Delta_2 > 0, \; \dots, \; \Delta_n > 0$$
2. $\omega$ **xác định âm** $\iff$ Các định thức con chính đan dấu bắt đầu bằng dấu âm:
   $$\Delta_1 < 0, \; \Delta_2 > 0, \; \Delta_3 < 0, \; \dots, \; (-1)^k \Delta_k > 0$$
:::

---

## 5. Ví Dụ Bài Tập Mẫu

### Ví dụ 1:
Dùng phương pháp Lagrange đưa dạng toàn phương sau về dạng chính tắc và xét dấu:
$$\omega(x_1, x_2, x_3) = x_1^2 + 5x_2^2 - 4x_3^2 + 2x_1 x_2 - 4x_1 x_3$$

::: details 📖 Xem lời giải chi tiết
**Bước 1: Gom biến $x_1$:**
$$\omega = (x_1^2 + 2x_1 x_2 - 4x_1 x_3) + 5x_2^2 - 4x_3^2$$
$$= \left[ x_1^2 + 2x_1(x_2 - 2x_3) + (x_2 - 2x_3)^2 \right] - (x_2 - 2x_3)^2 + 5x_2^2 - 4x_3^2$$
$$= (x_1 + x_2 - 2x_3)^2 - (x_2^2 - 4x_2 x_3 + 4x_3^2) + 5x_2^2 - 4x_3^2$$
$$= (x_1 + x_2 - 2x_3)^2 + 4x_2^2 + 4x_2 x_3 - 8x_3^2$$

**Bước 2: Gom biến $x_2$:**
$$4x_2^2 + 4x_2 x_3 - 8x_3^2 = 4(x_2^2 + x_2 x_3) - 8x_3^2 = 4\left(x_2 + \frac{1}{2}x_3\right)^2 - 4\left(\frac{1}{4}x_3^2\right) - 8x_3^2$$
$$= 4\left(x_2 + \frac{1}{2}x_3\right)^2 - 9x_3^2$$

**Bước 3: Đổi biến:**
Đặt:
$$\begin{cases}
y_1 = x_1 + x_2 - 2x_3 \\
y_2 = x_2 + \frac{1}{2}x_3 \\
y_3 = x_3
\end{cases}$$
Ta thu được dạng chính tắc:
$$\omega = y_1^2 + 4y_2^2 - 9y_3^2$$

**Xét dấu:**
Dạng chính tắc có 2 hệ số dương ($+1, +4$) và 1 hệ số âm ($-9$), do đó dạng toàn phương này **không xác định dấu** (nhận cả giá trị âm và dương).
:::
