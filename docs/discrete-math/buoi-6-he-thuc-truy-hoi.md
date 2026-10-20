# Buổi 6: Hệ Thức Truy Hồi & Phương Trình Sai Phân

Hệ thức truy hồi (Recurrence Relations) mô hình hóa các quá trình đệ quy trong khoa học máy tính như thuật toán chia để trị (Divide and Conquer), quy hoạch động (Dynamic Programming) và cây đệ quy.

---

## 1. Khái Niệm Hệ Thức Truy Hồi

Một **hệ thức truy hồi** đối với dãy số $\{a_n\}$ là một công thức biểu diễn số hạng $a_n$ thông qua một hoặc nhiều số hạng đứng trước nó: $a_{n-1}, a_{n-2}, \dots$ kèm theo các **điều kiện đầu (Initial Conditions)**.

**Ví dụ kinh điển:**
- Dãy Fibonacci: $F_n = F_{n-1} + F_{n-2}$ với $F_0 = 0, F_1 = 1$.
- Bài toán tháp Hà Nội: $H_n = 2H_{n-1} + 1$ với $H_1 = 1 \implies H_n = 2^n - 1$.

---

## 2. Giải Hệ Thức Tuyến Tính Thuần Nhất Bậc 2

Hệ thức có dạng:
$$a_n + c_1 a_{n-1} + c_2 a_{n-2} = 0 \quad (c_2 \neq 0)$$

### 2.1. Phương trình đặc trưng
Lập phương trình đặc trưng bằng cách thay $a_n \to r^n$:
$$r^2 + c_1 r + c_2 = 0$$

### 2.2. Các trường hợp nghiệm

| Trường hợp nghiệm của PT đặc trưng | Dạng nghiệm tổng quát $a_n$ |
| :--- | :--- |
| **Hai nghiệm thực phân biệt $r_1 \neq r_2$** | $$a_n = \alpha_1 r_1^n + \alpha_2 r_2^n$$ |
| **Nghiệm kép $r_1 = r_2 = r_0$** | $$a_n = (\alpha_1 + \alpha_2 n) r_0^n$$ |
| **Hai nghiệm phức liên hợp $r_{1,2} = \rho e^{\pm i\theta}$** | $$a_n = \rho^n (\alpha_1 \cos(n\theta) + \alpha_2 \sin(n\theta))$$ |

Các hằng số $\alpha_1, \alpha_2$ được xác định duy nhất từ các điều kiện ban đầu $a_0, a_1$.

---

## 3. Hệ Thức Tuyến Tính Không Thuần Nhất

Hệ thức có dạng:
$$a_n + c_1 a_{n-1} + c_2 a_{n-2} = F(n)$$
Nghiệm tổng quát có dạng:
$$a_n = a_n^{(h)} + a_n^{(p)}$$
- $a_n^{(h)}$: Nghiệm tổng quát của phương trình thuần nhất tương ứng ($F(n) = 0$).
- $a_n^{(p)}$: Một nghiệm riêng của phương trình không thuần nhất.

### Bảng dự đoán nghiệm riêng $a_n^{(p)}$ khi $F(n) = s^n P_m(n)$

| Vế phải $F(n)$ | Điều kiện của $s$ | Dạng nghiệm riêng $a_n^{(p)}$ |
| :--- | :--- | :--- |
| Đa thức bậc $m$: $P_m(n)$ | $s = 1$ không là nghiệm của PT đặc trưng | $Q_m(n)$ (đa thức cùng bậc $m$) |
| Đa thức bậc $m$: $P_m(n)$ | $s = 1$ là nghiệm đơn của PT đặc trưng | $n \cdot Q_m(n)$ |
| Lũy thừa $C \cdot s^n$ | $s$ không là nghiệm của PT đặc trưng | $A \cdot s^n$ |
| Lũy thừa $C \cdot s^n$ | $s$ là nghiệm đơn của PT đặc trưng | $A \cdot n \cdot s^n$ |
| Lũy thừa $C \cdot s^n$ | $s$ là nghiệm kép của PT đặc trưng | $A \cdot n^2 \cdot s^n$ |

---

