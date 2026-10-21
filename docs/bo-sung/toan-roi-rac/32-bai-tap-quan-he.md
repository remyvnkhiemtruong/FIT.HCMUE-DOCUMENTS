---
title: "Bài tập quan hệ"
---

# Bài tập quan hệ

## Kiểm tra quan hệ hữu hạn

Với quan hệ $R$ trên $S$, lần lượt kiểm tra phản xạ, đối xứng, phản đối xứng và bắc cầu. Để bác bỏ một tính chất, ghi một cặp hoặc bộ ba cụ thể; để chứng minh, lập luận cho mọi phần tử.

## Bài tập tuyển chọn từ nguồn

1. Xét các tính chất của $R=\{(1,1),(1,2),(2,1),(2,2),(3,3),(4,4)\}$ trên $\{1,2,3,4\}$.
2. Trên $S=\{0,1,2\}$, liệt kê và lập ma trận cho $xRy\Leftrightarrow0\le y-x\le1$ và $xRy\Leftrightarrow x^2+y^2\le2$.
3. Trên $\mathbb R$, xét quan hệ $xRy\Leftrightarrow x\ne y$.
4. Trên $S=\{-5,-4,-3,-2,-1,0,1,2\}$, chứng minh $xRy\Leftrightarrow x^2+5x=y^2+5y$ là tương đương và tìm các lớp.
5. Với $E=\{1,2,3\}$, $A=\{1,2\}$, xét $XRY\Leftrightarrow X\cap A=Y\cap A$ trên $\mathcal P(E)$.

## Hướng dẫn bài 4

Đặt $f(x)=x^2+5x$. Quan hệ “có cùng ảnh qua $f$” luôn là tương đương. Từ $f(x)=f(y)$ suy ra $(x-y)(x+y+5)=0$, nên cùng lớp khi $x=y$ hoặc $y=-5-x$, sau đó giới hạn lại trong tập $S$.

## Phương trình môđun

```text
msolve(2*x+3=5,7);
msolve({2*x+3*y=5,x-2*y=4},11);
```

Nguồn cho nghiệm của hệ thứ hai là $x=0,y=9$ trong $\mathbb Z_{11}$. Thế lại hai phương trình để kiểm tra theo môđun, không theo đẳng thức số nguyên thông thường.

## Nguồn tài liệu

- `BT_Chuong 6_Quan he.pdf` · 4 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
