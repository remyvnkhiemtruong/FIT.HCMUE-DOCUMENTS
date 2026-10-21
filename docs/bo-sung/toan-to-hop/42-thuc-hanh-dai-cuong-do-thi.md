---
title: "Thực hành đại cương đồ thị"
---

# Thực hành đại cương đồ thị

## Tạo và khảo sát đồ thị

Nguồn dùng tập hợp hai phần tử cho cạnh vô hướng và danh sách có thứ tự cho cung có hướng trong gói `GraphTheory`:

```text
with(GraphTheory):
G := Graph({{1,2},{2,3},{3,1},{3,4},{4,5},{5,6}}):
DrawGraph(G);
NumberOfVertices(G);
NumberOfEdges(G);
IsConnected(G);
ConnectedComponents(G);
```

Trong ví dụ nguồn, đồ thị có $6$ đỉnh, $6$ cạnh. Nếu khởi tạo cùng các cạnh nhưng chỉ rõ có $8$ đỉnh, hai đỉnh $7,8$ cô lập tạo thêm hai thành phần liên thông.

## Các dạng thực hành

- Đọc tập đỉnh, tập cạnh từ hình hoặc ma trận, ghi rõ có hướng hay vô hướng.
- Tính bậc từng đỉnh và kiểm tra tổng bậc bằng hai lần số cạnh đối với đồ thị vô hướng.
- Lập ma trận kề và danh sách kề.
- Tìm thành phần liên thông và kiểm tra đẳng cấu qua các bất biến trước khi tìm song ánh.

## Bài minh họa bổ sung

Với tập cạnh ở đoạn lệnh trên, dãy bậc theo thứ tự đỉnh là $(2,2,3,2,2,1)$. Tổng bằng $12=2\cdot6$. Ba cạnh $34,45,56$ đều là cầu; ba cạnh của tam giác $123$ không là cầu.

Khi bài cho đồ thị bằng hình, không suy ra hai cạnh cắt nhau trên hình có thêm một đỉnh, trừ khi vị trí đó được đánh dấu là đỉnh.

## Nguồn tài liệu

- `_BT_Chuong 1_Dai cuong ve do thi.pdf` · 10 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-to-hop/).
