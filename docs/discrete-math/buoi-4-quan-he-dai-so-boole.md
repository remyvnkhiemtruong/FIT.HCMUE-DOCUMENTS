# Buổi 4: Quan Hệ Tương Đương, Thứ Tự & Đại Số Boole

Quan hệ và Đại số Boole là hai chủ đề trọng tâm trong đề thi cuối kỳ. Quan hệ giúp tổ chức dữ liệu, còn Đại số Boole và bảng Karnaugh là công cụ tối thiểu hóa mạch điện tử trong thiết kế vi xử lý.

---

## 1. Quan Hệ Hai Ngôi & 4 Tính Chất Cơ Bản

Cho quan hệ $R$ trên tập $A$ ($R \subseteq A \times A$). Ký hiệu $aRb$ nghĩa là $(a, b) \in R$.

| Tính chất | Điều kiện xác định | Ý nghĩa ma trận biểu diễn $M_R$ |
| :--- | :--- | :--- |
| **Phản xạ (Reflexive)** | $\forall a \in A \implies aRa$ | Mọi phần tử trên đường chéo chính bằng 1 |
| **Đối xứng (Symmetric)** | $\forall a, b \in A: aRb \implies bRa$ | Ma trận đối xứng: $M_R = M_R^T$ |
| **Phản xứng (Antisymmetric)** | $\forall a, b \in A: (aRb \land bRa) \implies a = b$ | Không có hai số 1 đối xứng qua đường chéo (trừ trên đường chéo) |
| **Bắc cầu (Transitive)** | $\forall a, b, c \in A: (aRb \land bRc) \implies aRc$ | $M_R^{[2]} \le M_R$ |

---

## 2. Quan Hệ Tương Đương & Phân Hoạch

Quan hệ $R$ là **quan hệ tương đương** nếu $R$ thỏa mãn 3 tính chất: **Phản xạ, Đối xứng, Bắc cầu**.

### 2.1. Lớp tương đương
Với mỗi phần tử $a \in A$, lớp tương đương của $a$, ký hiệu $[a]$, là tập hợp tất cả các phần tử có quan hệ với $a$:
$$[a] = \{x \in A \mid xRa\}$$

### 2.2. Định lý phân hoạch
Các lớp tương đương của một quan hệ tương đương trên $A$ tạo thành một **phân hoạch** của tập $A$:
1. $[a] \neq \emptyset, \; \forall a \in A$.
2. Với hai phần tử bất kỳ $a, b$: hoặc $[a] = [b]$, hoặc $[a] \cap [b] = \emptyset$.
3. Hợp của tất cả các lớp tương đương bằng tập $A$: $\bigcup_{a \in A} [a] = A$.

---

## 3. Quan Hệ Thứ Tự & Biểu Đồ Hasse

Quan hệ $R$ là **quan hệ thứ tự** nếu $R$ thỏa mãn: **Phản xạ, Phản xứng, Bắc cầu**.
Tập $A$ cùng với quan hệ thứ tự $\le$ được gọi là một **tập sắp thứ tự bộ phận (Poset)** $(A, \le)$.

### 3.1. Các phần tử đặc biệt trong Poset
Cho tập con $B \subseteq A$:
- **Phần tử tối đại (Maximal):** $m \in B$ là tối đại nếu trong $B$ không có phần tử nào lớn hơn $m$ ($\forall x \in B, m \le x \implies x = m$).
- **Phần tử tối tiểu (Minimal):** $m \in B$ là tối tiểu nếu trong $B$ không có phần tử nào nhỏ hơn $m$.
- **Phần tử lớn nhất (Greatest):** $M \in B$ thỏa mãn $x \le M$ với mọi $x \in B$.
- **Phần tử nhỏ nhất (Least):** $m \in B$ thỏa mãn $m \le x$ với mọi $x \in B$.

*(Chú ý: Phần tử lớn nhất/nhỏ nhất nếu tồn tại thì là DUY NHẤT. Còn phần tử tối đại/tối tiểu có thể có NHIỀU phần tử).*

---

## 4. Đại Số Boole & Bảng Karnaugh (K-map)

Bảng Karnaugh là phương pháp trực quan để tối thiểu hóa hàm Boole, giúp giảm số cổng logic trong vi mạch phần cứng.

### 4.1. Cấu trúc bảng Karnaugh (Thứ tự mã Gray)
Các ô lân cận trong bảng Karnaugh chỉ khác nhau đúng 1 bit theo thứ tự mã Gray:
$$00 \to 01 \to 11 \to 10$$

### 4.2. Quy tắc khoanh nhóm K-map
1. Mỗi nhóm phải chứa số ô là **lũy thừa của 2**: $1, 2, 4, 8, 16$ ô chứa giá trị $1$.
2. Nhóm phải có dạng hình chữ nhật hoặc hình vuông (có thể uốn cong qua các mép biên bảng).
3. Nhóm các khối càng lớn càng tốt (để triệt tiêu được nhiều biến nhất).
4. Phủ toàn bộ các số 1 với số lượng nhóm ít nhất.

---

## 5. Bài Tập Mẫu

### Bài 1:
Cho quan hệ $R$ trên tập số nguyên $\mathbb{Z}$ xác định bởi:
$$aRb \iff a \equiv b \pmod 5 \quad (a - b \text{ chia hết cho } 5)$$
1. Chứng minh $R$ là một quan hệ tương đương trên $\mathbb{Z}$.
2. Tìm tất cả các lớp tương đương khác nhau.

::: details 📖 Xem lời giải chi tiết
1. **Kiểm tra 3 tính chất:**
   - **Phản xạ:** $\forall a \in \mathbb{Z}, a - a = 0 = 5 \times 0 \implies a \equiv a \pmod 5 \implies aRa$.
   - **Đối xứng:** Giả sử $aRb \implies a - b = 5k (k \in \mathbb{Z}) \implies b - a = 5(-k) \implies bRa$.
   - **Bắc cầu:** Giả sử $aRb$ và $bRc \implies a - b = 5k$ và $b - c = 5m$.
     Cộng hai vế: $(a - b) + (b - c) = 5(k + m) \implies a - c = 5(k + m) \implies aRc$.
   Vậy $R$ là một quan hệ tương đương trên $\mathbb{Z}$.

2. **Các lớp tương đương:**
   Số dư khi chia cho 5 chỉ có thể là $0, 1, 2, 3, 4$. Do đó có đúng 5 lớp tương đương:
   - $[0] = \{\dots, -10, -5, 0, 5, 10, \dots\} = 5\mathbb{Z}$
   - $[1] = \{\dots, -9, -4, 1, 6, 11, \dots\} = 5\mathbb{Z} + 1$
   - $[2] = \{\dots, -8, -3, 2, 7, 12, \dots\} = 5\mathbb{Z} + 2$
   - $[3] = \{\dots, -7, -2, 3, 8, 13, \dots\} = 5\mathbb{Z} + 3$
   - $[4] = \{\dots, -6, -1, 4, 9, 14, \dots\} = 5\mathbb{Z} + 4$
:::
