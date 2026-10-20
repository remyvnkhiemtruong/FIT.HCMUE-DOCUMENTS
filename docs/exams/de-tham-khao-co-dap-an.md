# Đề Thi Tham Khảo Kèm Barem Điểm Chi Tiết

- **Học phần:** Cơ sở Toán trong Công nghệ Thông tin (COMP1800)
- **Đơn vị:** Khoa Công nghệ Thông tin — Trường ĐH Sư Phạm TP.HCM
- **Thời gian làm bài:** 100 phút (Không sử dụng tài liệu)

::: tip Ý NGHĨA CỦA ĐỀ THI NÀY
Tài liệu này cung cấp **đáp án chính thức và thang điểm chấm chi tiết** của tổ bộ môn. Hãy đối chiếu từng bước lập luận để biết cách trình bày đạt điểm tối đa trong kỳ thi tự luận kết thúc học phần.
:::

---

## Bảng Đề Bài & Thang Điểm Chuẩn

### Câu 1 (4,0 điểm). Phép Tính Giải Tích

| Câu | Yêu cầu câu hỏi | Thang điểm |
| :---: | :--- | :---: |
| **1a** | Dùng quy tắc L'Hospital để tính giới hạn sau: <br> $$\lim_{x \to 0} \frac{e^x - e^{-x} - 2x}{x - \sin x}$$ | **1,0 đ** |
| **1b** | Tính đạo hàm của hàm số: <br> $$y = (2x + 1)^{\sin x}$$ | **1,0 đ** |
| **1c** | Tính tích phân xác định: <br> $$\int_0^1 \frac{dx}{x^2 - 5x + 6}$$ | **1,0 đ** |
| **1d** | Dùng định nghĩa tích phân xác định (tổng Riemann) để tính giới hạn: <br> $$\lim_{n \to \infty} \left( \frac{n}{n^2 + 1^2} + \frac{n}{n^2 + 2^2} + \dots + \frac{n}{n^2 + n^2} \right)$$ | **1,0 đ** |

---

### Câu 2 (3,0 điểm). Không Gian Euclide

Trong không gian $\mathbb{R}^3$, cho quy tắc ánh xạ với mọi $x = (x_1, x_2, x_3)$ và $y = (y_1, y_2, y_3)$:
$$\langle x, y \rangle = 5x_1 y_1 + 2x_1 y_2 + 2x_2 y_1 + 3x_2 y_2 + x_3 y_3$$

| Câu | Yêu cầu câu hỏi | Thang điểm |
| :---: | :--- | :---: |
| **2a** | Chứng minh $\langle x, y \rangle$ là một tích vô hướng trên $\mathbb{R}^3$. | **1,0 đ** |
| **2b** | Tìm độ dài (chuẩn) của vectơ $u = (3, 2, 1)$. | **1,0 đ** |
| **2c** | Tìm góc $\theta$ giữa hai vectơ $u = (1, 0, 1)$ và $y = (2, 1, 0)$. | **1,0 đ** |

---

### Câu 3 (3,0 điểm). Ánh Xạ Tuyến Tính & Trị Riêng

Cho ánh xạ tuyến tính $f: \mathbb{R}^3 \to \mathbb{R}^3$, biết ảnh của ba vectơ sau:
$$f(1, 1, 1) = (-6, -3, -3), \quad f(1, 1, 0) = (6, 5, 2), \quad f(1, 0, 1) = (6, 2, 5)$$

| Câu | Yêu cầu câu hỏi | Thang điểm |
| :---: | :--- | :---: |
| **3a** | Tìm công thức tường minh của $f(x)$ với $x = (x_1, x_2, x_3) \in \mathbb{R}^3$. | **1,0 đ** |
| **3b** | Tìm đa thức và phương trình đặc trưng của $f$. | **1,0 đ** |
| **3c** | Tìm các không gian con các vectơ riêng ứng với các giá trị riêng. | **1,0 đ** |

---

## Đáp Án & Hướng Dẫn Chấm Từng Bước

::: details 📖 Xem đáp án chi tiết Câu 1 (4,0 điểm)
**1a (1,0 đ):**
Khi $x \to 0$, biểu thức có dạng vô định $\left[\frac{0}{0}\right]$.
- Áp dụng L'Hospital lần 1:
  $$\lim_{x \to 0} \frac{e^x + e^{-x} - 2}{1 - \cos x} \quad \left[\frac{0}{0}\right] \quad (0.5\text{đ})$$
- Áp dụng L'Hospital lần 2:
  $$\lim_{x \to 0} \frac{e^x - e^{-x}}{\sin x} \quad \left[\frac{0}{0}\right]$$
- Áp dụng L'Hospital lần 3 (hoặc dùng VCB $e^x - e^{-x} \sim 2x$ và $\sin x \sim x$):
  $$\lim_{x \to 0} \frac{e^x + e^{-x}}{\cos x} = \frac{1 + 1}{1} = 2 \quad (0.5\text{đ})$$

