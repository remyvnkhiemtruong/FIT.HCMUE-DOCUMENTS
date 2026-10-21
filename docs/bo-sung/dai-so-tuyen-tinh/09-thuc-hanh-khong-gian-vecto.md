---
title: "Thực hành không gian vectơ"
---

# Thực hành không gian vectơ

## Các việc cần làm bằng tay

Lập ma trận có các vectơ đã cho làm cột để kiểm tra độc lập tuyến tính. Tìm cơ sở của không gian sinh bằng các cột trụ của ma trận gốc; tìm cơ sở không gian dòng bằng các dòng khác không của dạng bậc thang.

## Thực hành Maple

```text
with(LinearAlgebra):
A := Matrix([[1,2,3],[2,3,5],[3,4,7]]);
Rank(A);
NullSpace(A);
ColumnSpace(A);
RowSpace(A);
```

`NullSpace` cho một cơ sở không gian nghiệm thuần nhất. Kết quả có thể khác cơ sở tính tay nhưng vẫn đúng nếu sinh cùng không gian.

## Bài luyện theo các dạng trong nguồn

- Kiểm tra một tập có phải không gian con bằng tính đóng dưới tổ hợp tuyến tính.
- Biểu diễn một vectơ theo một hệ đã cho bằng cách giải hệ các hệ số.
- Tìm điều kiện tham số để hệ vectơ độc lập.
- Tìm cơ sở của tổng và giao hai không gian con.
- Tìm tọa độ của một vectơ trong hai cơ sở và kiểm tra công thức đổi tọa độ.

## Ví dụ minh họa bổ sung

Với các cột $u=(1,2,3)^T$, $v=(2,3,4)^T$, $w=(3,5,7)^T$, nhận thấy $w=u+v$. Hai vectơ đầu độc lập nên $\{u,v\}$ là cơ sở của không gian sinh; số chiều là $2$.

Kiểm tra lại vectơ ban đầu trong mỗi bài, vì một sai sót ở khâu nhập ma trận làm thay đổi cả hạng và cơ sở.

## Nguồn tài liệu

- `THDSTT_Chuong 3_Khong gian vecto.pdf` · 14 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
