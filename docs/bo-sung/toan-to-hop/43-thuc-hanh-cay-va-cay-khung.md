---
title: "Thực hành cây và cây khung"
---

# Thực hành cây và cây khung

## Đồ thị có trọng số trong nguồn

```text
with(GraphTheory):
E := {[{1,2},1],[{1,3},2],[{2,3},3],[{3,4},4],[{4,5},5]}:
G := Graph(E):
Edges(G,weights);
WeightMatrix(G);
DrawGraph(G);
```

Một cạnh có trọng số khác với nhiều cạnh song song. Ghi lại quy ước về phần tử biểu diễn “không có cạnh” khi chuyển sang ma trận.

## Thực hành cây khung

Thực hiện Kruskal: sắp cạnh tăng dần theo trọng số; thêm cạnh nếu không tạo chu trình. Với đồ thị liên thông $n$ đỉnh, dừng khi có $n-1$ cạnh.

Trong ví dụ trên, chọn các cạnh trọng số $1,2$, bỏ cạnh $23$ trọng số $3$ vì tạo tam giác, rồi chọn trọng số $4,5$. Tổng trọng số cây khung là $12$.

## Dạng bài trong bộ thực hành

- Tìm cây khung và cây khung nhỏ nhất.
- So sánh thứ tự chọn cạnh của Prim với Kruskal.
- Xác định gốc, cha, con, lá và chiều cao của cây có gốc.
- Viết thứ tự duyệt trước, giữa, sau cho cây nhị phân.
- Đổi biểu thức giữa các cách viết theo cây biểu thức.

## Kiểm tra kết quả

Tập cạnh phải nối đủ mọi đỉnh và không có chu trình; số cạnh đúng chưa đủ nếu đồ thị không liên thông. Nếu đề có nhiều cạnh bằng trọng số, có thể có nhiều cây khung tối ưu khác nhau.

## Nguồn tài liệu

- `_BT_Chuong 2. Cay.pdf` · 8 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
