# Chuyên Đề 3: Phép Tính Tích Phân & Tổng Riemann

Tích phân trong môn Cơ sở Toán CNTT đòi hỏi kỹ năng thành thạo về phân tích hữu tỉ, phương pháp từng phần, và đặc biệt là kỹ thuật chuyển giới hạn tổng dạng Riemann về tích phân xác định.

---

## 1. Phương Pháp Tính Nguyên Hàm & Tích Phân

### 1.1. Công thức tích phân từng phần
$$\int u \, dv = uv - \int v \, du$$
Đối với tích phân xác định:
$$\int_a^b u \, dv = [uv]_a^b - \int_a^b v \, du$$

**Thứ tự ưu tiên đặt $u$:**
$$\text{Logarit} \to \text{Đa thức} \to \text{Lượng giác / Mũ}$$
*(Nhất log, nhì đa, tam lượng, tứ mũ)*

### 1.2. Tích phân hàm phân thức hữu tỉ $\frac{P(x)}{Q(x)}$
Nếu bậc tử $\ge$ bậc mẫu: Chia đa thức để đưa về phần nguyên cộng phân thức thực sự.

Khi phân tích mẫu $Q(x)$:
1. Nghiệm đơn $(x - a)$: sinh ra $\frac{A}{x - a} \to A \ln|x - a|$.
2. Nghiệm bội $(x - a)^k$: sinh ra $\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2} + \dots + \frac{A_k}{(x - a)^k}$.
3. Nhị thức vô nghiệm $(x^2 + px + q)$: sinh ra $\frac{Ax + B}{x^2 + px + q} \to$ đưa về dạng $\ln$ và $\arctan$.

---

## 2. Định Nghĩa Tích Phân Xác Định & Giới Hạn Tổng Riemann

### 2.1. Định lý tổng Riemann
Cho $f(x)$ liên tục trên đoạn $[0, 1]$. Chia đoạn $[0, 1]$ thành $n$ phần bằng nhau, mỗi phần có độ dài $\Delta x = \frac{1}{n}$. Điểm chia $x_k = \frac{k}{n}$. Khi đó:
$$\lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^{n} f\left(\frac{k}{n}\right) = \int_0^1 f(x) \, dx$$

Tổng quát trên đoạn $[a, b]$:
$$\lim_{n \to \infty} \frac{b - a}{n} \sum_{k=1}^{n} f\left(a + k \frac{b - a}{n}\right) = \int_a^b f(x) \, dx$$

::: tip BÍ QUYẾT NHẬN DẠNG BÀI TOÁN TỔNG RIEMANN TRONG ĐỀ THI
Khi gặp bài toán tính giới hạn của tổng gồm $n$ số hạng mà bậc của mẫu hơn bậc của tử đúng 1 bậc theo $n$:
1. Đặt thừa số chung $\frac{1}{n}$ ra ngoài dấu ngoặc.
2. Biến đổi biểu thức bên trong chỉ chứa cụm $\frac{k}{n}$.
3. Thay $\frac{1}{n} \to dx$ và $\frac{k}{n} \to x$, lấy cận tích phân từ $0$ đến $1$.
:::

---

## 3. Các Ví Dụ Trọng Tâm Từ Đề Thi Thật

### Ví dụ 1 (Đề thi KTHP 2022 - 2023):
Tính nguyên hàm:
$$I = \int \frac{x^2 + 1}{x^3 - 5x^2 + 6x} \, dx$$

::: details 📖 Xem lời giải chi tiết
Phân tích mẫu số thành nhân tử:
$$x^3 - 5x^2 + 6x = x(x^2 - 5x + 6) = x(x - 2)(x - 3)$$
Phân tích thành các phân thức đơn giản:
$$\frac{x^2 + 1}{x(x - 2)(x - 3)} = \frac{A}{x} + \frac{B}{x - 2} + \frac{C}{x - 3}$$
Dùng phương pháp che (Heaviside cover-up method):
- Tìm $A$: Nhân 2 vế với $x$ và cho $x = 0$:
  $$A = \frac{0^2 + 1}{(0 - 2)(0 - 3)} = \frac{1}{6}$$
