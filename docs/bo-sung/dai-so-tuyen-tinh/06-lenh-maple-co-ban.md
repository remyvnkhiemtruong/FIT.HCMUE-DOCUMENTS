---
title: "Lệnh Maple cơ bản"
---

# Lệnh Maple cơ bản

Tài liệu nguồn dùng Maple cho tính toán đại số. Các lệnh dưới đây được viết ở dạng văn bản để có thể sao chép. Cú pháp gói lệnh cũ có thể khác giữa các phiên bản.

## Phiên làm việc và biểu thức

```text
restart;
x := 3+5-7;
print(x);
evalf(Pi);
simplify((a+b)^2-(a-b)^2);
expand((a+b)^3);
factor(a^2-b^2);
subs(a=2,a^2+b);
```

`:=` là phép gán; `=` tạo một phương trình. Kết thúc lệnh bằng `;` để hiện kết quả hoặc `:` để ẩn kết quả. Dùng `?tên_lệnh` để mở trợ giúp.

## Danh sách, tập hợp và chỉ số

```text
L := [2,3,4,6];
L[3];
S := {2,3,3,4};
seq(k^2,k=1..5);
nops(L);
```

Danh sách giữ thứ tự và phần tử lặp; tập hợp không giữ các bản sao trùng nhau. Chỉ số danh sách bắt đầu từ $1$.

## Phương trình và hàm

```text
solve(x^2-5*x+6=0,x);
f := x -> x^2+1;
f(3);
diff(sin(x),x);
int(x^2,x);
```

## Cách kiểm tra kết quả

Giữ số hữu tỉ ở dạng chính xác trong lúc biến đổi; chỉ dùng `evalf` khi cần số gần đúng. Thay nghiệm vào phương trình ban đầu, không chỉ dựa vào cách phần mềm hiển thị.

Bản nguồn có liên kết tải một phiên bản Maple cũ. Bài này chỉ giữ nội dung học lệnh, không dẫn lại liên kết tải chưa xác minh.

## Nguồn tài liệu

- `THDSTT__Mot so lenh co ban trong Maple.pdf` · 3 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/dai-so-tuyen-tinh/).
