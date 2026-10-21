---
title: "Bài tập cơ sở logic"
---

# Bài tập cơ sở logic

## Thực hành bảng chân trị

Với $n$ biến mệnh đề, bảng chân trị có $2^n$ dòng. Cố định một thứ tự các bộ giá trị, tính biểu thức con trước rồi mới tính toàn bộ công thức.

Nguồn giới thiệu gói `Logic` của Maple:

```text
with(Logic):
F := (p &and (&not q)) &implies (r &or q):
TruthTable(F,[p,q,r]);
Tautology(F);
Contradiction(F);
Satisfy(F);
Export(F);
```

`Satisfy` tìm một phép gán làm công thức đúng; nó không chứng minh công thức hằng đúng. `Equivalent` kiểm tra tương đương, còn `Implies` kiểm tra hệ quả logic.

## Bài luyện theo nguồn

- Viết phủ định các phát biểu bằng ngôn ngữ thông thường, rồi chuyển sang ký hiệu.
- Lập bảng chân trị cho công thức có kéo theo và tương đương.
- Kiểm tra một công thức là hằng đúng, hằng sai hay khả thỏa.
- Chứng minh tương đương bằng luật De Morgan, phân phối và hấp thu.
- Kiểm tra suy luận bằng cách xét giả thiết cùng đúng và kết luận sai.

## Ví dụ minh họa bổ sung

$p\to(q\to r)$ tương đương $\neg p\lor\neg q\lor r$. Công thức chỉ sai khi $p=q=1$, $r=0$, nên không là hằng đúng. Đây là cách tìm phản ví dụ ngắn hơn việc viết lại toàn bộ bảng sau khi đã có dạng rút gọn.

## Nguồn tài liệu

- `BT_Chuong 1_Co so logic.pdf` · 9 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
