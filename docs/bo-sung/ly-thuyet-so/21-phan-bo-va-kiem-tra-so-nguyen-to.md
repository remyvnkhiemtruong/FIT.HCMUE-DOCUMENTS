---
title: "Phân bố và kiểm tra số nguyên tố"
---

# Phân bố và kiểm tra số nguyên tố

## Phân bố số nguyên tố

Tài liệu xét mật độ số nguyên tố và định đề Bertrand. Với $n>1$, tồn tại một số nguyên tố $p$ sao cho $n<p<2n$. Phần chứng minh trong nguồn sử dụng đánh giá các thừa số nguyên tố của hệ số nhị thức.

Các lập luận xác suất theo mật độ không phải cách chứng minh một số cụ thể là nguyên tố.

## Số giả nguyên tố và Carmichael

Hợp số $n$ có thể vẫn thỏa $b^{n-1}\equiv1\pmod n$ với $\gcd(b,n)=1$. Khi đó phép thử Fermat cơ sở $b$ không phát hiện được tính hợp số. Số Carmichael vượt qua dạng kiểm tra này với mọi cơ sở nguyên tố cùng nhau với nó; $561=3\cdot11\cdot17$ là ví dụ trong nguồn.

## Phép thử mạnh Miller–Rabin

Xử lý trước $n<2$ không nguyên tố, $2$ và $3$ nguyên tố, các số chẵn lớn hơn $2$ là hợp số. Với $n>3$ lẻ, viết $n-1=2^st$, $t$ lẻ. Với cơ sở $2\le b\le n-2$, tính $x=b^t\bmod n$. Cơ sở này vượt qua kiểm tra nếu $x=1$, $x=n-1$, hoặc một trong $s-1$ lần bình phương tiếp theo cho $n-1$.

Nếu không đạt, $b$ là chứng cứ hợp số. Nếu đạt, mới chỉ kết luận “chưa phát hiện hợp số với cơ sở này”. Số $2047=23\cdot89$ trong nguồn minh họa giới hạn của một cơ sở.

## Sàng Eratosthenes

```python
def sieve(limit):
    prime = [True] * (max(limit, 1) + 1)
    prime[0] = prime[1] = False
    p = 2
    while p * p <= limit:
        if prime[p]:
            for k in range(p * p, limit + 1, p):
                prime[k] = False
        p += 1
    return [k for k in range(2, limit + 1) if prime[k]]
```

Bắt đầu gạch từ $p^2$ vì các bội nhỏ hơn đã có thừa số nguyên tố nhỏ hơn $p$. Sàng dùng để tìm nhiều số nguyên tố trong một khoảng; không thay thế trực tiếp một phép thử trên số có hàng trăm chữ số.

## Nguồn tài liệu

- `Lý Thuyết số-C4.pdf` · 30 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
