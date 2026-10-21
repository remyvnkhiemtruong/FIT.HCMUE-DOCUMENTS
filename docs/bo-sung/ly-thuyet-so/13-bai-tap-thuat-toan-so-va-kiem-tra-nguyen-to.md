---
title: "Bài tập thuật toán số và kiểm tra nguyên tố"
---

# Bài tập thuật toán số và kiểm tra nguyên tố

## Độ phức tạp và tính toán môđun

Bộ bài chương 3–4 gồm chứng minh tính chất của ký hiệu $O$, phân tích thuật toán, lũy thừa môđun và kiểm tra nguyên tố.

Nếu $f(n)=a_dn^d+\cdots+a_0$ với $a_d>0$, hãy chứng minh $f(n)=O(n^d)$ bằng cách tìm $C,n_0$ sao cho $|f(n)|\le Cn^d$ với mọi $n\ge n_0$. Phân biệt cận trên với ước lượng đúng cấp $\Theta$.

## Bài tập tuyển chọn từ nguồn

- Kiểm tra các số $341,561,1105$ có phải số giả nguyên tố cơ sở $2$ không.
- Kiểm tra các số $91,703,1729,2821$ đối với cơ sở $3$.
- Kiểm tra tính Carmichael của $561,1105,1729,2465,15841$.
- Kiểm tra giả nguyên tố mạnh cơ sở $2$ đối với $341,561,1105,2047$.
- Chứng minh: nếu phép thử Miller với một cơ sở hợp lệ kết luận hợp số thì số được kiểm tra thật sự là hợp số.

## Cách làm

Trước hết phân tích hoặc chứng minh số đang xét là hợp số. Sau đó tính lũy thừa theo môđun. Với phép thử mạnh, phân tích $n-1=2^st$ với $t$ lẻ, xét $b^t$ rồi bình phương liên tiếp.

Với số Carmichael, có thể kiểm tra điều kiện: $n$ là hợp số không có ước chính phương, và với mọi số nguyên tố $p\mid n$ đều có $p-1\mid n-1$.

Đừng coi việc vượt qua một phép thử Fermat là chứng minh nguyên tố. Bài nguồn không cung cấp lời giải đầy đủ cho tất cả câu; các hướng dẫn trên là phần biên soạn bổ sung.

## Nguồn tài liệu

- `bai tap chuong 3-4 Ly thuyet so.pdf` · 2 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-so/).
