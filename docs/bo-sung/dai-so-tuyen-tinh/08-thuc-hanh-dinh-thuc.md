---
title: "Thực hành định thức"
---

# Thực hành định thức

## Lệnh tính định thức

```text
with(LinearAlgebra):
A := Matrix([[1,2],[3,4]]);
Determinant(A);
MatrixInverse(A);
```

Khi tính tay, ghi phép đổi dòng và hệ số đã đưa ra ngoài. Dùng phần mềm để đối chiếu, không bỏ các bước giải thích khi đề yêu cầu chứng minh.

## Bài tập tuyển chọn từ nguồn

1. Chứng minh $\det(A^T)=\det A$ và $\det(AB)=\det A\det B$ với ma trận vuông cùng cấp.
2. Tìm ma trận phụ hợp của một ma trận vuông; đối chiếu $A\operatorname{adj}(A)=\det(A)I$.
3. Tìm nghịch đảo bằng phần bù đại số, sau đó kiểm tra bằng tích ma trận.
4. Giải hệ vuông bằng Cramer trong trường hợp định thức khác $0$.
5. Với ma trận chứa tham số, tìm các giá trị tham số làm định thức bằng $0$, rồi xét riêng hạng của hệ tại các giá trị đó.

## Mẫu kiểm tra Cramer

Với $A=\begin{pmatrix}1&1\\2&-1\end{pmatrix}$, $b=(3,0)^T$ là ví dụ bổ sung, $D=-3$, $D_1=-3$, $D_2=-6$. Vì vậy $x=1$, $y=2$.

Không kết luận hệ vô nghiệm chỉ từ $D=0$: có thể vô nghiệm hoặc có vô số nghiệm tùy cột vế phải.

## Nguồn tài liệu

- `THDSTT_Chuong 2_Dinh thuc.pdf` · 5 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
