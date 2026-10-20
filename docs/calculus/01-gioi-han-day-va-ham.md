---
title: "Chuyên đề 1: Dãy số, giới hạn và tính liên tục"
---

# Chuyên đề 1: Dãy số, giới hạn và tính liên tục {#chuyen-đe-1-day-so-gioi-han-va-tinh-lien-tuc}

Học phần **COMP1800 - Cơ sở toán trong CNTT** mở đầu bằng lý thuyết giải tích về giới hạn. Đây là nền tảng cho việc phân tích độ phức tạp thuật toán và phép tính vi tích phân.

---

## 1. Dãy số và giới hạn dãy số {#_1-day-so-gioi-han-day-so}

### 1.1. Các định nghĩa cơ bản
- **Dãy số thực** là một ánh xạ từ tập số nguyên dương $\mathbb{N}^*$ vào tập số thực $\mathbb{R}$:
  $$f: \mathbb{N}^* \to \mathbb{R},\quad n \mapsto u_n$$
  Ký hiệu: $\{u_n\}_{n=1}^{\infty}$ hoặc $(u_n)$.
- **Tính đơn điệu:**
  - Dãy tăng: $u_{n+1} \ge u_n, \; \forall n \in \mathbb{N}^*$.
  - Dãy giảm: $u_{n+1} \le u_n, \; \forall n \in \mathbb{N}^*$.
- **Tính bị chặn:**
  - Dãy bị chặn trên nếu $\exists M \in \mathbb{R}: u_n \le M, \; \forall n$.
  - Dãy bị chặn dưới nếu $\exists m \in \mathbb{R}: u_n \ge m, \; \forall n$.
  - Bị chặn: $\exists M > 0: |u_n| \le M, \; \forall n$.

::: tip Định lý Weierstrass
Mọi dãy số **đơn điệu và bị chặn** đều có giới hạn hữu hạn (hội tụ).
- Dãy tăng và bị chặn trên thì hội tụ về $\sup \{u_n\}$.
- Dãy giảm và bị chặn dưới thì hội tụ về $\inf \{u_n\}$.
:::

### 1.2. Định nghĩa giới hạn dãy số ($\varepsilon - n_0$)
Số $L \in \mathbb{R}$ được gọi là giới hạn của dãy số $(u_n)$ khi $n \to \infty$ (viết là $\lim_{n \to \infty} u_n = L$) nếu:
$$\forall \varepsilon > 0, \; \exists n_0 \in \mathbb{N}^* : \forall n > n_0 \implies |u_n - L| < \varepsilon$$

### 1.3. Các giới hạn cơ bản cần nhớ
- $\lim_{n \to \infty} \frac{1}{n^\alpha} = 0 \; (\alpha > 0)$
- $\lim_{n \to \infty} q^n = 0 \; (|q| < 1)$
- $\lim_{n \to \infty} \sqrt[n]{a} = 1 \; (a > 0)$
- $\lim_{n \to \infty} \sqrt[n]{n} = 1$
- $\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e \approx 2.71828$

---

## 2. Giới hạn hàm số và kỹ thuật khử dạng vô định {#_2-gioi-han-ham-so-ky-thuat-khu-dang-vo-đinh}

### 2.1. Bảng vô cùng bé (VCB) tương đương khi $x \to 0$ {#_2-1-bang-vo-cung-be-vcb-tuong-đuong-khi}
Khi $x \to 0$, ta có các phép thế tương đương rất mạnh:

| Biểu thức ban đầu | VCB tương đương ($x \to 0$) |
| :--- | :--- |
| $\sin x$ | $\sim x$ |
| $\tan x$ | $\sim x$ |
| $\arcsin x, \; \arctan x$ | $\sim x$ |
| $e^x - 1$ | $\sim x$ |
| $a^x - 1$ | $\sim x \ln a$ |
| $\ln(1 + x)$ | $\sim x$ |
| $1 - \cos x$ | $\sim \frac{x^2}{2}$ |
| $(1 + x)^\alpha - 1$ | $\sim \alpha x$ |
| $\sqrt{1+x} - 1$ | $\sim \frac{x}{2}$ |

::: warning Lưu ý khi dùng VCB tương đương
- Chỉ được thay VCB tương đương trong **tích hoặc thương**: $\lim \frac{f \cdot g}{h} = \lim \frac{f_1 \cdot g_1}{h_1}$.
- **Không được** tùy tiện thay trong **tổng hoặc hiệu** trừ khi hiệu của hai VCB tương đương không triệt tiêu nhau về bậc thấp hơn.
:::

### 2.2. Dạng vô định $1^\infty$ và công thức tính nhanh
Nếu $\lim_{x \to x_0} u(x) = 1$ và $\lim_{x \to x_0} v(x) = \infty$, ta có:
$$\lim_{x \to x_0} [u(x)]^{v(x)} = e^{\lim_{x \to x_0} [u(x) - 1] \cdot v(x)}$$

