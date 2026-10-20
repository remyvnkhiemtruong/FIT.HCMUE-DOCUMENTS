# Chuyên Đề 4: Tích Phân Suy Rộng (Loại 1 & Loại 2)

Tích phân suy rộng xuất hiện khi cận tích phân tiến ra vô cực hoặc khi hàm dưới dấu tích phân không bị chặn (có tiệm cận đứng) trong đoạn tích phân.

---

## 1. Tích Phân Suy Rộng Loại 1 (Cận Vô Hạn)

### 1.1. Định nghĩa
Cho hàm số $f(x)$ khả tích trên mọi đoạn hữu hạn $[a, b]$ với $b \ge a$:
$$\int_a^{+\infty} f(x) \, dx = \lim_{b \to +\infty} \int_a^b f(x) \, dx$$
- Nếu giới hạn tồn tại hữu hạn, ta nói tích phân suy rộng **hội tụ**.
- Nếu giới hạn không tồn tại hoặc bằng $\pm\infty$, ta nói tích phân **phân kỳ**.

### 1.2. Tích phân mẫu loại 1 (Chuẩn so sánh $\alpha$)
Xét tích phân với $a > 0$:
$$I = \int_a^{+\infty} \frac{dx}{x^\alpha} = \begin{cases} \text{Hội tụ} & \text{khi } \alpha > 1 \\ \text{Phân kỳ} & \text{khi } \alpha \le 1 \end{cases}$$

### 1.3. Tiêu chuẩn so sánh cho hàm số không âm
Cho $0 \le f(x) \le g(x)$ với mọi $x \ge a$:
- Nếu $\int_a^{+\infty} g(x) \, dx$ hội tụ thì $\int_a^{+\infty} f(x) \, dx$ **hội tụ**.
- Nếu $\int_a^{+\infty} f(x) \, dx$ phân kỳ thì $\int_a^{+\infty} g(x) \, dx$ **phân kỳ**.

**Tiêu chuẩn giới hạn:**
Giả sử $\lim_{x \to +\infty} \frac{f(x)}{g(x)} = k$ với $0 < k < +\infty$. Khi đó $\int_a^{+\infty} f(x)dx$ và $\int_a^{+\infty} g(x)dx$ **cùng hội tụ hoặc cùng phân kỳ**.

---

## 2. Tích Phân Suy Rộng Loại 2 (Hàm Không Bị Chặn)

### 2.1. Định nghĩa
Cho $f(x)$ liên tục trên $[a, b)$ và $\lim_{x \to b^-} f(x) = \infty$ ($b$ là điểm bất thường):
$$\int_a^b f(x) \, dx = \lim_{\varepsilon \to 0^+} \int_a^{b - \varepsilon} f(x) \, dx$$

Tương tự khi $a$ là điểm bất thường:
$$\int_a^b f(x) \, dx = \lim_{\varepsilon \to 0^+} \int_{a + \varepsilon}^b f(x) \, dx$$

### 2.2. Tích phân mẫu loại 2
$$J = \int_a^b \frac{dx}{(b - x)^\alpha} = \begin{cases} \text{Hội tụ} & \text{khi } \alpha < 1 \\ \text{Phân kỳ} & \text{khi } \alpha \ge 1 \end{cases}$$
*(Ngược lại hoàn toàn so với loại 1!)*

::: warning CHÚ Ý ĐỐI VỚI ĐIỂM BẤT THƯỜNG Ở GIỮA
Nếu điểm bất thường $c \in (a, b)$, ta bắt buộc phải tách tích phân thành hai tích phân con:
$$\int_a^b f(x) \, dx = \int_a^c f(x) \, dx + \int_c^b f(x) \, dx$$
Tích phân ban đầu chỉ hội tụ khi và chỉ khi **cả hai** tích phân con đều hội tụ!
:::

---

## 3. Các Ví Dụ Mẫu & Phương Pháp Giải

### Ví dụ 1:
Xét sự hội tụ của tích phân:
$$I = \int_1^{+\infty} \frac{x^2 + 1}{2x^4 + 3x + 5} \, dx$$

::: details 📖 Xem lời giải chi tiết
Hàm dưới dấu tích phân $f(x) = \frac{x^2 + 1}{2x^4 + 3x + 5} > 0, \; \forall x \ge 1$.

Khi $x \to +\infty$, ta lấy bậc cao nhất ở tử và mẫu:
$$f(x) \sim \frac{x^2}{2x^4} = \frac{1}{2x^2}$$
Chọn $g(x) = \frac{1}{x^2}$. Xét giới hạn tỉ số:
$$k = \lim_{x \to +\infty} \frac{f(x)}{g(x)} = \lim_{x \to +\infty} \frac{x^2(x^2 + 1)}{2x^4 + 3x + 5} = \frac{1}{2} \in (0, +\infty)$$
Tích phân mẫu:
$$\int_1^{+\infty} \frac{dx}{x^2} \quad \text{hội tụ do } \alpha = 2 > 1$$
Theo tiêu chuẩn so sánh giới hạn, tích phân $I$ **hội tụ**.
:::

### Ví dụ 2:
Tính giá trị của tích phân suy rộng:
$$K = \int_0^{+\infty} x e^{-2x} \, dx$$

::: details 📖 Xem lời giải chi tiết
Áp dụng tích phân từng phần:
Đặt $u = x \implies du = dx$, $dv = e^{-2x}dx \implies v = -\frac{1}{2} e^{-2x}$.

$$\int_0^b x e^{-2x} dx = \left[ -\frac{x}{2} e^{-2x} \right]_0^b - \int_0^b \left(-\frac{1}{2} e^{-2x}\right) dx$$
$$= -\frac{b}{2e^{2b}} + 0 + \frac{1}{2} \left[ -\frac{1}{2} e^{-2x} \right]_0^b$$
$$= -\frac{b}{2e^{2b}} - \frac{1}{4} e^{-2b} + \frac{1}{4}$$

Lấy giới hạn khi $b \to +\infty$:
- Theo quy tắc L'Hospital: $\lim_{b \to +\infty} \frac{b}{2e^{2b}} = \lim_{b \to +\infty} \frac{1}{4e^{2b}} = 0$.
- $\lim_{b \to +\infty} e^{-2b} = 0$.

Do đó:
$$K = 0 - 0 + \frac{1}{4} = \frac{1}{4}$$
**Kết luận:** Tích phân $K$ hội tụ và có giá trị bằng $\frac{1}{4}$.
:::
