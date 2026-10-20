import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Cổng Tài Liệu Khoa CNTT - HCMUE",
  description: "Kho tài liệu học tập, giáo trình, bài tập & đề thi phân loại theo từng Khóa (K52, K51, K50, K49) & 3 Ngành đào tạo - FIT HCMUE",
  lang: 'vi-VN',
  // Base URL cho GitHub Pages: https://remyvnkhiemtruong.github.io/FIT.HCMUE-DOCUMENTS/
  base: '/FIT.HCMUE-DOCUMENTS/',
  // Xóa .html khỏi URL
  cleanUrls: true,
  // Bật math + tắt copy button trên code block (chống copy code)
  markdown: {
    math: true,
    codeTransformers: []
  },
  // Head: chống cache + thêm meta bảo vệ
  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['meta', { name: 'copyright', content: 'Khoa Công nghệ Thông tin - Trường ĐH Sư phạm TP.HCM (FIT HCMUE)' }],
    ['meta', { 'http-equiv': 'Cache-Control', content: 'no-store' }],
    ['link', { rel: 'icon', href: '/FIT.HCMUE-DOCUMENTS/favicon.ico' }]
  ],
  themeConfig: {
    logo: '🏛️',
    siteTitle: 'Kho Tài Liệu FIT HCMUE',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Tìm kiếm',
                buttonAriaLabel: 'Tìm kiếm tài liệu học phần'
              },
              modal: {
                noResultsText: 'Không tìm thấy kết quả',
                resetButtonTitle: 'Xóa tìm kiếm',
                footer: {
                  selectText: 'chọn',
                  navigateText: 'điều hướng',
                  closeText: 'đóng'
                }
              }
            }
          }
        }
      }
    },
    nav: [
      { text: 'Trang chủ', link: '/' },
      {
        text: '📚 Kho Môn Học',
        items: [
          { text: 'Toàn bộ môn học (HK1 - HK8)', link: '/mon-hoc/' },
          { text: 'Năm 1: Học kỳ 1 & 2', link: '/mon-hoc/hk1/' },
          { text: 'Năm 2: Học kỳ 3 & 4', link: '/mon-hoc/hk3/' },
          { text: 'Năm 3: Học kỳ 5 & 6', link: '/mon-hoc/hk5/' },
          { text: 'Năm 4: Học kỳ 7 & 8', link: '/mon-hoc/hk7/' },
        ]
      },
      {
        text: '🏛️ Khoa & Niên Khóa',
        items: [
          { text: 'Tổng quan Kho tài liệu', link: '/khoa/' },
          { text: '🔎 Tra cứu học phần toàn Khoa', link: '/khoa/tra-cuu-hoc-phan' },
          {
            text: 'Theo Khóa Đào Tạo',
            items: [
              { text: '⭐ Khóa 52 - Năm 1 (Hiện tại)', link: '/khoa/khoa-52' },
              { text: 'Khóa 51 - Năm 2 (2025 - 2029)', link: '/khoa/khoa-51' },
              { text: 'Khóa 50 - Năm 3 (2024 - 2028)', link: '/khoa/khoa-50' },
              { text: 'Khóa 49 - Năm 4 (2023 - 2027)', link: '/khoa/khoa-49' },
            ]
          },
          {
            text: 'Theo Ngành Đào Tạo',
            items: [
              { text: '💻 Ngành Công nghệ Thông tin', link: '/khoa/nganh-cntt' },
              { text: '👨‍🏫 Ngành Sư phạm Tin học', link: '/khoa/nganh-sp-tin' },
              { text: '🎓 Ngành Công nghệ Giáo dục (EDTE)', link: '/khoa/nganh-cngd' },
            ]
          }
        ]
      },
      {
        text: '📈 Cơ Sở Toán (COMP1800)',
        items: [
          {
            text: 'Giải tích hàm một biến',
            items: [
              { text: '1. Dãy số & Giới hạn', link: '/calculus/01-gioi-han-day-va-ham' },
              { text: '2. Phép tính vi phân & Taylor', link: '/calculus/02-dao-ham-vi-phan-taylor' },
              { text: '3. Phép tính tích phân', link: '/calculus/03-tich-phan-va-ung-dung' },
              { text: '4. Tích phân suy rộng', link: '/calculus/04-tich-phan-suy-rong' },
              { text: '5. Lý thuyết chuỗi', link: '/calculus/05-ly-thuyet-chuoi' },
            ]
          },
          {
            text: 'Đại số tuyến tính',
            items: [
              { text: '1. Ma trận & Định thức', link: '/algebra/01-ma-tran-va-dinh-thuc' },
              { text: '2. Hệ phương trình tuyến tính', link: '/algebra/02-he-phuong-trinh-tuyen-tinh' },
              { text: '3. Không gian vectơ', link: '/algebra/03-khong-gian-vecto' },
              { text: '4. Không gian Euclide', link: '/algebra/04-khong-gian-euclide' },
              { text: '5. Ánh xạ tuyến tính & Chéo hóa', link: '/algebra/05-anh-xa-tuyen-tinh-cheo-hoa' },
              { text: '6. Dạng toàn phương', link: '/algebra/06-dang-toan-phuong' },
            ]
          },
          {
            text: 'Luyện tập & Đề thi CST',
            items: [
              { text: 'Ngân hàng bài tập', link: '/exercises/' },
              { text: 'Trắc nghiệm Giữa kỳ', link: '/exams/quiz-giua-ky' },
              { text: 'Đề KTHP 2022 - 2023', link: '/exams/de-2022-2023' },
              { text: 'Đề KTHP 2023 - 2024', link: '/exams/de-2023-2024' },
              { text: 'Đề KTHP 2024 - 2025', link: '/exams/de-2024-2025' },
              { text: 'Đề tham khảo kèm Barem', link: '/exams/de-tham-khao-co-dap-an' },
            ]
          }
        ]
      },
      {
        text: '🧩 Toán Rời Rạc (COMP1801)',
        items: [
          {
            text: 'Lý thuyết 7 buổi học',
            items: [
              { text: 'Buổi 1: Logic Mệnh đề & Chân trị', link: '/discrete-math/buoi-1-logic-menh-de' },
              { text: 'Buổi 2: Vị từ, Suy diễn & Quy nạp', link: '/discrete-math/buoi-2-vi-tu-quy-nap' },
              { text: 'Buổi 3: Lý thuyết Tập hợp & Ánh xạ', link: '/discrete-math/buoi-3-tap-hop-anh-xa' },
              { text: 'Buổi 4: Quan hệ & Đại số Boole', link: '/discrete-math/buoi-4-quan-he-dai-so-boole' },
              { text: 'Buổi 5: Đại số Tổ hợp & Đếm', link: '/discrete-math/buoi-5-to-hop-dem' },
              { text: 'Buổi 6: Hệ thức Truy hồi', link: '/discrete-math/buoi-6-he-thuc-truy-hoi' },
              { text: 'Buổi 7: Lý thuyết Đồ thị & Cây', link: '/discrete-math/buoi-7-ly-thuyet-do-thi' },
            ]
          },
          {
            text: 'Kho đề thi & Lời giải TRR',
            items: [
              { text: 'Đề Giữa kỳ GK 22-23', link: '/exams-discrete/gk-2022-2023' },
              { text: 'Đề Giữa kỳ GK 23-24', link: '/exams-discrete/gk-2023-2024' },
              { text: 'Đề KTHP 22-23 + Lời giải', link: '/exams-discrete/kthp-2022-2023' },
              { text: 'Đề KTHP 23-24 + Lời giải', link: '/exams-discrete/kthp-2023-2024' },
              { text: 'Đề KTHP 24-25 + Lời giải', link: '/exams-discrete/kthp-2024-2025' },
            ]
          }
        ]
      },
      { text: 'Lộ trình', link: '/roadmap' },
      { text: 'Sổ tay công thức', link: '/cheatsheet/cong-thuc-nhanh' }
    ],
    sidebar: {
      '/mon-hoc/': [
        {
          text: 'Tổng quan Môn học',
          items: [
            { text: '📚 Toàn bộ môn học (HK1 - HK8)', link: '/mon-hoc/' },
          ]
        },
        {
          text: 'Năm 1: Học kỳ 1 & 2',
          items: [
            { text: 'Học kỳ 1 (COMP1010, 1800, 1801, 1802)', link: '/mon-hoc/hk1/' },
            { text: 'Học kỳ 2 (COMP1013, 1017)', link: '/mon-hoc/hk2/' },
          ]
        },
        {
          text: 'Năm 2: Học kỳ 3 & 4',
          items: [
            { text: 'Học kỳ 3 (CTDL, CSDL, WinForms, XSTK)', link: '/mon-hoc/hk3/' },
            { text: 'Học kỳ 4 (KTMT, Mạng, HĐH, Giải thuật, Agile)', link: '/mon-hoc/hk4/' },
          ]
        },
        {
          text: 'Năm 3: Học kỳ 5 & 6',
          items: [
            { text: 'Học kỳ 5 (CNPM, OOAD, AI)', link: '/mon-hoc/hk5/' },
            { text: 'Học kỳ 6 (QHTT, PHP & Web)', link: '/mon-hoc/hk6/' },
          ]
        },
        {
          text: 'Năm 4: Học kỳ 7 & 8',
          items: [
            { text: 'Học kỳ 7 (Thực tập 1, Thực hành, Khởi nghiệp)', link: '/mon-hoc/hk7/' },
            { text: 'Học kỳ 8 (Thực tập 2, Hồ sơ tốt nghiệp)', link: '/mon-hoc/hk8/' },
          ]
        }
      ],
      '/khoa/': [
        {
          text: 'Tài liệu theo Khóa Đào Tạo',
          items: [
            { text: '⭐ Khóa 52 - Năm 1 (Hiện tại)', link: '/khoa/khoa-52' },
            { text: 'Khóa 51 - Năm 2 (2025 - 2029)', link: '/khoa/khoa-51' },
            { text: 'Khóa 50 - Năm 3 (2024 - 2028)', link: '/khoa/khoa-50' },
            { text: 'Khóa 49 - Năm 4 (2023 - 2027)', link: '/khoa/khoa-49' },
          ]
        },
        {
          text: 'Khung Chương Trình 3 Ngành',
          items: [
            { text: '💻 Ngành Công nghệ Thông tin', link: '/khoa/nganh-cntt' },
            { text: '👨‍🏫 Ngành Sư phạm Tin học', link: '/khoa/nganh-sp-tin' },
            { text: '🎓 Ngành Công nghệ Giáo dục', link: '/khoa/nganh-cngd' },
          ]
        },
        {
          text: 'Công cụ Tra cứu',
          items: [
            { text: 'Tổng quan Kho tài liệu', link: '/khoa/' },
            { text: '🔎 Tra cứu học phần toàn Khoa', link: '/khoa/tra-cuu-hoc-phan' },
          ]
        }
      ],
      '/calculus/': [
        {
          text: 'Phần I: Giải tích hàm một biến',
          items: [
            { text: '1. Dãy số & Giới hạn', link: '/calculus/01-gioi-han-day-va-ham' },
            { text: '2. Phép tính vi phân & Taylor', link: '/calculus/02-dao-ham-vi-phan-taylor' },
            { text: '3. Phép tính tích phân', link: '/calculus/03-tich-phan-va-ung-dung' },
            { text: '4. Tích phân suy rộng', link: '/calculus/04-tich-phan-suy-rong' },
            { text: '5. Lý thuyết chuỗi', link: '/calculus/05-ly-thuyet-chuoi' },
          ]
        }
      ],
      '/algebra/': [
        {
          text: 'Phần II: Đại số tuyến tính',
          items: [
            { text: '1. Ma trận & Định thức', link: '/algebra/01-ma-tran-va-dinh-thuc' },
            { text: '2. Hệ phương trình tuyến tính', link: '/algebra/02-he-phuong-trinh-tuyen-tinh' },
            { text: '3. Không gian vectơ', link: '/algebra/03-khong-gian-vecto' },
            { text: '4. Không gian Euclide', link: '/algebra/04-khong-gian-euclide' },
            { text: '5. Ánh xạ tuyến tính & Chéo hóa', link: '/algebra/05-anh-xa-tuyen-tinh-cheo-hoa' },
            { text: '6. Dạng toàn phương', link: '/algebra/06-dang-toan-phuong' },
          ]
        }
      ],
      '/discrete-math/': [
        {
          text: 'Toán Rời Rạc & Ứng Dụng (7 Buổi)',
          items: [
            { text: 'Buổi 1: Logic Mệnh đề & Chân trị', link: '/discrete-math/buoi-1-logic-menh-de' },
            { text: 'Buổi 2: Vị từ, Suy diễn & Quy nạp', link: '/discrete-math/buoi-2-vi-tu-quy-nap' },
            { text: 'Buổi 3: Lý thuyết Tập hợp & Ánh xạ', link: '/discrete-math/buoi-3-tap-hop-anh-xa' },
            { text: 'Buổi 4: Quan hệ & Đại số Boole', link: '/discrete-math/buoi-4-quan-he-dai-so-boole' },
            { text: 'Buổi 5: Đại số Tổ hợp & Đếm', link: '/discrete-math/buoi-5-to-hop-dem' },
            { text: 'Buổi 6: Hệ thức Truy hồi', link: '/discrete-math/buoi-6-he-thuc-truy-hoi' },
            { text: 'Buổi 7: Lý thuyết Đồ thị & Cây', link: '/discrete-math/buoi-7-ly-thuyet-do-thi' },
          ]
        }
      ],
      '/exams-discrete/': [
        {
          text: 'Đề Thi & Lời Giải: Toán Rời Rạc',
          items: [
            { text: 'Đề Giữa kỳ GK 22-23', link: '/exams-discrete/gk-2022-2023' },
            { text: 'Đề Giữa kỳ GK 23-24', link: '/exams-discrete/gk-2023-2024' },
            { text: 'Đề KTHP 22-23 + Lời giải', link: '/exams-discrete/kthp-2022-2023' },
            { text: 'Đề KTHP 23-24 + Lời giải', link: '/exams-discrete/kthp-2023-2024' },
            { text: 'Đề KTHP 24-25 + Lời giải', link: '/exams-discrete/kthp-2024-2025' },
          ]
        }
      ],
      '/exercises/': [
        {
          text: 'Ngân hàng bài tập',
          items: [
            { text: 'Tổng quan bài tập', link: '/exercises/' },
            { text: 'Bài tập Giải tích', link: '/exercises/calculus' },
            { text: 'Bài tập Đại số tuyến tính', link: '/exercises/algebra' },
          ]
        }
      ],
      '/exams/': [
        {
          text: 'Đề Thi & Đáp Án: Cơ Sở Toán',
          items: [
            { text: 'Trắc nghiệm Giữa kỳ tương tác', link: '/exams/quiz-giua-ky' },
            { text: 'Đề KTHP 2022 - 2023', link: '/exams/de-2022-2023' },
            { text: 'Đề KTHP 2023 - 2024', link: '/exams/de-2023-2024' },
            { text: 'Đề KTHP 2024 - 2025', link: '/exams/de-2024-2025' },
            { text: 'Đề tham khảo kèm Barem điểm', link: '/exams/de-tham-khao-co-dap-an' },
          ]
        }
      ],
      '/cheatsheet/': [
        {
          text: 'Sổ tay công thức',
          items: [
            { text: 'Công thức tóm tắt trọng tâm', link: '/cheatsheet/cong-thuc-nhanh' },
            { text: 'Ôn tập kiến thức nền THPT', link: '/cheatsheet/kien-thuc-thpt' },
          ]
        }
      ]
    },
    docFooter: {
      prev: 'Trang trước',
      next: 'Trang tiếp theo'
    },
    footer: {
      message: 'Khoa Công nghệ Thông tin — Trường ĐH Sư phạm TP. Hồ Chí Minh (FIT HCMUE)',
      copyright: 'Cổng thông tin & Kho tài liệu học phần theo Khóa K52, K51, K50, K49 • Số hóa 100% web tĩnh'
    }
  }
})
