---
title: "Nguyên lý bù trừ và đa thức quân xe"
---

# Nguyên lý bù trừ và đa thức quân xe

## Nguyên lý bù trừ

Với các tập hữu hạn $A_1,\ldots,A_n$:

$$\left|\bigcup_i A_i\right|=\sum_{\varnothing\ne S\subseteq\{1,\ldots,n\}}(-1)^{|S|+1}\left|\bigcap_{i\in S}A_i\right|.$$

Một phần tử nằm trong $k$ tập được đếm với tổng hệ số $\binom k1-\binom k2+\cdots+(-1)^{k+1}\binom kk=1$.

## Đếm phần bù và toàn ánh

Khi yêu cầu “không vi phạm điều kiện nào”, đặt $A_i$ là tập vi phạm điều kiện thứ $i$, rồi lấy tổng số trừ hợp các tập vi phạm.

Số toàn ánh từ tập $m$ phần tử đến tập $n$ phần tử có nhãn là:

$$\sum_{j=0}^{n}(-1)^j\binom nj(n-j)^m.$$

Xáo trộn là hoán vị không có điểm cố định; số xáo trộn của $n$ phần tử bằng $n!\sum_{j=0}^{n}(-1)^j/j!$.

## Đa thức quân xe

Với bàn cờ các ô được chỉ định, gọi $r_k$ là số cách đặt $k$ quân xe không chung dòng hoặc cột. Đa thức quân xe là $R(x)=\sum_k r_kx^k$.

Nếu hai phần bàn cờ không chung dòng và cột, đa thức của hợp là tích. Chọn một ô $c$ cho truy hồi $R_B=R_{B\setminus c}+xR_{B\setminus(\text{dòng và cột của }c)}$.

## Hoán vị tránh ô cấm

Với bàn cờ cấm trong bảng $n\times n$, số hoán vị hợp lệ là:

$$\sum_{k=0}^{n}(-1)^k r_k(n-k)!.$$

Ghi rõ bàn cờ đang biểu diễn ô **cấm** hay ô **được phép**; nhầm hai ý nghĩa này làm đảo bài toán.

## Nguồn tài liệu

- `Chuong 6. Nguyen ly bu tru.pdf` · 37 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
