---
title: "Bài tập nguyên lý bù trừ"
---

# Bài tập nguyên lý bù trừ

## Nghiệm có chặn trên

Nguồn yêu cầu viết hàm đếm và liệt kê nghiệm không âm của $x_1+\cdots+x_n=k$ với $x_i\le b_i$. Dùng bù trừ trên các vi phạm $x_i\ge b_i+1$ hoặc dùng quy hoạch động.

Ví dụ mã bổ sung:

```python
def bounded_solutions(total, bounds):
    if total < 0 or any(b < 0 for b in bounds):
        return 0
    ways = [0] * (total + 1)
    ways[0] = 1
    for upper in bounds:
        next_ways = [0] * (total + 1)
        for s, count in enumerate(ways):
            for value in range(min(upper, total-s) + 1):
                next_ways[s+value] += count
        ways = next_ways
    return ways[total]
```

## Các bài thực hành khác trong nguồn

- Đếm và liệt kê toàn ánh từ $\{1,\ldots,n\}$ đến $\{1,\ldots,m\}$.
- Đếm và liệt kê xáo trộn của $\{1,\ldots,n\}$.
- Tìm đa thức quân xe của bàn cờ có ô cấm và liệt kê các cách đặt xe không ăn nhau.

## Bài tập tuyển chọn

Tung đồng xu $8$ lần, đếm chuỗi có ít nhất hai lần ngửa. Đếm các số từ $1$ đến $10000$ là chẵn hoặc chia hết cho $7$. Đếm số toàn ánh từ một tập $10$ phần tử đến một tập $7$ phần tử.

Với bài đồng xu công bằng, số chuỗi đạt là $2^8-\binom80-\binom81=247$, xác suất $247/256$. Giả thiết công bằng cần có trước khi chuyển số chuỗi sang xác suất.

## Nguồn tài liệu

- `_BT_Chuong 6. Nguyen ly bu tru.pdf` · 4 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
