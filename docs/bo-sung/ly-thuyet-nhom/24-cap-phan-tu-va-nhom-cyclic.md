---
title: "Cấp phần tử và nhóm cyclic"
---

# Cấp phần tử và nhóm cyclic

## Cấp của phần tử

Cấp $|a|$ là số nguyên dương nhỏ nhất $n$ sao cho $a^n=e$; nếu không tồn tại thì cấp vô hạn. Khi $|a|=n<\infty$:

$$|a^d|=\frac{n}{\gcd(n,d)}.$$

## Bài tập chương 2, phần 2

1. Chứng minh công thức trên. Nếu $ab=ba$ và cấp $a,b$ lần lượt là $n,m$ nguyên tố cùng nhau, chứng minh $|ab|=mn$. Xét thêm trường hợp $\langle a\rangle\cap\langle b\rangle=\{e\}$.
2. Tìm nhóm có hai phần tử cấp hữu hạn nhưng tích có cấp vô hạn.
3. Chứng minh $|ab|=|ba|$ và $|a^{-1}|=|a|$.
4. Nếu $|a|=n$, chứng minh $\langle a^m\rangle=\langle a\rangle$ khi và chỉ khi $\gcd(n,m)=1$. Một nhóm cyclic hữu hạn có bao nhiêu nhóm con?
5. Chứng minh một chu trình độ dài $k$ trong $S_n$ có cấp $k$.
6. Chứng minh hai hoán vị rời nhau giao hoán.
7. Nếu $\sigma$ phân tích thành các chu trình rời nhau có độ dài $r_1,\ldots,r_k$, chứng minh $|\sigma|=\operatorname{lcm}(r_1,\ldots,r_k)$.
8. Tính cấp của hoán vị có bảng ảnh $(2,3,5,7,6,1,8,4,10,9)$ trên $\{1,\ldots,10\}$, và của $(1\ 3\ 4\ 7)(2\ 5)(1\ 2\ 4\ 3)$.
9. Tính cấp của $2,5$ trong $(\mathbb Z_8,+)$; của $e^{2\pi i/k}$ với $k>0$; tìm các phần tử cấp $10$ trong $\mathbb C^*$.

::: warning Điều kiện cần đối chiếu
Ở câu 1c, bản nguồn không nêu lại điều kiện giao hoán trước kết luận $|ab|=\operatorname{lcm}(m,n)$. Không dùng kết luận đó cho nhóm bất kỳ. Trong $S_3$, hai phép đổi chỗ $(1\ 2)$ và $(2\ 3)$ có cấp $2$ và các nhóm cyclic giao nhau tầm thường, nhưng tích có cấp $3$.
:::

## Hướng dẫn bài 4

Cấp của $a^m$ bằng $n/\gcd(n,m)$, nên sinh toàn bộ nhóm khi cấp này bằng $n$. Mỗi ước dương của $n$ tương ứng duy nhất với một nhóm con của nhóm cyclic cấp $n$.

## Nguồn tài liệu

- `exercises chapter 2(part2).pdf` · 2 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/ly-thuyet-nhom/).
