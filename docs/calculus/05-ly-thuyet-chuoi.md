---
title: "Chuyên đề 5: Lý thuyết chuỗi số và chuỗi lũy thừa"
---

# Chuyên đề 5: Lý thuyết chuỗi số và chuỗi lũy thừa {#chuyen-đe-5-ly-thuyet-chuoi-so-chuoi-luy-thua}

Lý thuyết chuỗi là nội dung quan trọng trong Giải tích để biểu diễn các hàm số phức tạp dưới dạng chuỗi đa thức vô hạn, phục vụ trực tiếp cho tính toán số và khoa học máy tính.

---

## 1. Chuỗi số và điều kiện hội tụ cơ bản {#_1-chuoi-so-đieu-kien-hoi-tu-co-ban}

### 1.1. Định nghĩa
Cho dãy số $(u_n)_{n=1}^\infty$. Tổng vô hạn:
$$\sum_{n=1}^{\infty} u_n = u_1 + u_2 + \dots + u_n + \dots$$
được gọi là một **chuỗi số**.
- Dãy tổng riêng: $S_n = \sum_{k=1}^n u_k$.
- Chuỗi hội tụ về $S$ nếu $\lim_{n \to \infty} S_n = S \in \mathbb{R}$.

::: danger Điều kiện cần để chuỗi hội tụ
Nếu chuỗi $\sum_{n=1}^\infty u_n$ hội tụ thì:
$$\lim_{n \to \infty} u_n = 0$$
**Hệ quả (Dấu hiệu phân kỳ):** Nếu $\lim_{n \to \infty} u_n \neq 0$ (hoặc không tồn tại) thì chuỗi **chắc chắn phân kỳ**.
*(Lưu ý: Chiều ngược lại không đúng, ví dụ chuỗi điều hòa $\sum \frac{1}{n}$ có $\lim \frac{1}{n} = 0$ nhưng vẫn phân kỳ).*
:::

---

## 2. Các tiêu chuẩn hội tụ cho chuỗi số dương ($u_n \ge 0$) {#_2-cac-tieu-chuan-hoi-tu-cho-chuoi-so-duong}

### 2.1. Chuỗi chuẩn Riemann (chuỗi $p$-series) {#_2-1-chuoi-chuan-riemann-chuoi-series}
$$\sum_{n=1}^{\infty} \frac{1}{n^\alpha} = \begin{cases} \text{Hội tụ} & \text{khi } \alpha > 1 \\ \text{Phân kỳ} & \text{khi } \alpha \le 1 \end{cases}$$

### 2.2. Tiêu chuẩn D'Alembert (tỉ số) {#_2-2-tieu-chuan-d-alembert-ti-so}
Tính giới hạn:
$$D = \lim_{n \to \infty} \frac{u_{n+1}}{u_n}$$
- $D < 1 \implies$ Chuỗi **hội tụ**.
- $D > 1 \implies$ Chuỗi **phân kỳ**.
- $D = 1 \implies$ Chưa thể kết luận (dùng tiêu chuẩn khác).

*(Áp dụng khi $u_n$ chứa giai thừa $n!$ hoặc lũy thừa $a^n$).*

### 2.3. Tiêu chuẩn căn Cauchy {#_2-3-tieu-chuan-can-cauchy}
Tính giới hạn:
$$C = \lim_{n \to \infty} \sqrt[n]{u_n}$$
- $C < 1 \implies$ Chuỗi **hội tụ**.
- $C > 1 \implies$ Chuỗi **phân kỳ**.
- $C = 1 \implies$ Chưa thể kết luận.

*(Áp dụng khi số hạng có dạng $[f(n)]^n$).*

---

## 3. Chuỗi đan dấu và chuỗi có dấu bất kỳ {#_3-chuoi-đan-dau-chuoi-co-dau-bat-ky}

### 3.1. Tiêu chuẩn Leibniz cho chuỗi đan dấu
Chuỗi có dạng:
$$\sum_{n=1}^{\infty} (-1)^{n-1} a_n \quad (a_n > 0)$$
Nếu thỏa mãn 2 điều kiện:
1. Dãy $\{a_n\}$ là dãy đơn điệu giảm: $a_{n+1} \le a_n, \; \forall n$.
2. $\lim_{n \to \infty} a_n = 0$.

