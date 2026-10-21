---
title: "Hàm số học, cấp và thặng dư bình phương"
---

# Hàm số học, cấp và thặng dư bình phương

## Tổng và số lượng ước

Cho $n=\prod_{i=1}^{r}p_i^{\alpha_i}$. Mỗi ước dương chọn độc lập số mũ từ $0$ đến $\alpha_i$, nên:

$$\tau(n)=\prod_i(\alpha_i+1),\qquad \sigma(n)=\prod_i(1+p_i+\cdots+p_i^{\alpha_i}).$$

Với $p$ nguyên tố, tổng hình học cho $\sigma(p^k)=(p^{k+1}-1)/(p-1)$. Hai hàm $\tau,\sigma$ đều nhân tính.

## Cấp và nghiệm nguyên thủy

Nếu $\gcd(a,n)=1$, cấp $\operatorname{ord}_n(a)$ là số nguyên dương nhỏ nhất $t$ sao cho $a^t\equiv1\pmod n$. Khi đó $a^m\equiv1$ khi và chỉ khi $t\mid m$, và $t\mid\varphi(n)$.

Phần tử $r$ là nghiệm nguyên thủy khi có cấp $\varphi(n)$. Để kiểm tra một ứng viên, với mỗi ước nguyên tố $q$ của $\varphi(n)$, kiểm tra $r^{\varphi(n)/q}\not\equiv1\pmod n$.

## Thặng dư bình phương và Legendre

Với $p$ nguyên tố lẻ, $a$ là thặng dư bình phương khác không nếu $x^2\equiv a\pmod p$ có nghiệm khác không. Ký hiệu Legendre nhận giá trị $0,1,-1$ tùy $p\mid a$, có nghiệm hay không có nghiệm.

Tiêu chuẩn Euler:

$$\left(\frac ap\right)\equiv a^{(p-1)/2}\pmod p.$$

Giá trị $p-1$ của vế phải tương ứng ký hiệu $-1$. Tính nhân của Legendre giúp phân tích tử số; bổ đề Gauss liên hệ dấu với số đại diện đi qua nửa trên của hệ thặng dư.

## Ví dụ từ nguồn

Các bình phương khác không theo môđun $11$ là $1,3,4,5,9$, do bình phương các đại diện $1,2,3,4,5$. Mỗi giá trị có hai căn đối nhau theo môđun $11$.

## Nguồn tài liệu

- `Lý Thuyết số-C2.3.pdf` · 29 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
