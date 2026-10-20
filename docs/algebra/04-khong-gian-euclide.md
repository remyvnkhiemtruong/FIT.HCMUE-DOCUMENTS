---
title: "Chuyên đề 4: Không gian Euclide và trực chuẩn hóa Gram - Schmidt"
---

# Chuyên đề 4: Không gian Euclide và trực chuẩn hóa Gram - Schmidt {#chuyen-đe-4-khong-gian-euclide-truc-chuan-hoa-gram-schmidt}

Không gian Euclide là không gian vectơ thực được trang bị thêm phép tính tích vô hướng, cho phép định nghĩa các khái niệm hình học quen thuộc: khoảng cách, độ dài và góc giữa các đối tượng.

---

## 1. Tích vô hướng và các tiên đề {#_1-tich-vo-huong-cac-tien-đe}

Một ánh xạ $\langle \cdot, \cdot \rangle: V \times V \to \mathbb{R}$ được gọi là một **tích vô hướng** trên $V$ nếu thỏa mãn 4 tiên đề với mọi $x, y, z \in V$ và mọi số thực $k$:

1. **Tính đối xứng:**
   $$\langle x, y \rangle = \langle y, x \rangle$$
2. **Tính phân phối:**
   $$\langle x + z, y \rangle = \langle x, y \rangle + \langle z, y \rangle$$
3. **Tính thuần nhất:**
   $$\langle kx, y \rangle = k \langle x, y \rangle$$
4. **Tính xác định dương:**
   $$\langle x, x \rangle \ge 0, \quad \text{và } \langle x, x \rangle = 0 \iff x = 0$$

Không gian vectơ $V$ cùng với tích vô hướng $\langle \cdot, \cdot \rangle$ được gọi là **không gian Euclide**.

---

## 2. Chuẩn (độ dài) và góc giữa hai vectơ {#_2-chuan-đo-dai-goc-giua-hai-vecto}

### 2.1. Chuẩn (độ dài) của vectơ {#_2-1-chuan-đo-dai-cua-vecto}
$$\|x\| = \sqrt{\langle x, x \rangle}$$
- $\|x\| \ge 0; \; \|x\| = 0 \iff x = 0$.
- $\|kx\| = |k| \cdot \|x\|$.
- Bất đẳng thức tam giác: $\|x + y\| \le \|x\| + \|y\|$.

### 2.2. Bất đẳng thức Cauchy - Schwarz và góc {#_2-2-bat-đang-thuc-cauchy-schwarz-goc}
Với mọi $x, y \in V$:
$$|\langle x, y \rangle| \le \|x\| \cdot \|y\|$$
Dấu bằng xảy ra khi và chỉ khi $x$ và $y$ phụ thuộc tuyến tính.

Từ đó, góc $\theta \in [0, \pi]$ giữa hai vectơ khác 0 được xác định bởi:
$$\cos \theta = \frac{\langle x, y \rangle}{\|x\| \cdot \|y\|}$$
- Hai vectơ **trực giao** (vuông góc) nếu:
  $$x \perp y \iff \langle x, y \rangle = 0$$

---

## 3. Thuật toán trực chuẩn hóa Gram - Schmidt {#_3-thuat-toan-truc-chuan-hoa-gram-schmidt}

Cho cơ sở ban đầu $\{v_1, v_2, \dots, v_n\}$ của không gian con $W$. Để xây dựng một **cơ sở trực chuẩn** $\{e_1, e_2, \dots, e_n\}$:

### Bước 1: Trực giao hóa (tìm hệ trực giao $\{u_1, u_2, \dots, u_n\}$)
- $u_1 = v_1$
- $u_2 = v_2 - \frac{\langle v_2, u_1 \rangle}{\|u_1\|^2} u_1$
- $u_3 = v_3 - \frac{\langle v_3, u_1 \rangle}{\|u_1\|^2} u_1 - \frac{\langle v_3, u_2 \rangle}{\|u_2\|^2} u_2$
- $u_k = v_k - \sum_{i=1}^{k-1} \frac{\langle v_k, u_i \rangle}{\|u_i\|^2} u_i$

### Bước 2: Chuẩn hóa (đưa độ dài về 1)
$$e_i = \frac{u_i}{\|u_i\|} \quad (i = 1, 2, \dots, n)$$

---

## 4. Ví dụ trong đề thi {#_4-vi-du-bai-tap-tu-đe-thi-that}

