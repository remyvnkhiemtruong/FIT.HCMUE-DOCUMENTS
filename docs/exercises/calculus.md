# 📚 Tuyển Tập Bài Tập Giải Tích (Kèm Lời Giải)

Dưới đây là các dạng bài tập điển hình trong phần Giải tích hàm một biến. Hãy giải ra giấy trước khi nhấp vào xem đáp án.

---

## Dạng 1: Giới Hạn & Vô Cùng Bé Tương Đương

### Bài 1.1:
Tính giới hạn:
$$L_1 = \lim_{x \to 0} \frac{\sqrt[3]{2x + 1} - 1}{\sqrt{x + 1} - 1}$$

::: details 📖 Xem lời giải chi tiết
**Cách 1: Dùng Vô cùng bé tương đương ($x \to 0$):**
- $\sqrt[3]{1 + 2x} - 1 = (1 + 2x)^{1/3} - 1 \sim \frac{1}{3}(2x) = \frac{2}{3}x$
- $\sqrt{1 + x} - 1 = (1 + x)^{1/2} - 1 \sim \frac{1}{2}x$

Do đó:
$$L_1 = \lim_{x \to 0} \frac{\frac{2}{3}x}{\frac{1}{2}x} = \frac{2/3}{1/2} = \frac{4}{3}$$

**Cách 2: Nhân lượng liên hiệp:**
$$L_1 = \lim_{x \to 0} \frac{2x \cdot (\sqrt{x+1} + 1)}{x \cdot (\sqrt[3]{(2x+1)^2} + \sqrt[3]{2x+1} + 1)} = \frac{2(2)}{1 + 1 + 1} = \frac{4}{3}$$
:::

### Bài 1.2:
Tính giới hạn:
$$L_2 = \lim_{x \to 0} (\cos x)^{\frac{1}{x^2}}$$

::: details 📖 Xem lời giải chi tiết
Dạng vô định $1^\infty$. Áp dụng công thức:
$$L_2 = e^{\lim_{x \to 0} (\cos x - 1) \cdot \frac{1}{x^2}}$$
Khi $x \to 0$, $1 - \cos x \sim \frac{x^2}{2} \implies \cos x - 1 \sim -\frac{x^2}{2}$.
Suy ra:
$$\lim_{x \to 0} \frac{-\frac{x^2}{2}}{x^2} = -\frac{1}{2}$$
Vậy:
$$L_2 = e^{-1/2} = \frac{1}{\sqrt{e}}$$
:::

---

## Dạng 2: Đạo Hàm Cấp Cao (Công Thức Leibniz)

### Bài 2.1:
Cho hàm số $y = (x^2 - 1) e^{2x}$. Hãy tính đạo hàm cấp $n$ ($n \ge 2$):
$$y^{(n)}$$

::: details 📖 Xem lời giải chi tiết
Đặt $u(x) = e^{2x}$ và $v(x) = x^2 - 1$.
Ta có:
- $u^{(k)}(x) = 2^k e^{2x}$
- $v'(x) = 2x$, $v''(x) = 2$, $v^{(k)}(x) = 0 \; (\forall k \ge 3)$.

Áp dụng công thức Leibniz:
$$y^{(n)} = C_n^0 u^{(n)} v + C_n^1 u^{(n-1)} v' + C_n^2 u^{(n-2)} v''$$
Thay vào:
$$y^{(n)} = 1 \cdot 2^n e^{2x} (x^2 - 1) + n \cdot 2^{n-1} e^{2x} (2x) + \frac{n(n-1)}{2} \cdot 2^{n-2} e^{2x} (2)$$
Đặt $2^{n-2} e^{2x}$ làm nhân tử chung:
$$y^{(n)} = 2^{n-2} e^{2x} \left[ 4(x^2 - 1) + 4nx + 2n(n-1) \right]$$
$$y^{(n)} = 2^{n-2} e^{2x} \left( 4x^2 + 4nx + 2n^2 - 2n - 4 \right)$$
:::

---

## Dạng 3: Tích Phân & Tích Phân Suy Rộng

### Bài 3.1:
Tính tích phân xác định:
$$I = \int_0^1 \frac{x}{\sqrt{1 + x^2}} \, dx$$

::: details 📖 Xem lời giải chi tiết
Đặt $t = \sqrt{1 + x^2} \implies t^2 = 1 + x^2 \implies t \, dt = x \, dx$.
Đổi cận:
- Khi $x = 0 \implies t = 1$.
- Khi $x = 1 \implies t = \sqrt{2}$.

Tích phân trở thành:
$$I = \int_1^{\sqrt{2}} \frac{t \, dt}{t} = \int_1^{\sqrt{2}} dt = [t]_1^{\sqrt{2}} = \sqrt{2} - 1$$
:::

### Bài 3.2:
Tính tích phân suy rộng:
$$J = \int_0^{+\infty} \frac{dx}{x^2 + 4}$$

::: details 📖 Xem lời giải chi tiết
Nguyên hàm:
$$\int \frac{dx}{x^2 + a^2} = \frac{1}{a} \arctan\left(\frac{x}{a}\right) + C$$
Ở đây $a = 2$:
$$J = \lim_{b \to +\infty} \int_0^b \frac{dx}{x^2 + 4} = \lim_{b \to +\infty} \left[ \frac{1}{2} \arctan\left(\frac{x}{2}\right) \right]_0^b$$
$$= \frac{1}{2} \left( \lim_{b \to +\infty} \arctan\left(\frac{b}{2}\right) - \arctan(0) \right) = \frac{1}{2} \left( \frac{\pi}{2} - 0 \right) = \frac{\pi}{4}$$
:::

---

## Dạng 4: Chuỗi Số & Bán Kính Hội Tụ

### Bài 4.1:
Xét sự hội tụ của chuỗi số:
$$\sum_{n=1}^{\infty} \frac{n^2}{3^n}$$

::: details 📖 Xem lời giải chi tiết
Chuỗi số dương có $u_n = \frac{n^2}{3^n}$.
Áp dụng tiêu chuẩn D'Alembert:
$$D = \lim_{n \to \infty} \frac{u_{n+1}}{u_n} = \lim_{n \to \infty} \frac{(n+1)^2}{3^{n+1}} \cdot \frac{3^n}{n^2} = \lim_{n \to \infty} \frac{1}{3} \left(\frac{n+1}{n}\right)^2 = \frac{1}{3}$$
Vì $D = \frac{1}{3} < 1$, nên chuỗi **hội tụ**.
:::
