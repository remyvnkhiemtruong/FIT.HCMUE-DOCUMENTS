---
title: "Định thức và quy tắc Cramer"
---

# Định thức và quy tắc Cramer

Định thức gắn với ma trận vuông. Nó giúp nhận biết tính khả nghịch và giải một số hệ tuyến tính, nhưng không thay thế việc kiểm tra hạng trong trường hợp suy biến.

## Định thức và phần bù đại số

Với ma trận cấp hai:

$$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc.$$

Gọi $M_{ij}$ là định thức nhận được khi bỏ dòng $i$, cột $j$; phần bù đại số là $C_{ij}=(-1)^{i+j}M_{ij}$. Khai triển theo dòng $i$:

$$\det A=\sum_{j=1}^{n}a_{ij}C_{ij}.$$

Cũng có thể khai triển theo cột. Nên chọn dòng hoặc cột có nhiều số $0$. Quy tắc Sarrus chỉ áp dụng trực tiếp cho định thức cấp ba.

## Tác động của phép biến đổi dòng

| Phép biến đổi | Định thức mới |
| --- | --- |
| Đổi chỗ hai dòng | Đổi dấu |
| Nhân một dòng với $k$ | Nhân với $k$ |
| Cộng bội của dòng khác vào một dòng | Không đổi |

Định thức của ma trận tam giác là tích đường chéo. Ngoài ra, $\det(A^T)=\det A$, $\det(AB)=\det A\det B$, và $\det(kA)=k^n\det A$ với $A$ cấp $n$.

## Phụ hợp và nghịch đảo

Ma trận phụ hợp là $\operatorname{adj}(A)=(C_{ij})^T$. Khi $\det A\ne0$:

$$A^{-1}=\frac{\operatorname{adj}(A)}{\det A}.$$

Cần chuyển vị ma trận các phần bù đại số trước khi chia cho định thức.

## Quy tắc Cramer và tham số

Xét hệ vuông $Ax=b$. Đặt $D=\det A$, $D_i=\det A_i$, trong đó $A_i$ thay cột thứ $i$ của $A$ bằng $b$. Nếu $D\ne0$, nghiệm duy nhất là $x_i=D_i/D$.

Khi $D=0$, không được tiếp tục chia cho $D$. Tách các giá trị tham số làm $D=0$, rồi so sánh hạng của $A$ và $[A\mid b]$ để kết luận vô nghiệm hay vô số nghiệm.

## Ví dụ minh họa bổ sung

Với $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, ta có $\det A=-2$ và $A^{-1}=\begin{pmatrix}-2&1\\3/2&-1/2\end{pmatrix}$. Nhân $AA^{-1}$ để kiểm tra.

## Nguồn tài liệu

- `Chuong 2_Dinh thuc.pdf` · 41 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
