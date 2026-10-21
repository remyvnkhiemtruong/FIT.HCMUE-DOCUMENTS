---
title: "Quan hệ, vành đồng dư và các định lý số học"
---

# Quan hệ, vành đồng dư và các định lý số học

## Quan hệ đồng dư và vành thương

Với $n>0$, định nghĩa $a\equiv b\pmod n$ khi $n\mid(a-b)$. Đây là quan hệ tương đương. Các lớp đồng dư lập thành $\mathbb Z_n$; cộng và nhân lớp được xác định qua đại diện và không phụ thuộc đại diện đã chọn.

## Nghịch đảo và phương trình tuyến tính

Lớp $[a]$ khả nghịch khi $\gcd(a,n)=1$. Từ $ua+vn=1$ suy ra $[u]=[a]^{-1}$.

Xét $ax\equiv b\pmod n$ và $d=\gcd(a,n)$. Hệ có nghiệm khi và chỉ khi $d\mid b$. Khi có nghiệm, có đúng $d$ lớp nghiệm theo môđun $n$; chia phương trình và môđun cho $d$ để giải.

## Định lý số dư Trung Hoa

Với các môđun $n_i$ đôi một nguyên tố cùng nhau, hệ $x\equiv a_i\pmod{n_i}$ có một lớp nghiệm duy nhất theo môđun $N=\prod n_i$.

Đặt $N_i=N/n_i$, tìm $u_iN_i\equiv1\pmod{n_i}$, rồi lấy $x\equiv\sum_i a_iN_iu_i\pmod N$.

## Wilson và Fermat

Với số nguyên tố $p$:

$$ (p-1)!\equiv-1\pmod p,\qquad a^p\equiv a\pmod p. $$

Nếu $p\nmid a$, có thể viết $a^{p-1}\equiv1\pmod p$. Không dùng dạng sau với cơ số chia hết cho $p$.

## Đa thức và tổng hai bình phương

Trên trường $\mathbb Z_p$, đa thức khác không bậc $d$ có không quá $d$ nghiệm. Điều kiện môđun nguyên tố là cần cho cách phát biểu theo trường này.

Một số nguyên tố lẻ là tổng hai bình phương nguyên khi và chỉ khi nó đồng dư $1$ theo môđun $4$. Nguồn trình bày định lý và các bổ đề về tích hai tổng bình phương.

## Tự kiểm tra

Giải $6x\equiv9\pmod{15}$: chia cho $3$ được $2x\equiv3\pmod5$, suy ra $x\equiv4\pmod5$. Ba lớp nghiệm theo môđun $15$ là $4,9,14$.

## Nguồn tài liệu

- `Lý Thuyết số-C2.1.pdf` · 42 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
