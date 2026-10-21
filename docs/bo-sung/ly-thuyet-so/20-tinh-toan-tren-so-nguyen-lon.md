---
title: "Tính toán trên số nguyên lớn"
---

# Tính toán trên số nguyên lớn

## Độ dài dữ liệu và độ phức tạp

Số nguyên $n>0$ cần $\lfloor\log_2n\rfloor+1$ bit. Phân tích thuật toán trên số nguyên lớn phải tính chi phí theo độ dài bit, không coi mọi phép nhân đều có chi phí hằng số.

Định nghĩa $f(k)=O(g(k))$ nghĩa là tồn tại $C,k_0$ sao cho $|f(k)|\le C|g(k)|$ với mọi $k\ge k_0$. Thuật toán đa thức có số phép tính bit bị chặn bởi một đa thức theo độ dài đầu vào.

## Bình phương và nhân

Để tính $a^e\bmod m$, đọc các bit của $e$, bình phương cơ số và nhân khi bit bằng $1$. Số bước lặp là $O(\log e)$; đây chưa phải toàn bộ chi phí bit của các phép nhân.

```python
def power_mod(a, e, m):
    if e < 0 or m <= 0:
        raise ValueError("Cần e >= 0 và m > 0")
    result = 1 % m
    a %= m
    while e:
        if e & 1:
            result = result * a % m
        a = a * a % m
        e //= 2
    return result
```

## Nhân Karatsuba

Tách $x=x_1B^k+x_0$, $y=y_1B^k+y_0$. Tính $z_2=x_1y_1$, $z_0=x_0y_0$, $z_1=(x_1+x_0)(y_1+y_0)-z_2-z_0$, rồi:

$$xy=z_2B^{2k}+z_1B^k+z_0.$$

Thay bốn phép nhân nửa độ dài bằng ba phép nhân cho truy hồi $T(N)=3T(N/2)+O(N)$, tức $T(N)=O(N^{\log_2 3})$ trong mô hình chia đôi cân bằng.

## Luyện tập

Tính $37^{27}\bmod101$ theo bảng bit của $27=(11011)_2$ như bài nguồn. Giữ số dư sau mỗi lần bình phương và nhân; dùng `pow(37,27,101)` để đối chiếu. Đây là ví dụ kiểm tra kết quả, không thay thế bảng lập luận.

## Nguồn tài liệu

- `Lý Thuyết số-C3.pdf` · 20 trang.
- Metadata PDF ghi tác giả Nguyen Thin; chưa xác nhận chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
