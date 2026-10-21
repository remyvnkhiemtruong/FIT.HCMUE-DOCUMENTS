---
title: "Cơ sở logic và phương pháp chứng minh"
---

# Cơ sở logic và phương pháp chứng minh

## Mệnh đề và phép toán

Mệnh đề có chân trị đúng hoặc sai. Với hai mệnh đề $p,q$, phép kéo theo chỉ sai khi $p$ đúng, $q$ sai; do đó $p\to q\equiv\neg p\lor q$.

| $p$ | $q$ | $p\land q$ | $p\lor q$ | $p\to q$ | $p\leftrightarrow q$ |
| --- | --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 | 1 |

## Dạng mệnh đề và tương đương

Công thức hằng đúng nhận $1$ ở mọi phép gán; hằng sai nhận $0$ ở mọi phép gán. Hai công thức tương đương khi trùng chân trị ở mọi dòng.

Các luật thường dùng: De Morgan $\neg(p\land q)\equiv\neg p\lor\neg q$; phân phối; lũy đẳng; hấp thu $p\lor(p\land q)\equiv p$; phủ định kép $\neg\neg p\equiv p$.

## Vị từ và lượng từ

Phải chỉ rõ miền của biến trước khi xét $\forall x\,P(x)$ hoặc $\exists x\,P(x)$. Phủ định đổi lượng từ:

$$\neg\forall x\,P(x)\equiv\exists x\,\neg P(x),\qquad\neg\exists x\,P(x)\equiv\forall x\,\neg P(x).$$

Thứ tự lượng từ có ý nghĩa: $\forall x\exists y$ thường khác $\exists y\forall x$.

## Quy tắc suy luận và chứng minh

Modus ponens dùng $p$ và $p\to q$ để suy ra $q$; modus tollens dùng $\neg q$ và $p\to q$ để suy ra $\neg p$. Không đảo thành “$q$ đúng nên $p$ đúng”.

Các phương pháp trong nguồn gồm trực tiếp, phản đảo, phản chứng và chia trường hợp. Với quy nạp, xác nhận mốc đầu, giả sử tại $k$, chứng minh tại $k+1$; ghi rõ chỉ số áp dụng.

## Ví dụ minh họa bổ sung

Chứng minh $1+\cdots+n=n(n+1)/2$. Mốc $n=1$ đúng. Nếu công thức đúng tại $k$, cộng $k+1$ được $k(k+1)/2+k+1=(k+1)(k+2)/2$, hoàn thành bước quy nạp.

## Nguồn tài liệu

- `Chuong 1_Co so logic.pdf` · 68 trang.
- Nguồn tham khảo; chưa xác nhận đơn vị biên soạn hoặc chương trình áp dụng.
- Bài biên soạn theo nội dung và thứ tự kiến thức của tài liệu nguồn; các bài luyện tập được ghi rõ là tuyển chọn. Không phải bản chép nguyên văn từng trang.
- [Các bài trong chủ đề](/bo-sung/toan-roi-rac/).
