---
title: "Hàm sinh thường và hàm sinh mũ"
---

# Hàm sinh thường và hàm sinh mũ

## Hàm sinh thường

Với dãy $(a_n)_{n\ge0}$, đặt $A(x)=\sum_{n\ge0}a_nx^n$. Có thể làm việc với chuỗi hình thức: so sánh hệ số mà chưa cần xét hội tụ giải tích.

Tích $A(x)B(x)$ có hệ số $x^n$ bằng $\sum_{k=0}^{n}a_kb_{n-k}$. Đây là phép chập, phù hợp ghép hai lựa chọn có tổng kích thước bằng $n$.

## Ràng buộc và phân hoạch

Để đếm nghiệm $x_i\in S_i$ của tổng bằng $r$, lấy hệ số $x^r$ trong $\prod_i\sum_{j\in S_i}x^j$.

Phân hoạch số nguyên không kể thứ tự có hàm sinh $\prod_{k\ge1}(1-x^k)^{-1}$. Nếu chỉ cho các phần phân biệt, thay bằng $\prod_{k\ge1}(1+x^k)$. Không nhầm phân hoạch với cách phân phối vào các hộp có nhãn.

## Hàm sinh mũ

$E(x)=\sum_{n\ge0}a_nx^n/n!$ phù hợp nhiều bài có đối tượng phân biệt. Tích hai hàm sinh mũ cho hệ số chuẩn hóa $\sum_{k=0}^{n}\binom nk a_kb_{n-k}$.

## Đạo hàm và phương pháp tổng

Từ $A'(x)=\sum_{n\ge1}na_nx^{n-1}$ suy ra $xA'(x)$ biểu diễn dãy $na_n$. Các phép dịch chỉ số phải trừ chính xác các số hạng đầu.

## Giải truy hồi

Với $a_{n+2}=a_{n+1}+a_n$, $a_0=0,a_1=1$, nhân theo $x^{n+2}$ rồi cộng cho:

$$A(x)=\frac{x}{1-x-x^2}.$$

Với truy hồi có hệ số $n+1$, thử hàm sinh mũ để triệt giai thừa. Sau khi tìm biểu thức, lấy lại hệ số và kiểm tra điều kiện đầu; không chỉ dừng ở phương trình hàm sinh.

## Nguồn tài liệu

- `Chuong 5. Ham sinh.pdf` · 44 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
