import { majors, courses, placements, resourcesFor, statusFor, resourceKinds } from './data/catalog.mts'

const programNote = '> Danh mục tham khảo. Đối chiếu học phần với kế hoạch do trường công bố. [Thông tin nguồn](/huong-dan#nguon-tai-lieu).\n'

export function courseContent(code: string) {
  const course = courses.find(c => c.code === code)!
  const rows = placements.filter(p => p.course === code)
  const materials = resourcesFor(code)
  let content = `---\ntitle: ${JSON.stringify(course.name + ' (' + code + ')')}\ndescription: ${JSON.stringify(course.description)}\ncourse: ${code}\n---\n\n# ${course.name}\n\n**${code}** · ${statusFor(code)}\n`

  if (!materials.length) {
    content += '\nChưa có bài giảng, bài tập hoặc đề thi cho môn này. [Đóng góp tài liệu](https://github.com/remyvnkhiemtruong/FIT.HCMUE-DOCUMENTS/issues).\n'
  }
  for (const [kind, label] of Object.entries(resourceKinds)) {
    const list = materials.filter(r => r.kind === kind)
    if (!list.length) continue
    content += `\n## ${label}\n\n` + list.map(r => {
      const yearAlreadyInTitle = r.year?.split('-').every(part => r.title.includes(part))
      return `- [${r.title}](${r.path})${r.year && !yearAlreadyInTitle ? ' · ' + r.year : ''}`
    }).join('\n') + '\n'
  }

  const goals: Record<string, string> = {
    COMP1800: 'Ôn tập giải tích hàm một biến, đại số tuyến tính và dạng toàn phương; vận dụng qua bài tập và đề thi.',
    COMP1801: 'Học logic, tập hợp, quan hệ, tổ hợp, truy hồi và đồ thị; luyện lập luận qua bài học và đề thi.'
  }
  if (goals[code]) content += '\n## Mục tiêu học tập\n\n' + goals[code] + '\n'

  content += '\n## Thông tin học phần\n\n| Ngành | Học kỳ | Tín chỉ | Loại học phần |\n| --- | --- | --- | --- |\n'
  content += rows.map(p => `| [${majors.find(m => m.id === p.major)!.name}](/chuong-trinh/${p.major}/hk-${p.term}/) | ${p.term} | ${p.credits} | ${p.requirement} |`).join('\n') + '\n\n'
  content += programNote
  content += '\n<details class="source-note">\n<summary>Nguồn và đóng góp</summary>\n\n'
  content += [...new Set(rows.map(p => p.source))].map(p => {
    const major = majors.find(m => p === `khoa/nganh-${m.id}.md`)
    return `- ${major ? 'Danh mục học phần ngành ' + major.name : 'Danh mục tra cứu học phần'} trong kho học liệu.`
  }).join('\n')
  content += '\n- Nguồn học liệu chưa được xác minh độc lập. Khi ôn tập, đối chiếu đề cương của giảng viên.\n- [Gửi tài liệu hoặc báo thông tin sai](https://github.com/remyvnkhiemtruong/FIT.HCMUE-DOCUMENTS/issues).\n\n</details>\n'
  return content
}

export function programContent(id: string, term?: number) {
  const major = majors.find(m => m.id === id)!
  const rows = placements.filter(p => p.major === id && (!term || p.term === term))
  const title = term ? `Học kỳ ${term} · ${major.name}` : major.name
  let content = `---\ntitle: ${JSON.stringify(title)}\nmajor: ${id}\n${term ? 'term: ' + term + '\n' : ''}---\n\n# ${title}\n\n[Chương trình học](/chuong-trinh/)${term ? ` → [${major.name}](/chuong-trinh/${id}/)` : ''}\n\nMã ngành **${major.code}**\n\n`
  if (!term) {
    content += '<CohortSelector />\n\n## Chọn học kỳ\n\n<div class="semester-grid">\n'
    for (let t = 1; t <= 8; t++) {
      content += `<a class="semester-link" href="./hk-${t}/"><strong>Học kỳ ${t}</strong><span>${rows.filter(p => p.term === t).length} học phần</span></a>\n`
    }
    content += '</div>\n\n'
  } else {
    content += '| Mã môn | Học phần | Tín chỉ | Loại học phần | Học liệu |\n| --- | --- | --- | --- | --- |\n'
    content += rows.map(p => {
      const course = courses.find(c => c.code === p.course)!
      return `| ${course.code} | [${course.name}](${course.path}) | ${p.credits} | ${p.requirement} | ${statusFor(course.code)} |`
    }).join('\n') + '\n\n'
    content += `[Chọn học kỳ khác](/chuong-trinh/${id}/)\n\n`
  }
  content += programNote
  return content
}
