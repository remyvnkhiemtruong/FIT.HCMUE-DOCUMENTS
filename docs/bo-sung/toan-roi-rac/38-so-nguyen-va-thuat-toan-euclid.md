---
title: "Số nguyên và thuật toán Euclid"
---

# Số nguyên và thuật toán Euclid

## Biểu diễn số nguyên và phép chia

Với $b>0$, phép chia Euclid viết $a=qb+r$, $0\le r<b$. Lặp phép chia cho cơ số giúp tìm biểu diễn số; đọc số dư theo chiều ngược với thứ tự thu được.

## Đồng dư

$a\equiv b\pmod m$ khi $m\mid(a-b)$, với $m>0$. Có thể cộng, trừ và nhân các đồng dư cùng môđun. Chỉ được khử một thừa số khi thừa số đó khả nghịch, hoặc phải điều chỉnh môđun theo ước chung lớn nhất.

## Thuật toán Euclid và Bézout

Thực hiện liên tiếp $a=qb+r$, thay cặp $(a,b)$ bằng $(b,r)$ cho đến dư $0$. Số dư khác $0$ cuối cùng là ước chung lớn nhất. Thế ngược tìm $u,v$ sao cho $ua+vb=\gcd(a,b)$.

Hai số nguyên tố cùng nhau khi ước chung lớn nhất bằng $1$, không bắt buộc mỗi số đều nguyên tố. Đẳng thức Bézout cho cách tìm nghịch đảo môđun.

## Số nguyên tố và phân tích

Mỗi hợp số $n>1$ có một ước nguyên tố không vượt $\sqrt n$. Định lý căn bản của số học bảo đảm phân tích nguyên tố duy nhất. Với các số mũ nguyên tố, lấy min để tính UCLN, max để tính BCNN.

Nếu $n=\prod_i p_i^{\alpha_i}$ thì số ước dương là $\prod_i(\alpha_i+1)$: mỗi ước tương ứng duy nhất với một cách chọn số mũ.

## Bài tự kiểm tra bổ sung

Tìm nghịch đảo của $7$ theo môđun $26$: $26=3\cdot7+5$, $7=5+2$, $5=2\cdot2+1$. Thế ngược cho $1=3\cdot26-11\cdot7$, nên nghịch đảo là $-11\equiv15\pmod{26}$.

Phần số nguyên của bộ toán rời rạc là nền tảng; bộ lý thuyết số trong kho đi tiếp đến hàm số học, thặng dư và kiểm tra nguyên tố.

## Nguồn tài liệu

- `Chuong 5_So nguyen.pdf` · 21 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
