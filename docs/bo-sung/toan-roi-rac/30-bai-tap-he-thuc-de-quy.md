---
title: "Bài tập hệ thức đệ quy"
---

# Bài tập hệ thức đệ quy

## Lập hệ thức đệ quy

Trong bài cầu thang của nguồn, mỗi bước đi được $1,2$ hoặc $3$ bậc. Đặt $x_0=1$, $x_n=0$ khi $n<0$; phân loại theo bước cuối được:

$$x_n=x_{n-1}+x_{n-2}+x_{n-3}\quad(n\ge1).$$

Quy ước trạng thái rỗng giúp ghi thống nhất điều kiện đầu, không có nghĩa tồn tại một bước đi có độ dài $0$.

## Bài tập tuyển chọn từ nguồn

- Lập truy hồi cho số chuỗi bit độ dài $n$ không có hai số $0$ liên tiếp, hoặc không có ba số $0$ liên tiếp; tính tại $n=6$.
- Lập truy hồi cho chuỗi tam phân không có hai chữ số $0$ liên tiếp, rồi đếm phần bù.
- Giải $a_0=1,a_1=0,a_{n+1}=5a_n-6a_{n-1}$.
- Giải $a_0=1,a_1=2,a_{n+2}=5a_{n+1}-6a_n+4$.
- Cho $a_0=1,b_0=2$, $a_{n+1}=3a_n+2b_n$, $b_{n+1}=a_n+2b_n$. Tìm công thức của hai dãy.

## Hướng dẫn

Với chuỗi bit không có $00$, tách chuỗi kết thúc bằng $1$ và bằng $10$, suy ra $u_n=u_{n-1}+u_{n-2}$ với $u_0=1,u_1=2$. Do đó $u_6=21$.

Ở truy hồi có vế phải $4$, phương trình đặc trưng là $(r-2)(r-3)=0$. Một nghiệm riêng hằng là $2$. Suy ra $a_n=A2^n+B3^n+2$, dùng hai điều kiện đầu để tìm $A,B$.

## Đối chiếu bằng Maple

```text
rsolve({a(n+2)=5*a(n+1)-6*a(n)+4,a(0)=1,a(1)=2},a(n));
```

Khi nhập truy hồi, bảo đảm chỉ số bắt đầu đủ để mọi số hạng xuất hiện đã được định nghĩa.

## Nguồn tài liệu

- `BT_Chuong 4_He thuc de quy.pdf` · 3 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
