# Chuyên Đề 5: Ánh Xạ Tuyến Tính, Trị Riêng & Chéo Hóa Ma Trận

Đây là phần kiến thức chiếm tỷ trọng điểm số cao nhất (từ 3 đến 4 điểm) trong các đề thi kết thúc học phần môn Cơ sở Toán CNTT.

---

## 1. Ánh Xạ Tuyến Tính, Ker(f) và Im(f)

### 1.1. Định nghĩa
Ánh xạ $f: V \to W$ được gọi là **tuyến tính** nếu với mọi $u, v \in V$ và mọi $\alpha, \beta \in \mathbb{R}$:
$$f(\alpha u + \beta v) = \alpha f(u) + \beta f(v)$$

### 1.2. Hạt nhân $\ker(f)$ và Ảnh $\text{Im}(f)$
- **Hạt nhân (Kernel):**
  $$\ker(f) = \{u \in V \mid f(u) = 0_W\}$$
  $\ker(f)$ là không gian con của $V$. Tìm cơ sở của $\ker(f)$ bằng cách giải hệ phương trình thuần nhất $f(x) = 0$.
- **Ảnh (Image):**
  $$\text{Im}(f) = \{f(u) \mid u \in V\}$$
  $\text{Im}(f)$ là không gian con của $W$. Nếu $\{e_1, \dots, e_n\}$ là cơ sở của $V$ thì $\text{Im}(f) = \text{span}\{f(e_1), \dots, f(e_n)\}$.

::: tip ĐỊNH LÝ VỀ SỐ CHIỀU (RANK - NULLITY THEOREM)
$$\dim(\ker f) + \dim(\text{Im} f) = \dim(V)$$
- $f$ là **đơn cấu** $\iff \ker(f) = \{0\} \iff \dim(\ker f) = 0$.
- $f$ là **toàn cấu** $\iff \text{Im}(f) = W \iff \dim(\text{Im} f) = \dim(W)$.
- $f$ là **đẳng cấu** $\iff f$ vừa là đơn cấu vừa là toàn cấu.
:::

---

## 2. Ma Trận Của Ánh Xạ Tuyến Tính

Cho $f: V \to V$ và $E = \{e_1, e_2, \dots, e_n\}$ là một cơ sở của $V$.
Biểu diễn ảnh của các vectơ cơ sở theo chính cơ sở $E$:
$$\begin{cases}
f(e_1) = a_{11} e_1 + a_{21} e_2 + \dots + a_{n1} e_n \\
f(e_2) = a_{12} e_1 + a_{22} e_2 + \dots + a_{n2} e_n \\
\dots \\
f(e_n) = a_{1n} e_1 + a_{2n} e_2 + \dots + a_{nn} e_n
\end{cases}$$
Khi đó ma trận của ánh xạ tuyến tính $f$ trong cơ sở $E$, ký hiệu là $[f]_E$ (hoặc $A_E$), có **cột thứ $j$ là tọa độ của $f(e_j)$ trong cơ sở $E$**:
$$[f]_E = \Big( [f(e_1)]_E \;\; [f(e_2)]_E \;\; \dots \;\; [f(e_n)]_E \Big)$$

---

## 3. Giá Trị Riêng & Vectơ Riêng

Cho ma trận vuông $A$ cấp $n$ (hoặc toán tử tuyến tính $f$).
- Số thực $\lambda$ được gọi là **giá trị riêng (trị riêng)** của $A$ nếu tồn tại vectơ $X \neq 0$ sao cho:
  $$AX = \lambda X \iff (A - \lambda I)X = 0$$
- Vectơ $X \neq 0$ thỏa mãn phương trình trên được gọi là **vectơ riêng** tương ứng với trị riêng $\lambda$.

### Quy trình tìm trị riêng & vectơ riêng:
1. **Phương trình đặc trưng:** Giải phương trình:
   $$P(\lambda) = \det(A - \lambda I) = 0$$
   Nghiệm của phương trình này chính là các giá trị riêng $\lambda_i$.
2. **Không gian con riêng $E(\lambda_i)$:** Ứng với mỗi trị riêng $\lambda_i$, giải hệ phương trình thuần nhất:
   $$(A - \lambda_i I)X = 0$$
   Tập hợp các nghiệm của hệ chính là không gian con riêng $E(\lambda_i)$. Chọn một hệ nghiệm cơ bản để làm cơ sở cho $E(\lambda_i)$.

---

## 4. Chéo Hóa Ma Trận

Ma trận $A$ cấp $n$ **chéo hóa được** khi và chỉ khi $A$ có đủ $n$ vectơ riêng độc lập tuyến tính (tức là tổng số chiều của các không gian con riêng bằng $n$).

