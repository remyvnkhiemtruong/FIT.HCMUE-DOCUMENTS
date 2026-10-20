# Chuyên Đề 3: Không Gian Vectơ, Cơ Sở & Đổi Tọa Độ

Không gian vectơ là khái niệm trừu tượng trung tâm của Đại số tuyến tính, làm cơ sở cho biểu diễn dữ liệu đa chiều, xử lý ngôn ngữ tự nhiên (Word Embeddings) và giảm chiều dữ liệu (PCA).

---

## 1. Không Gian Con & Độc Lập Tuyến Tính

### 1.1. Điều kiện kiểm tra không gian con
Tập con không rỗng $W \subseteq V$ là không gian con của $V$ khi và chỉ khi:
1. $0_V \in W$.
2. $\forall u, v \in W \implies u + v \in W$ (đóng kín với phép cộng).
3. $\forall u \in W, \; \forall k \in \mathbb{R} \implies ku \in W$ (đóng kín với phép nhân vô hướng).
*(Gộp lại: $\forall u, v \in W, \; \forall \alpha, \beta \in \mathbb{R} \implies \alpha u + \beta v \in W$)*.

### 1.2. Độc lập tuyến tính (ĐLTT) & Phụ thuộc tuyến tính (PTTT)
Cho hệ $k$ vectơ $S = \{v_1, v_2, \dots, v_k\} \subset V$. Xét phương trình:
$$\alpha_1 v_1 + \alpha_2 v_2 + \dots + \alpha_k v_k = 0$$
- Nếu phương trình **chỉ có nghiệm duy nhất** $\alpha_1 = \alpha_2 = \dots = \alpha_k = 0 \implies$ Hệ $S$ **độc lập tuyến tính**.
- Nếu tồn tại ít nhất một số $\alpha_i \neq 0 \implies$ Hệ $S$ **phụ thuộc tuyến tính**.

::: tip CÁCH KIỂM TRA ĐLTT TRONG $\mathbb{R}^n$
- Xếp các vectơ $v_1, v_2, \dots, v_k$ thành các dòng (hoặc các cột) của ma trận $A$.
- Nếu $k = n$ (ma trận vuông):
  $$\det(A) \neq 0 \iff \text{Hệ ĐLTT; } \quad \det(A) = 0 \iff \text{Hệ PTTT}$$
- Nếu $k \neq n$:
  $$\text{rank}(A) = k \iff \text{Hệ ĐLTT; } \quad \text{rank}(A) < k \iff \text{Hệ PTTT}$$
:::

---

## 2. Cơ Sở, Số Chiều & Tọa Độ Vectơ

### 2.1. Định nghĩa cơ sở & số chiều
Hệ vectơ $B = \{e_1, e_2, \dots, e_n\}$ là một **cơ sở** của không gian vectơ $V$ nếu:
1. $B$ là hệ độc lập tuyến tính.
2. $B$ là hệ sinh của $V$ ($\text{span}(B) = V$).

Số lượng vectơ trong một cơ sở của $V$ được gọi là **số chiều** của $V$, ký hiệu là $\dim(V)$.

### 2.2. Tọa độ của vectơ đối với cơ sở
Nếu $B = \{e_1, e_2, \dots, e_n\}$ là cơ sở của $V$, mọi vectơ $v \in V$ đều biểu diễn duy nhất dưới dạng:
$$v = x_1 e_1 + x_2 e_2 + \dots + x_n e_n$$
Cột tọa độ của $v$ đối với cơ sở $B$ được ký hiệu là:
$$[v]_B = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{pmatrix}$$

---

## 3. Ma Trận Chuyển Cơ Sở & Công Thức Đổi Tọa Độ

Cho hai cơ sở $E = \{e_1, e_2, \dots, e_n\}$ và $F = \{f_1, f_2, \dots, f_n\}$ trong $V$.

### 3.1. Ma trận chuyển cơ sở từ $E$ sang $F$ ($P_{E \to F}$)
Biểu diễn các vectơ của cơ sở mới $F$ theo cơ sở cũ $E$:
$$\begin{cases}
f_1 = c_{11} e_1 + c_{21} e_2 + \dots + c_{n1} e_n \\
f_2 = c_{12} e_1 + c_{22} e_2 + \dots + c_{n2} e_n \\
\dots \\
f_n = c_{1n} e_1 + c_{2n} e_2 + \dots + c_{nn} e_n
\end{cases}$$
Khi đó ma trận chuyển cơ sở $P_{E \to F}$ (ký hiệu gọn là $P$) có các **cột chính là tọa độ của các vectơ $f_j$ trong cơ sở $E$**:
$$P_{E \to F} = \Big( [f_1]_E \;\; [f_2]_E \;\; \dots \;\; [f_n]_E \Big)$$

