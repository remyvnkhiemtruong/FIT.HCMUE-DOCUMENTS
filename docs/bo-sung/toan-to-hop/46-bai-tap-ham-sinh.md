---
title: "Bài tập hàm sinh"
---

# Bài tập hàm sinh

## Dựng hàm sinh từ ràng buộc

Nếu biến đếm một đại lượng có thể nhận các giá trị $b,b+1,\ldots$, dùng $x^b/(1-x)$. Nếu chỉ nhận $0,1,\ldots,u$, dùng $1+x+\cdots+x^u$. Nhân các thừa số tương ứng rồi lấy hệ số cần tìm.

## Ví dụ đọc hệ số trong nguồn

Nguồn cho $1/(1-3x+x^2)=1+3x+8x^2+21x^3+\cdots$; hệ số của $x^7$ là $987$.

```text
f := 1/(1-3*x+x^2):
G := series(f,x,9):
coeff(G,x,7);
```

## Bài tập tuyển chọn từ nguồn

1. Tìm hệ số $x^{16}$ trong $(x^2+x^3+x^4+\cdots)^5$.
2. Dùng hàm sinh đếm số nghiệm $2a+3b+7c=r$ với $a,b,c\ge0$.
3. Đếm cách đổi $50$ đơn vị tiền bằng các loại $1,2,5,10,20$.
4. Dựng hàm sinh mũ cho cách phân $r$ người phân biệt vào $6$ phòng phân biệt.
5. Dùng hàm sinh để giải các hệ thức đệ quy của bộ bài.

## Hướng dẫn bài 1

Biểu thức bằng $x^{10}(1-x)^{-5}$. Hệ số cần tìm là hệ số $x^6$ trong $(1-x)^{-5}$, bằng $\binom{10}{4}=210$.

Ở bài 2, hàm sinh là $1/((1-x^2)(1-x^3)(1-x^7))$. Chỉ lấy hệ số đến bậc cần thiết; không cần khai triển một chuỗi vô hạn bằng số gần đúng.

## Nguồn tài liệu

- `_BT_Chuong 5. Ham sinh.pdf` · 7 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
