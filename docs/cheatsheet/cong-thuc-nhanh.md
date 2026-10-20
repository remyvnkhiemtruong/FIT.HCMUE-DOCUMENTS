# ⚡ Sổ Tay Tra Cứu Công Thức Thần Tốc

Bảng tổng hợp tất cả công thức trọng tâm của học phần **COMP1800 - Cơ sở Toán trong CNTT** để tra cứu nhanh trước giờ thi.

---

## 1. Giới Hạn & Vô Cùng Bé Tương Đương ($x \to 0$)

$$\sin x \sim x, \quad \tan x \sim x, \quad \arcsin x \sim x, \quad \arctan x \sim x$$
$$e^x - 1 \sim x, \quad a^x - 1 \sim x \ln a, \quad \ln(1 + x) \sim x$$
$$1 - \cos x \sim \frac{x^2}{2}, \quad (1 + x)^\alpha - 1 \sim \alpha x, \quad \sqrt{1 + x} - 1 \sim \frac{x}{2}$$

**Giới hạn dạng $1^\infty$:**
$$\lim_{x \to x_0} [u(x)]^{v(x)} = e^{\lim_{x \to x_0} [u(x) - 1] v(x)}$$

---

## 2. Bảng Đạo Hàm Cấp Cao Thường Gặp

| Hàm số $f(x)$ | Đạo hàm cấp $n$: $f^{(n)}(x)$ |
| :--- | :--- |
| $e^{ax}$ | $a^n e^{ax}$ |
| $\sin(ax)$ | $a^n \sin\left(ax + n \frac{\pi}{2}\right)$ |
| $\cos(ax)$ | $a^n \cos\left(ax + n \frac{\pi}{2}\right)$ |
| $\frac{1}{ax + b}$ | $\frac{(-1)^n n! a^n}{(ax + b)^{n+1}}$ |
| $\ln(ax + b)$ | $\frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$ |
| $(u \cdot v)^{(n)}$ *(Leibniz)* | $\sum_{k=0}^{n} C_n^k u^{(n-k)} v^{(k)}$ |

---

## 3. Khai Triển Maclaurin Cốt Lõi

$$e^x = \sum_{k=0}^n \frac{x^k}{k!} + o(x^n) = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} + o(x^n)$$
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots + (-1)^n \frac{x^{2n+1}}{(2n+1)!} + o(x^{2n+2})$$
$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots + (-1)^n \frac{x^{2n}}{(2n)!} + o(x^{2n+1})$$
$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + (-1)^{n-1} \frac{x^n}{n} + o(x^n)$$
$$\frac{1}{1 - x} = 1 + x + x^2 + \dots + x^n + o(x^n)$$

---

## 4. Tích Phân & Tổng Riemann

$$\int \frac{dx}{x^2 + a^2} = \frac{1}{a} \arctan\left(\frac{x}{a}\right) + C$$
$$\int \frac{dx}{x^2 - a^2} = \frac{1}{2a} \ln\left|\frac{x - a}{x + a}\right| + C$$
$$\int \frac{dx}{\sqrt{a^2 - x^2}} = \arcsin\left(\frac{x}{a}\right) + C$$
$$\int \frac{dx}{\sqrt{x^2 + k}} = \ln|x + \sqrt{x^2 + k}| + C$$

**Định nghĩa tích phân Riemann:**
$$\lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^n f\left(\frac{k}{n}\right) = \int_0^1 f(x) \, dx$$

---

## 5. Tích Phân Suy Rộng & Chuỗi Số

| Loại | Tích phân / Chuỗi chuẩn | Điều kiện HỘI TỤ | Điều kiện PHÂN KỲ |
| :--- | :--- | :---: | :---: |
| **Suy rộng loại 1** | $\int_a^{+\infty} \frac{dx}{x^\alpha}$ ($a > 0$) | $\alpha > 1$ | $\alpha \le 1$ |
| **Suy rộng loại 2** | $\int_a^b \frac{dx}{(b-x)^\alpha}$ | $\alpha < 1$ | $\alpha \ge 1$ |
| **Chuỗi số Riemann** | $\sum_{n=1}^\infty \frac{1}{n^\alpha}$ | $\alpha > 1$ | $\alpha \le 1$ |

**Tiêu chuẩn D'Alembert & Căn Cauchy:**
$$L = \lim_{n \to \infty} \frac{u_{n+1}}{u_n} \quad \text{hoặc} \quad L = \lim_{n \to \infty} \sqrt[n]{u_n} \implies \begin{cases} L < 1: \text{Hội tụ} \\ L > 1: \text{Phân kỳ} \\ L = 1: \text{Chưa kết luận} \end{cases}$$

---

## 6. Ma Trận & Định Thức

- $(AB)^T = B^T A^T$
- $\det(AB) = \det(A) \det(B)$
- $\det(kA) = k^n \det(A)$ ($A$ vuông cấp $n$)
- $\det(A^{-1}) = \frac{1}{\det(A)}$
- Ma trận nghịch đảo: $A^{-1} = \frac{1}{\det(A)} A^* = \frac{1}{\det(A)} (C_{ij})^T$

---

## 7. Không Gian Vectơ & Ánh Xạ Tuyến Tính

- **Hệ Cramer:** Hệ $n$ PT, $n$ ẩn và $\det(A) \neq 0 \implies x_j = \frac{D_j}{D}$.
- **Hệ thuần nhất $AX = 0$:** Số chiều không gian nghiệm $\dim(W) = n - \text{rank}(A)$.
- **Đổi cơ sở:** $[v]_E = P_{E \to F} [v]_F \iff [v]_F = (P_{E \to F})^{-1} [v]_E$.
- **Định lý số chiều:** $\dim(\ker f) + \dim(\text{Im} f) = \dim(V)$.
- **Trực chuẩn hóa Gram-Schmidt:**
  $$u_1 = v_1, \quad u_k = v_k - \sum_{i=1}^{k-1} \frac{\langle v_k, u_i \rangle}{\|u_i\|^2} u_i, \quad e_k = \frac{u_k}{\|u_k\|}$$
- **Trị riêng & Vectơ riêng:** $\det(A - \lambda I) = 0$, giải $(A - \lambda I)X = 0$.
- **Chéo hóa:** $P^{-1} A P = D$ (cột của $P$ là $n$ vectơ riêng ĐLTT).
