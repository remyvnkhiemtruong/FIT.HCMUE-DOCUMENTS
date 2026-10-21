---
title: "Chia hết, hệ cơ số và số nguyên tố"
---

# Chia hết, hệ cơ số và số nguyên tố

## Chia hết và phép chia Euclid

$a\mid b$ nghĩa là tồn tại $c\in\mathbb Z$ sao cho $b=ac$. Nếu $a\mid b$ và $a\mid c$ thì $a\mid ub+vc$ với mọi $u,v\in\mathbb Z$.

Với $b>0$, mỗi số nguyên $a$ viết duy nhất được dưới dạng:

$$a=qb+r,\qquad0\le r<b.$$

Với số âm phải giữ điều kiện số dư không âm; chẳng hạn $-17=(-4)5+3$.

## Hệ cơ số

Trong cơ số $b\ge2$, số có các chữ số $a_k\cdots a_0$ nhận giá trị $\sum_{i=0}^{k}a_ib^i$, với $0\le a_i<b$. Đổi từ hệ thập phân bằng cách chia liên tiếp cho $b$ rồi đọc các số dư từ dưới lên.

## Ước chung và bội chung

Với $a,b$ không đồng thời bằng $0$, $d=\gcd(a,b)>0$ thỏa:

$$d=ua+vb\quad(u,v\in\mathbb Z).$$

Thuật toán Euclid dựa trên $\gcd(a,b)=\gcd(b,a\bmod b)$. Với $a,b\ne0$, $\operatorname{lcm}(a,b)=|ab|/\gcd(a,b)$.

## Số nguyên tố

Số nguyên tố là số nguyên lớn hơn $1$ chỉ có hai ước dương. Nếu $p$ nguyên tố và $p\mid ab$ thì $p\mid a$ hoặc $p\mid b$. Mọi số nguyên $n>1$ có phân tích nguyên tố duy nhất, không kể thứ tự thừa số.

Nếu $a=\prod p_i^{\alpha_i}$ và $b=\prod p_i^{\beta_i}$, bổ sung số mũ $0$ cho các thừa số thiếu, thì:

$$\gcd(a,b)=\prod p_i^{\min(\alpha_i,\beta_i)},\quad \operatorname{lcm}(a,b)=\prod p_i^{\max(\alpha_i,\beta_i)}.$$

## Ví dụ từ nguồn

$\gcd(65,25)=5$ và $\operatorname{lcm}(65,25)=325$. Có thể kiểm tra bằng $5\cdot325=65\cdot25$.

## Nguồn tài liệu

- `Lý Thuyết số-C1.pdf` · 28 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
