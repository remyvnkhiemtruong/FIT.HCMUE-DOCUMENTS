---
title: "Bài tập vành đồng dư và hàm số học"
---

# Bài tập vành đồng dư và hàm số học

Nguồn gồm bài lý thuyết về đồng dư, hàm số học, cấp và nghiệm nguyên thủy, cùng phần thực hành Python. Dưới đây là các dạng luyện tập và cách tổ chức lời giải.

## Đồng dư và nghịch đảo

Tìm các số nguyên dương $m$ thỏa lần lượt $27\equiv5\pmod m$, $103\equiv6\pmod m$, $1000\equiv1\pmod m$, $1331\equiv0\pmod m$.

Chuyển mỗi điều kiện về $m\mid(a-b)$, rồi liệt kê các ước dương. Nếu đề yêu cầu môđun lớn hơn $1$, phải loại $m=1$.

Tìm nghịch đảo của $a$ trong $\mathbb Z_n$ bằng Euclid mở rộng; chỉ có nghịch đảo khi $\gcd(a,n)=1$.

## Hàm số học

Tính $\varphi(n),\sigma(n),\tau(n)$ cho $n=7,10,1000,13013$. Phân tích nguyên tố trước; không áp dụng tính nhân cho hai thừa số chưa nguyên tố cùng nhau.

Chứng minh công thức tổng theo ước bằng cách liệt kê các ước dưới dạng tích lũy thừa nguyên tố. Khi gặp $\sum_{d\mid n}$, biến $d$ chỉ chạy qua các ước dương của $n$.

## Cấp và thặng dư

Luyện tìm $\operatorname{ord}_n(a)$, kiểm tra nghiệm nguyên thủy, tính ký hiệu Legendre và dùng luật thuận nghịch bình phương. Luôn kiểm tra $\gcd(a,n)=1$ trước khi nói đến cấp của $a$ theo môđun $n$.

## Thực hành Python

```python
from math import gcd

def inverse_mod(a, n):
    if n <= 1 or gcd(a, n) != 1:
        raise ValueError("Không tồn tại nghịch đảo")
    return pow(a, -1, n)
```

Đoạn kiểm tra trên là ví dụ bổ sung. Quy định tên tệp và mã sinh viên trong PDF là quy định nộp bài của lớp nguồn, không phải yêu cầu nộp bài trên website này.

## Nguồn tài liệu

- `Baitapchuong2_(capnhat16052020).pdf.pdf` · 16 trang.
- Đầu tài liệu ghi giảng viên lý thuyết Nguyễn Văn Thìn và hướng dẫn thực hành Phan Thành Nhân.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
