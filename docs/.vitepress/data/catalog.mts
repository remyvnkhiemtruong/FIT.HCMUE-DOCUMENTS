// Single source of truth. Curriculum data is provisional, not an official program.
export interface Major { id: string; short: string; name: string; code: string; version: string; verified: boolean }
export interface Course { code: string; name: string; description: string; path: string }
export interface Placement { major: string; version: string; course: string; term: number; credits: number; requirement: string; source: string; verified: boolean }
export interface Resource { id: string; course: string; kind: string; section: string; title: string; order: number; path: string; source: string; status: string; verified: boolean; year?: string }
export interface Cohort { id: string; startYear: number; programs: Record<string, string>; verified: boolean }
export const academicYear = 2026
export const repository = 'https://github.com/remyvnkhiemtruong/FIT.HCMUE-DOCUMENTS'
export const majors: Major[] = [
  {
    "id": "cntt",
    "short": "CNTT",
    "name": "Công nghệ Thông tin",
    "code": "7480201",
    "version": "du-lieu-hien-co",
    "verified": false
  },
  {
    "id": "sp-tin",
    "short": "SP Tin",
    "name": "Sư phạm Tin học",
    "code": "7140210",
    "version": "du-lieu-hien-co",
    "verified": false
  },
  {
    "id": "cngd",
    "short": "CNGD",
    "name": "Công nghệ Giáo dục",
    "code": "7140103",
    "version": "du-lieu-hien-co",
    "verified": false
  }
]
export const courses: Course[] = [
  {
    "code": "COMP1010",
    "name": "Lập trình cơ bản",
    "description": "Thông tin và học liệu môn Lập trình cơ bản.",
    "path": "/mon-hoc/comp1010/"
  },
  {
    "code": "COMP1800",
    "name": "Cơ sở toán trong Công nghệ thông tin",
    "description": "Thông tin và học liệu môn Cơ sở toán trong Công nghệ thông tin.",
    "path": "/mon-hoc/comp1800/"
  },
  {
    "code": "COMP1801",
    "name": "Toán rời rạc và ứng dụng",
    "description": "Thông tin và học liệu môn Toán rời rạc và ứng dụng.",
    "path": "/mon-hoc/comp1801/"
  },
  {
    "code": "COMP1802",
    "name": "Thiết kế web",
    "description": "Thông tin và học liệu môn Thiết kế web.",
    "path": "/mon-hoc/comp1802/"
  },
  {
    "code": "EDTE1840",
    "name": "Nhập môn Công nghệ giáo dục",
    "description": "Thông tin và học liệu môn Nhập môn Công nghệ giáo dục.",
    "path": "/mon-hoc/edte1840/"
  },
  {
    "code": "TECH1802",
    "name": "Cơ sở Vật lí",
    "description": "Thông tin và học liệu môn Cơ sở Vật lí.",
    "path": "/mon-hoc/tech1802/"
  },
  {
    "code": "MILI2701",
    "name": "Đường lối quốc phòng và an ninh của ĐCSVN",
    "description": "Thông tin và học liệu môn Đường lối quốc phòng và an ninh của ĐCSVN.",
    "path": "/mon-hoc/mili2701/"
  },
  {
    "code": "POLI1903",
    "name": "Pháp luật đại cương",
    "description": "Thông tin và học liệu môn Pháp luật đại cương.",
    "path": "/mon-hoc/poli1903/"
  },
  {
    "code": "POLI2001",
    "name": "Triết học Mác – Lênin",
    "description": "Thông tin và học liệu môn Triết học Mác – Lênin.",
    "path": "/mon-hoc/poli2001/"
  },
  {
    "code": "PSYC1001",
    "name": "Tâm lý học đại cương",
    "description": "Thông tin và học liệu môn Tâm lý học đại cương.",
    "path": "/mon-hoc/psyc1001/"
  },
  {
    "code": "PHYL2401",
    "name": "Giáo dục thể chất 1 (Thể dục - Điền kinh)",
    "description": "Thông tin và học liệu môn Giáo dục thể chất 1 (Thể dục - Điền kinh).",
    "path": "/mon-hoc/phyl2401/"
  },
  {
    "code": "COMP1013",
    "name": "Lập trình nâng cao",
    "description": "Thông tin và học liệu môn Lập trình nâng cao.",
    "path": "/mon-hoc/comp1013/"
  },
  {
    "code": "COMP1017",
    "name": "Lập trình hướng đối tượng",
    "description": "Thông tin và học liệu môn Lập trình hướng đối tượng.",
    "path": "/mon-hoc/comp1017/"
  },
  {
    "code": "COMP1827",
    "name": "Xác suất thống kê và ứng dụng trong giáo dục",
    "description": "Thông tin và học liệu môn Xác suất thống kê và ứng dụng trong giáo dục.",
    "path": "/mon-hoc/comp1827/"
  },
  {
    "code": "MATH1703",
    "name": "Xác suất thống kê",
    "description": "Thông tin và học liệu môn Xác suất thống kê.",
    "path": "/mon-hoc/math1703/"
  },
  {
    "code": "EDTE1841",
    "name": "Giáo dục học đại cương",
    "description": "Thông tin và học liệu môn Giáo dục học đại cương.",
    "path": "/mon-hoc/edte1841/"
  },
  {
    "code": "PSYC2802",
    "name": "Tâm lý học giáo dục",
    "description": "Thông tin và học liệu môn Tâm lý học giáo dục.",
    "path": "/mon-hoc/psyc2802/"
  },
  {
    "code": "PSYC2804",
    "name": "Phương pháp nghiên cứu khoa học",
    "description": "Thông tin và học liệu môn Phương pháp nghiên cứu khoa học.",
    "path": "/mon-hoc/psyc2804/"
  },
  {
    "code": "COMP1810",
    "name": "Trí tuệ nhân tạo trong giáo dục",
    "description": "Thông tin và học liệu môn Trí tuệ nhân tạo trong giáo dục.",
    "path": "/mon-hoc/comp1810/"
  },
  {
    "code": "COMP1812",
    "name": "Trí tuệ nhân tạo và định hướng ứng dụng",
    "description": "Thông tin và học liệu môn Trí tuệ nhân tạo và định hướng ứng dụng.",
    "path": "/mon-hoc/comp1812/"
  },
  {
    "code": "POLI2002",
    "name": "Kinh tế chính trị học Mác - Lênin",
    "description": "Thông tin và học liệu môn Kinh tế chính trị học Mác - Lênin.",
    "path": "/mon-hoc/poli2002/"
  },
  {
    "code": "POLI2003",
    "name": "Chủ nghĩa xã hội khoa học",
    "description": "Thông tin và học liệu môn Chủ nghĩa xã hội khoa học.",
    "path": "/mon-hoc/poli2003/"
  },
  {
    "code": "MILI2702",
    "name": "Công tác quốc phòng và an ninh",
    "description": "Thông tin và học liệu môn Công tác quốc phòng và an ninh.",
    "path": "/mon-hoc/mili2702/"
  },
  {
    "code": "COMP1016",
    "name": "Cấu trúc dữ liệu",
    "description": "Thông tin và học liệu môn Cấu trúc dữ liệu.",
    "path": "/mon-hoc/comp1016/"
  },
  {
    "code": "COMP1018",
    "name": "Cơ sở dữ liệu",
    "description": "Thông tin và học liệu môn Cơ sở dữ liệu.",
    "path": "/mon-hoc/comp1018/"
  },
  {
    "code": "COMP1019",
    "name": "Lập trình trên Windows",
    "description": "Thông tin và học liệu môn Lập trình trên Windows.",
    "path": "/mon-hoc/comp1019/"
  },
  {
    "code": "COMP1501",
    "name": "Xác suất thống kê và ứng dụng",
    "description": "Thông tin và học liệu môn Xác suất thống kê và ứng dụng.",
    "path": "/mon-hoc/comp1501/"
  },
  {
    "code": "COMP1701",
    "name": "Lý thuyết đồ thị và ứng dụng",
    "description": "Thông tin và học liệu môn Lý thuyết đồ thị và ứng dụng.",
    "path": "/mon-hoc/comp1701/"
  },
  {
    "code": "EDTE1843",
    "name": "Phát triển chương trình Công nghệ giáo dục",
    "description": "Thông tin và học liệu môn Phát triển chương trình Công nghệ giáo dục.",
    "path": "/mon-hoc/edte1843/"
  },
  {
    "code": "EDTE1844",
    "name": "Lập trình cơ bản và thiết kế phần mềm",
    "description": "Thông tin và học liệu môn Lập trình cơ bản và thiết kế phần mềm.",
    "path": "/mon-hoc/edte1844/"
  },
  {
    "code": "EDTE1845",
    "name": "Khoa học dữ liệu và ứng dụng trong giáo dục",
    "description": "Thông tin và học liệu môn Khoa học dữ liệu và ứng dụng trong giáo dục.",
    "path": "/mon-hoc/edte1845/"
  },
  {
    "code": "EDUC2802",
    "name": "Giáo dục học",
    "description": "Thông tin và học liệu môn Giáo dục học.",
    "path": "/mon-hoc/educ2802/"
  },
  {
    "code": "POLI2005",
    "name": "Tư tưởng Hồ Chí Minh",
    "description": "Thông tin và học liệu môn Tư tưởng Hồ Chí Minh.",
    "path": "/mon-hoc/poli2005/"
  },
  {
    "code": "MILI2703",
    "name": "Quân sự chung",
    "description": "Thông tin và học liệu môn Quân sự chung.",
    "path": "/mon-hoc/mili2703/"
  },
  {
    "code": "COMP1011",
    "name": "Kiến trúc máy tính và hợp ngữ",
    "description": "Thông tin và học liệu môn Kiến trúc máy tính và hợp ngữ.",
    "path": "/mon-hoc/comp1011/"
  },
  {
    "code": "COMP1015",
    "name": "Nhập môn mạng máy tính",
    "description": "Thông tin và học liệu môn Nhập môn mạng máy tính.",
    "path": "/mon-hoc/comp1015/"
  },
  {
    "code": "COMP1332",
    "name": "Hệ điều hành",
    "description": "Thông tin và học liệu môn Hệ điều hành.",
    "path": "/mon-hoc/comp1332/"
  },
  {
    "code": "COMP1401",
    "name": "Phân tích và thiết kế giải thuật",
    "description": "Thông tin và học liệu môn Phân tích và thiết kế giải thuật.",
    "path": "/mon-hoc/comp1401/"
  },
  {
    "code": "COMP1829",
    "name": "Quản lý công việc hiệu quả theo Agile",
    "description": "Thông tin và học liệu môn Quản lý công việc hiệu quả theo Agile.",
    "path": "/mon-hoc/comp1829/"
  },
  {
    "code": "EDUT2801",
    "name": "Phương pháp nghiên cứu khoa học và sư phạm ứng dụng",
    "description": "Thông tin và học liệu môn Phương pháp nghiên cứu khoa học và sư phạm ứng dụng.",
    "path": "/mon-hoc/edut2801/"
  },
  {
    "code": "EDUT2802",
    "name": "Đại cương về lí luận dạy học",
    "description": "Thông tin và học liệu môn Đại cương về lí luận dạy học.",
    "path": "/mon-hoc/edut2802/"
  },
  {
    "code": "EDTE1842",
    "name": "Đánh giá trong giáo dục",
    "description": "Thông tin và học liệu môn Đánh giá trong giáo dục.",
    "path": "/mon-hoc/edte1842/"
  },
  {
    "code": "EDTE1846",
    "name": "Mạng máy tính và internet",
    "description": "Thông tin và học liệu môn Mạng máy tính và internet.",
    "path": "/mon-hoc/edte1846/"
  },
  {
    "code": "EDTE1847",
    "name": "Tổ chức sự kiện giáo dục",
    "description": "Thông tin và học liệu môn Tổ chức sự kiện giáo dục.",
    "path": "/mon-hoc/edte1847/"
  },
  {
    "code": "EDTE1849",
    "name": "Tiếng Anh chuyên ngành Công nghệ giáo dục",
    "description": "Thông tin và học liệu môn Tiếng Anh chuyên ngành Công nghệ giáo dục.",
    "path": "/mon-hoc/edte1849/"
  },
  {
    "code": "POLI2004",
    "name": "Lịch sử Đảng cộng sản Việt Nam",
    "description": "Thông tin và học liệu môn Lịch sử Đảng cộng sản Việt Nam.",
    "path": "/mon-hoc/poli2004/"
  },
  {
    "code": "MILI2704",
    "name": "Kỹ thuật chiến đấu bộ binh và chiến thuật",
    "description": "Thông tin và học liệu môn Kỹ thuật chiến đấu bộ binh và chiến thuật.",
    "path": "/mon-hoc/mili2704/"
  },
  {
    "code": "COMP1044",
    "name": "Nhập môn công nghệ phần mềm",
    "description": "Thông tin và học liệu môn Nhập môn công nghệ phần mềm.",
    "path": "/mon-hoc/comp1044/"
  },
  {
    "code": "COMP1060",
    "name": "Phân tích thiết kế hướng đối tượng",
    "description": "Thông tin và học liệu môn Phân tích thiết kế hướng đối tượng.",
    "path": "/mon-hoc/comp1060/"
  },
  {
    "code": "COMP1314",
    "name": "Trí tuệ nhân tạo",
    "description": "Thông tin và học liệu môn Trí tuệ nhân tạo.",
    "path": "/mon-hoc/comp1314/"
  },
  {
    "code": "COMP1818",
    "name": "Phương pháp dạy học môn Tin học",
    "description": "Thông tin và học liệu môn Phương pháp dạy học môn Tin học.",
    "path": "/mon-hoc/comp1818/"
  },
  {
    "code": "COMP1819",
    "name": "Phát triển chương trình môn Tin học",
    "description": "Thông tin và học liệu môn Phát triển chương trình môn Tin học.",
    "path": "/mon-hoc/comp1819/"
  },
  {
    "code": "EDTE1802",
    "name": "Tổ chức hoạt động dạy học và giáo dục",
    "description": "Thông tin và học liệu môn Tổ chức hoạt động dạy học và giáo dục.",
    "path": "/mon-hoc/edte1802/"
  },
  {
    "code": "EDTE1803",
    "name": "Thiết kế giảng dạy và mô hình",
    "description": "Thông tin và học liệu môn Thiết kế giảng dạy và mô hình.",
    "path": "/mon-hoc/edte1803/"
  },
  {
    "code": "EDTE1806",
    "name": "E-Learning và môi trường học tập ảo",
    "description": "Thông tin và học liệu môn E-Learning và môi trường học tập ảo.",
    "path": "/mon-hoc/edte1806/"
  },
  {
    "code": "EDTE1808",
    "name": "Máy học và AI trong giáo dục",
    "description": "Thông tin và học liệu môn Máy học và AI trong giáo dục.",
    "path": "/mon-hoc/edte1808/"
  },
  {
    "code": "EDUC1810",
    "name": "Dịch vụ giáo dục trong tổ chức giáo dục",
    "description": "Thông tin và học liệu môn Dịch vụ giáo dục trong tổ chức giáo dục.",
    "path": "/mon-hoc/educ1810/"
  },
  {
    "code": "COMP1712",
    "name": "Học máy",
    "description": "Thông tin và học liệu môn Học máy.",
    "path": "/mon-hoc/comp1712/"
  },
  {
    "code": "COMP1804",
    "name": "Lập trình Python",
    "description": "Thông tin và học liệu môn Lập trình Python.",
    "path": "/mon-hoc/comp1804/"
  },
  {
    "code": "COMP1050",
    "name": "Xử lý ảnh số",
    "description": "Thông tin và học liệu môn Xử lý ảnh số.",
    "path": "/mon-hoc/comp1050/"
  },
  {
    "code": "COMP1502",
    "name": "Quy hoạch tuyến tính và ứng dụng",
    "description": "Thông tin và học liệu môn Quy hoạch tuyến tính và ứng dụng.",
    "path": "/mon-hoc/comp1502/"
  },
  {
    "code": "COMP1803",
    "name": "Lập trình PHP",
    "description": "Thông tin và học liệu môn Lập trình PHP.",
    "path": "/mon-hoc/comp1803/"
  },
  {
    "code": "COMP1032",
    "name": "Phân tích và thiết kế hệ thống thông tin",
    "description": "Thông tin và học liệu môn Phân tích và thiết kế hệ thống thông tin.",
    "path": "/mon-hoc/comp1032/"
  },
  {
    "code": "COMP1807",
    "name": "Ứng dụng công nghệ thông tin trong dạy học môn Tin học",
    "description": "Thông tin và học liệu môn Ứng dụng công nghệ thông tin trong dạy học môn Tin học.",
    "path": "/mon-hoc/comp1807/"
  },
  {
    "code": "COMP1817",
    "name": "Lập trình trực quan và Robotics",
    "description": "Thông tin và học liệu môn Lập trình trực quan và Robotics.",
    "path": "/mon-hoc/comp1817/"
  },
  {
    "code": "COMP1828",
    "name": "Kiểm tra, đánh giá trong môn Tin học",
    "description": "Thông tin và học liệu môn Kiểm tra, đánh giá trong môn Tin học.",
    "path": "/mon-hoc/comp1828/"
  },
  {
    "code": "EDTE1804",
    "name": "Phát triển phần mềm giáo dục",
    "description": "Thông tin và học liệu môn Phát triển phần mềm giáo dục.",
    "path": "/mon-hoc/edte1804/"
  },
  {
    "code": "EDTE1805",
    "name": "Phân tích dữ liệu học tập và ứng dụng",
    "description": "Thông tin và học liệu môn Phân tích dữ liệu học tập và ứng dụng.",
    "path": "/mon-hoc/edte1805/"
  },
  {
    "code": "EDTE1850",
    "name": "Thực hành nghề nghiệp",
    "description": "Thông tin và học liệu môn Thực hành nghề nghiệp.",
    "path": "/mon-hoc/edte1850/"
  },
  {
    "code": "COMP1031",
    "name": "Công nghệ Web",
    "description": "Thông tin và học liệu môn Công nghệ Web.",
    "path": "/mon-hoc/comp1031/"
  },
  {
    "code": "COMP1042",
    "name": "Công nghệ JAVA",
    "description": "Thông tin và học liệu môn Công nghệ JAVA.",
    "path": "/mon-hoc/comp1042/"
  },
  {
    "code": "COMP1704",
    "name": "Nhập môn DevOps",
    "description": "Thông tin và học liệu môn Nhập môn DevOps.",
    "path": "/mon-hoc/comp1704/"
  },
  {
    "code": "COMP1715",
    "name": "Xử lý ngôn ngữ tự nhiên",
    "description": "Thông tin và học liệu môn Xử lý ngôn ngữ tự nhiên.",
    "path": "/mon-hoc/comp1715/"
  },
  {
    "code": "COMP1410",
    "name": "Thực tập nghề nghiệp 1",
    "description": "Thông tin và học liệu môn Thực tập nghề nghiệp 1.",
    "path": "/mon-hoc/comp1410/"
  },
  {
    "code": "COMP1809",
    "name": "Thực hành nghề nghiệp",
    "description": "Thông tin và học liệu môn Thực hành nghề nghiệp.",
    "path": "/mon-hoc/comp1809/"
  },
  {
    "code": "PSYC2803",
    "name": "Khởi nghiệp",
    "description": "Thông tin và học liệu môn Khởi nghiệp.",
    "path": "/mon-hoc/psyc2803/"
  },
  {
    "code": "COMP1808",
    "name": "Thực hành dạy học môn Tin học",
    "description": "Thông tin và học liệu môn Thực hành dạy học môn Tin học.",
    "path": "/mon-hoc/comp1808/"
  },
  {
    "code": "COMP1816",
    "name": "Quản trị hệ thống thông tin",
    "description": "Thông tin và học liệu môn Quản trị hệ thống thông tin.",
    "path": "/mon-hoc/comp1816/"
  },
  {
    "code": "COMP1820",
    "name": "Đào tạo điện tử (e-Learning) và ứng dụng",
    "description": "Thông tin và học liệu môn Đào tạo điện tử (e-Learning) và ứng dụng.",
    "path": "/mon-hoc/comp1820/"
  },
  {
    "code": "COMP1823",
    "name": "Thực tập sư phạm 1",
    "description": "Thông tin và học liệu môn Thực tập sư phạm 1.",
    "path": "/mon-hoc/comp1823/"
  },
  {
    "code": "EDTE1801",
    "name": "Tích hợp công nghệ giáo dục vào dạy học",
    "description": "Thông tin và học liệu môn Tích hợp công nghệ giáo dục vào dạy học.",
    "path": "/mon-hoc/edte1801/"
  },
  {
    "code": "EDTE1807",
    "name": "Học liệu số và truyền thông đa phương tiện",
    "description": "Thông tin và học liệu môn Học liệu số và truyền thông đa phương tiện.",
    "path": "/mon-hoc/edte1807/"
  },
  {
    "code": "EDTE1851",
    "name": "Thực tập nghề nghiệp 1",
    "description": "Thông tin và học liệu môn Thực tập nghề nghiệp 1.",
    "path": "/mon-hoc/edte1851/"
  },
  {
    "code": "COMP1313",
    "name": "Điện toán đám mây",
    "description": "Thông tin và học liệu môn Điện toán đám mây.",
    "path": "/mon-hoc/comp1313/"
  },
  {
    "code": "COMP1504",
    "name": "Thị giác máy tính và ứng dụng",
    "description": "Thông tin và học liệu môn Thị giác máy tính và ứng dụng.",
    "path": "/mon-hoc/comp1504/"
  },
  {
    "code": "EDTE1836",
    "name": "Công nghệ thực tế ảo/thực tế tăng cường (VR/AR) và ứng dụng",
    "description": "Thông tin và học liệu môn Công nghệ thực tế ảo/thực tế tăng cường (VR/AR) và ứng dụng.",
    "path": "/mon-hoc/edte1836/"
  },
  {
    "code": "COMP1811",
    "name": "Thực tập nghề nghiệp 2",
    "description": "Thông tin và học liệu môn Thực tập nghề nghiệp 2.",
    "path": "/mon-hoc/comp1811/"
  },
  {
    "code": "COMP1083",
    "name": "Khóa luận tốt nghiệp",
    "description": "Thông tin và học liệu môn Khóa luận tốt nghiệp.",
    "path": "/mon-hoc/comp1083/"
  },
  {
    "code": "COMP1824",
    "name": "Thực tập sư phạm 2",
    "description": "Thông tin và học liệu môn Thực tập sư phạm 2.",
    "path": "/mon-hoc/comp1824/"
  },
  {
    "code": "COMP1040",
    "name": "Khóa luận tốt nghiệp",
    "description": "Thông tin và học liệu môn Khóa luận tốt nghiệp.",
    "path": "/mon-hoc/comp1040/"
  },
  {
    "code": "EDTE1852",
    "name": "Thực tập nghề nghiệp 2",
    "description": "Thông tin và học liệu môn Thực tập nghề nghiệp 2.",
    "path": "/mon-hoc/edte1852/"
  },
  {
    "code": "EDTE1864",
    "name": "Khóa luận tốt nghiệp",
    "description": "Thông tin và học liệu môn Khóa luận tốt nghiệp.",
    "path": "/mon-hoc/edte1864/"
  },
  {
    "code": "PHYL2",
    "name": "Giáo dục Thể chất 2",
    "description": "Thông tin và học liệu môn Giáo dục Thể chất 2.",
    "path": "/mon-hoc/phyl2/"
  },
  {
    "code": "DOMS0",
    "name": "Giáo dục đời sống",
    "description": "Thông tin và học liệu môn Giáo dục đời sống.",
    "path": "/mon-hoc/doms0/"
  },
  {
    "code": "EDUC2801",
    "name": "Phương pháp học tập hiệu quả",
    "description": "Thông tin và học liệu môn Phương pháp học tập hiệu quả.",
    "path": "/mon-hoc/educ2801/"
  },
  {
    "code": "PSYC1493",
    "name": "Kỹ năng thích ứng và giải quyết vấn đề",
    "description": "Thông tin và học liệu môn Kỹ năng thích ứng và giải quyết vấn đề.",
    "path": "/mon-hoc/psyc1493/"
  },
  {
    "code": "PSYC2801",
    "name": "Kỹ năng làm việc nhóm và tư duy sáng tạo",
    "description": "Thông tin và học liệu môn Kỹ năng làm việc nhóm và tư duy sáng tạo.",
    "path": "/mon-hoc/psyc2801/"
  },
  {
    "code": "PHYL3",
    "name": "Giáo dục Thể chất 3",
    "description": "Thông tin và học liệu môn Giáo dục Thể chất 3.",
    "path": "/mon-hoc/phyl3/"
  },
  {
    "code": "COMP1024",
    "name": "Các hệ cơ sở dữ liệu",
    "description": "Thông tin và học liệu môn Các hệ cơ sở dữ liệu.",
    "path": "/mon-hoc/comp1024/"
  },
  {
    "code": "COMP1041",
    "name": "Cơ sở dữ liệu nâng cao",
    "description": "Thông tin và học liệu môn Cơ sở dữ liệu nâng cao.",
    "path": "/mon-hoc/comp1041/"
  },
  {
    "code": "COMP1043",
    "name": "Hệ thống mã nguồn mở",
    "description": "Thông tin và học liệu môn Hệ thống mã nguồn mở.",
    "path": "/mon-hoc/comp1043/"
  },
  {
    "code": "COMP1071",
    "name": "Nghi thức giao tiếp mạng (CISCO 1)",
    "description": "Thông tin và học liệu môn Nghi thức giao tiếp mạng (CISCO 1).",
    "path": "/mon-hoc/comp1071/"
  },
  {
    "code": "COMP1304",
    "name": "Phát triển ứng dụng trên thiết bị di động",
    "description": "Thông tin và học liệu môn Phát triển ứng dụng trên thiết bị di động.",
    "path": "/mon-hoc/comp1304/"
  },
  {
    "code": "COMP1305",
    "name": "Quản lý dự án Công nghệ Thông tin",
    "description": "Thông tin và học liệu môn Quản lý dự án Công nghệ Thông tin.",
    "path": "/mon-hoc/comp1305/"
  },
  {
    "code": "COMP1307",
    "name": "Kiểm thử phần mềm cơ bản",
    "description": "Thông tin và học liệu môn Kiểm thử phần mềm cơ bản.",
    "path": "/mon-hoc/comp1307/"
  },
  {
    "code": "COMP1308",
    "name": "Phát triển ứng dụng trò chơi",
    "description": "Thông tin và học liệu môn Phát triển ứng dụng trò chơi.",
    "path": "/mon-hoc/comp1308/"
  },
  {
    "code": "COMP1709",
    "name": "Hệ thống nhúng và ứng dụng",
    "description": "Thông tin và học liệu môn Hệ thống nhúng và ứng dụng.",
    "path": "/mon-hoc/comp1709/"
  },
  {
    "code": "COMP1046",
    "name": "Các hệ cơ sở tri thức",
    "description": "Thông tin và học liệu môn Các hệ cơ sở tri thức.",
    "path": "/mon-hoc/comp1046/"
  },
  {
    "code": "COMP1047",
    "name": "Đồ hoạ máy tính",
    "description": "Thông tin và học liệu môn Đồ hoạ máy tính.",
    "path": "/mon-hoc/comp1047/"
  },
  {
    "code": "COMP1064",
    "name": "Công nghệ .NET",
    "description": "Thông tin và học liệu môn Công nghệ .NET.",
    "path": "/mon-hoc/comp1064/"
  },
  {
    "code": "COMP1065",
    "name": "Chuyên đề Oracle",
    "description": "Thông tin và học liệu môn Chuyên đề Oracle.",
    "path": "/mon-hoc/comp1065/"
  },
  {
    "code": "COMP1076",
    "name": "Quản trị mạng với Linux",
    "description": "Thông tin và học liệu môn Quản trị mạng với Linux.",
    "path": "/mon-hoc/comp1076/"
  },
  {
    "code": "COMP1085",
    "name": "Hệ thống quản trị doanh nghiệp",
    "description": "Thông tin và học liệu môn Hệ thống quản trị doanh nghiệp.",
    "path": "/mon-hoc/comp1085/"
  },
  {
    "code": "COMP1306",
    "name": "Xây dựng dự án Công nghệ thông tin",
    "description": "Thông tin và học liệu môn Xây dựng dự án Công nghệ thông tin.",
    "path": "/mon-hoc/comp1306/"
  },
  {
    "code": "COMP1310",
    "name": "Hệ tư vấn thông tin",
    "description": "Thông tin và học liệu môn Hệ tư vấn thông tin.",
    "path": "/mon-hoc/comp1310/"
  },
  {
    "code": "COMP1311",
    "name": "Bảo mật cơ sở dữ liệu",
    "description": "Thông tin và học liệu môn Bảo mật cơ sở dữ liệu.",
    "path": "/mon-hoc/comp1311/"
  },
  {
    "code": "COMP1315",
    "name": "Khai thác dữ liệu và ứng dụng",
    "description": "Thông tin và học liệu môn Khai thác dữ liệu và ứng dụng.",
    "path": "/mon-hoc/comp1315/"
  },
  {
    "code": "COMP1318",
    "name": "Các phương pháp học thống kê",
    "description": "Thông tin và học liệu môn Các phương pháp học thống kê.",
    "path": "/mon-hoc/comp1318/"
  },
  {
    "code": "COMP1326",
    "name": "Lắp ráp, cài đặt và bảo trì máy tính",
    "description": "Thông tin và học liệu môn Lắp ráp, cài đặt và bảo trì máy tính.",
    "path": "/mon-hoc/comp1326/"
  },
  {
    "code": "COMP1069",
    "name": "Công nghệ phần mềm nâng cao",
    "description": "Thông tin và học liệu môn Công nghệ phần mềm nâng cao.",
    "path": "/mon-hoc/comp1069/"
  },
  {
    "code": "COMP1084",
    "name": "Thương mại điện tử",
    "description": "Thông tin và học liệu môn Thương mại điện tử.",
    "path": "/mon-hoc/comp1084/"
  },
  {
    "code": "COMP1309",
    "name": "Kiểm thử phần mềm nâng cao",
    "description": "Thông tin và học liệu môn Kiểm thử phần mềm nâng cao.",
    "path": "/mon-hoc/comp1309/"
  },
  {
    "code": "COMP1325",
    "name": "Máy học nâng cao",
    "description": "Thông tin và học liệu môn Máy học nâng cao.",
    "path": "/mon-hoc/comp1325/"
  },
  {
    "code": "COMP1703",
    "name": "Phát triển ứng dụng di động nâng cao",
    "description": "Thông tin và học liệu môn Phát triển ứng dụng di động nâng cao.",
    "path": "/mon-hoc/comp1703/"
  },
  {
    "code": "COMP1714",
    "name": "Khai thác dữ liệu văn bản",
    "description": "Thông tin và học liệu môn Khai thác dữ liệu văn bản.",
    "path": "/mon-hoc/comp1714/"
  },
  {
    "code": "COMP1813",
    "name": "Hồ sơ tốt nghiệp",
    "description": "Thông tin và học liệu môn Hồ sơ tốt nghiệp.",
    "path": "/mon-hoc/comp1813/"
  },
  {
    "code": "EDUC2803",
    "name": "Khởi nghiệp và giáo dục khởi nghiệp",
    "description": "Thông tin và học liệu môn Khởi nghiệp và giáo dục khởi nghiệp.",
    "path": "/mon-hoc/educ2803/"
  },
  {
    "code": "COMP1821",
    "name": "Dạy học lập trình nâng cao ở trường PT",
    "description": "Thông tin và học liệu môn Dạy học lập trình nâng cao ở trường PT.",
    "path": "/mon-hoc/comp1821/"
  },
  {
    "code": "COMP1822",
    "name": "Dạy học chuyên đề học tập môn Tin học",
    "description": "Thông tin và học liệu môn Dạy học chuyên đề học tập môn Tin học.",
    "path": "/mon-hoc/comp1822/"
  },
  {
    "code": "COMP1825",
    "name": "Tổ chức dạy học chủ đề STEM ở trường PT",
    "description": "Thông tin và học liệu môn Tổ chức dạy học chủ đề STEM ở trường PT.",
    "path": "/mon-hoc/comp1825/"
  },
  {
    "code": "COMP1814",
    "name": "Sản phẩm nghiên cứu",
    "description": "Thông tin và học liệu môn Sản phẩm nghiên cứu.",
    "path": "/mon-hoc/comp1814/"
  },
  {
    "code": "COMP1826",
    "name": "Hồ sơ tốt nghiệp",
    "description": "Thông tin và học liệu môn Hồ sơ tốt nghiệp.",
    "path": "/mon-hoc/comp1826/"
  },
  {
    "code": "EDTE1860",
    "name": "Lãnh đạo và quản lí lớp học",
    "description": "Thông tin và học liệu môn Lãnh đạo và quản lí lớp học.",
    "path": "/mon-hoc/edte1860/"
  },
  {
    "code": "EDTE1861",
    "name": "Phương tiện & thiết bị dạy học trong môi trường số",
    "description": "Thông tin và học liệu môn Phương tiện & thiết bị dạy học trong môi trường số.",
    "path": "/mon-hoc/edte1861/"
  },
  {
    "code": "EDTE1862",
    "name": "An ninh mạng và bảo mật dữ liệu",
    "description": "Thông tin và học liệu môn An ninh mạng và bảo mật dữ liệu.",
    "path": "/mon-hoc/edte1862/"
  },
  {
    "code": "EDTE1863",
    "name": "Phân tích và thiết kế HTTT giáo dục",
    "description": "Thông tin và học liệu môn Phân tích và thiết kế HTTT giáo dục.",
    "path": "/mon-hoc/edte1863/"
  },
  {
    "code": "EDTE1811",
    "name": "Thiết kế dạy học với các công cụ thông minh",
    "description": "Thông tin và học liệu môn Thiết kế dạy học với các công cụ thông minh.",
    "path": "/mon-hoc/edte1811/"
  },
  {
    "code": "EDTE1812",
    "name": "Lựa chọn công nghệ & thiết kế HĐ trực tuyến",
    "description": "Thông tin và học liệu môn Lựa chọn công nghệ & thiết kế HĐ trực tuyến.",
    "path": "/mon-hoc/edte1812/"
  },
  {
    "code": "EDTE1813",
    "name": "Dạy học phân hóa và tích hợp",
    "description": "Thông tin và học liệu môn Dạy học phân hóa và tích hợp.",
    "path": "/mon-hoc/edte1813/"
  },
  {
    "code": "EDTE1821",
    "name": "Thiết kế và biên tập video số",
    "description": "Thông tin và học liệu môn Thiết kế và biên tập video số.",
    "path": "/mon-hoc/edte1821/"
  },
  {
    "code": "EDTE1825",
    "name": "Thiết kế đồ họa thông tin và hoạt hình 2D",
    "description": "Thông tin và học liệu môn Thiết kế đồ họa thông tin và hoạt hình 2D.",
    "path": "/mon-hoc/edte1825/"
  },
  {
    "code": "EDTE1827",
    "name": "Thiết kế và lập trình web đơn giản",
    "description": "Thông tin và học liệu môn Thiết kế và lập trình web đơn giản.",
    "path": "/mon-hoc/edte1827/"
  },
  {
    "code": "EDTE1831",
    "name": "Quản trị hệ thống đào tạo trực tuyến",
    "description": "Thông tin và học liệu môn Quản trị hệ thống đào tạo trực tuyến.",
    "path": "/mon-hoc/edte1831/"
  },
  {
    "code": "EDTE1833",
    "name": "Phát triển ứng dụng dựa trên công cụ AI",
    "description": "Thông tin và học liệu môn Phát triển ứng dụng dựa trên công cụ AI.",
    "path": "/mon-hoc/edte1833/"
  },
  {
    "code": "EDTE1834",
    "name": "Công nghệ di động và ứng dụng trong GD",
    "description": "Thông tin và học liệu môn Công nghệ di động và ứng dụng trong GD.",
    "path": "/mon-hoc/edte1834/"
  },
  {
    "code": "EDTE1815",
    "name": "Thiết kế nội dung bài giảng tương tác",
    "description": "Thông tin và học liệu môn Thiết kế nội dung bài giảng tương tác.",
    "path": "/mon-hoc/edte1815/"
  },
  {
    "code": "EDTE1816",
    "name": "Thiết kế công cụ kiểm tra, đánh giá",
    "description": "Thông tin và học liệu môn Thiết kế công cụ kiểm tra, đánh giá.",
    "path": "/mon-hoc/edte1816/"
  },
  {
    "code": "EDTE1817",
    "name": "Dạy học với các công cụ đa phương tiện",
    "description": "Thông tin và học liệu môn Dạy học với các công cụ đa phương tiện.",
    "path": "/mon-hoc/edte1817/"
  },
  {
    "code": "EDTE1822",
    "name": "Biên tập và xuất bản nội dung học liệu số",
    "description": "Thông tin và học liệu môn Biên tập và xuất bản nội dung học liệu số.",
    "path": "/mon-hoc/edte1822/"
  },
  {
    "code": "EDTE1823",
    "name": "Tương tác người - máy và ứng dụng trong GD",
    "description": "Thông tin và học liệu môn Tương tác người - máy và ứng dụng trong GD.",
    "path": "/mon-hoc/edte1823/"
  },
  {
    "code": "EDTE1826",
    "name": "Robotics và lập trình trực quan",
    "description": "Thông tin và học liệu môn Robotics và lập trình trực quan.",
    "path": "/mon-hoc/edte1826/"
  },
  {
    "code": "EDTE1835",
    "name": "Trò chơi học tập và mô phỏng trong giáo dục",
    "description": "Thông tin và học liệu môn Trò chơi học tập và mô phỏng trong giáo dục.",
    "path": "/mon-hoc/edte1835/"
  },
  {
    "code": "EDTE1837",
    "name": "Cloud Computing và ứng dụng trong giáo dục",
    "description": "Thông tin và học liệu môn Cloud Computing và ứng dụng trong giáo dục.",
    "path": "/mon-hoc/edte1837/"
  },
  {
    "code": "EDTE1865",
    "name": "Hồ sơ tốt nghiệp",
    "description": "Thông tin và học liệu môn Hồ sơ tốt nghiệp.",
    "path": "/mon-hoc/edte1865/"
  },
  {
    "code": "EDTE1866",
    "name": "Sản phẩm nghiên cứu",
    "description": "Thông tin và học liệu môn Sản phẩm nghiên cứu.",
    "path": "/mon-hoc/edte1866/"
  }
]
export const placements: Placement[] = [
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1010",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1800",
    "term": 1,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1801",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1802",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "MILI2701",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "POLI1903",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "POLI2001",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PSYC1001",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PHYL2401",
    "term": 1,
    "credits": 1,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1013",
    "term": 2,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1017",
    "term": 2,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "MILI2702",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PHYL2",
    "term": 2,
    "credits": 1,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "POLI2002",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "POLI2003",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PSYC2804",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "DOMS0",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "EDUC2801",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PSYC1493",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PSYC2801",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1016",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1018",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1019",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1501",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1701",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "MILI2703",
    "term": 3,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PHYL3",
    "term": 3,
    "credits": 1,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "POLI2005",
    "term": 3,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1011",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1015",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1332",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1401",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1829",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "MILI2704",
    "term": 4,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "POLI2004",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1044",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1060",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1314",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1024",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1032",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1041",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1043",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1050",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1071",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1304",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1305",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1307",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1308",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1709",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1712",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1804",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1502",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1803",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1031",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1042",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1046",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1047",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1064",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1065",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1076",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1085",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1306",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1310",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1311",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1315",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1318",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1326",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1704",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1715",
    "term": 6,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1410",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1809",
    "term": 7,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "PSYC2803",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1069",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1084",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1309",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1313",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1325",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1504",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1703",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1714",
    "term": 7,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1811",
    "term": 8,
    "credits": 5,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1083",
    "term": 8,
    "credits": 6,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1813",
    "term": 8,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cntt.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1010",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1800",
    "term": 1,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1801",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1802",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "MILI2701",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "POLI1903",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "POLI2001",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PSYC1001",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PHYL2401",
    "term": 1,
    "credits": 1,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1013",
    "term": 2,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1827",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "MILI2702",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "POLI2002",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "POLI2003",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PSYC2802",
    "term": 2,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1810",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "DOMS0",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "EDUC2801",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PHYL2",
    "term": 2,
    "credits": 1,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PSYC1493",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PSYC2801",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1016",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1017",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1701",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "EDUC2802",
    "term": 3,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "MILI2703",
    "term": 3,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "POLI2005",
    "term": 3,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "PHYL3",
    "term": 3,
    "credits": 1,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1011",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1018",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1401",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "EDUT2801",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "EDUT2802",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "MILI2704",
    "term": 4,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "POLI2004",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1015",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1044",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1314",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1332",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1818",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1819",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1019",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1032",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1712",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1807",
    "term": 6,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1817",
    "term": 6,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1828",
    "term": 6,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1808",
    "term": 7,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1816",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1820",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1823",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "EDUC2803",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1821",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1822",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1825",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1824",
    "term": 8,
    "credits": 5,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1040",
    "term": 8,
    "credits": 6,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1814",
    "term": 8,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1826",
    "term": 8,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-sp-tin.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "COMP1800",
    "term": 1,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1840",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "MILI2701",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PHYL2401",
    "term": 1,
    "credits": 1,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI1903",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI2001",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC1001",
    "term": 1,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "TECH1802",
    "term": 1,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1841",
    "term": 2,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "MATH1703",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "MILI2702",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI2002",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI2003",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI2005",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC2804",
    "term": 2,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "COMP1812",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "DOMS0",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDUC2801",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PHYL2",
    "term": 2,
    "credits": 1,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC1493",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC2801",
    "term": 2,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1843",
    "term": 3,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1844",
    "term": 3,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1845",
    "term": 3,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "MILI2703",
    "term": 3,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC2802",
    "term": 3,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PHYL3",
    "term": 3,
    "credits": 1,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1842",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1846",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1847",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1849",
    "term": 4,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "MILI2704",
    "term": 4,
    "credits": 4,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI2004",
    "term": 4,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1860",
    "term": 4,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1861",
    "term": 4,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1862",
    "term": 4,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1863",
    "term": 4,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1802",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1803",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1806",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1808",
    "term": 5,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDUC1810",
    "term": 5,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC2803",
    "term": 5,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1804",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1805",
    "term": 6,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1850",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1811",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1812",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1813",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1821",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1825",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1827",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1831",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1833",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1834",
    "term": 6,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1801",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1807",
    "term": 7,
    "credits": 3,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1851",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1815",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1816",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1817",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1822",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1823",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1826",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1835",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1836",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1837",
    "term": 7,
    "credits": 2,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1852",
    "term": 8,
    "credits": 5,
    "requirement": "Bắt buộc",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1864",
    "term": 8,
    "credits": 6,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1865",
    "term": 8,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "EDTE1866",
    "term": 8,
    "credits": 3,
    "requirement": "Tự chọn",
    "source": "khoa/nganh-cngd.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "POLI2005",
    "term": 3,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/tra-cuu-hoc-phan.md",
    "verified": false
  },
  {
    "major": "sp-tin",
    "version": "du-lieu-hien-co",
    "course": "COMP1712",
    "term": 5,
    "credits": 3,
    "requirement": "Tự chọn/Bắt buộc",
    "source": "khoa/tra-cuu-hoc-phan.md",
    "verified": false
  },
  {
    "major": "cntt",
    "version": "du-lieu-hien-co",
    "course": "COMP1032",
    "term": 6,
    "credits": 3,
    "requirement": "Bắt buộc/Tự chọn",
    "source": "khoa/tra-cuu-hoc-phan.md",
    "verified": false
  },
  {
    "major": "cngd",
    "version": "du-lieu-hien-co",
    "course": "PSYC2803",
    "term": 7,
    "credits": 2,
    "requirement": "Bắt buộc",
    "source": "khoa/tra-cuu-hoc-phan.md",
    "verified": false
  }
]
export const resources: Resource[] = [
  {
    "id": "algebra--01-ma-tran-va-dinh-thuc",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Đại số tuyến tính",
    "title": "Chuyên Đề 1: Ma Trận, Định Thức & Hạng Ma Trận",
    "order": 1,
    "path": "/algebra/01-ma-tran-va-dinh-thuc",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "algebra--02-he-phuong-trinh-tuyen-tinh",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Đại số tuyến tính",
    "title": "Chuyên Đề 2: Hệ Phương Trình Tuyến Tính",
    "order": 2,
    "path": "/algebra/02-he-phuong-trinh-tuyen-tinh",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "algebra--03-khong-gian-vecto",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Đại số tuyến tính",
    "title": "Chuyên Đề 3: Không Gian Vectơ, Cơ Sở & Đổi Tọa Độ",
    "order": 3,
    "path": "/algebra/03-khong-gian-vecto",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "algebra--04-khong-gian-euclide",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Đại số tuyến tính",
    "title": "Chuyên Đề 4: Không Gian Euclide & Trực Chuẩn Hóa Gram - Schmidt",
    "order": 4,
    "path": "/algebra/04-khong-gian-euclide",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "algebra--05-anh-xa-tuyen-tinh-cheo-hoa",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Đại số tuyến tính",
    "title": "Chuyên Đề 5: Ánh Xạ Tuyến Tính, Trị Riêng & Chéo Hóa Ma Trận",
    "order": 5,
    "path": "/algebra/05-anh-xa-tuyen-tinh-cheo-hoa",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "algebra--06-dang-toan-phuong",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Đại số tuyến tính",
    "title": "Chuyên Đề 6: Dạng Toàn Phương (Quadratic Forms)",
    "order": 6,
    "path": "/algebra/06-dang-toan-phuong",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "calculus--01-gioi-han-day-va-ham",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Giải tích",
    "title": "Chuyên Đề 1: Dãy Số, Giới Hạn và Tính Liên Tục",
    "order": 7,
    "path": "/calculus/01-gioi-han-day-va-ham",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "calculus--02-dao-ham-vi-phan-taylor",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Giải tích",
    "title": "Chuyên Đề 2: Phép Tính Vi Phân, Đạo Hàm Cấp Cao & Khai Triển Taylor",
    "order": 8,
    "path": "/calculus/02-dao-ham-vi-phan-taylor",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "calculus--03-tich-phan-va-ung-dung",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Giải tích",
    "title": "Chuyên Đề 3: Phép Tính Tích Phân & Tổng Riemann",
    "order": 9,
    "path": "/calculus/03-tich-phan-va-ung-dung",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "calculus--04-tich-phan-suy-rong",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Giải tích",
    "title": "Chuyên Đề 4: Tích Phân Suy Rộng (Loại 1 & Loại 2)",
    "order": 10,
    "path": "/calculus/04-tich-phan-suy-rong",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "calculus--05-ly-thuyet-chuoi",
    "course": "COMP1800",
    "kind": "ly-thuyet",
    "section": "Giải tích",
    "title": "Chuyên Đề 5: Lý Thuyết Chuỗi Số & Chuỗi Lũy Thừa",
    "order": 11,
    "path": "/calculus/05-ly-thuyet-chuoi",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "cheatsheet--cong-thuc-nhanh",
    "course": "COMP1800",
    "kind": "cong-thuc",
    "section": "Sổ tay",
    "title": "Sổ Tay Tra Cứu Công Thức Thần Tốc",
    "order": 12,
    "path": "/cheatsheet/cong-thuc-nhanh",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "cheatsheet--kien-thuc-thpt",
    "course": "COMP1800",
    "kind": "cong-thuc",
    "section": "Sổ tay",
    "title": "Ôn Tập Kiến Thức Nền Tảng THPT",
    "order": 13,
    "path": "/cheatsheet/kien-thuc-thpt",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-1-logic-menh-de",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 1: Cơ Sở Logic Mệnh Đề & Bảng Chân Trị",
    "order": 14,
    "path": "/discrete-math/buoi-1-logic-menh-de",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-2-vi-tu-quy-nap",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 2: Vị Từ, Quy Tắc Suy Diễn & Quy Nạp Toán Học",
    "order": 15,
    "path": "/discrete-math/buoi-2-vi-tu-quy-nap",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-3-tap-hop-anh-xa",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 3: Lý Thuyết Tập Hợp & Ánh Xạ",
    "order": 16,
    "path": "/discrete-math/buoi-3-tap-hop-anh-xa",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-4-quan-he-dai-so-boole",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 4: Quan Hệ Tương Đương, Thứ Tự & Đại Số Boole",
    "order": 17,
    "path": "/discrete-math/buoi-4-quan-he-dai-so-boole",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-5-to-hop-dem",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 5: Đại Số Tổ Hợp, Bài Toán Đếm & Nguyên Lý Dirichlet",
    "order": 18,
    "path": "/discrete-math/buoi-5-to-hop-dem",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-6-he-thuc-truy-hoi",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 6: Hệ Thức Truy Hồi & Phương Trình Sai Phân",
    "order": 19,
    "path": "/discrete-math/buoi-6-he-thuc-truy-hoi",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "discrete-math--buoi-7-ly-thuyet-do-thi",
    "course": "COMP1801",
    "kind": "ly-thuyet",
    "section": "Toán rời rạc",
    "title": "Buổi 7: Lý Thuyết Đồ Thị & Các Thuật Toán Cốt Lõi",
    "order": 20,
    "path": "/discrete-math/buoi-7-ly-thuyet-do-thi",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "exams--de-2022-2023",
    "course": "COMP1800",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Kết Thúc Học Phần: Năm Học 2022 – 2023",
    "order": 21,
    "path": "/exams/de-2022-2023",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2022-2023"
  },
  {
    "id": "exams--de-2023-2024",
    "course": "COMP1800",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Kết Thúc Học Phần: Năm Học 2023 – 2024",
    "order": 22,
    "path": "/exams/de-2023-2024",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2023-2024"
  },
  {
    "id": "exams--de-2024-2025",
    "course": "COMP1800",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Kết Thúc Học Phần: Năm Học 2024 – 2025",
    "order": 23,
    "path": "/exams/de-2024-2025",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2024-2025"
  },
  {
    "id": "exams--de-tham-khao-co-dap-an",
    "course": "COMP1800",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Tham Khảo Kèm Barem Điểm Chi Tiết",
    "order": 24,
    "path": "/exams/de-tham-khao-co-dap-an",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "exams--quiz-giua-ky",
    "course": "COMP1800",
    "kind": "trac-nghiem",
    "section": "Đề thi",
    "title": "Trắc Nghiệm Ôn Thi Giữa Kỳ (Interactive Quiz)",
    "order": 25,
    "path": "/exams/quiz-giua-ky",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "exams-discrete--gk-2022-2023",
    "course": "COMP1801",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Giữa Kỳ: Toán Rời Rạc (Năm Học 2022 – 2023)",
    "order": 26,
    "path": "/exams-discrete/gk-2022-2023",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2022-2023"
  },
  {
    "id": "exams-discrete--gk-2023-2024",
    "course": "COMP1801",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Giữa Kỳ: Toán Rời Rạc (Năm Học 2023 – 2024)",
    "order": 27,
    "path": "/exams-discrete/gk-2023-2024",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2023-2024"
  },
  {
    "id": "exams-discrete--kthp-2022-2023",
    "course": "COMP1801",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Kết Thúc Học Phần: Toán Rời Rạc (2022 – 2023)",
    "order": 28,
    "path": "/exams-discrete/kthp-2022-2023",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2022-2023"
  },
  {
    "id": "exams-discrete--kthp-2023-2024",
    "course": "COMP1801",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Kết Thúc Học Phần: Toán Rời Rạc (2023 – 2024)",
    "order": 29,
    "path": "/exams-discrete/kthp-2023-2024",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2023-2024"
  },
  {
    "id": "exams-discrete--kthp-2024-2025",
    "course": "COMP1801",
    "kind": "de-thi",
    "section": "Đề thi",
    "title": "Đề Thi Kết Thúc Học Phần: Toán Rời Rạc (2024 – 2025)",
    "order": 30,
    "path": "/exams-discrete/kthp-2024-2025",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false,
    "year": "2024-2025"
  },
  {
    "id": "exercises--algebra",
    "course": "COMP1800",
    "kind": "bai-tap",
    "section": "Bài tập",
    "title": "Tuyển Tập Bài Tập Đại Số Tuyến Tính (Kèm Lời Giải)",
    "order": 31,
    "path": "/exercises/algebra",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  },
  {
    "id": "exercises--calculus",
    "course": "COMP1800",
    "kind": "bai-tap",
    "section": "Bài tập",
    "title": "Tuyển Tập Bài Tập Giải Tích (Kèm Lời Giải)",
    "order": 32,
    "path": "/exercises/calculus",
    "source": "Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.",
    "status": "available",
    "verified": false
  }
]
export const cohorts: Cohort[] = [
  {
    "id": "K52",
    "startYear": 2026,
    "programs": {
      "cntt": "du-lieu-hien-co",
      "sp-tin": "du-lieu-hien-co",
      "cngd": "du-lieu-hien-co"
    },
    "verified": false
  },
  {
    "id": "K51",
    "startYear": 2025,
    "programs": {
      "cntt": "du-lieu-hien-co",
      "sp-tin": "du-lieu-hien-co",
      "cngd": "du-lieu-hien-co"
    },
    "verified": false
  },
  {
    "id": "K50",
    "startYear": 2024,
    "programs": {
      "cntt": "du-lieu-hien-co",
      "sp-tin": "du-lieu-hien-co",
      "cngd": "du-lieu-hien-co"
    },
    "verified": false
  },
  {
    "id": "K49",
    "startYear": 2023,
    "programs": {
      "cntt": "du-lieu-hien-co",
      "sp-tin": "du-lieu-hien-co",
      "cngd": "du-lieu-hien-co"
    },
    "verified": false
  }
]
export const resourceKinds: Record<string, string> = { 'ly-thuyet': 'Lý thuyết', 'bai-tap': 'Bài tập', 'de-thi': 'Đề thi', 'trac-nghiem': 'Trắc nghiệm', 'cong-thuc': 'Công thức' }
export function normalize(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim() }
export function resourcesFor(code: string) { return resources.filter(r => r.course === code).sort((a,b) => a.order-b.order) }
export function statusFor(code: string) { return resourcesFor(code).length ? 'Có tài liệu' : 'Chưa có tài liệu' }
export function cohortYear(startYear: number) { return academicYear - startYear + 1 }
