# 🔎 Tra Cứu Toàn Bộ Học Phần Khoa CNTT (Theo Khóa & Ngành)

Trang tra cứu danh mục học phần của cả 3 ngành (**CNTT, Sư Phạm Tin Học, Công Nghệ Giáo Dục**) với bộ lọc thông minh theo **Khóa đào tạo (K52, K51, K50, K49)**.

---

<script setup>
import { ref, computed } from 'vue'

const courses = [
  // HỌC KỲ 1 (K52)
  { code: 'COMP1010', name: 'Lập trình cơ bản', credits: 3, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1800', name: 'Cơ sở toán trong Công nghệ thông tin', credits: 4, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin', 'CNGD'], link: '/calculus/01-gioi-han-day-va-ham' },
  { code: 'COMP1801', name: 'Toán rời rạc và ứng dụng', credits: 2, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin'], link: '/discrete-math/buoi-1-logic-menh-de' },
  { code: 'COMP1802', name: 'Thiết kế web', credits: 2, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin'] },
  { code: 'EDTE1840', name: 'Nhập môn Công nghệ giáo dục', credits: 3, type: 'Bắt buộc', term: 1, majors: ['CNGD'] },
  { code: 'TECH1802', name: 'Cơ sở Vật lí', credits: 3, type: 'Bắt buộc', term: 1, majors: ['CNGD'] },
  { code: 'MILI2701', name: 'Đường lối quốc phòng và an ninh của ĐCSVN', credits: 3, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'POLI1903', name: 'Pháp luật đại cương', credits: 2, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'POLI2001', name: 'Triết học Mác – Lênin', credits: 3, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'PSYC1001', name: 'Tâm lý học đại cương', credits: 2, type: 'Bắt buộc', term: 1, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'PHYL2401', name: 'Giáo dục thể chất 1 (Thể dục - Điền kinh)', credits: 1, type: 'Bắt buộc/Tự chọn', term: 1, majors: ['CNTT', 'SP Tin', 'CNGD'] },

  // HỌC KỲ 2 (K52)
  { code: 'COMP1013', name: 'Lập trình nâng cao', credits: 3, type: 'Bắt buộc', term: 2, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1017', name: 'Lập trình hướng đối tượng', credits: 3, type: 'Bắt buộc', term: 2, majors: ['CNTT'] },
  { code: 'COMP1827', name: 'Xác suất thống kê và ứng dụng trong giáo dục', credits: 2, type: 'Bắt buộc', term: 2, majors: ['SP Tin'] },
  { code: 'MATH1703', name: 'Xác suất thống kê', credits: 2, type: 'Bắt buộc', term: 2, majors: ['CNGD'] },
  { code: 'EDTE1841', name: 'Giáo dục học đại cương', credits: 4, type: 'Bắt buộc', term: 2, majors: ['CNGD'] },
  { code: 'PSYC2802', name: 'Tâm lý học giáo dục', credits: 4, type: 'Bắt buộc', term: 2, majors: ['SP Tin'] },
  { code: 'PSYC2804', name: 'Phương pháp nghiên cứu khoa học', credits: 2, type: 'Bắt buộc', term: 2, majors: ['CNTT', 'CNGD'] },
  { code: 'COMP1810', name: 'Trí tuệ nhân tạo trong giáo dục', credits: 2, type: 'Tự chọn', term: 2, majors: ['SP Tin'] },
  { code: 'COMP1812', name: 'Trí tuệ nhân tạo và định hướng ứng dụng', credits: 2, type: 'Tự chọn', term: 2, majors: ['CNGD'] },
  { code: 'POLI2002', name: 'Kinh tế chính trị học Mác - Lênin', credits: 2, type: 'Bắt buộc', term: 2, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'POLI2003', name: 'Chủ nghĩa xã hội khoa học', credits: 2, type: 'Bắt buộc', term: 2, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'MILI2702', name: 'Công tác quốc phòng và an ninh', credits: 2, type: 'Bắt buộc', term: 2, majors: ['CNTT', 'SP Tin', 'CNGD'] },

  // HỌC KỲ 3 (K51)
  { code: 'COMP1016', name: 'Cấu trúc dữ liệu', credits: 3, type: 'Bắt buộc', term: 3, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1018', name: 'Cơ sở dữ liệu', credits: 3, type: 'Bắt buộc', term: 3, majors: ['CNTT'] },
  { code: 'COMP1019', name: 'Lập trình trên Windows', credits: 3, type: 'Bắt buộc', term: 3, majors: ['CNTT'] },
  { code: 'COMP1501', name: 'Xác suất thống kê và ứng dụng', credits: 3, type: 'Bắt buộc', term: 3, majors: ['CNTT'] },
  { code: 'COMP1701', name: 'Lý thuyết đồ thị và ứng dụng', credits: 3, type: 'Bắt buộc', term: 3, majors: ['CNTT', 'SP Tin'] },
  { code: 'EDTE1843', name: 'Phát triển chương trình Công nghệ giáo dục', credits: 3, type: 'Bắt buộc', term: 3, majors: ['CNGD'] },
  { code: 'EDTE1844', name: 'Lập trình cơ bản và thiết kế phần mềm', credits: 4, type: 'Bắt buộc', term: 3, majors: ['CNGD'] },
  { code: 'EDTE1845', name: 'Khoa học dữ liệu và ứng dụng trong giáo dục', credits: 4, type: 'Bắt buộc', term: 3, majors: ['CNGD'] },
  { code: 'EDUC2802', name: 'Giáo dục học', credits: 4, type: 'Bắt buộc', term: 3, majors: ['SP Tin'] },
  { code: 'POLI2005', name: 'Tư tưởng Hồ Chí Minh', credits: 2, type: 'Bắt buộc', term: 3, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'MILI2703', name: 'Quân sự chung', credits: 2, type: 'Bắt buộc', term: 3, majors: ['CNTT', 'SP Tin', 'CNGD'] },

  // HỌC KỲ 4 (K51)
  { code: 'COMP1011', name: 'Kiến trúc máy tính và hợp ngữ', credits: 3, type: 'Bắt buộc', term: 4, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1015', name: 'Nhập môn mạng máy tính', credits: 3, type: 'Bắt buộc', term: 4, majors: ['CNTT'] },
  { code: 'COMP1332', name: 'Hệ điều hành', credits: 3, type: 'Bắt buộc', term: 4, majors: ['CNTT'] },
  { code: 'COMP1401', name: 'Phân tích và thiết kế giải thuật', credits: 3, type: 'Bắt buộc', term: 4, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1829', name: 'Quản lý công việc hiệu quả theo Agile', credits: 2, type: 'Bắt buộc', term: 4, majors: ['CNTT'] },
  { code: 'EDUT2801', name: 'Phương pháp nghiên cứu khoa học và sư phạm ứng dụng', credits: 2, type: 'Bắt buộc', term: 4, majors: ['SP Tin'] },
  { code: 'EDUT2802', name: 'Đại cương về lí luận dạy học', credits: 2, type: 'Bắt buộc', term: 4, majors: ['SP Tin'] },
  { code: 'EDTE1842', name: 'Đánh giá trong giáo dục', credits: 2, type: 'Bắt buộc', term: 4, majors: ['CNGD'] },
  { code: 'EDTE1846', name: 'Mạng máy tính và internet', credits: 3, type: 'Bắt buộc', term: 4, majors: ['CNGD'] },
  { code: 'EDTE1847', name: 'Tổ chức sự kiện giáo dục', credits: 2, type: 'Bắt buộc', term: 4, majors: ['CNGD'] },
  { code: 'EDTE1849', name: 'Tiếng Anh chuyên ngành Công nghệ giáo dục', credits: 3, type: 'Bắt buộc', term: 4, majors: ['CNGD'] },
  { code: 'POLI2004', name: 'Lịch sử Đảng cộng sản Việt Nam', credits: 2, type: 'Bắt buộc', term: 4, majors: ['CNTT', 'SP Tin', 'CNGD'] },
  { code: 'MILI2704', name: 'Kỹ thuật chiến đấu bộ binh và chiến thuật', credits: 4, type: 'Bắt buộc', term: 4, majors: ['CNTT', 'SP Tin', 'CNGD'] },

  // HỌC KỲ 5 (K50)
  { code: 'COMP1044', name: 'Nhập môn công nghệ phần mềm', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1060', name: 'Phân tích thiết kế hướng đối tượng', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNTT'] },
  { code: 'COMP1314', name: 'Trí tuệ nhân tạo', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1818', name: 'Phương pháp dạy học môn Tin học', credits: 3, type: 'Bắt buộc', term: 5, majors: ['SP Tin'] },
  { code: 'COMP1819', name: 'Phát triển chương trình môn Tin học', credits: 3, type: 'Bắt buộc', term: 5, majors: ['SP Tin'] },
  { code: 'EDTE1802', name: 'Tổ chức hoạt động dạy học và giáo dục', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNGD'] },
  { code: 'EDTE1803', name: 'Thiết kế giảng dạy và mô hình', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNGD'] },
  { code: 'EDTE1806', name: 'E-Learning và môi trường học tập ảo', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNGD'] },
  { code: 'EDTE1808', name: 'Máy học và AI trong giáo dục', credits: 3, type: 'Bắt buộc', term: 5, majors: ['CNGD'] },
  { code: 'EDUC1810', name: 'Dịch vụ giáo dục trong tổ chức giáo dục', credits: 2, type: 'Bắt buộc', term: 5, majors: ['CNGD'] },
  { code: 'COMP1712', name: 'Học máy', credits: 3, type: 'Tự chọn/Bắt buộc', term: 5, majors: ['CNTT', 'SP Tin'] },
  { code: 'COMP1804', name: 'Lập trình Python', credits: 3, type: 'Tự chọn', term: 5, majors: ['CNTT'] },
  { code: 'COMP1050', name: 'Xử lý ảnh số', credits: 3, type: 'Tự chọn', term: 5, majors: ['CNTT'] },

  // HỌC KỲ 6 (K50)
  { code: 'COMP1502', name: 'Quy hoạch tuyến tính và ứng dụng', credits: 3, type: 'Bắt buộc', term: 6, majors: ['CNTT'] },
  { code: 'COMP1803', name: 'Lập trình PHP', credits: 3, type: 'Bắt buộc', term: 6, majors: ['CNTT'] },
  { code: 'COMP1032', name: 'Phân tích và thiết kế hệ thống thông tin', credits: 3, type: 'Bắt buộc/Tự chọn', term: 6, majors: ['SP Tin', 'CNTT'] },
  { code: 'COMP1807', name: 'Ứng dụng công nghệ thông tin trong dạy học môn Tin học', credits: 2, type: 'Bắt buộc', term: 6, majors: ['SP Tin'] },
  { code: 'COMP1817', name: 'Lập trình trực quan và Robotics', credits: 2, type: 'Bắt buộc', term: 6, majors: ['SP Tin'] },
  { code: 'COMP1828', name: 'Kiểm tra, đánh giá trong môn Tin học', credits: 2, type: 'Bắt buộc', term: 6, majors: ['SP Tin'] },
  { code: 'EDTE1804', name: 'Phát triển phần mềm giáo dục', credits: 3, type: 'Bắt buộc', term: 6, majors: ['CNGD'] },
  { code: 'EDTE1805', name: 'Phân tích dữ liệu học tập và ứng dụng', credits: 2, type: 'Bắt buộc', term: 6, majors: ['CNGD'] },
  { code: 'EDTE1850', name: 'Thực hành nghề nghiệp', credits: 3, type: 'Bắt buộc', term: 6, majors: ['CNGD'] },
  { code: 'COMP1031', name: 'Công nghệ Web', credits: 3, type: 'Tự chọn', term: 6, majors: ['CNTT'] },
  { code: 'COMP1042', name: 'Công nghệ JAVA', credits: 3, type: 'Tự chọn', term: 6, majors: ['CNTT'] },
  { code: 'COMP1704', name: 'Nhập môn DevOps', credits: 3, type: 'Tự chọn', term: 6, majors: ['CNTT'] },
  { code: 'COMP1715', name: 'Xử lý ngôn ngữ tự nhiên', credits: 3, type: 'Tự chọn', term: 6, majors: ['CNTT'] },

  // HỌC KỲ 7 (K49)
  { code: 'COMP1410', name: 'Thực tập nghề nghiệp 1', credits: 2, type: 'Bắt buộc', term: 7, majors: ['CNTT'] },
  { code: 'COMP1809', name: 'Thực hành nghề nghiệp', credits: 3, type: 'Bắt buộc', term: 7, majors: ['CNTT'] },
  { code: 'PSYC2803', name: 'Khởi nghiệp', credits: 2, type: 'Bắt buộc', term: 7, majors: ['CNTT', 'CNGD'] },
  { code: 'COMP1808', name: 'Thực hành dạy học môn Tin học', credits: 3, type: 'Bắt buộc', term: 7, majors: ['SP Tin'] },
  { code: 'COMP1816', name: 'Quản trị hệ thống thông tin', credits: 2, type: 'Bắt buộc', term: 7, majors: ['SP Tin'] },
  { code: 'COMP1820', name: 'Đào tạo điện tử (e-Learning) và ứng dụng', credits: 2, type: 'Bắt buộc', term: 7, majors: ['SP Tin'] },
  { code: 'COMP1823', name: 'Thực tập sư phạm 1', credits: 2, type: 'Bắt buộc', term: 7, majors: ['SP Tin'] },
  { code: 'EDTE1801', name: 'Tích hợp công nghệ giáo dục vào dạy học', credits: 2, type: 'Bắt buộc', term: 7, majors: ['CNGD'] },
  { code: 'EDTE1807', name: 'Học liệu số và truyền thông đa phương tiện', credits: 3, type: 'Bắt buộc', term: 7, majors: ['CNGD'] },
  { code: 'EDTE1851', name: 'Thực tập nghề nghiệp 1', credits: 2, type: 'Bắt buộc', term: 7, majors: ['CNGD'] },
  { code: 'COMP1313', name: 'Điện toán đám mây', credits: 3, type: 'Tự chọn', term: 7, majors: ['CNTT'] },
  { code: 'COMP1504', name: 'Thị giác máy tính và ứng dụng', credits: 3, type: 'Tự chọn', term: 7, majors: ['CNTT'] },
  { code: 'EDTE1836', name: 'Công nghệ thực tế ảo/thực tế tăng cường (VR/AR) và ứng dụng', credits: 2, type: 'Tự chọn', term: 7, majors: ['CNGD'] },

  // HỌC KỲ 8 (K49)
  { code: 'COMP1811', name: 'Thực tập nghề nghiệp 2', credits: 5, type: 'Bắt buộc', term: 8, majors: ['CNTT'] },
  { code: 'COMP1083', name: 'Khóa luận tốt nghiệp', credits: 6, type: 'Tự chọn', term: 8, majors: ['CNTT'] },
  { code: 'COMP1824', name: 'Thực tập sư phạm 2', credits: 5, type: 'Bắt buộc', term: 8, majors: ['SP Tin'] },
  { code: 'COMP1040', name: 'Khóa luận tốt nghiệp', credits: 6, type: 'Tự chọn', term: 8, majors: ['SP Tin'] },
  { code: 'EDTE1852', name: 'Thực tập nghề nghiệp 2', credits: 5, type: 'Bắt buộc', term: 8, majors: ['CNGD'] },
  { code: 'EDTE1864', name: 'Khóa luận tốt nghiệp', credits: 6, type: 'Tự chọn', term: 8, majors: ['CNGD'] }
]

const searchQuery = ref('')
const selectedMajor = ref('ALL')
const selectedCohort = ref('ALL')
const selectedTerm = ref('ALL')

const filteredCourses = computed(() => {
  return courses.filter(c => {
    const matchQuery = !searchQuery.value || 
      c.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchMajor = selectedMajor.value === 'ALL' || c.majors.includes(selectedMajor.value)
    
    let matchCohort = true
    if (selectedCohort.value === 'K52') matchCohort = (c.term === 1 || c.term === 2)
    else if (selectedCohort.value === 'K51') matchCohort = (c.term === 3 || c.term === 4)
    else if (selectedCohort.value === 'K50') matchCohort = (c.term === 5 || c.term === 6)
    else if (selectedCohort.value === 'K49') matchCohort = (c.term === 7 || c.term === 8)

    const matchTerm = selectedTerm.value === 'ALL' || c.term === Number(selectedTerm.value)
    
    return matchQuery && matchMajor && matchCohort && matchTerm
  })
})
</script>

<ClientOnly>
<div class="search-filter-box" style="margin: 20px 0; padding: 18px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background-color: var(--vp-c-bg-soft);">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 15px;">
    <div>
      <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Từ khóa tìm kiếm:</label>
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Nhập mã HP hoặc tên..." 
        style="width: 100%; padding: 8px 12px; border: 1px solid var(--vp-c-border); border-radius: 6px; background: var(--vp-c-bg); color: inherit;"
      />
    </div>

    <div>
      <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Khóa đào tạo:</label>
      <select 
        v-model="selectedCohort"
        style="width: 100%; padding: 8px 12px; border: 1px solid var(--vp-c-border); border-radius: 6px; background: var(--vp-c-bg); color: inherit;"
      >
        <option value="ALL">Tất cả các khóa</option>
        <option value="K52">⭐ Khóa 52 - Năm 1 (Hiện tại)</option>
        <option value="K51">Khóa 51 - Năm 2</option>
        <option value="K50">Khóa 50 - Năm 3</option>
        <option value="K49">Khóa 49 - Năm 4</option>
      </select>
    </div>

    <div>
      <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Ngành học:</label>
      <select 
        v-model="selectedMajor"
        style="width: 100%; padding: 8px 12px; border: 1px solid var(--vp-c-border); border-radius: 6px; background: var(--vp-c-bg); color: inherit;"
      >
        <option value="ALL">Tất cả các ngành</option>
        <option value="CNTT">Công nghệ Thông tin</option>
        <option value="SP Tin">Sư phạm Tin học</option>
        <option value="CNGD">Công nghệ Giáo dục</option>
      </select>
    </div>

    <div>
      <label style="font-size: 0.85rem; font-weight: bold; display: block; margin-bottom: 4px;">Học kỳ cụ thể:</label>
      <select 
        v-model="selectedTerm"
        style="width: 100%; padding: 8px 12px; border: 1px solid var(--vp-c-border); border-radius: 6px; background: var(--vp-c-bg); color: inherit;"
      >
        <option value="ALL">Tất cả học kỳ</option>
        <option v-for="t in 8" :key="t" :value="t">Học kỳ {{ t }}</option>
      </select>
    </div>
  </div>

  <div style="font-size: 0.9rem; color: var(--vp-c-text-2);">
    Tìm thấy <strong>{{ filteredCourses.length }}</strong> học phần phù hợp.
  </div>
</div>

<div style="overflow-x: auto; margin-top: 15px;">
  <table style="width: 100%; font-size: 0.9rem;">
    <thead>
      <tr>
        <th style="width: 110px;">Mã HP</th>
        <th>Tên học phần</th>
        <th style="width: 60px; text-align: center;">STC</th>
        <th style="width: 90px; text-align: center;">Khóa tương ứng</th>
        <th style="width: 80px; text-align: center;">Học kỳ</th>
        <th style="width: 110px;">Loại HP</th>
        <th>Ngành áp dụng</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in filteredCourses" :key="c.code + c.term">
        <td>
          <code style="font-weight: bold; color: var(--vp-c-brand-1);">{{ c.code }}</code>
        </td>
        <td>
          <a v-if="c.link" :href="c.link" style="font-weight: 600; text-decoration: underline;">{{ c.name }} ↗</a>
          <span v-else>{{ c.name }}</span>
        </td>
        <td style="text-align: center; font-weight: bold;">{{ c.credits }}</td>
        <td style="text-align: center; font-size: 0.85rem;">
          <span v-if="c.term <= 2" style="font-weight: bold; color: #10b981;">Khóa 52 (Năm 1)</span>
          <span v-else-if="c.term <= 4" style="font-weight: bold; color: #3b82f6;">Khóa 51 (Năm 2)</span>
          <span v-else-if="c.term <= 6" style="font-weight: bold; color: #8b5cf6;">Khóa 50 (Năm 3)</span>
          <span v-else style="font-weight: bold; color: #f59e0b;">Khóa 49 (Năm 4)</span>
        </td>
        <td style="text-align: center;">HK {{ c.term }}</td>
        <td>
          <span :style="{
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.8rem',
            background: c.type.includes('Bắt buộc') ? 'var(--vp-c-brand-soft)' : 'var(--vp-c-bg-alt)',
            color: c.type.includes('Bắt buộc') ? 'var(--vp-c-brand-1)' : 'inherit'
          }">{{ c.type }}</span>
        </td>
        <td>
          <span v-for="m in c.majors" :key="m" style="display: inline-block; background: var(--vp-c-bg-mute); border: 1px solid var(--vp-c-border); border-radius: 4px; padding: 1px 6px; margin-right: 4px; font-size: 0.75rem;">
            {{ m }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</ClientOnly>