### 2.3. Quy tắc L'Hospital
Nếu $\lim_{x \to x_0} \frac{f(x)}{g(x)}$ có dạng vô định $\left[\frac{0}{0}\right]$ hoặc $\left[\frac{\infty}{\infty}\right]$, và tồn tại $\lim_{x \to x_0} \frac{f'(x)}{g'(x)}$ thì:
$$\lim_{x \to x_0} \frac{f(x)}{g(x)} = \lim_{x \to x_0} \frac{f'(x)}{g'(x)}$$

---

## 3. Tính liên tục của hàm số {#_3-tinh-lien-tuc-cua-ham-so}

### 3.1. Định nghĩa
Hàm số $f(x)$ xác định trên khoảng $(a, b)$ chứa $x_0$.
- $f$ liên tục tại $x_0 \iff \lim_{x \to x_0} f(x) = f(x_0)$.
- Tương đương: $\lim_{x \to x_0^+} f(x) = \lim_{x \to x_0^-} f(x) = f(x_0)$.

### 3.2. Điểm gián đoạn
- **Gián đoạn loại 1:** Tồn tại cả 2 giới hạn một phía hữu hạn $\lim_{x \to x_0^+} f(x)$ và $\lim_{x \to x_0^-} f(x)$.
  - Nếu $\lim_{x \to x_0^+} f(x) = \lim_{x \to x_0^-} f(x) \neq f(x_0)$: Gián đoạn khử được.
  - Nếu $\lim_{x \to x_0^+} f(x) \neq \lim_{x \to x_0^-} f(x)$: Gián đoạn bước nhảy.
- **Gián đoạn loại 2:** Ít nhất một trong hai giới hạn một phía không tồn tại hoặc bằng $\pm \infty$.

---

## 4. Ví dụ trong đề thi {#_4-cac-vi-du-kinh-đien-trong-đe-thi}

### Ví dụ 1 (đề thi KTHP 2023 - 2024): {#vi-du-1-đe-thi-kthp-2023-2024}
Tính giới hạn:
$$L = \lim_{n \to \infty} \left( \frac{1}{1 \cdot 2} + \frac{1}{2 \cdot 3} + \frac{1}{3 \cdot 4} + \dots + \frac{1}{n(n+1)} \right)$$

::: details Lời giải
Ta nhận xét số hạng tổng quát:
$$\frac{1}{k(k+1)} = \frac{1}{k} - \frac{1}{k+1}$$
Do đó, tổng riêng thứ $n$ là:
$$S_n = \left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \dots + \left(\frac{1}{n} - \frac{1}{n+1}\right) = 1 - \frac{1}{n+1}$$
Khi $n \to \infty$:
$$L = \lim_{n \to \infty} \left(1 - \frac{1}{n+1}\right) = 1 - 0 = 1$$
**Kết luận:** $L = 1$.
:::

### Ví dụ 2 (đề thi KTHP 2022 - 2023): {#vi-du-2-đe-thi-kthp-2022-2023}
Tính giới hạn:
$$I = \lim_{x \to +\infty} \left( \frac{x+1}{x-5} \right)^{2x+3}$$

::: details Lời giải
Khi $x \to +\infty$, ta có $\frac{x+1}{x-5} \to 1$ và $2x+3 \to +\infty$. Đây là dạng vô định $1^\infty$.

Áp dụng công thức tính nhanh:
$$I = e^{\lim_{x \to +\infty} \left( \frac{x+1}{x-5} - 1 \right) (2x+3)}$$
Ta biến đổi phần số mũ:
$$\left( \frac{x+1 - (x-5)}{x-5} \right) (2x+3) = \frac{6(2x+3)}{x-5} = \frac{12x + 18}{x-5}$$
Lấy giới hạn khi $x \to +\infty$:
$$\lim_{x \to +\infty} \frac{12x+18}{x-5} = 12$$
**Kết luận:** $I = e^{12}$.
:::

### Ví dụ 3 (đề thi KTHP 2023 - 2024): {#vi-du-3-đe-thi-kthp-2023-2024}
Tìm tham số $a$ để hàm số sau liên tục tại điểm $x = 0$:
$$f(x) = \begin{cases} \dfrac{\sin x}{x} & \text{nếu } x \le 0 \\ 2x + a & \text{nếu } x > 0 \end{cases}$$

::: details Lời giải
Để hàm số liên tục tại $x = 0$, ta cần:
$$\lim_{x \to 0^-} f(x) = \lim_{x \to 0^+} f(x) = f(0)$$
1. Giá trị tại $x = 0$:
   $$f(0) = \lim_{x \to 0^-} \frac{\sin x}{x} = 1$$
2. Giới hạn phải khi $x \to 0^+$:
   $$\lim_{x \to 0^+} f(x) = \lim_{x \to 0^+} (2x + a) = 2(0) + a = a$$
3. Để hàm số liên tục tại $x = 0$:
   $$a = 1$$
**Kết luận:** Với $a = 1$ thì hàm số liên tục tại $x = 0$.
:::
