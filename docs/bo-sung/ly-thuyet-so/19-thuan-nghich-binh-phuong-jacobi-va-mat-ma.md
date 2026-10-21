---
title: "Thuận nghịch bình phương, Jacobi và mật mã"
---

# Thuận nghịch bình phương, Jacobi và mật mã

## Luật thuận nghịch bình phương

Với hai số nguyên tố lẻ phân biệt $p,q$:

$$\left(\frac pq\right)\left(\frac qp\right)=(-1)^{(p-1)(q-1)/4}.$$

Hai công thức bổ sung là $\left(\frac{-1}{p}\right)=(-1)^{(p-1)/2}$ và $\left(\frac2p\right)=(-1)^{(p^2-1)/8}$. Rút gọn tử số theo môđun mẫu trước khi đổi vai tử và mẫu.

## Ký hiệu Jacobi

Với $n>1$ lẻ, $n=\prod p_i^{\alpha_i}$:

$$\left(\frac an\right)=\prod_i\left(\frac a{p_i}\right)^{\alpha_i}.$$

Nếu Jacobi bằng $-1$ thì $a$ không là bình phương khả nghịch theo môđun $n$; chiều ngược lại không đúng. Ví dụ bổ sung: $\left(\frac2{15}\right)=1$ nhưng $x^2\equiv2\pmod{15}$ vô nghiệm.

## Mô hình RSA trong bài học

Chọn hai số nguyên tố phân biệt $p,q$, đặt $n=pq$, chọn $e$ nguyên tố cùng nhau với $\varphi(n)$, tìm $d$ sao cho $ed\equiv1\pmod{\varphi(n)}$. Mã hóa $c\equiv m^e\pmod n$, giải mã $m\equiv c^d\pmod n$.

Ví dụ tính tay bổ sung: $p=5,q=11,n=55$, $e=3,d=27$; với $m=2$, bản mã là $8$. Các tham số nhỏ chỉ phục vụ bài tập. Mô hình số học này chưa bao gồm cách mã hóa dữ liệu hay đệm bản tin của một hệ mật triển khai thực tế.

## Mô hình ElGamal

Trong nhóm nhân theo môđun số nguyên tố $p$, đặt $y=g^x$. Dùng số ngẫu nhiên bí mật $k$ cho từng lần mã hóa:

$$c_1=g^k,\qquad c_2=my^k\pmod p.$$

Giải mã bằng $m=c_2(c_1^x)^{-1}\pmod p$. Không dùng lại $k$ cho nhiều bản tin. Bộ nguồn trình bày các bảng tính ví dụ của cả RSA và ElGamal.

## Nguồn tài liệu

- `Lý Thuyết số-C2.4.pdf` · 27 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
