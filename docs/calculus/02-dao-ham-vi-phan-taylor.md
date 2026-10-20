---
title: "Chuyên đề 2: Phép tính vi phân, đạo hàm cấp cao và khai triển Taylor"
---

# Chuyên đề 2: Phép tính vi phân, đạo hàm cấp cao và khai triển Taylor {#chuyen-đe-2-phep-tinh-vi-phan-đao-ham-cap-cao-khai-trien-taylor}

Chuyên đề này tập trung vào các kỹ thuật vi phân, tính đạo hàm cấp cao bằng công thức Leibniz và khai triển hàm số thành đa thức xấp xỉ Taylor - Maclaurin — những dạng bài xuất hiện thường xuyên trong đề thi KTHP.

---

## 1. Đạo hàm và vi phân {#_1-đao-ham-vi-phan}

### 1.1. Khái niệm cơ bản
- **Đạo hàm:**
  $$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x} = \lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0}$$
- **Vi phân:** Nếu hàm số khả vi tại $x_0$, vi phân cấp 1 là:
  $$df(x) = f'(x) dx$$
- **Ứng dụng tính gần đúng:**
  $$f(x_0 + \Delta x) \approx f(x_0) + f'(x_0) \Delta x$$

---

## 2. Đạo hàm cấp cao và công thức Leibniz {#_2-đao-ham-cap-cao-cong-thuc-leibniz}

### 2.1. Đạo hàm cấp $n$ của một số hàm số cơ bản
- $(e^{ax})^{(n)} = a^n e^{ax}$
- $(\sin ax)^{(n)} = a^n \sin\left(ax + n \frac{\pi}{2}\right)$
- $(\cos ax)^{(n)} = a^n \cos\left(ax + n \frac{\pi}{2}\right)$
- $\left(\frac{1}{ax + b}\right)^{(n)} = \frac{(-1)^n n! a^n}{(ax + b)^{n+1}}$
- $(\ln(ax + b))^{(n)} = \frac{(-1)^{n-1} (n-1)! a^n}{(ax + b)^n}$

### 2.2. Công thức Leibniz cho tích của hai hàm số
Cho hai hàm số $u(x)$ và $v(x)$ khả vi đến cấp $n$, đạo hàm cấp $n$ của tích $u \cdot v$ được tính theo công thức nhị thức Newton:
$$(u \cdot v)^{(n)} = \sum_{k=0}^{n} C_n^k u^{(n-k)} v^{(k)}$$
Trong đó $C_n^k = \frac{n!}{k!(n-k)!}$.

::: tip Áp dụng công thức Leibniz
Khi gặp dạng $f(x) = P(x) \cdot g(x)$ với $P(x)$ là đa thức bậc $m$ (ví dụ $x^2$ hay $x^3$), ta chọn $v(x) = P(x)$ vì đạo hàm $v^{(k)}(x) = 0$ với mọi $k > m$. Nhờ đó, tổng từ $0 \to n$ chỉ còn lại $m+1$ số hạng đầu tiên.
:::

---

## 3. Các định lý về giá trị trung bình {#_3-cac-đinh-ly-ve-gia-tri-trung-binh}

| Định lý | Giả thiết | Kết luận | Ý nghĩa hình học |
| :--- | :--- | :--- | :--- |
| **Rolle** | $f \in C[a, b]$, khả vi trên $(a, b)$, $f(a) = f(b)$ | $\exists c \in (a, b): f'(c) = 0$ | Tiếp tuyến song song với trục hoành |
| **Lagrange** | $f \in C[a, b]$, khả vi trên $(a, b)$ | $\exists c \in (a, b): f(b) - f(a) = f'(c)(b - a)$ | Tiếp tuyến song song với cát tuyến nối $(a, f(a))$ và $(b, f(b))$ |
| **Cauchy** | $f, g \in C[a, b]$, khả vi trên $(a, b)$, $g'(x) \neq 0$ trên $(a, b)$ | $\exists c \in (a, b): \frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(c)}{g'(c)}$ | Mở rộng của định lý Lagrange cho 2 hàm |

---

## 4. Công thức Taylor và Maclaurin {#_4-cong-thuc-taylor-maclaurin}