**1b (1,0 đ):**
Lấy logarit tự nhiên hai vế:
$$\ln y = \sin x \cdot \ln(2x + 1) \quad (0.25\text{đ})$$
Đạo hàm hai vế theo $x$:
$$\frac{y'}{y} = \cos x \cdot \ln(2x + 1) + \sin x \cdot \frac{2}{2x + 1} \quad (0.5\text{đ})$$
Nhân $y$ trở lại:
$$y' = (2x + 1)^{\sin x} \left[ \cos x \cdot \ln(2x + 1) + \frac{2\sin x}{2x + 1} \right] \quad (0.25\text{đ})$$

**1c (1,0 đ):**
Phân tích mẫu số: $x^2 - 5x + 6 = (x - 2)(x - 3)$.
$$\frac{1}{(x - 2)(x - 3)} = \frac{1}{x - 3} - \frac{1}{x - 2} \quad (0.5\text{đ})$$
Lấy nguyên hàm và thế cận:
$$\int_0^1 \left( \frac{1}{x - 3} - \frac{1}{x - 2} \right) dx = \left[ \ln\left|\frac{x - 3}{x - 2}\right| \right]_0^1 = \ln\left|\frac{-2}{-1}\right| - \ln\left|\frac{-3}{-2}\right| = \ln 2 - \ln\left(\frac{3}{2}\right) = \ln\left(\frac{4}{3}\right) \quad (0.5\text{đ})$$

**1d (1,0 đ):**
Biến đổi số hạng tổng quát:
$$\frac{n}{n^2 + k^2} = \frac{1}{n} \cdot \frac{1}{1 + (k/n)^2} \quad (0.5\text{đ})$$
Chuyển về tích phân Riemann trên $[0, 1]$ với $f(x) = \frac{1}{1 + x^2}$:
$$L = \int_0^1 \frac{dx}{1 + x^2} = [\arctan x]_0^1 = \arctan(1) - \arctan(0) = \frac{\pi}{4} \quad (0.5\text{đ})$$
:::

::: details 📖 Xem đáp án chi tiết Câu 2 (3,0 điểm)
**2a (1,0 đ):**
Kiểm tra đầy đủ 4 tiên đề:
- Đối xứng: $\langle x, y \rangle = \langle y, x \rangle$ $(0.25\text{đ})$
- Phân phối: $\langle x + z, y \rangle = \langle x, y \rangle + \langle z, y \rangle$ $(0.25\text{đ})$
- Thuần nhất: $\langle kx, y \rangle = k\langle x, y \rangle$ $(0.25\text{đ})$
- Xác định dương: $\langle x, x \rangle = (2x_1 + x_2)^2 + x_1^2 + 2x_2^2 + x_3^2 \ge 0$, bằng 0 khi và chỉ khi $x_1 = x_2 = x_3 = 0$ $(0.25\text{đ})$.

**2b (1,0 đ):**
$$\langle u, u \rangle = 5(3)^2 + 4(3)(2) + 3(2)^2 + 1^2 = 45 + 24 + 12 + 1 = 82 \quad (0.5\text{đ})$$
$$\|u\| = \sqrt{82} \quad (0.5\text{đ})$$

**2c (1,0 đ):**
- $\langle u, y \rangle = 5(1)(2) + 2(1)(1) = 12$ $(0.25\text{đ})$
- $\|u\| = \sqrt{5(1)^2 + 1^2} = \sqrt{6}$ $(0.25\text{đ})$
- $\|y\| = \sqrt{5(4) + 4(2)(1) + 3(1)} = \sqrt{31}$ $(0.25\text{đ})$
- $\cos \theta = \frac{12}{\sqrt{186}} \implies \theta = \arccos\left(\frac{12}{\sqrt{186}}\right)$ $(0.25\text{đ})$
:::

::: details 📖 Xem đáp án chi tiết Câu 3 (3,0 điểm)
**3a (1,0 đ):**
Tìm ảnh của cơ sở chính tắc $\{e_1, e_2, e_3\}$:
- $e_3 = (1, 1, 1) - (1, 1, 0) \implies f(e_3) = (-6, -3, -3) - (6, 5, 2) = (-12, -8, -5)$
- $e_2 = (1, 1, 1) - (1, 0, 1) \implies f(e_2) = (-6, -3, -3) - (6, 2, 5) = (-12, -5, -8)$
- $e_1 = (1, 1, 0) - e_2 \implies f(e_1) = (6, 5, 2) - (-12, -5, -8) = (18, 10, 10)$

Công thức tổng quát:
$$f(x_1, x_2, x_3) = (18x_1 - 12x_2 - 12x_3, \; 10x_1 - 5x_2 - 8x_3, \; 10x_1 - 8x_2 - 5x_3)$$

**3b (1,0 đ):**
Ma trận của $f$ trong cơ sở chính tắc:
$$A = \begin{pmatrix} 18 & -12 & -12 \\ 10 & -5 & -8 \\ 10 & -8 & -5 \end{pmatrix}$$
Phương trình đặc trưng $\det(A - \lambda I) = 0$:
$$\det(A - \lambda I) = -(\lambda - 3)^2 (\lambda - 2) = 0 \iff \begin{cases} \lambda_1 = \lambda_2 = 3 \\ \lambda_3 = 2 \end{cases}$$

**3c (1,0 đ):**
- Ứng với $\lambda = 3$: Giải $(A - 3I)X = 0 \implies X = (4\alpha, \; 5\alpha - \beta, \; \beta)^T$.
  Cơ sở của không gian con riêng $E(3)$ là:
  $$\mathcal{B}_1 = \{(4, 5, 0), \; (0, -1, 1)\}$$
- Ứng với $\lambda = 2$: Giải $(A - 2I)X = 0 \implies X = (3t, 2t, 2t)^T$.
  Cơ sở của $E(2)$ là:
  $$\mathcal{B}_2 = \{(3, 2, 2)\}$$
:::
