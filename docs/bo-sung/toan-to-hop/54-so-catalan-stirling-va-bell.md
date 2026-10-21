---
title: "Số Catalan, Stirling và Bell"
---

# Số Catalan, Stirling và Bell

## Số Catalan

Đặt $C_0=1$. Các số Catalan thỏa:

$$C_{n+1}=\sum_{k=0}^{n}C_kC_{n-k},\qquad C_n=\frac1{n+1}\binom{2n}{n}.$$

Chúng đếm cách đặt $n$ cặp ngoặc đúng, phân hoạch tam giác một đa giác lồi có $n+2$ cạnh, và ghép đôi không cắt nhau của $2n$ điểm theo thứ tự quanh đường tròn.

Các giá trị đầu là $1,1,2,5,14,42$. Khi dùng cho đa giác phải kiểm tra chỉ số lệch $2$, không đặt số cạnh trực tiếp bằng chỉ số Catalan.

## Số Stirling loại hai

$S(n,k)$ đếm phân hoạch tập $n$ phần tử thành đúng $k$ khối khác rỗng, không có nhãn:

$$S(n,k)=S(n-1,k-1)+kS(n-1,k).$$

Điều kiện đầu: $S(0,0)=1$, $S(n,0)=0$ với $n>0$, $S(n,k)=0$ với $k>n$. Trường hợp phần tử cuối đứng riêng đóng góp số hạng thứ nhất; nếu không, nó chọn một trong $k$ khối đã có.

Số toàn ánh đến $k$ nhãn bằng $k!S(n,k)$. Không nhân thêm $k!$ nếu đề chỉ chia thành các nhóm không có tên.

## Số Bell

$B_n$ là tổng số phân hoạch tập $n$ phần tử:

$$B_n=\sum_{k=0}^{n}S(n,k),\qquad B_{n+1}=\sum_{k=0}^{n}\binom nkB_k,\quad B_0=1.$$

Truy hồi thứ hai thu được bằng cách chọn những phần tử không cùng khối với một phần tử được đánh dấu, rồi phân hoạch chúng. Các giá trị đầu là $1,1,2,5,15,52,203$.

## Tự kiểm tra

Phân biệt ba câu: chia $n$ vật phân biệt thành $k$ nhóm không tên; đưa vào $k$ hộp có tên và không hộp rỗng; phân hoạch không giới hạn số nhóm. Đáp số lần lượt là $S(n,k)$, $k!S(n,k)$ và $B_n$.

## Nguồn tài liệu

- `Chuong 7. So dem nang cao.pdf` · 26 trang.
- Trang bìa ghi Đại học Khoa học Tự nhiên TP. Hồ Chí Minh.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