Thì chuỗi **hội tụ**.

### 3.2. Hội tụ tuyệt đối và bán hội tụ {#_3-2-hoi-tu-tuyet-đoi-ban-hoi-tu}
- Chuỗi $\sum u_n$ được gọi là **hội tụ tuyệt đối** nếu chuỗi $\sum |u_n|$ hội tụ.
- Chuỗi được gọi là **bán hội tụ** nếu bản thân nó hội tụ nhưng chuỗi $\sum |u_n|$ phân kỳ (ví dụ: $\sum \frac{(-1)^{n-1}}{n}$).

---

## 4. Chuỗi lũy thừa {#_4-chuoi-luy-thua}

Chuỗi có dạng:
$$\sum_{n=0}^{\infty} a_n (x - x_0)^n \quad (\text{thường xét } x_0 = 0: \sum a_n x^n)$$

### Bán kính hội tụ $R$
$$R = \lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right| \quad \text{hoặc} \quad R = \frac{1}{\lim_{n \to \infty} \sqrt[n]{|a_n|}}$$
- Chuỗi hội tụ tuyệt đối trên khoảng $(-R, R)$.
- Chuỗi phân kỳ khi $|x| > R$.
- Tại hai điểm mút $x = \pm R$: Cần thay trực tiếp vào chuỗi để xét riêng.

---

## 5. Ví dụ mẫu {#_5-vi-du-mau}

### Ví dụ 1:
Xét sự hội tụ của chuỗi:
$$\sum_{n=1}^{\infty} \frac{2^n \cdot n!}{(2n)!}$$

::: details Lời giải
Đây là chuỗi số dương với $u_n = \frac{2^n n!}{(2n)!}$.
Xét tỉ số theo D'Alembert:
$$\frac{u_{n+1}}{u_n} = \frac{2^{n+1} (n+1)!}{(2(n+1))!} \cdot \frac{(2n)!}{2^n n!} = \frac{2 \cdot (n+1)}{(2n+2)(2n+1)} = \frac{2(n+1)}{2(n+1)(2n+1)} = \frac{1}{2n+1}$$
Lấy giới hạn:
$$D = \lim_{n \to \infty} \frac{u_{n+1}}{u_n} = \lim_{n \to \infty} \frac{1}{2n+1} = 0$$
Vì $D = 0 < 1$, theo tiêu chuẩn D'Alembert, chuỗi **hội tụ**.
:::

### Ví dụ 2:
Tìm bán kính và miền hội tụ của chuỗi lũy thừa:
$$\sum_{n=1}^{\infty} \frac{(x - 1)^n}{n \cdot 3^n}$$

::: details Lời giải
Hệ số $a_n = \frac{1}{n \cdot 3^n}$.
Bán kính hội tụ:
$$R = \lim_{n \to \infty} \left| \frac{a_n}{a_{n+1}} \right| = \lim_{n \to \infty} \frac{(n+1) \cdot 3^{n+1}}{n \cdot 3^n} = \lim_{n \to \infty} 3 \frac{n+1}{n} = 3$$
Khoảng hội tụ là $|x - 1| < 3 \iff -2 < x < 4$.

**Xét tại hai đầu mút:**
1. Tại $x = 4$: Chuỗi trở thành $\sum_{n=1}^\infty \frac{3^n}{n \cdot 3^n} = \sum_{n=1}^\infty \frac{1}{n}$. Đây là chuỗi điều hòa ($\alpha = 1$) nên **phân kỳ**.
2. Tại $x = -2$: Chuỗi trở thành $\sum_{n=1}^\infty \frac{(-3)^n}{n \cdot 3^n} = \sum_{n=1}^\infty \frac{(-1)^n}{n}$. Đây là chuỗi đan dấu có $a_n = \frac{1}{n}$ giảm dần về 0. Theo tiêu chuẩn Leibniz, chuỗi này **hội tụ**.

**Kết luận:** Miền hội tụ của chuỗi là $[-2, 4)$.
:::
