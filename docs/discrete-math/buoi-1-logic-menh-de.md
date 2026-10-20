---
title: "Buổi 1: Cơ sở logic mệnh đề và bảng chân trị"
---

# Buổi 1: Cơ sở logic mệnh đề và bảng chân trị {#buoi-1-co-so-logic-menh-đe-bang-chan-tri}

Học phần **Toán rời rạc và ứng dụng** (COMP1802) mở đầu bằng lý thuyết logic mệnh đề, dùng cho lập trình điều kiện (if/else), thiết kế mạch số phần cứng và xây dựng cơ sở dữ liệu.

---

## 1. Mệnh đề và các phép toán logic cơ bản {#_1-menh-đe-cac-phep-toan-logic-co-ban}

### 1.1. Khái niệm mệnh đề
- **Mệnh đề** là một câu khẳng định chỉ nhận một trong hai giá trị chân lý: **Đúng (1 / True)** hoặc **Sai (0 / False)**, không thể vừa đúng vừa sai.
- Các câu nghi vấn, cảm thán, mệnh lệnh hoặc câu chứa biến không xác định không phải là mệnh đề.

### 1.2. Bảng chân trị các phép toán logic

| $p$ | $q$ | Phủ định $\neg p$ | Hội (AND) $p \land q$ | Tuyển (OR) $p \lor q$ | Tuyển loại trừ (XOR) $p \oplus q$ | Kéo theo $p \to q$ | Tương đương $p \leftrightarrow q$ |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 1 | 1 | 0 | 1 | 1 | 0 | **1** | 1 |
| 1 | 0 | 0 | 0 | 1 | 1 | **0** | 0 |
| 0 | 1 | 1 | 0 | 1 | 1 | **1** | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 | **1** | 1 |

::: warning Đặc biệt chú ý phép kéo theo $p \to q$
$p \to q$ **chỉ sai duy nhất khi tiền đề $p$ đúng mà kết luận $q$ sai** (dòng 2: $1 \to 0 = 0$).
Nếu tiền đề $p$ sai ($p = 0$) thì bất kể kết luận $q$ ra sao, mệnh đề $p \to q$ luôn luôn **đúng**.
:::

---

## 2. Các quy luật tương đương logic quan trọng {#_2-cac-quy-luat-tuong-đuong-logic-quan-trong}

Hai biểu thức logic $A$ và $B$ được gọi là **tương đương logic** (ký hiệu $A \equiv B$) nếu chúng có cùng bảng chân trị.

1. **Luật De Morgan:**
   $$\neg (p \land q) \equiv \neg p \lor \neg q$$
   $$\neg (p \lor q) \equiv \neg p \land \neg q$$
2. **Biến đổi phép kéo theo:**
   $$p \to q \equiv \neg p \lor q \equiv \neg q \to \neg p \quad (\text{phản đảo})$$
3. **Phủ định của phép kéo theo:**
   $$\neg (p \to q) \equiv p \land \neg q$$
4. **Luật phân phối:**
   $$p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$$
   $$p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$$
5. **Luật nuốt (Hấp thu):**
   $$p \lor (p \land q) \equiv p, \quad p \land (p \lor q) \equiv p$$

---

## 3. Dạng chuẩn tắc tuyển (DNF) và hội (CNF) {#_3-dang-chuan-tac-tuyen-dnf-hoi-cnf}

- **Dạng chuẩn tắc tuyển (DNF - Disjunctive Normal Form):** Tuyển của các hội (tổng của các tích minterm): $\bigvee (\bigwedge x_i)$.
  - Tìm DNF bằng cách gom tất cả các dòng trên bảng chân trị có giá trị bằng **1**.
- **Dạng chuẩn tắc hội (CNF - Conjunctive Normal Form):** Hội của các tuyển (tích của các tổng maxterm): $\bigwedge (\bigvee x_i)$.
  - Tìm CNF bằng cách phủ định của các dòng có giá trị bằng **0**.

---

## 4. Bài tập và lời giải mẫu {#_4-bai-tap-loi-giai-mau}

### Bài 1:
Chứng minh bằng các phép biến đổi tương đương logic rằng biểu thức sau là một **hằng đúng**:
$$(p \to q) \lor (q \to p)$$

::: details Lời giải
Áp dụng công thức biến đổi phép kéo theo $a \to b \equiv \neg a \lor b$:
$$(p \to q) \lor (q \to p) \equiv (\neg p \lor q) \lor (\neg q \lor p)$$
Áp dụng tính chất giao hoán và kết hợp của phép tuyển $\lor$:
$$\equiv (\neg p \lor p) \lor (q \lor \neg q)$$
Ta biết rằng mệnh đề $x \lor \neg x \equiv \text{True} \; (1)$:
$$\equiv 1 \lor 1 \equiv 1$$
Vậy biểu thức luôn luôn nhận giá trị 1 (đúng) với mọi trường hợp của $p$ và $q$, chứng tỏ đây là một **hằng đúng**.
:::

### Bài 2:
Tìm dạng chuẩn tắc tuyển (DNF) của hàm logic sau:
$$f(p, q, r) = (p \land q) \to (q \land r)$$

::: details Lời giải
Biến đổi bằng các luật logic:
$$f = \neg (p \land q) \lor (q \land r)$$
Áp dụng luật De Morgan cho $\neg (p \land q)$:
$$f = (\neg p \lor \neg q) \lor (q \land r)$$
Biến đổi thành tổng các hội đầy đủ các biến $p, q, r$:
- $\neg p = \neg p \land (q \lor \neg q) \land (r \lor \neg r) = (\neg p \land q \land r) \lor (\neg p \land q \land \neg r) \lor (\neg p \land \neg q \land r) \lor (\neg p \land \neg q \land \neg r)$
- $\neg q = (p \lor \neg p) \land \neg q \land (r \lor \neg r) = (p \land \neg q \land r) \lor (p \land \neg q \land \neg r) \lor (\neg p \land \neg q \land r) \lor (\neg p \land \neg q \land \neg r)$
- $q \land r = (p \lor \neg p) \land q \land r = (p \land q \land r) \lor (\neg p \land q \land r)$

Gộp lại và bỏ các số hạng trùng lặp, ta thu được DNF gồm 7 minterm (chỉ trừ dòng $p=1, q=1, r=0$).
:::
