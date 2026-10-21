---
title: "Không gian vectơ và đổi cơ sở"
---

# Không gian vectơ và đổi cơ sở

Không gian vectơ được nghiên cứu qua tổ hợp tuyến tính, tập sinh, cơ sở và số chiều. Các bài tìm cơ sở thường quy về khử Gauss.

## Không gian vectơ và không gian con

Không gian vectơ trên $\mathbb R$ có phép cộng và phép nhân vô hướng thỏa các tiên đề về kết hợp, giao hoán, phần tử không, đối và phân phối. Không gian đa thức bậc không quá $n$ cũng là một ví dụ, không chỉ có $\mathbb R^n$.

Tập con khác rỗng $W\subseteq V$ là không gian con nếu đóng dưới tổ hợp tuyến tính:

$$u,v\in W,\ \alpha,\beta\in\mathbb R\Longrightarrow \alpha u+\beta v\in W.$$

Một tập không chứa vectơ không không thể là không gian con.

## Tổ hợp tuyến tính và độc lập tuyến tính

Vectơ $v$ thuộc không gian sinh bởi $v_1,\ldots,v_k$ khi tồn tại các hệ số $c_i$ sao cho $v=\sum_i c_iv_i$. Hệ độc lập tuyến tính nếu $\sum_i c_iv_i=0$ chỉ có nghiệm $c_1=\cdots=c_k=0$.

Trong $\mathbb R^m$, xếp các vectơ làm cột của $A$. Hệ độc lập khi $\operatorname{rank}(A)=k$. Nếu chọn các cột cơ sở sau khử Gauss, lấy những cột có chỉ số tương ứng trong **ma trận ban đầu**.

## Cơ sở và số chiều

Cơ sở vừa độc lập tuyến tính vừa sinh toàn bộ không gian. Mọi cơ sở của cùng không gian hữu hạn chiều có số phần tử bằng nhau; số đó là $\dim V$.

Trong không gian $n$ chiều, một hệ gồm $n$ vectơ là cơ sở nếu độc lập tuyến tính, tương đương với việc là một hệ sinh. Hệ độc lập có thể mở rộng thành cơ sở; hệ sinh có thể rút gọn thành cơ sở.

## Tổng, giao và không gian nghiệm

$$\dim(U+W)=\dim U+\dim W-\dim(U\cap W).$$

Để tìm $U\cap W$, biểu diễn một vectơ theo các cơ sở của cả hai không gian rồi giải hệ đẳng thức. Với hệ thuần nhất $Ax=0$, không gian nghiệm có số chiều $n-\operatorname{rank}(A)$; cho lần lượt các ẩn tự do bằng $1$ và các ẩn tự do còn lại bằng $0$ để lập một cơ sở.

## Tọa độ và đổi cơ sở

Với cơ sở có thứ tự $B=(b_1,\ldots,b_n)$, tọa độ $[v]_B$ là cột các hệ số trong $v=\sum c_ib_i$. Đặt $P=([c_1]_B\ \cdots\ [c_n]_B)$ với $C=(c_1,\ldots,c_n)$. Khi đó:

$$[v]_B=P[v]_C,\qquad [v]_C=P^{-1}[v]_B.$$

Ghi rõ phương trình tọa độ trước khi dùng tên “ma trận chuyển cơ sở”, vì các tài liệu có thể đặt tên chiều chuyển khác nhau.

## Nguồn tài liệu

- `Chuong 3_Khong gian vecto.pdf` · 100 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