### Ví dụ (đề thi tham khảo KTHP - FIT HCMUE): {#vi-du-đe-thi-tham-khao-kthp-fit-hcmue}
Trong không gian $\mathbb{R}^3$, cho quy tắc:
$$\langle x, y \rangle = 5x_1 y_1 + 2x_1 y_2 + 2x_2 y_1 + 3x_2 y_2 + x_3 y_3$$
với $x = (x_1, x_2, x_3)$ và $y = (y_1, y_2, y_3)$.

1. Chứng minh $\langle x, y \rangle$ là một tích vô hướng trên $\mathbb{R}^3$.
2. Tìm độ dài của vectơ $u = (3, 2, 1)$.
3. Tìm góc giữa hai vectơ $u = (1, 0, 1)$ và $y = (2, 1, 0)$.

::: details Lời giải
**Câu 1: Chứng minh $\langle x, y \rangle$ là tích vô hướng:**
Ta kiểm tra 4 tiên đề:
1. **Đối xứng:**
   $$\langle y, x \rangle = 5y_1 x_1 + 2y_1 x_2 + 2y_2 x_1 + 3y_2 x_2 + y_3 x_3 = \langle x, y \rangle$$
2. **Phân phối:** Với $z = (z_1, z_2, z_3)$, dễ thấy khi thay $x$ bằng $x+z$ ta có:
   $$\langle x + z, y \rangle = \langle x, y \rangle + \langle z, y \rangle$$
3. **Thuần nhất:** Thay $x$ bằng $kx$:
   $$\langle kx, y \rangle = 5(kx_1)y_1 + 2(kx_1)y_2 + 2(kx_2)y_1 + 3(kx_2)y_2 + (kx_3)y_3 = k\langle x, y \rangle$$
4. **Xác định dương:** Xét $\langle x, x \rangle$:
   $$\langle x, x \rangle = 5x_1^2 + 4x_1 x_2 + 3x_2^2 + x_3^2$$
   Tách thành các bình phương:
   $$\langle x, x \rangle = (4x_1^2 + 4x_1 x_2 + x_2^2) + x_1^2 + 2x_2^2 + x_3^2 = (2x_1 + x_2)^2 + x_1^2 + 2x_2^2 + x_3^2 \ge 0$$
   Đẳng thức xảy ra khi và chỉ khi:
   $$\begin{cases} 2x_1 + x_2 = 0 \\ x_1 = 0 \\ x_2 = 0 \\ x_3 = 0 \end{cases} \iff x_1 = x_2 = x_3 = 0 \iff x = 0$$
Vậy quy tắc trên thỏa mãn cả 4 tiên đề nên là một tích vô hướng trên $\mathbb{R}^3$.

---

**Câu 2: Tìm độ dài của vectơ $u = (3, 2, 1)$:**
Áp dụng công thức tính $\langle u, u \rangle$ với $u_1 = 3, u_2 = 2, u_3 = 1$:
$$\langle u, u \rangle = 5(3)^2 + 4(3)(2) + 3(2)^2 + 1^2 = 5(9) + 24 + 3(4) + 1 = 45 + 24 + 12 + 1 = 82$$
Do đó:
$$\|u\| = \sqrt{\langle u, u \rangle} = \sqrt{82}$$

---

**Câu 3: Tìm góc giữa $u = (1, 0, 1)$ và $y = (2, 1, 0)$:**
- Tính tích vô hướng $\langle u, y \rangle$:
  $$\langle u, y \rangle = 5(1)(2) + 2(1)(1) + 2(0)(2) + 3(0)(1) + (1)(0) = 10 + 2 + 0 + 0 + 0 = 12$$
- Tính chuẩn của $u = (1, 0, 1)$:
  $$\langle u, u \rangle = 5(1)^2 + 4(1)(0) + 3(0)^2 + 1^2 = 5 + 1 = 6 \implies \|u\| = \sqrt{6}$$
- Tính chuẩn của $y = (2, 1, 0)$:
  $$\langle y, y \rangle = 5(2)^2 + 4(2)(1) + 3(1)^2 + 0^2 = 20 + 8 + 3 = 31 \implies \|y\| = \sqrt{31}$$
- Tính cosin góc $\theta$:
  $$\cos \theta = \frac{\langle u, y \rangle}{\|u\| \cdot \|y\|} = \frac{12}{\sqrt{6} \cdot \sqrt{31}} = \frac{12}{\sqrt{186}}$$
Suy ra góc $\theta = \arccos\left(\frac{12}{\sqrt{186}}\right)$.
:::