## 4. Bài Tập Mẫu Từ Đề Thi Thật

### Bài 1 (Đề thi KTHP Toán rời rạc):
Giải hệ thức truy hồi sau:
$$a_n - 7a_{n-1} + 12a_{n-2} = 0 \quad (n \ge 2)$$
với điều kiện đầu $a_0 = 2, a_1 = 7$.

::: details 📖 Xem lời giải chi tiết
**Bước 1: Lập phương trình đặc trưng:**
$$r^2 - 7r + 12 = 0 \iff (r - 3)(r - 4) = 0 \iff \begin{cases} r_1 = 3 \\ r_2 = 4 \end{cases}$$
Phương trình có hai nghiệm thực phân biệt.

**Bước 2: Dạng nghiệm tổng quát:**
$$a_n = \alpha_1 \cdot 3^n + \alpha_2 \cdot 4^n$$

**Bước 3: Tìm $\alpha_1, \alpha_2$ từ điều kiện đầu:**
- Với $n = 0$: $a_0 = \alpha_1 \cdot 3^0 + \alpha_2 \cdot 4^0 = \alpha_1 + \alpha_2 = 2$
- Với $n = 1$: $a_1 = \alpha_1 \cdot 3^1 + \alpha_2 \cdot 4^1 = 3\alpha_1 + 4\alpha_2 = 7$

Giải hệ phương trình bậc nhất 2 ẩn:
$$\begin{cases} \alpha_1 + \alpha_2 = 2 \\ 3\alpha_1 + 4\alpha_2 = 7 \end{cases} \implies \begin{cases} \alpha_1 = 1 \\ \alpha_2 = 1 \end{cases}$$

**Kết luận:** Dãy nghiệm cần tìm là:
$$a_n = 3^n + 4^n, \quad \forall n \ge 0$$
:::

### Bài 2:
Giải hệ thức truy hồi không thuần nhất:
$$a_n - 5a_{n-1} + 6a_{n-2} = 2^n \quad (n \ge 2)$$
với điều kiện đầu $a_0 = 1, a_1 = 3$.

::: details 📖 Xem lời giải chi tiết
**Bước 1: Tìm nghiệm thuần nhất $a_n^{(h)}$:**
Phương trình đặc trưng: $r^2 - 5r + 6 = 0 \iff r_1 = 2, r_2 = 3$.
$$a_n^{(h)} = \alpha_1 2^n + \alpha_2 3^n$$

**Bước 2: Tìm nghiệm riêng $a_n^{(p)}$:**
Vế phải $F(n) = 2^n$ có cơ số $s = 2$. Do $s = 2$ là nghiệm đơn của phương trình đặc trưng, ta chọn dạng nghiệm riêng có nhân thêm $n$:
$$a_n^{(p)} = A \cdot n \cdot 2^n$$
Thay vào phương trình:
$$A \cdot n \cdot 2^n - 5A \cdot (n-1) \cdot 2^{n-1} + 6A \cdot (n-2) \cdot 2^{n-2} = 2^n$$
Chia cả hai vế cho $2^{n-2}$:
$$4An - 10A(n - 1) + 6A(n - 2) = 4$$
$$4An - 10An + 10A + 6An - 12A = 4$$
$$-2A = 4 \implies A = -2$$
Vậy nghiệm riêng là: $a_n^{(p)} = -2 \cdot n \cdot 2^n = -n \cdot 2^{n+1}$.

**Bước 3: Nghiệm tổng quát:**
$$a_n = \alpha_1 2^n + \alpha_2 3^n - n \cdot 2^{n+1}$$
Thay điều kiện ban đầu $a_0 = 1, a_1 = 3$:
- $n = 0 \implies \alpha_1 + \alpha_2 = 1$
- $n = 1 \implies 2\alpha_1 + 3\alpha_2 - 4 = 3 \implies 2\alpha_1 + 3\alpha_2 = 7$
$$\implies \alpha_1 = -4, \quad \alpha_2 = 5$$

**Kết luận:** $a_n = -4 \cdot 2^n + 5 \cdot 3^n - n \cdot 2^{n+1} = -(n+2)2^{n+1} + 5 \cdot 3^n$.
:::
