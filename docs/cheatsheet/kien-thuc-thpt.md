# 🎒 Ôn Tập Kiến Thức Nền Tảng THPT

Những công thức lượng giác, lũy thừa, logarit và đạo hàm cơ bản thời phổ thông mà sinh viên thường quên hoặc nhầm lẫn khi làm bài thi Đại học.

---

## 1. Công Thức Lượng Giác Bắt Buộc Nhớ

### 1.1. Hệ thức cơ bản
$$\sin^2 x + \cos^2 x = 1$$
$$1 + \tan^2 x = \frac{1}{\cos^2 x}, \quad 1 + \cot^2 x = \frac{1}{\sin^2 x}$$

### 1.2. Công thức cộng & nhân đôi
$$\sin(a \pm b) = \sin a \cos b \pm \cos a \sin b$$
$$\cos(a \pm b) = \cos a \cos b \mp \sin a \sin b$$
$$\sin 2x = 2 \sin x \cos x$$
$$\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x$$

### 1.3. Công thức hạ bậc (Rất hay dùng khi tính tích phân!)
$$\sin^2 x = \frac{1 - \cos 2x}{2}$$
$$\cos^2 x = \frac{1 + \cos 2x}{2}$$
$$\sin^3 x = \frac{3\sin x - \sin 3x}{4}, \quad \cos^3 x = \frac{3\cos x + \cos 3x}{4}$$

---

## 2. Công Thức Lũy Thừa & Logarit

### 2.1. Lũy thừa
$$a^0 = 1 \quad (a \neq 0)$$
$$a^{-n} = \frac{1}{a^n}$$
$$a^{\frac{m}{n}} = \sqrt[n]{a^m}$$
$$a^x \cdot a^y = a^{x+y}, \quad \frac{a^x}{a^y} = a^{x-y}, \quad (a^x)^y = a^{xy}$$

### 2.2. Logarit ($a > 0, a \neq 1$)
$$\ln(xy) = \ln x + \ln y$$
$$\ln\left(\frac{x}{y}\right) = \ln x - \ln y$$
$$\ln(x^\alpha) = \alpha \ln x$$
$$\log_a b = \frac{\ln b}{\ln a}$$
$$a^{\log_a b} = b, \quad e^{\ln x} = x$$

---

## 3. Bảng Nguyên Hàm Cơ Bản

| Hàm số $f(x)$ | Nguyên hàm $\int f(x) \, dx$ |
| :--- | :--- |
| $x^\alpha \; (\alpha \neq -1)$ | $\frac{x^{\alpha+1}}{\alpha+1} + C$ |
| $\frac{1}{x}$ | $\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $a^x$ | $\frac{a^x}{\ln a} + C$ |
| $\cos x$ | $\sin x + C$ |
| $\sin x$ | $-\cos x + C$ |
| $\frac{1}{\cos^2 x}$ | $\tan x + C$ |
| $\frac{1}{\sin^2 x}$ | $-\cot x + C$ |
| $\frac{1}{1 + x^2}$ | $\arctan x + C$ |
| $\frac{1}{\sqrt{1 - x^2}}$ | $\arcsin x + C$ |
