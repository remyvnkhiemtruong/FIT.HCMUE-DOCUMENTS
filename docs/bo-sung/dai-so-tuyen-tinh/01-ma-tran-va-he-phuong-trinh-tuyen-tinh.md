---
title: "Ma trận và hệ phương trình tuyến tính"
---

# Ma trận và hệ phương trình tuyến tính

Ma trận cho phép viết hệ phương trình tuyến tính dưới dạng $Ax=b$. Khi tính toán, cần theo dõi kích thước ma trận và phân biệt phép biến đổi dòng với phép biến đổi cột.

## Ma trận và các phép toán

Ma trận $A=(a_{ij})\in M_{m\times n}(\mathbb R)$ có $m$ dòng, $n$ cột. **Ma trận không** có mọi phần tử bằng $0$; ma trận đơn vị $I_n$ có các phần tử trên đường chéo chính bằng $1$, các phần tử khác bằng $0$.

Hai ma trận cùng kích thước được cộng theo từng phần tử. Tích $AB$ xác định khi số cột của $A$ bằng số dòng của $B$:

$$ (AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}. $$

Phép nhân có tính kết hợp và phân phối, nhưng nhìn chung $AB\ne BA$. Chuyển vị đảo thứ tự tích: $(AB)^T=B^TA^T$. Với ma trận vuông, $A^0=I$ và $A^{k+1}=A^kA$.

## Biến đổi dòng, bậc thang và hạng

Ba phép biến đổi sơ cấp trên dòng là đổi chỗ hai dòng, nhân một dòng với số khác $0$, và cộng vào một dòng bội của dòng khác. Chúng giữ nguyên tập nghiệm khi áp dụng đồng thời cho toàn bộ ma trận mở rộng.

Trong dạng bậc thang, dòng không nằm dưới các dòng khác không; phần tử dẫn đầu của dòng sau nằm bên phải phần tử dẫn đầu của dòng trước. Dạng bậc thang rút gọn còn yêu cầu phần tử dẫn đầu bằng $1$ và là phần tử khác $0$ duy nhất trên cột đó. Hạng là số phần tử dẫn đầu.

## Giải hệ bằng Gauss

1. Lập ma trận mở rộng $[A\mid b]$.
2. Chọn phần tử dẫn đầu khác $0$, đổi dòng nếu cần.
3. Khử các phần tử phía dưới; tiếp tục với ma trận con.
4. Kiểm tra dòng mâu thuẫn rồi thế ngược hoặc đưa về dạng rút gọn.

Đặt $r=\operatorname{rank}(A)$, $r'=\operatorname{rank}([A\mid b])$, $n$ là số ẩn. Nếu $r<r'$ thì hệ vô nghiệm. Nếu $r=r'=n$ thì có nghiệm duy nhất. Nếu $r=r'<n$ thì có $n-r$ ẩn tự do.

## Ma trận nghịch đảo và phương trình ma trận

Ma trận vuông khả nghịch nếu tồn tại $A^{-1}$ sao cho $AA^{-1}=A^{-1}A=I$. Tìm nghịch đảo bằng Gauss–Jordan:

$$[A\mid I]\longrightarrow[I\mid A^{-1}].$$

Nếu không đưa được vế trái về $I$, ma trận không khả nghịch. Với $A,B$ khả nghịch, $(AB)^{-1}=B^{-1}A^{-1}$.

Từ $AX=B$ suy ra $X=A^{-1}B$ khi $A$ khả nghịch; từ $XA=B$ suy ra $X=BA^{-1}$. Không đổi vị trí các thừa số.

## Tự kiểm tra

Giải hệ $x+y=3$, $2x-y=0$. Cộng hai phương trình cho $3x=3$, nên $x=1$, $y=2$. Thế lại cả hai phương trình để kiểm tra. Đây là ví dụ minh họa bổ sung.

## Nguồn tài liệu

- `Chuong 1_Ma tran va he phuong trinh tuyen tinh.pdf` · 104 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
