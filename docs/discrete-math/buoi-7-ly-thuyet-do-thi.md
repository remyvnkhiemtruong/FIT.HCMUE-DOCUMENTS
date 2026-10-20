---
title: "Buổi 7: Lý thuyết đồ thị và các thuật toán cốt lõi"
---

# Buổi 7: Lý thuyết đồ thị và các thuật toán cốt lõi {#buoi-7-ly-thuyet-đo-thi-cac-thuat-toan-cot-loi}

Lý thuyết đồ thị là cấu trúc dữ liệu và giải thuật cốt lõi trong CNTT: mạng máy tính (định tuyến gói tin IP), mạng xã hội (Facebook, LinkedIn), hệ thống gợi ý và công cụ tìm đường GPS (Google Maps).

---

## 1. Các khái niệm cơ bản về đồ thị {#_1-cac-khai-niem-co-ban-ve-đo-thi}

Đồ thị $G = (V, E)$ gồm:
- $V$: Tập hợp các đỉnh (Vertices), $|V| = n$.
- $E$: Tập hợp các cạnh (Edges), $|E| = m$.

### 1.1. Bậc của đỉnh và bổ đề bắt tay {#_1-1-bac-cua-đinh-bo-đe-bat-tay-handshaking-lemma}
- Trong đồ thị vô hướng, **bậc của đỉnh $v$**, ký hiệu $\deg(v)$, là số cạnh liên thuộc với $v$ (khuyên được tính 2 lần).
- **Định lý bắt tay:**
  $$\sum_{v \in V} \deg(v) = 2|E|$$
- **Hệ quả quan trọng:** Trong mọi đồ thị vô hướng, **số đỉnh có bậc lẻ luôn luôn là một số chẵn**.

### 1.2. Biểu diễn đồ thị
1. **Ma trận kề (Adjacency Matrix) $A = (a_{ij})_{n \times n}$:**
   $a_{ij} = 1$ nếu có cạnh nối đỉnh $i$ và $j$, ngược lại $a_{ij} = 0$. Với đồ thị vô hướng, ma trận kề là đối xứng.
2. **Danh sách kề (Adjacency List):** Tiết kiệm bộ nhớ cho đồ thị thưa.

---

## 2. Đồ thị Euler và đồ thị Hamilton {#_2-đo-thi-euler-đo-thi-hamilton}

### 2.1. Đồ thị Euler (đi qua mỗi cạnh đúng một lần) {#_2-1-đo-thi-euler-đi-qua-moi-canh-đung-mot-lan}
Cho đồ thị vô hướng liên thông $G$:
- **Chu trình Euler:** Đi qua mỗi **cạnh** đúng 1 lần và quay về đỉnh xuất phát.
  - **Điều kiện cần và đủ:** Mọi đỉnh của $G$ đều có **bậc chẵn**.
- **Đường đi Euler:** Đi qua mỗi cạnh đúng 1 lần (đỉnh đầu khác đỉnh cuối).
  - **Điều kiện cần và đủ:** Đồ thị có **đúng 2 đỉnh bậc lẻ** (đường đi sẽ bắt đầu từ 1 đỉnh lẻ và kết thúc ở đỉnh lẻ còn lại).

### 2.2. Đồ thị Hamilton (đi qua mỗi đỉnh đúng một lần) {#_2-2-đo-thi-hamilton-đi-qua-moi-đinh-đung-mot-lan}
- **Chu trình Hamilton:** Đi qua mỗi **đỉnh** đúng 1 lần và quay về đỉnh ban đầu.
- **Định lý Dirac:** Nếu đồ thị đơn vô hướng có $n \ge 3$ đỉnh và mọi đỉnh đều có $\deg(v) \ge \frac{n}{2}$ thì $G$ có chu trình Hamilton.
- **Định lý Ore:** Nếu với mọi cặp đỉnh không kề nhau $u, v$ ta có $\deg(u) + \deg(v) \ge n$ thì $G$ có chu trình Hamilton.

---

## 3. Cây khung nhỏ nhất (MST - minimum spanning tree) {#_3-cay-khung-nho-nhat-mst-minimum-spanning-tree}

Cho đồ thị vô hướng liên thông có trọng số $G = (V, E)$. Một **cây khung** là một đồ thị con chứa toàn bộ $n$ đỉnh của $G$ và có đúng $n - 1$ cạnh, không chứa chu trình.