### 4.1. Công thức tổng quát
Nếu $f(x)$ khả vi đến cấp $n+1$ trong lân cận của $x_0$, ta có:
$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!} (x - x_0)^k + R_n(x)$$
- Khi $x_0 = 0$, công thức được gọi là **công thức Maclaurin**:
  $$f(x) = f(0) + \frac{f'(0)}{1!} x + \frac{f''(0)}{2!} x^2 + \dots + \frac{f^{(n)}(0)}{n!} x^n + o(x^n)$$

### 4.2. Khai triển Maclaurin của các hàm chuẩn
1. $e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \dots + \frac{x^n}{n!} + o(x^n)$
2. $\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots + (-1)^n \frac{x^{2n+1}}{(2n+1)!} + o(x^{2n+2})$
3. $\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots + (-1)^n \frac{x^{2n}}{(2n)!} + o(x^{2n+1})$
4. $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + (-1)^{n-1} \frac{x^n}{n} + o(x^n)$
5. $\frac{1}{1-x} = 1 + x + x^2 + \dots + x^n + o(x^n)$
6. $(1+x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!} x^2 + \dots + \frac{\alpha(\alpha-1)\dots(\alpha-n+1)}{n!} x^n + o(x^n)$

---

## 5. Ví dụ trong đề thi {#_5-vi-du-bai-tap-tu-đe-thi-that}

### Ví dụ 1 (đề thi KTHP 2023 - 2024): {#vi-du-1-đe-thi-kthp-2023-2024}
Cho hàm số $f(x) = x^2 \sin x$. Hãy tính đạo hàm cấp 50 tại điểm $x = \frac{\pi}{2}$:
$$f^{(50)}\left(\frac{\pi}{2}\right)$$

::: details Lời giải
Đặt $u(x) = \sin x$ và $v(x) = x^2$.
Ta có:
- $v'(x) = 2x$, $v''(x) = 2$, và $v^{(k)}(x) = 0$ với mọi $k \ge 3$.
- Đạo hàm cấp $m$ của $\sin x$: $u^{(m)}(x) = \sin\left(x + m\frac{\pi}{2}\right)$.

Áp dụng công thức Leibniz:
$$f^{(50)}(x) = C_{50}^0 u^{(50)}(x) v(x) + C_{50}^1 u^{(49)}(x) v'(x) + C_{50}^2 u^{(48)}(x) v''(x)$$
Thay các đạo hàm vào:
1. Số hạng 1 ($k=0$):
   $$C_{50}^0 \cdot \sin\left(x + 50 \cdot \frac{\pi}{2}\right) \cdot x^2 = 1 \cdot \sin(x + 25\pi) \cdot x^2 = -x^2 \sin x$$
2. Số hạng 2 ($k=1$):
   $$C_{50}^1 \cdot \sin\left(x + 49 \cdot \frac{\pi}{2}\right) \cdot 2x = 50 \cdot \sin\left(x + 24\pi + \frac{\pi}{2}\right) \cdot 2x = 100x \cos x$$
3. Số hạng 3 ($k=2$):
   $$C_{50}^2 \cdot \sin\left(x + 48 \cdot \frac{\pi}{2}\right) \cdot 2 = \frac{50 \cdot 49}{2} \cdot \sin(x + 24\pi) \cdot 2 = 2450 \sin x$$

Do đó:
$$f^{(50)}(x) = -x^2 \sin x + 100x \cos x + 2450 \sin x = (2450 - x^2) \sin x + 100x \cos x$$

Tại $x = \frac{\pi}{2}$, ta có $\sin\left(\frac{\pi}{2}\right) = 1$ và $\cos\left(\frac{\pi}{2}\right) = 0$:
$$f^{(50)}\left(\frac{\pi}{2}\right) = \left(2450 - \frac{\pi^2}{4}\right) \cdot 1 + 100 \cdot \frac{\pi}{2} \cdot 0 = 2450 - \frac{\pi^2}{4}$$
**Kết luận:** $f^{(50)}\left(\frac{\pi}{2}\right) = 2450 - \frac{\pi^2}{4}$.
:::

### Ví dụ 2 (đề thi KTHP 2024 - 2025): {#vi-du-2-đe-thi-kthp-2024-2025}
Cho hàm số $f(x) = x^3 \cos x$. Hãy tính $f^{(10)}(\pi)$.

::: details Lời giải
Đặt $u(x) = \cos x$ và $v(x) = x^3$.
Ta có:
- $v'(x) = 3x^2$, $v''(x) = 6x$, $v'''(x) = 6$, $v^{(k)}(x) = 0 \; (\forall k \ge 4)$.
- $u^{(m)}(x) = \cos\left(x + m\frac{\pi}{2}\right)$.

Áp dụng công thức Leibniz với $n = 10$:
$$f^{(10)}(x) = C_{10}^0 u^{(10)} v + C_{10}^1 u^{(9)} v' + C_{10}^2 u^{(8)} v'' + C_{10}^3 u^{(7)} v'''$$
Tính từng giá trị tại $x = \pi$:
- $u^{(10)}(\pi) = \cos\left(\pi + 5\pi\right) = \cos(6\pi) = 1$
- $u^{(9)}(\pi) = \cos\left(\pi + 4\pi + \frac{\pi}{2}\right) = \cos\left(\frac{11\pi}{2}\right) = 0$
- $u^{(8)}(\pi) = \cos\left(\pi + 4\pi\right) = \cos(5\pi) = -1$
- $u^{(7)}(\pi) = \cos\left(\pi + 3\pi + \frac{\pi}{2}\right) = \cos\left(\frac{9\pi}{2}\right) = 0$

Giá trị các hàm đa thức tại $x = \pi$:
- $v(\pi) = \pi^3$
- $v''(\pi) = 6\pi$

Suy ra:
$$f^{(10)}(\pi) = C_{10}^0 (1)(\pi^3) + 0 + C_{10}^2 (-1)(6\pi) + 0$$
Với $C_{10}^0 = 1$ và $C_{10}^2 = \frac{10 \times 9}{2} = 45$:
$$f^{(10)}(\pi) = 1 \cdot \pi^3 - 45 \cdot 6\pi = \pi^3 - 270\pi$$
**Kết luận:** $f^{(10)}(\pi) = \pi(\pi^2 - 270)$.
:::
