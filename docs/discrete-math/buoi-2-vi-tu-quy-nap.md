# Buổi 2: Vị Từ, Quy Tắc Suy Diễn & Quy Nạp Toán Học

Chuyên đề này mở rộng logic mệnh đề thành logic vị từ và trang bị các phương pháp chứng minh toán học chặt chẽ — kỹ năng then chốt để chứng minh tính đúng đắn của thuật toán (Algorithm Correctness).

---

## 1. Logic Vị Từ & Lượng Từ

### 1.1. Vị từ
- **Vị từ** $P(x)$ là một câu khẳng định có chứa một hoặc nhiều biến số $x$. Khi gán giá trị cụ thể cho $x$ trong không gian khảo sát $D$, vị từ trở thành một mệnh đề có giá trị chân lý xác định.

### 1.2. Các lượng từ
- **Lượng từ với mọi ($\forall$):** $\forall x \in D, P(x)$ đúng khi $P(x)$ đúng với **mọi** $x \in D$.
- **Lượng từ tồn tại ($\exists$):** $\exists x \in D, P(x)$ đúng khi tồn tại **ít nhất một** $x \in D$ sao cho $P(x)$ đúng.
- **Tồn tại duy nhất ($\exists!$):** Chỉ có đúng một phần tử thỏa mãn tính chất.

### 1.3. Phủ định mệnh đề chứa lượng từ (De Morgan mở rộng)
$$\neg (\forall x P(x)) \equiv \exists x \neg P(x)$$
$$\neg (\exists x P(x)) \equiv \forall x \neg P(x)$$

---

## 2. Các Quy Tắc Suy Diễn (Rules of Inference)

| Tên quy tắc | Biểu diễn logic | Diễn giải |
| :--- | :--- | :--- |
| **Modus Ponens** | $\begin{cases} p \to q \\ p \end{cases} \implies q$ | Khẳng định tiền đề thì khẳng định kết luận |
| **Modus Tollens** | $\begin{cases} p \to q \\ \neg q \end{cases} \implies \neg p$ | Phủ định kết luận thì phủ định tiền đề |
| **Tam đoạn luận giả thiết** | $\begin{cases} p \to q \\ q \to r \end{cases} \implies p \to r$ | Tính chất bắc cầu của phép suy ra |
| **Tam đoạn luận tuyển** | $\begin{cases} p \lor q \\ \neg p \end{cases} \implies q$ | Loại trừ một trường hợp thì trường hợp còn lại đúng |
| **Quy tắc độ phân giải (Resolution)** | $\begin{cases} p \lor q \\ \neg p \lor r \end{cases} \implies q \lor r$ | Cơ sở của các máy tính tự động chứng minh định lý |

---

## 3. Nguyên Lý Quy Nạp Toán Học (Mathematical Induction)

Để chứng minh một mệnh đề $P(n)$ đúng với mọi số nguyên $n \ge n_0$:

1. **Bước cơ sở (Base Step):** Kiểm tra mệnh đề đúng với giá trị đầu tiên: $n = n_0$ (thường là $n=0$ hoặc $n=1$).
2. **Bước quy nạp (Inductive Step):**
   - Giả thiết quy nạp (IH): Giả sử mệnh đề đúng với $n = k$ ($k \ge n_0$), tức là $P(k)$ đúng.
   - Cần chứng minh mệnh đề cũng đúng với $n = k + 1$, tức là chứng minh $P(k+1)$ đúng dựa trên giả thiết $P(k)$.
3. **Kết luận:** Theo nguyên lý quy nạp toán học, $P(n)$ đúng với mọi $n \ge n_0$.

::: tip NGUYÊN LÝ QUY NẠP MẠNH (STRONG INDUCTION)
Ở bước quy nạp, thay vì chỉ giả sử $P(k)$ đúng, ta giả sử $P(n_0), P(n_0+1), \dots, P(k)$ đều đúng để chứng minh $P(k+1)$ đúng. Rất hữu ích cho các bài toán phân tích thừa số nguyên tố hoặc dãy Fibonacci!
:::

---

## 4. Bài Tập Mẫu

### Bài 1:
Dùng nguyên lý quy nạp toán học, chứng minh rằng với mọi số nguyên dương $n \ge 1$:
$$1 + 2 + 3 + \dots + n = \frac{n(n+1)}{2}$$

::: details 📖 Xem lời giải chi tiết
Gọi $P(n)$ là mệnh đề: $\sum_{i=1}^n i = \frac{n(n+1)}{2}$.

- **Bước 1: Bước cơ sở:**
  Với $n = 1$:
  $$\text{VT} = 1; \quad \text{VP} = \frac{1(1+1)}{2} = 1 \implies \text{VT} = \text{VP}$$
  Vậy $P(1)$ đúng.

- **Bước 2: Bước quy nạp:**
  Giả sử $P(k)$ đúng với $k \ge 1$, tức là:
  $$1 + 2 + \dots + k = \frac{k(k+1)}{2} \quad (\text{Giả thiết quy nạp})$$
  Ta cần chứng minh $P(k+1)$ đúng, tức là chứng minh:
  $$1 + 2 + \dots + k + (k+1) = \frac{(k+1)(k+2)}{2}$$
  Thật vậy, xét vế trái của $P(k+1)$:
  $$\text{VT} = [1 + 2 + \dots + k] + (k+1) = \frac{k(k+1)}{2} + (k+1)$$
  Đặt $(k+1)$ làm nhân tử chung:
  $$\text{VT} = (k+1)\left(\frac{k}{2} + 1\right) = (k+1)\left(\frac{k+2}{2}\right) = \frac{(k+1)(k+2)}{2} = \text{VP}$$
  Vậy $P(k+1)$ đúng.

- **Kết luận:** Theo nguyên lý quy nạp, mệnh đề $P(n)$ đúng với mọi số nguyên dương $n \ge 1$.
:::
