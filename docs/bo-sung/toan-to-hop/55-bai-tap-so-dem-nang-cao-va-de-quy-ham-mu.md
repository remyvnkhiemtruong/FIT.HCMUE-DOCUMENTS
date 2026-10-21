---
title: "Bài tập số đếm nâng cao và đệ quy hàm mũ"
---

# Bài tập số đếm nâng cao và đệ quy hàm mũ

## Bài số đếm nâng cao trong nguồn

- Tính $C_5,C_8$ bằng truy hồi, rồi kiểm tra bằng công thức đóng.
- Tính $S(7,3),S(6,4),S(7,4),S(8,3)$; lập tam giác Stirling đến hàng $8$.
- Tính $B_4,B_6,B_7$ và lập tam giác Bell đến hàng $8$.
- Đếm phân hoạch tập $\{1,\ldots,9\}$ thành ba khối, mỗi khối ít nhất hai phần tử, các phần tử $1,2,3$ ở các khối khác nhau.
- Đếm các cách phân tích $2310=2\cdot3\cdot5\cdot7\cdot11$ thành hai hoặc ba thừa số nguyên lớn hơn $1$, không kể thứ tự.
- Đếm dãy gồm năm số $1$ và năm số $-1$ có mọi tổng tiền tố không âm.

## Hướng dẫn

Bài phân hoạch chín phần tử: ba phần tử $1,2,3$ đánh dấu ba khối. Phân sáu phần tử còn lại vào ba khối sao cho không khối nào thiếu phần tử bổ sung, cho $3!S(6,3)$ cách.

Với $2310$ là tích năm số nguyên tố phân biệt, gom thừa số thành $k$ nhóm tương ứng một phân hoạch tập năm phần tử, cho $S(5,k)$. Dãy tiền tố không âm tương ứng với $C_5$.

## Đệ quy bằng hàm sinh mũ

Nguồn có $a_{n+1}=(n+1)a_n+n$, $a_0=0$. Đặt $E(x)=\sum a_nx^n/n!$; nhân theo $x^{n+1}/(n+1)!$ rồi cộng được:

$$E(x)=xE(x)+xe^x-e^x+1,$$
$$E(x)=\frac1{1-x}-e^x,\qquad a_n=n!-1.$$

Các bài tiếp theo yêu cầu giải $a_{n+1}=(n+1)(a_n-n+1)$, $a_0=1$, và $f_{n+1}=2(n+1)f_n+(n+1)!$, $f_0=0$. Các biểu thức gợi ý lần lượt là $a_n=n!+n$ và $f_n=(2^n-1)n!$; kiểm tra điều kiện đầu và thế vào truy hồi.

::: warning Một gợi ý cần đối chiếu
Ở bài 5, nguồn ghi $a_{n+1}=(n+1)a_n-Cn$, $a_0=C$, nhưng gợi ý $a_n=n!+C$ không thỏa điều kiện đầu. Không dùng gợi ý đó như một đáp án đã xác nhận.
:::

## Nguồn tài liệu

- `tham khao chuong7 va de quy ham mu.pdf` · 5 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
