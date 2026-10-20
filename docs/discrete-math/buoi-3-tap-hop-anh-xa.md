# Buổi 3: Lý Thuyết Tập Hợp & Ánh Xạ

Lý thuyết tập hợp và ánh xạ cung cấp ngôn ngữ chuẩn xác để mô hình hóa kiểu dữ liệu, quan hệ trong cơ sở dữ liệu quan hệ (RDBMS) và hàm trong lập trình hàm (Functional Programming).

---

## 1. Lý Thuyết Tập Hợp

### 1.1. Các định nghĩa cơ bản
- **Tập hợp con:** $A \subseteq B \iff (\forall x \in A \implies x \in B)$.
- **Tập lũy thừa $\mathcal{P}(A)$:** Tập hợp chứa tất cả các tập con của $A$.
  - Nếu $|A| = n$ thì $|\mathcal{P}(A)| = 2^n$.
- **Tích Descartes:** $A \times B = \{(a, b) \mid a \in A, b \in B\}$.
  - $|A \times B| = |A| \cdot |B|$.

### 1.2. Các phép toán trên tập hợp
- **Hợp:** $A \cup B = \{x \mid x \in A \lor x \in B\}$.
- **Giao:** $A \cap B = \{x \mid x \in A \land x \in B\}$.
- **Hiệu:** $A \setminus B = \{x \mid x \in A \land x \notin B\}$.
- **Phần bù:** $\overline{A} = U \setminus A$ với $U$ là tập vũ trụ.

### 1.3. Nguyên lý bù trừ (Inclusion - Exclusion Principle)
- Đối với 2 tập hợp:
  $$|A \cup B| = |A| + |B| - |A \cap B|$$
- Đối với 3 tập hợp:
  $$|A \cup B \cup C| = |A| + |B| + |C| - (|A \cap B| + |B \cap C| + |C \cap A|) + |A \cap B \cap C|$$

---

## 2. Ánh Xạ & Hàm Số

Cho ánh xạ $f: A \to B$.
- $A$: Tập nguồn (Tập xác định).
- $B$: Tập đích.

### 2.1. Phân loại ánh xạ

| Loại ánh xạ | Định nghĩa | Điều kiện về số phần tử (khi $A, B$ hữu hạn) |
| :--- | :--- | :---: |
| **Đơn ánh (Injective)** | $f(x_1) = f(x_2) \implies x_1 = x_2$ *(các phần tử khác nhau có ảnh khác nhau)* | $|A| \le |B|$ |
| **Toàn ánh (Surjective)** | $\forall y \in B, \; \exists x \in A : f(x) = y$ *(mọi phần tử của $B$ đều là ảnh)* | $|A| \ge |B|$ |
| **Song ánh (Bijective)** | $f$ vừa là **đơn ánh**, vừa là **toàn ánh** | $|A| = |B|$ |

::: tip ĐIỀU KIỆN TỒN TẠI HÀM NGƯỢC
Hàm số $f: A \to B$ có hàm ngược $f^{-1}: B \to A$ khi và chỉ khi $f$ là một **song ánh**.
Khi đó: $f^{-1}(y) = x \iff f(x) = y$.
:::

### 2.2. Ánh xạ hợp thành (Composition)
Cho $f: A \to B$ và $g: B \to C$. Ánh xạ hợp thành $g \circ f: A \to C$ được xác định bởi:
$$(g \circ f)(x) = g(f(x))$$

---

## 3. Bài Tập Mẫu

### Bài 1:
Trong một lớp học CNTT gồm 50 sinh viên: có 30 bạn thích học Python, 25 bạn thích học C++, và 12 bạn thích cả hai ngôn ngữ.
1. Có bao nhiêu sinh viên thích ít nhất một trong hai ngôn ngữ?
2. Có bao nhiêu sinh viên không thích cả hai ngôn ngữ?

::: details 📖 Xem lời giải chi tiết
Gọi $P$ là tập hợp sinh viên thích Python $\implies |P| = 30$.
Gọi $C$ là tập hợp sinh viên thích C++ $\implies |C| = 25$.
Tập sinh viên thích cả hai: $|P \cap C| = 12$.

1. Số sinh viên thích ít nhất một trong hai ngôn ngữ:
   $$|P \cup C| = |P| + |C| - |P \cap C| = 30 + 25 - 12 = 43 \text{ sinh viên}$$
2. Số sinh viên không thích cả hai ngôn ngữ:
   $$N = 50 - |P \cup C| = 50 - 43 = 7 \text{ sinh viên}$$
:::

### Bài 2:
Cho hàm số $f: \mathbb{R} \setminus \{2\} \to \mathbb{R} \setminus \{1\}$ xác định bởi:
$$f(x) = \frac{x + 1}{x - 2}$$
Chứng minh $f$ là song ánh và tìm hàm ngược $f^{-1}(x)$.

::: details 📖 Xem lời giải chi tiết
- **Chứng minh đơn ánh:**
  Giả sử $f(x_1) = f(x_2)$:
  $$\frac{x_1 + 1}{x_1 - 2} = \frac{x_2 + 1}{x_2 - 2} \iff (x_1 + 1)(x_2 - 2) = (x_2 + 1)(x_1 - 2)$$
  $$\iff x_1 x_2 - 2x_1 + x_2 - 2 = x_1 x_2 - 2x_2 + x_1 - 2 \iff -3x_1 = -3x_2 \iff x_1 = x_2$$
  Vậy $f$ là đơn ánh.

- **Chứng minh toàn ánh:**
  Với mọi $y \in \mathbb{R} \setminus \{1\}$, xét phương trình $f(x) = y$:
  $$\frac{x + 1}{x - 2} = y \iff x + 1 = y(x - 2) \iff x + 1 = xy - 2y \iff x(1 - y) = -2y - 1$$
  Vì $y \neq 1 \implies 1 - y \neq 0$:
  $$x = \frac{2y + 1}{y - 1}$$
  Dễ thấy $x \neq 2$ (vì nếu $x = 2 \implies 2y + 1 = 2y - 2 \implies 1 = -2$ vô lý).
  Do đó luôn tồn tại $x \in \mathbb{R} \setminus \{2\}$ thỏa mãn $f(x) = y$. Vậy $f$ là toàn ánh.

Vì $f$ vừa đơn ánh vừa toàn ánh nên $f$ là **song ánh**.
Hàm ngược:
$$f^{-1}(x) = \frac{2x + 1}{x - 1}$$
:::
