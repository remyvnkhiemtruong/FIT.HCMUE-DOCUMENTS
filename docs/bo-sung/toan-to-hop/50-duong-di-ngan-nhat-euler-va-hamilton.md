---
title: "Đường đi ngắn nhất, Euler và Hamilton"
---

# Đường đi ngắn nhất, Euler và Hamilton

## Đường đi ngắn nhất

Khởi tạo $d(s)=0$, $d(v)=\infty$ với đỉnh khác. Phép nới lỏng cạnh $(u,v)$ thử thay $d(v)$ bằng $d(u)+w(u,v)$ nếu nhỏ hơn, đồng thời lưu đỉnh trước để dựng đường.

Dijkstra chốt đỉnh có nhãn nhỏ nhất chưa chốt, dùng khi trọng số không âm. Ford–Bellman nới lỏng các cạnh tối đa $|V|-1$ lượt; lượt bổ sung phát hiện chu trình âm đến được từ nguồn. Khi có chu trình âm trên đường đến đích, không có khoảng cách hữu hạn nhỏ nhất cho các đỉnh chịu ảnh hưởng.

Để tìm mọi cặp, Floyd–Warshall dùng:

$$d^{(k)}_{ij}=\min\{d^{(k-1)}_{ij},d^{(k-1)}_{ik}+d^{(k-1)}_{kj}\}.$$

## Euler: sử dụng mọi cạnh

Với đồ thị vô hướng có cạnh, điều kiện liên thông xét trên các đỉnh không cô lập. Có chu trình Euler khi mọi bậc chẵn; có đường Euler mở khi đúng hai đỉnh bậc lẻ.

Thuật toán Fleury tránh đi qua cầu nếu còn lựa chọn. Hierholzer dựng các chu trình rồi ghép chúng; không nhầm “đã qua đỉnh” với “đã sử dụng cạnh”.

## Hamilton: sử dụng mọi đỉnh

Chu trình Hamilton đi qua mỗi đỉnh đúng một lần trước khi trở lại điểm đầu. Không có tiêu chuẩn chẵn lẻ như Euler.

Với đồ thị đơn $n\ge3$, điều kiện Dirac $\deg(v)\ge n/2$ với mọi đỉnh là đủ cho Hamilton. Điều kiện Ore yêu cầu $\deg(u)+\deg(v)\ge n$ với mọi cặp không kề. Đây là điều kiện đủ, không phải điều kiện cần.

## Ràng buộc khi dựng chu trình

Mỗi đỉnh cần đúng hai cạnh thuộc chu trình. Chọn cả hai cạnh kề đỉnh bậc hai; tránh tạo chu trình con trước khi dùng hết các đỉnh. Nếu dùng quay lui, đánh dấu đỉnh, không đánh dấu cạnh như bài Euler.

## Nguồn tài liệu

- `Chuong 3. Cac bai toan ve duong di.pdf` · 57 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
