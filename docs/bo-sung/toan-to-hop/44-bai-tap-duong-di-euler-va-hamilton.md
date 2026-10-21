---
title: "Bài tập đường đi, Euler và Hamilton"
---

# Bài tập đường đi, Euler và Hamilton

## Bài lập trình trong nguồn

1. Từ ma trận khoảng cách và hai đỉnh $i,j$, viết chương trình tìm đường ngắn nhất bằng Dijkstra và Ford–Bellman.
2. Từ ma trận kề đồ thị vô hướng, xác định có chu trình hoặc đường đi Euler hay không; nếu có thì liệt kê.
3. Từ ma trận kề, xác định có chu trình hoặc đường đi Hamilton hay không; nếu có thì liệt kê.

Phần hướng dẫn Maple ở đầu PDF chỉ ghi sẽ cập nhật sau; không coi đó là một lời giải sẵn có.

## Điều kiện thuật toán

Dijkstra cần trọng số không âm. Ford–Bellman xử lý được cạnh âm nhưng phải phát hiện chu trình âm đến được từ đỉnh nguồn. Để tìm đường Hamilton, quay lui có thể phù hợp với đồ thị nhỏ; điều kiện bậc của Euler không giải quyết bài Hamilton.

## Bài tập tuyển chọn khác

- Tìm ví dụ chứng tỏ Dijkstra không dùng được với cạnh âm.
- Xếp mười quân domino $(1,2),(1,3),(1,4),(1,5),(2,3),(2,4),(2,5),(3,4),(3,5),(4,5)$ thành vòng khép kín bằng mô hình đồ thị.
- Chứng minh đồ thị hai phía có chu trình Hamilton thì hai phía có cùng số đỉnh.

## Hướng dẫn bài domino

Mỗi số là một đỉnh, mỗi quân là cạnh nối hai số. Đồ thị nhận được là $K_5$, liên thông và mọi đỉnh bậc $4$, nên có chu trình Euler dùng mỗi quân một lần. Có thể dựng một chu trình bằng thuật toán Hierholzer.

Với một đường đi tìm được, kiểm tra lại tổng trọng số, các đỉnh phải qua và các đỉnh bị cấm. Đừng chỉ đối chiếu chiều dài mà bỏ điều kiện của đề.

## Nguồn tài liệu

- `_BT_Chuong 3. Cac bai toan ve duong di.pdf` · 4 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
