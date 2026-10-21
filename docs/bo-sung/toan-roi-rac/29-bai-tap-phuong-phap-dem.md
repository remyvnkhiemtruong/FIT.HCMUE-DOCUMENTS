---
title: "Bài tập phương pháp đếm"
---

# Bài tập phương pháp đếm

## Các dạng bài đếm

Bộ bài gồm tính công thức tổ hợp, liệt kê, hệ số đa thức, phân phối vật và nguyên lý Dirichlet. Trước khi chọn công thức, ghi rõ đối tượng có phân biệt không, có thứ tự không và có được lặp không.

## Bài tập tuyển chọn từ nguồn

1. Có bao nhiêu cách chia $18$ viên kẹo giống nhau cho $5$ trẻ nếu chia tùy ý, ai cũng có kẹo, trẻ lớn nhất có đúng $6$ viên, trẻ nhỏ nhất được ít nhất $4$ viên, hoặc trẻ lớn nhất không quá $7$ viên?
2. Có bao nhiêu cách chọn $20$ tờ tiền từ năm loại $1,2,5,10,20$ đồng? Nếu có ít nhất $7$ tờ loại $5$ đồng và không quá $8$ tờ loại $20$ đồng thì kết quả thay đổi thế nào?
3. Tìm số nghiệm nguyên không âm của $x+y+z+t=32$; xét thêm các cận dưới và trên trong bài nguồn.
4. Cần chọn bao nhiêu số trong $\{1,3,5,7,9,11,13,15\}$ để chắc chắn có hai số tổng bằng $16$?
5. Có $782$ sinh viên chọn từ $2$ đến $4$ buổi trong $12$ buổi học đàn. Chứng minh có hai sinh viên có lịch giống nhau.

::: details Hướng dẫn
Bài 1 không điều kiện: $\binom{22}{4}$. Nếu ai cũng có kẹo, trừ trước mỗi người một viên được $\binom{17}{4}$. Nếu trẻ lớn nhất không quá $7$ viên, lấy tổng không hạn chế trừ trường hợp em đó nhận ít nhất $8$ viên: $\binom{22}{4}-\binom{14}{4}$.

Bài 4 chia thành bốn cặp tổng $16$, cần chọn $5$ số. Bài 5 có $\binom{12}{2}+\binom{12}{3}+\binom{12}{4}=781$ lịch; áp dụng Dirichlet.
:::

## Cách tránh đếm lặp

Nếu chia theo nhiều trường hợp, chứng minh chúng rời nhau; nếu không rời nhau, dùng bù trừ. Với bài chữ số, xử lý riêng chữ số đầu khác $0$.

## Nguồn tài liệu

- `BT_Chuong 3_Phuong phap dem.pdf` · 8 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
