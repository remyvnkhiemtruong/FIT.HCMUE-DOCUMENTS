export const normalizeStudentId = (value: string) =>
  value.replace(/[.\s-]/g, '').toLowerCase()
export const normalizeSearch = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim()
export const safeReturn = (value: unknown) =>
  typeof value === 'string'
  && value.startsWith('/')
  && !value.startsWith('//')
  && !/[\\\r\n]/.test(value)
    ? value
    : '/'

export const resourceKindName = (kind: string) =>
  ({
    'ly-thuyet': 'Lý thuyết',
    'bai-tap': 'Bài tập',
    'de-thi': 'Đề thi',
    'cong-thuc': 'Công thức',
    'trac-nghiem': 'Trắc nghiệm',
  })[kind] || kind

export const publicationStateName = (state: string) =>
  ({
    draft: 'Bản nháp',
    pending: 'Chờ duyệt',
    changes_requested: 'Cần chỉnh sửa',
    published: 'Đã xuất bản',
    archived: 'Đã lưu trữ',
    clean: 'Đã kiểm tra',
    infected: 'Tệp không an toàn',
    failed: 'Thất bại',
    running: 'Đang xử lý',
    done: 'Hoàn tất',
  })[state] || state