- Tìm $B$: Nhân 2 vế với $x - 2$ và cho $x = 2$:
  $$B = \frac{2^2 + 1}{2(2 - 3)} = \frac{5}{-2} = -\frac{5}{2}$$
- Tìm $C$: Nhân 2 vế với $x - 3$ và cho $x = 3$:
  $$C = \frac{3^2 + 1}{3(3 - 2)} = \frac{10}{3}$$

Do đó:
$$I = \int \left( \frac{1}{6x} - \frac{5}{2(x - 2)} + \frac{10}{3(x - 3)} \right) dx$$
$$I = \frac{1}{6} \ln|x| - \frac{5}{2} \ln|x - 2| + \frac{10}{3} \ln|x - 3| + C$$
:::

### Ví dụ 2 (Đề thi KTHP 2024 - 2025):
Tính nguyên hàm:
$$J = \int \frac{2x - 1}{(x^2 + 1)(x - 3)} \, dx$$

::: details 📖 Xem lời giải chi tiết
Phân tích phân thức dưới dạng:
$$\frac{2x - 1}{(x^2 + 1)(x - 3)} = \frac{A}{x - 3} + \frac{Bx + C}{x^2 + 1}$$
Quy đồng mẫu số:
$$2x - 1 = A(x^2 + 1) + (Bx + C)(x - 3) = (A + B)x^2 + (C - 3B)x + (A - 3C)$$

Đồng nhất hệ số:
$$\begin{cases} A + B = 0 \\ -3B + C = 2 \\ A - 3C = -1 \end{cases}$$
Thay $x = 3$ vào đẳng thức ban đầu:
$$2(3) - 1 = A(3^2 + 1) \implies 5 = 10A \implies A = \frac{1}{2}$$
Từ đó:
$$B = -A = -\frac{1}{2}$$
$$C = 2 + 3B = 2 + 3\left(-\frac{1}{2}\right) = \frac{1}{2}$$

Thay vào tích phân:
$$J = \int \frac{1/2}{x - 3} dx + \int \frac{-\frac{1}{2}x + \frac{1}{2}}{x^2 + 1} dx$$
$$= \frac{1}{2} \ln|x - 3| - \frac{1}{4} \int \frac{2x}{x^2 + 1} dx + \frac{1}{2} \int \frac{1}{x^2 + 1} dx$$
$$= \frac{1}{2} \ln|x - 3| - \frac{1}{4} \ln(x^2 + 1) + \frac{1}{2} \arctan x + C$$
:::

### Ví dụ 3 (Đề thi KTHP 2024 - 2025):
Tính giới hạn của tổng sau:
$$L = \lim_{n \to \infty} \left( \frac{1}{\sqrt{4n^2 - 1^2}} + \frac{1}{\sqrt{4n^2 - 2^2}} + \dots + \frac{1}{\sqrt{4n^2 - n^2}} \right)$$

::: details 📖 Xem lời giải chi tiết
Số hạng thứ $k$ của tổng có dạng:
$$u_k = \frac{1}{\sqrt{4n^2 - k^2}} = \frac{1}{\sqrt{n^2\left(4 - \left(\frac{k}{n}\right)^2\right)}} = \frac{1}{n} \frac{1}{\sqrt{4 - \left(\frac{k}{n}\right)^2}}$$
Do đó, tổng được viết lại thành:
$$L = \lim_{n \to \infty} \frac{1}{n} \sum_{k=1}^{n} \frac{1}{\sqrt{4 - \left(\frac{k}{n}\right)^2}}$$

Đặt $f(x) = \frac{1}{\sqrt{4 - x^2}}$ liên tục trên $[0, 1]$. Theo định nghĩa tổng Riemann:
$$L = \int_0^1 \frac{1}{\sqrt{4 - x^2}} \, dx$$
Ta có công thức nguyên hàm: $\int \frac{1}{\sqrt{a^2 - x^2}} dx = \arcsin\left(\frac{x}{a}\right) + C$.
Ở đây $a = 2$:
$$L = \left[ \arcsin\left(\frac{x}{2}\right) \right]_0^1 = \arcsin\left(\frac{1}{2}\right) - \arcsin(0) = \frac{\pi}{6} - 0 = \frac{\pi}{6}$$
**Kết luận:** $L = \frac{\pi}{6}$.
:::
