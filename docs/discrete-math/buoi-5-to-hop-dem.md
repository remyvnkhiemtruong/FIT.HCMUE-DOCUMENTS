---
title: "Buổi 5: Đại số tổ hợp, bài toán đếm và nguyên lý Dirichlet"
---

# Buổi 5: Đại số tổ hợp, bài toán đếm và nguyên lý Dirichlet {#buoi-5-đai-so-to-hop-bai-toan-đem-nguyen-ly-dirichlet}

Kỹ thuật đếm và tổ hợp là nền tảng trực tiếp để tính xác suất, phân tích độ phức tạp thời gian/bộ nhớ của thuật toán và bảo mật thông tin (mã hóa RSA, mật mã học).

---

## 1. Các quy tắc đếm cơ bản {#_1-cac-quy-tac-đem-co-ban}

- **Quy tắc cộng:** Nếu một công việc có thể hoàn thành bởi một trong hai hành động không giao nhau: hành động 1 có $m$ cách, hành động 2 có $n$ cách $\implies$ Tổng số cách là:
  $$m + n$$
- **Quy tắc nhân:** Nếu một công việc gồm hai giai đoạn liên tiếp: giai đoạn 1 có $m$ cách, với mỗi cách đó có $n$ cách thực hiện giai đoạn 2 $\implies$ Tổng số cách là:
  $$m \times n$$

---

## 2. Bảng phân biệt các cấu hình tổ hợp {#_2-bang-phan-biet-cac-cau-hinh-to-hop}

| Cấu hình | Có phân biệt thứ tự? | Cho phép lặp lại? | Công thức tính số cách |
| :--- | :---: | :---: | :--- |
| **Hoán vị** | Có | Không | $P_n = n!$ |
| **Chỉnh hợp** | Có | Không | $A_n^k = \frac{n!}{(n-k)!}$ |
| **Chỉnh hợp lặp** | Có | Có | $n^k$ |
| **Tổ hợp** | **Không** | Không | $C_n^k = \frac{n!}{k!(n-k)!}$ |
| **Tổ hợp lặp** | **Không** | Có | $\overline{C}_n^k = C_{n + k - 1}^k$ |
| **Hoán vị lặp** | Có | Đã cho số lượng | $\frac{n!}{n_1! n_2! \dots n_k!}$ |

::: tip Bài toán chia kẹo Euler (tổ hợp lặp)
Số nghiệm nguyên không âm của phương trình:
$$x_1 + x_2 + \dots + x_n = k \quad (x_i \ge 0)$$
chính là số tổ hợp lặp chập $k$ của $n$ phần tử:
$$N = C_{n + k - 1}^k$$
Nếu yêu cầu các nghiệm **nguyên dương** ($x_i \ge 1$), ta đổi biến $y_i = x_i - 1 \ge 0$, phương trình trở thành $y_1 + \dots + y_n = k - n \implies N = C_{k-1}^{n-1}$.
:::

---

## 3. Nhị thức Newton và các đẳng thức tổ hợp {#_3-nhi-thuc-newton-cac-đang-thuc-to-hop}

### 3.1. Định lý nhị thức Newton
$$(a + b)^n = \sum_{k=0}^{n} C_n^k a^{n-k} b^k$$
- Số hạng thứ $k+1$: $T_{k+1} = C_n^k a^{n-k} b^k$.

### 3.2. Một số hệ quả kinh điển
1. Cho $a = 1, b = 1$:
   $$C_n^0 + C_n^1 + C_n^2 + \dots + C_n^n = 2^n$$
2. Cho $a = 1, b = -1$:
   $$C_n^0 - C_n^1 + C_n^2 - \dots + (-1)^n C_n^n = 0$$

---

## 4. Nguyên lý lồng chim bồ câu (Dirichlet) {#_4-nguyen-ly-long-chim-bo-cau-dirichlet}

### 4.1. Dạng cơ bản
Nếu có $k+1$ con chim bồ câu bay vào $k$ cái lồng, thì có **ít nhất một cái lồng chứa từ 2 con chim trở lên**.

### 4.2. Dạng mở rộng
Nếu xếp $N$ đồ vật vào $k$ cái hộp, thì luôn tồn tại ít nhất một cái hộp chứa ít nhất:
$$\left\lceil \frac{N}{k} \right\rceil \text{ đồ vật}$$
*(Trong đó $\lceil x \rceil$ là hàm làm tròn lên, trần của $x$)*.

---

## 5. Bài tập mẫu {#_5-bai-tap-mau}

### Bài 1:
Có bao nhiêu xâu nhị phân có độ dài 8:
1. Bắt đầu bằng bit 1?
2. Bắt đầu bằng bit 1 hoặc kết thúc bằng hai bit 00?

::: details Lời giải
1. **Bắt đầu bằng bit 1:**
   Bit đầu tiên có 1 cách chọn (là 1), 7 bit còn lại mỗi bit có 2 cách chọn (0 hoặc 1).
   Số xâu nhị phân là: $1 \times 2^7 = 128$ xâu.

2. **Bắt đầu bằng bit 1 hoặc kết thúc bằng 00:**
   - Gọi $A$ là tập các xâu bắt đầu bằng 1 $\implies |A| = 2^7 = 128$.
   - Gọi $B$ là tập các xâu kết thúc bằng 00 $\implies |B| = 2^6 = 64$.
   - Tập $A \cap B$ là các xâu vừa bắt đầu bằng 1 vừa kết thúc bằng 00: có dạng $1xxxxxxx00$ (5 vị trí tự do) $\implies |A \cap B| = 2^5 = 32$.
   Theo nguyên lý bù trừ:
   $$|A \cup B| = |A| + |B| - |A \cap B| = 128 + 64 - 32 = 160 \text{ xâu}$$
:::

### Bài 2:
Cần chọn ít nhất bao nhiêu sinh viên để chắc chắn có ít nhất 5 sinh viên có cùng tháng sinh?

::: details Lời giải
- "Hộp" là 12 tháng sinh trong năm ($k = 12$).
- "Đồ vật" là số sinh viên $N$.
Theo nguyên lý Dirichlet dạng mở rộng, số sinh viên có cùng tháng sinh ít nhất là:
$$\left\lceil \frac{N}{12} \right\rceil \ge 5$$
Bất đẳng thức xảy ra khi:
$$\frac{N}{12} > 4 \implies N > 48$$
Vì $N$ nguyên nhỏ nhất nên $N = 49$.
**Kết luận:** Cần chọn ít nhất **49 sinh viên**.
:::