Khi đó:
$$P^{-1} A P = D = \begin{pmatrix} \lambda_1 & 0 & \dots & 0 \\ 0 & \lambda_2 & \dots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & \lambda_n \end{pmatrix}$$
- Ma trận $P$ có các cột là $n$ vectơ riêng độc lập tuyến tính tương ứng.
- Ma trận đường chéo $D$ có các phần tử trên đường chéo chính là các trị riêng theo đúng thứ tự các vectơ riêng tương ứng trong $P$.

---

## 5. Ví Dụ Mẫu Từ Đề Thi Thật

### Ví dụ 1 (Đề thi KTHP 2023 - 2024):
Cho ma trận:
$$A = \begin{pmatrix} 3 & 1 & 1 \\ 2 & 4 & 2 \\ 1 & 1 & 3 \end{pmatrix}$$
Hãy tìm các trị riêng và cơ sở của các không gian con riêng tương ứng.

::: details 📖 Xem lời giải chi tiết
**Bước 1: Lập phương trình đặc trưng $\det(A - \lambda I) = 0$:**
$$\det(A - \lambda I) = \begin{vmatrix} 3 - \lambda & 1 & 1 \\ 2 & 4 - \lambda & 2 \\ 1 & 1 & 3 - \lambda \end{vmatrix} = 0$$

Biến đổi sơ cấp: Lấy dòng 1 trừ dòng 3 ($d_1 \leftarrow d_1 - d_3$):
$$\begin{vmatrix} 2 - \lambda & 0 & \lambda - 2 \\ 2 & 4 - \lambda & 2 \\ 1 & 1 & 3 - \lambda \end{vmatrix} = (2 - \lambda) \begin{vmatrix} 1 & 0 & -1 \\ 2 & 4 - \lambda & 2 \\ 1 & 1 & 3 - \lambda \end{vmatrix}$$
Cộng cột 1 vào cột 3 ($c_3 \leftarrow c_3 + c_1$):
$$= (2 - \lambda) \begin{vmatrix} 1 & 0 & 0 \\ 2 & 4 - \lambda & 4 \\ 1 & 1 & 4 - \lambda \end{vmatrix} = (2 - \lambda) \left[ (4 - \lambda)^2 - 4 \right]$$
$$= (2 - \lambda) (\lambda^2 - 8\lambda + 12) = (2 - \lambda)(\lambda - 2)(\lambda - 6) = -(\lambda - 2)^2 (\lambda - 6)$$

Phương trình đặc trưng:
$$-(\lambda - 2)^2 (\lambda - 6) = 0 \iff \begin{cases} \lambda_1 = \lambda_2 = 2 & (\text{nghiệm bội 2}) \\ \lambda_3 = 6 & (\text{nghiệm đơn}) \end{cases}$$

---

**Bước 2: Tìm không gian con riêng ứng với $\lambda = 2$:**
Giải hệ $(A - 2I)X = 0$:
$$\begin{pmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 1 & 1 & 1 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix} \iff x_1 + x_2 + x_3 = 0$$
Hệ gồm 1 phương trình, 3 ẩn $\implies$ số ẩn tự do là $3 - 1 = 2$.
Đặt $x_2 = \alpha, x_3 = \beta \implies x_1 = -\alpha - \beta$.
Nghiệm tổng quát:
$$X = \begin{pmatrix} -\alpha - \beta \\ \alpha \\ \beta \end{pmatrix} = \alpha \begin{pmatrix} -1 \\ 1 \\ 0 \end{pmatrix} + \beta \begin{pmatrix} -1 \\ 0 \\ 1 \end{pmatrix}$$
Cơ sở của không gian con riêng $E(2)$ là:
$$B_1 = \{u_1 = (-1, 1, 0), \; u_2 = (-1, 0, 1)\}, \quad \dim E(2) = 2$$

---

**Bước 3: Tìm không gian con riêng ứng với $\lambda = 6$:**
Giải hệ $(A - 6I)X = 0$:
$$\begin{pmatrix} -3 & 1 & 1 \\ 2 & -2 & 2 \\ 1 & 1 & -3 \end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$$
Biến đổi sơ cấp:
$$\begin{pmatrix} 1 & 1 & -3 \\ 1 & -1 & 1 \\ -3 & 1 & 1 \end{pmatrix} \to \begin{pmatrix} 1 & 1 & -3 \\ 0 & -2 & 4 \\ 0 & 4 & -8 \end{pmatrix} \to \begin{pmatrix} 1 & 1 & -3 \\ 0 & 1 & -2 \\ 0 & 0 & 0 \end{pmatrix}$$
$$\begin{cases} x_1 + x_2 - 3x_3 = 0 \\ x_2 - 2x_3 = 0 \end{cases} \implies \begin{cases} x_2 = 2x_3 \\ x_1 = 3x_3 - 2x_3 = x_3 \end{cases}$$
Đặt $x_3 = t \implies X = t(1, 2, 1)^T$.
Cơ sở của không gian con riêng $E(6)$ là:
$$B_2 = \{u_3 = (1, 2, 1)\}, \quad \dim E(6) = 1$$
:::