### 3.1. Thuật toán Kruskal (ưu tiên cạnh nhỏ) {#_3-1-thuat-toan-kruskal-uu-tien-canh-nho}
1. Sắp xếp tất cả các cạnh theo thứ tự trọng số tăng dần.
2. Lần lượt chọn cạnh có trọng số nhỏ nhất thêm vào cây khung nếu cạnh đó **không tạo thành chu trình** với các cạnh đã chọn.
3. Dừng lại khi đã chọn đủ $n - 1$ cạnh.

### 3.2. Thuật toán Prim (phát triển theo cụm đỉnh) {#_3-2-thuat-toan-prim-phat-trien-theo-cum-đinh}
1. Bắt đầu từ một đỉnh tùy ý $s$, đặt tập đỉnh của cây $V_T = \{s\}$.
2. Ở mỗi bước, tìm cạnh $(u, v)$ có trọng số nhỏ nhất sao cho $u \in V_T$ và $v \notin V_T$. Thêm cạnh $(u, v)$ vào cây và thêm $v$ vào $V_T$.
3. Dừng lại khi $V_T = V$ (chọn đủ $n - 1$ cạnh).

---

## 4. Thuật toán tìm đường đi ngắn nhất Dijkstra {#_4-thuat-toan-tim-đuong-đi-ngan-nhat-dijkstra}

Tìm đường đi ngắn nhất từ đỉnh nguồn $s$ đến tất cả các đỉnh còn lại trên đồ thị có trọng số không âm:
- Khởi tạo nhãn khoảng cách: $d(s) = 0$, $d(v) = +\infty$ với mọi $v \neq s$. Tập đỉnh chưa xét $Q = V$.
- Lặp:
  1. Chọn đỉnh $u \in Q$ có khoảng cách $d(u)$ nhỏ nhất.
  2. Loại $u$ khỏi $Q$.
  3. Cập nhật nhãn cho mọi đỉnh kề $v \in Q$ của $u$:
     $$d(v) \leftarrow \min(d(v), \; d(u) + w(u, v))$$
- Dừng lại khi $Q = \emptyset$.

---

## 5. Bài tập mẫu {#_5-bai-tap-mau}

### Bài 1:
Một đồ thị có 15 đỉnh, trong đó mỗi đỉnh đều có bậc bằng 4.
1. Tính số cạnh của đồ thị.
2. Đồ thị này có chu trình Euler không? Vì sao?

::: details Lời giải
1. **Tính số cạnh:**
   Theo định lý bắt tay:
   $$\sum_{v \in V} \deg(v) = 2|E| \iff 15 \times 4 = 2|E| \iff 60 = 2|E| \implies |E| = 30 \text{ cạnh}$$

2. **Kiểm tra tính Euler:**
   Mỗi đỉnh của đồ thị đều có bậc bằng 4 (là số chẵn). Giả sử đồ thị liên thông, theo định lý Euler, đồ thị có tất cả các đỉnh đều bậc chẵn nên **chắc chắn có chu trình Euler**.
:::

### Bài 2:
Cho đồ thị $G$ gồm 5 đỉnh $\{A, B, C, D, E\}$ với các cạnh và trọng số:
$(A, B): 2, \; (A, C): 4, \; (B, C): 1, \; (B, D): 7, \; (C, E): 3, \; (D, E): 5, \; (C, D): 2$.
Áp dụng thuật toán Kruskal tìm cây khung nhỏ nhất.

::: details Lời giải
Đồ thị có $n = 5$ đỉnh, cây khung cần chọn đúng $n - 1 = 4$ cạnh.
Sắp xếp các cạnh theo trọng số tăng dần:
1. $(B, C) - 1$: Chọn $\to$ Cạnh 1.
2. $(A, B) - 2$: Chọn $\to$ Cạnh 2.
3. $(C, D) - 2$: Chọn $\to$ Cạnh 3.
4. $(C, E) - 3$: Chọn $\to$ Cạnh 4 (không tạo chu trình).
Đã chọn đủ 4 cạnh, thuật toán kết thúc.

**Tổng trọng số của cây khung nhỏ nhất:**
$$W = 1 + 2 + 2 + 3 = 8$$
Tập cạnh của cây khung nhỏ nhất: $T = \{(B, C), (A, B), (C, D), (C, E)\}$.
:::
