---
title: "Tập hợp và ánh xạ"
---

# Tập hợp và ánh xạ

## Phép toán tập hợp

$A\cup B$ chứa phần tử thuộc ít nhất một tập; $A\cap B$ chứa phần tử thuộc cả hai; $A\setminus B$ chứa phần tử thuộc $A$ nhưng không thuộc $B$. Phần bù phải được xác định trong một tập vũ trụ.

Luật De Morgan: $(A\cup B)^c=A^c\cap B^c$, $(A\cap B)^c=A^c\cup B^c$. Khi chứng minh đẳng thức tập hợp, chứng minh hai chiều bằng một phần tử tùy ý.

## Tập lũy thừa và tích Descartes

$\mathcal P(A)$ là tập các tập con của $A$. Nếu $|A|=n$, có $2^n$ tập con. Tích $A\times B$ gồm các cặp có thứ tự $(a,b)$; nhìn chung không bằng $B\times A$.

## Ánh xạ, ảnh và ảnh ngược

Với $f:X\to Y$, mỗi phần tử của $X$ có đúng một ảnh trong $Y$. Với $A\subseteq X$, $B\subseteq Y$:

$$f(A)=\{f(x):x\in A\},\qquad f^{-1}(B)=\{x\in X:f(x)\in B\}.$$

Ký hiệu ảnh ngược của một tập có nghĩa ngay cả khi $f$ không có hàm nghịch đảo.

## Đơn ánh, toàn ánh, song ánh

Đơn ánh: $f(x)=f(y)\Rightarrow x=y$. Toàn ánh: mỗi $y$ trong miền đích có một tiền ảnh. Song ánh thỏa cả hai, khi đó có ánh xạ nghịch đảo.

Để kiểm tra toàn ánh, giải $f(x)=y$ và bảo đảm nghiệm $x$ nằm trong miền xác định với **mọi** $y$ thuộc miền đích. Đổi miền đích có thể thay đổi kết luận toàn ánh.

## Hợp thành và nghịch đảo

Với $f:X\to Y$, $g:Y\to Z$, $(g\circ f)(x)=g(f(x))$. Nếu cả hai song ánh:

$$(g\circ f)^{-1}=f^{-1}\circ g^{-1}.$$

Thứ tự đảo lại khi lấy nghịch đảo. Kiểm tra đẳng thức này bằng cách áp dụng lần lượt lên một phần tử.

## Nguồn tài liệu

- `Chuong 2_Tap hop va anh xa.pdf` · 35 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
