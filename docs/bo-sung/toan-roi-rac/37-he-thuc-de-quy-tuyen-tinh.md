---
title: "Hệ thức đệ quy tuyến tính"
---

# Hệ thức đệ quy tuyến tính

## Hệ thức và điều kiện đầu

Hệ thức đệ quy mô tả số hạng qua các số hạng trước. Để xác định một dãy duy nhất, cần đủ điều kiện đầu và miền chỉ số hợp lệ.

Một hệ thức tuyến tính cấp $k$ có hệ số hằng có dạng $a_n=c_1a_{n-1}+\cdots+c_ka_{n-k}+F(n)$, với $c_k\ne0$.

## Nghiệm thuần nhất

Xét phương trình đặc trưng $r^k-c_1r^{k-1}-\cdots-c_k=0$. Mỗi nghiệm $r$ bội $m$ đóng góp $(A_0+A_1n+\cdots+A_{m-1}n^{m-1})r^n$.

Ví dụ, $a_n-4a_{n-1}+4a_{n-2}=0$ có nghiệm $(A+Bn)2^n$, không phải tổng hai bản sao hằng số nhân $2^n$.

## Nghiệm không thuần nhất

Nghiệm tổng quát bằng nghiệm thuần nhất cộng một nghiệm riêng. Nếu $F(n)=P_d(n)s^n$ với $s\ne0$, thử $n^tQ_d(n)s^n$, trong đó $t$ là bội của $s$ trong phương trình đặc trưng. Thế vào hệ thức để tìm các hệ số của $Q_d$.

## Mô hình chuỗi

Với chuỗi không có hai số $0$ liên tiếp, phân loại theo đoạn cuối hợp lệ. Không bỏ qua các chuỗi ngắn khi đặt điều kiện đầu. Nếu đếm chuỗi **có** mẫu cấm, thường lấy tổng số chuỗi trừ số chuỗi tránh mẫu.

## Hệ hai dãy

Viết $X_{n+1}=AX_n$. Có thể khử một dãy để nhận hệ thức cấp cao hơn, hoặc chéo hóa $A$ khi đủ vectơ riêng. Luôn kiểm tra công thức với các điều kiện đầu ban đầu, không chỉ với hệ thức đã khử.

## Ví dụ từ phần thực hành liên quan

$a_{n+1}=a_n-b_n$, $b_{n+1}=2a_n+4b_n$, $a_0=2,b_0=1$ có nghiệm $a_n=5\cdot2^n-3\cdot3^n$, $b_n=-5\cdot2^n+6\cdot3^n$. Thế từng biểu thức vào hệ để kiểm chứng.

## Nguồn tài liệu

- `Chuong 4_He thuc de quy.pdf` · 33 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