::: warning ĐẶC BIỆT KHI $E$ LÀ CƠ SỞ CHÍNH TẮC CỦA $\mathbb{R}^n$
Nếu $E$ là cơ sở chính tắc, thì ma trận chuyển cơ sở từ $E$ sang $F$ đơn giản chỉ là **xếp các vectơ $f_1, f_2, \dots, f_n$ thành các cột** của ma trận $P$!
:::

### 3.2. Công thức đổi tọa độ
Mối liên hệ giữa tọa độ của cùng một vectơ $v$ trong hai cơ sở:
$$[v]_E = P_{E \to F} \cdot [v]_F \iff [v]_F = (P_{E \to F})^{-1} \cdot [v]_E$$

---

## 4. Ví Dụ Bài Tập Từ Đề Thi Thật

### Ví dụ (Đề thi KTHP 2024 - 2025):
Trong không gian $\mathbb{R}^3$, cho cơ sở chính tắc $E = \{e_1, e_2, e_3\}$ và họ vectơ:
$$F = \{f_1 = (1, -1, 0), \; f_2 = (1, 2, 1), \; f_3 = (0, 3, -2)\}$$
1. Tìm ma trận chuyển cơ sở từ $E$ sang $F$.
2. Cho vectơ $v = (3, 4, 5)$. Tìm tọa độ của vectơ $v$ trong cơ sở $F$.

::: details 📖 Xem lời giải chi tiết
**Câu 1: Tìm ma trận chuyển cơ sở từ $E$ sang $F$ ($P_{E \to F}$):**
Vì $E$ là cơ sở chính tắc của $\mathbb{R}^3$, tọa độ của các vectơ $f_1, f_2, f_3$ trong cơ sở $E$ chính là các thành phần tọa độ của chúng:
$$[f_1]_E = \begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix}, \quad [f_2]_E = \begin{pmatrix} 1 \\ 2 \\ 1 \end{pmatrix}, \quad [f_3]_E = \begin{pmatrix} 0 \\ 3 \\ -2 \end{pmatrix}$$

Do đó, ma trận chuyển cơ sở từ $E$ sang $F$ là:
$$P = P_{E \to F} = \begin{pmatrix} 1 & 1 & 0 \\ -1 & 2 & 3 \\ 0 & 1 & -2 \end{pmatrix}$$

Kiểm tra định thức để khẳng định $F$ là cơ sở:
$$\det(P) = 1(-4 - 3) - 1(2 - 0) + 0 = -7 - 2 = -9 \neq 0$$
Vậy $F$ thực sự là một cơ sở của $\mathbb{R}^3$.

---

**Câu 2: Tìm tọa độ của vectơ $v = (3, 4, 5)$ trong cơ sở $F$:**
Gọi $[v]_F = \begin{pmatrix} c_1 \\ c_2 \\ c_3 \end{pmatrix}$. Theo định nghĩa:
$$v = c_1 f_1 + c_2 f_2 + c_3 f_3$$
Hoặc áp dụng hệ phương trình $P [v]_F = [v]_E$:
$$\begin{pmatrix} 1 & 1 & 0 \\ -1 & 2 & 3 \\ 0 & 1 & -2 \end{pmatrix} \begin{pmatrix} c_1 \\ c_2 \\ c_3 \end{pmatrix} = \begin{pmatrix} 3 \\ 4 \\ 5 \end{pmatrix}$$

Ta giải hệ phương trình:
$$\begin{cases}
c_1 + c_2 = 3 & (1) \\
-c_1 + 2c_2 + 3c_3 = 4 & (2) \\
c_2 - 2c_3 = 5 & (3)
\end{cases}$$

- Cộng $(1)$ và $(2)$:
  $$3c_2 + 3c_3 = 7 \implies c_2 + c_3 = \frac{7}{3}$$
- Kết hợp với phương trình $(3)$: $c_2 - 2c_3 = 5$:
  $$(c_2 + c_3) - (c_2 - 2c_3) = \frac{7}{3} - 5 \implies 3c_3 = -\frac{8}{3} \implies c_3 = -\frac{8}{9}$$
- Thay $c_3$ vào tìm $c_2$:
  $$c_2 = 5 + 2c_3 = 5 + 2\left(-\frac{8}{9}\right) = 5 - \frac{16}{9} = \frac{29}{9}$$
- Thay $c_2$ vào phương trình $(1)$ để tìm $c_1$:
  $$c_1 = 3 - c_2 = 3 - \frac{29}{9} = -\frac{2}{9}$$

**Kết luận:** Tọa độ của vectơ $v$ trong cơ sở $F$ là:
$$[v]_F = \begin{pmatrix} -2/9 \\ 29/9 \\ -8/9 \end{pmatrix} = \left(-\frac{2}{9}, \frac{29}{9}, -\frac{8}{9}\right)^T$$
:::
