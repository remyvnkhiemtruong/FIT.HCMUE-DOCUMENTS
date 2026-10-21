---
title: "Phép toán và tiên đề nhóm"
---

# Phép toán và tiên đề nhóm

## Phép toán và tiên đề nhóm

Một nhóm có phép toán đóng, kết hợp, phần tử đơn vị và nghịch đảo của từng phần tử. Tính giao hoán là điều kiện thêm để nhóm là abel.

## Bài tập chương 1

1. Xét tính chất nhóm của: các số thực dương dưới cộng hoặc nhân; số nguyên chẵn dưới cộng; số nguyên lẻ dưới cộng; số hữu tỉ dưới nhân; số phức môđun $1$ dưới nhân; ma trận tam giác trên dưới cộng. Lưu ý “số hữu tỉ” gồm cả $0$ nếu không ghi loại bỏ.
2. Trên $G=\{0,1,\ldots,11\}$, đặt $x*y=x+y-12\lfloor(x+y)/12\rfloor$. Chứng minh đây là phép toán và tạo thành nhóm; tìm nghịch đảo của $1,3,5,7,0,6$.
3. Xét các phép toán:
   - $x*y=x^{\ln y}$ trên $\mathbb R_{>0}\setminus\{1\}$.
   - $x*y=\ln(e^x+e^y-1)$ trên $\mathbb R_{>0}$.
   - $(x,y)*(z,t)=(x+yz,yt)$ trên $\mathbb R\times\mathbb R^*$.
   - $(x,y)*(z,t)=(xz-yt,xt+yz)$ trên $\mathbb R\times\mathbb R^*$.
4. Với $a\in G$ cố định, đặt $x*y=xay$ trên nhóm $(G,\cdot)$. Chứng minh phép toán mới tạo thành nhóm.
5. Đặt $R_\alpha=\begin{pmatrix}\cos\alpha&-\sin\alpha\\\sin\alpha&\cos\alpha\end{pmatrix}$. Chứng minh $R_\alpha R_\beta=R_{\alpha+\beta}$ và các ma trận này tạo thành nhóm.
6. Chứng minh luật giản ước trong nhóm và $a^2=a\Rightarrow a=e$.
7. Chứng minh phép đổi chỗ tự nghịch đảo; phân tích một chu trình thành tích các phép đổi chỗ; tìm nghịch đảo và lũy thừa của chu trình.
8. Trên $S_8$, cho các bảng ảnh $\sigma=(2,3,6,4,5,7,1,8)$, $\gamma=(1,3,2,4,5,7,8,6)$. Viết $\sigma\gamma$, $\gamma\sigma$, $\sigma^{-1}\gamma$, $\gamma^2\sigma$ thành bảng ảnh và các chu trình rời nhau.

## Cách kiểm tra một phép toán

Bắt đầu từ tính đóng. Một phản ví dụ ở bước này đủ để kết luận không phải nhóm, không cần kiểm tra tiếp tính kết hợp. Nếu chưa tìm được phản ví dụ, giải phương trình $x*e=x=e*x$ để tìm ứng viên đơn vị, rồi kiểm tra nó thật sự thuộc tập.

Khi nhân hoán vị trong bài 8, quy ước áp dụng thừa số bên phải trước và ghi rõ quy ước trong lời giải.

## Nguồn tài liệu

- `GroupTheory_Exercises_Chapter1.pdf` · 2 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-nhom/).
