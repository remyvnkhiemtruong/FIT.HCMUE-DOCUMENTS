---
title: "Trị riêng và chéo hóa ma trận"
---

# Trị riêng và chéo hóa ma trận

Chéo hóa đưa một toán tử về phép nhân theo từng tọa độ trong một cơ sở gồm các vectơ riêng.

## Trị riêng và không gian riêng

Số $\lambda$ là trị riêng của $A$ nếu tồn tại $v\ne0$ sao cho $Av=\lambda v$. Vì thế:

$$\det(A-\lambda I)=0,\qquad E_\lambda=\ker(A-\lambda I).$$

Vectơ không thuộc không gian riêng nhưng **không** được gọi là vectơ riêng. Sau khi tìm nghiệm của đa thức đặc trưng, phải giải hệ thuần nhất cho từng trị riêng.

## Điều kiện chéo hóa

Ma trận cấp $n$ chéo hóa được trên trường đang xét nếu có $n$ vectơ riêng độc lập tuyến tính. Tương đương: đa thức đặc trưng tách hoàn toàn và tổng các số chiều không gian riêng bằng $n$.

Với mỗi trị riêng, bội hình học không vượt bội đại số. Có $n$ trị riêng phân biệt là điều kiện đủ, không phải điều kiện cần.

## Quy trình

1. Tìm đa thức đặc trưng và các trị riêng, kèm bội đại số.
2. Tìm cơ sở từng $E_\lambda$.
3. Kiểm tra tổng số vectơ cơ sở có bằng $n$ không.
4. Xếp chúng thành các cột của $P$ và xếp trị riêng tương ứng vào đường chéo $D$.
5. Kiểm tra $AP=PD$, tương đương $P^{-1}AP=D$.

Nếu chỉ tìm được ít hơn $n$ vectơ riêng độc lập, không được viết $P^{-1}$ từ một ma trận thiếu cột.

## Lũy thừa và hệ truy hồi

$$A=PDP^{-1}\Longrightarrow A^k=PD^kP^{-1}.$$

Với $x_{k+1}=Ax_k$, ta có $x_k=PD^kP^{-1}x_0$. Việc tính $D^k$ chỉ cần nâng các phần tử đường chéo lên lũy thừa $k$.

## Ví dụ minh họa bổ sung

Với $A=\begin{pmatrix}1&3\\3&1\end{pmatrix}$, các trị riêng là $4,-2$, với vectơ riêng $(1,1)^T,(-1,1)^T$. Chọn $P=\begin{pmatrix}1&-1\\1&1\end{pmatrix}$, $D=\operatorname{diag}(4,-2)$.

## Nguồn tài liệu

- `Chuong 5_Cheo hoa ma tran.pdf` · 28 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
