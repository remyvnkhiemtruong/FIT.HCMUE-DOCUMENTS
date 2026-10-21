---
title: "Định lý Euler và hàm phi"
---

# Định lý Euler và hàm phi

## Hàm phi Euler

$\varphi(n)$ đếm các số trong $1,\ldots,n$ nguyên tố cùng nhau với $n$. Với số nguyên tố $p$ và $k\ge1$:

$$\varphi(p^k)=p^k-p^{k-1}.$$

Nếu $\gcd(m,n)=1$, $\varphi(mn)=\varphi(m)\varphi(n)$. Vì vậy:

$$\varphi(n)=n\prod_{p\mid n}\left(1-\frac1p\right).$$

Tích chạy qua các **số nguyên tố phân biệt** chia $n$.

## Hệ thặng dư thu gọn và định lý Euler

Một hệ thặng dư thu gọn chứa một đại diện cho mỗi lớp khả nghịch trong $\mathbb Z_n$. Nhân các đại diện với $a$ nguyên tố cùng nhau với $n$ chỉ hoán vị các lớp này. Lấy tích rồi khử phần tử khả nghịch cho:

$$a^{\varphi(n)}\equiv1\pmod n\quad\text{khi }\gcd(a,n)=1.$$

Ví dụ: $\varphi(9)=6$, nên $2^6\equiv1\pmod9$.

## Hàm nhân tính

Hàm số học $f$ được gọi là nhân tính nếu $f(1)=1$ và $f(mn)=f(m)f(n)$ khi $\gcd(m,n)=1$. Không đồng nhất tính nhân với tính nhân hoàn toàn, vốn không cần điều kiện nguyên tố cùng nhau.

Biết giá trị trên lũy thừa nguyên tố sẽ xác định một hàm nhân tính trên mọi số nguyên dương. Nguồn còn trình bày các tổng theo ước và cách bảo toàn tính nhân.

## Đồng dư Wolstenholme

Phần đầu tài liệu tiếp tục các định lý số học nâng cao. Với số nguyên tố $p>3$, một dạng quen dùng là:

$$\sum_{k=1}^{p-1}k^{-1}\equiv0\pmod{p^2}.$$

Ở đây $k^{-1}$ là nghịch đảo theo môđun $p^2$, không phải phép tính số thực gần đúng. Phải nêu cách hiểu này khi làm bài với tổng phân số trong đồng dư.

## Nguồn tài liệu

- `Lý Thuyết số-C2.2.pdf` · 27 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
