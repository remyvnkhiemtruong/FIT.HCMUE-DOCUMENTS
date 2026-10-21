---
title: "Bài tập tập hợp và ánh xạ"
---

# Bài tập tập hợp và ánh xạ

## Tập hợp trong Maple

```text
A := {1,2,3,5,6,7,8,9}:
B := {2,4,6,8,10}:
A union B;
A intersect B;
A minus B;
A subset B;
member(4,A);
nops(A);
```

Tập hợp không chứa các bản sao trùng nhau. Không dùng vị trí phần tử trong một tập như một thứ tự toán học đã cho.

## Ánh xạ và hợp thành

```text
f := x -> (3*x+2)/(x-5):
f(4);
g := x -> x^2:
f@g;
```

`f@g` là $f\circ g$, áp dụng $g$ trước. Muốn gọi một biểu thức là ánh xạ, cần ghi miền xác định và miền đích phù hợp.

## Bài tập tuyển chọn

1. Với hai tập $A,B$ ở trên, tính hợp, giao và hai hiệu, rồi kiểm tra số phần tử bằng công thức bù trừ.
2. Với $f(x)=(3x+2)/(x-5)$, xác định miền xác định và giải $y=f(x)$ theo $x$ để tìm ứng viên nghịch đảo.
3. So sánh $f\circ g$ và $g\circ f$, kể cả miền xác định của hai hợp thành.
4. Chứng minh một đẳng thức tập hợp bằng cách xét một phần tử tùy ý thuộc hai vế.

## Hướng dẫn bài 2

Từ $y(x-5)=3x+2$ suy ra $x=(5y+2)/(y-3)$ khi $y\ne3$. Vì vậy $f$ là song ánh từ $\mathbb R\setminus\{5\}$ đến $\mathbb R\setminus\{3\}$. Kiểm tra cả hai hợp thành để xác nhận nghịch đảo.

## Nguồn tài liệu

- `BT_Chuong 2_Tap hop va anh xa.pdf` · 6 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
