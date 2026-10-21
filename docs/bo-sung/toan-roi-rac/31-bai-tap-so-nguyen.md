---
title: "Bài tập số nguyên"
---

# Bài tập số nguyên

## Thương, dư và đổi cơ số

Nguồn dùng các lệnh Maple sau:

```text
iquo(234,5);
irem(234,5);
convert(2324,binary);
convert(2324,octal);
convert(4534,hex);
```

Hai lệnh đầu cho $46$ và $4$. Với dạng danh sách `convert(n,base,b)`, nguồn lưu các chữ số theo thứ tự từ hàng thấp đến hàng cao; cần đảo thứ tự trước khi đọc như cách viết số thông thường.

## Ước chung và đẳng thức Bézout

```text
igcd(24,12,18);
ilcm(24,12,18);
igcdex(712,546,'s','t');
```

Ví dụ trong nguồn cho $\gcd(712,546)=2$ với $s=125,t=-163$. Thế lại: $712\cdot125+546\cdot(-163)=2$.

## Số nguyên tố

Các lệnh `isprime`, `ithprime` và phân tích thừa số giúp đối chiếu bài làm. Khi chứng minh tính nguyên tố bằng chia thử, chỉ cần xét các số nguyên tố không vượt $\sqrt n$, nhưng phải kiểm tra hết phạm vi đó.

## Bài luyện

1. Thực hiện thuật toán Euclid bằng tay cho $712,546$, rồi thế ngược để tìm $s,t$.
2. Viết lại số $2324$ theo cơ số $2$ và $8$, sau đó đổi ngược để kiểm tra.
3. So sánh “nguyên tố cùng nhau” với “cả hai đều nguyên tố” bằng ví dụ $8,15$.

Không lấy kết quả thập phân gần đúng làm bằng chứng cho một phép chia hết.

## Nguồn tài liệu

- `BT_Chuong 5_So nguyen.pdf` · 4 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
