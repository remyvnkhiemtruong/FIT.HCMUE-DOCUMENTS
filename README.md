# Cổng Thông Tin & Kho Tài Liệu Học Phần: Khoa CNTT - HCMUE

Cổng tài liệu học tập, giáo trình số hóa, bài tập và ngân hàng đề thi chính quy của **Khoa Công nghệ Thông tin — Trường Đại học Sư phạm TP. Hồ Chí Minh** phục vụ cả 3 chương trình đào tạo:
1. 💻 **Ngành Công Nghệ Thông Tin** (Mã ngành: `7480201`)
2. 👨‍🏫 **Ngành Sư Phạm Tin Học** (Mã ngành: `7140210`)
3. 🎓 **Ngành Công Nghệ Giáo Dục** (Mã ngành: `7140103` - EDTE)

---

## 🌟 Tính Năng & Cấu Trúc Nổi Bật

- **100% nội dung số hóa Toán học & Tin học:** Không nhúng file PDF hay `<iframe>`, toàn bộ công thức toán hiển thị bằng $\LaTeX$.
- **Khung chương trình 8 học kỳ toàn diện:** Danh mục đầy đủ tất cả học phần bắt buộc và tự chọn của 3 ngành.
- **Công cụ tra cứu học phần tương tác:** Lọc theo ngành đào tạo, lọc theo học kỳ (HK1 $\to$ HK8) và tìm kiếm từ khóa thời gian thực.
- **Tài liệu học sâu 2 môn toán nền tảng học kỳ 1:**
  - **Cơ sở Toán trong CNTT (COMP1800):** Giải tích hàm một biến (5 chuyên đề) + Đại số tuyến tính & Dạng toàn phương (6 chuyên đề) + 4 bộ đề thi KTHP & đề tham khảo có barem điểm.
  - **Toán Rời Rạc và Ứng Dụng (COMP1801):** 7 buổi học (Logic, Vị từ, Tập hợp, Quan hệ & Boole, Tổ hợp, Truy hồi, Đồ thị) + 5 bộ đề thi Giữa kỳ & Cuối kỳ kèm lời giải.
- **Ngân hàng đề thi & Trắc nghiệm tự chấm:** Trắc nghiệm giữa kỳ tương tác, lời giải tự luận đóng/mở (accordion).
- **Tìm kiếm toàn trang offline:** Tích hợp MiniSearch tìm kiếm siêu tốc.

---

## 🚀 Hướng Dẫn Sử Dụng

### 1. Khởi chạy máy chủ phát triển (Development)
```bash
npm run dev
```
Trang web sẽ chạy tại địa chỉ: `http://localhost:5173`

### 2. Đóng gói trang web tĩnh (Production Build)
```bash
npm run build
```
Thư mục xuất tĩnh hoàn chỉnh nằm tại: `docs/.vitepress/dist` (Gồm 41 trang HTML tĩnh + CSS + JS).

### 3. Xem trước bản build tĩnh (Preview)
```bash
npm run preview
```
