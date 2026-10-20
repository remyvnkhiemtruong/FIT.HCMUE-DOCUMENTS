// Prose may change; mathematical notation and executable examples may not.
export const protectedPattern = /```[^\n]*\n[\s\S]*?```|~~~[^\n]*\n[\s\S]*?~~~|`[^`\n]+`|\$\$[\s\S]*?\$\$|(?<!\\)\$(?!\$)(?:\\.|[^$])*?(?<!\\)\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/g

export function protectedContent(text) {
  return [...text.matchAll(protectedPattern)].map(m=>m[0])
}

export function numericData(text) {
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').replace(/\{#[^}]+\}/g,'').replace(/\]\([^)]*\)/g,']')
    .replace(/<[^>]*>/g,'').replace(/chính xác 100%/g,'')
    .match(/\d+(?:[.,]\d+)?/g) || []
}

export function examQuestions(text) {
  const block=text.match(/^## (?:Đề Bài Chính Thức|Bảng Đề Bài & Thang Điểm Chuẩn|Đề bài|Bảng đề bài và thang điểm)[^\n]*\n([\s\S]*?)(?=^## )/m)
  if(!block) throw new Error('Không tìm thấy phần đề bài')
  return block[1]
}
