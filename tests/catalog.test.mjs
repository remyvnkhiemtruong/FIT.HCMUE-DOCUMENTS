import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { courses, majors, placements, resources, topics, normalize, cohorts, cohortYear, academicYear } from '../docs/.vitepress/data/catalog.mts'
import { filterCourses, filterResources } from '../docs/.vitepress/data/filtering.mts'
import { courseContent, programContent } from '../docs/.vitepress/page-content.mts'
import { protectedContent, numericData, examQuestions } from '../scripts/content-preservation.mjs'

const originals=JSON.parse(readFileSync(new URL('../content-archive/original-pages.json',import.meta.url),'utf8'))
const ledger=JSON.parse(readFileSync(new URL('../content-archive/migration.json',import.meta.url),'utf8'))
const unique=(values)=>assert.equal(new Set(values).size,values.length)
test('catalog references and curriculum keys are valid',()=>{
  unique(courses.map(c=>c.code));unique(courses.map(c=>c.path));unique(majors.map(m=>m.id));unique(resources.map(r=>r.id));unique(resources.map(r=>r.path))
  unique(placements.map(p=>[p.major,p.version,p.course,p.term].join(':')))
  for(const p of placements) {
    assert.ok(courses.some(c=>c.code===p.course),p.course)
    assert.ok(majors.some(m=>m.id===p.major && m.version===p.version),p.major)
    assert.ok(p.term>=1 && p.term<=8 && Number.isInteger(p.term));assert.ok(p.credits>0)
    assert.ok(p.source && typeof p.verified==='boolean')
  }
  for(const c of courses) {assert.ok(placements.some(p=>p.course===c.code));assert.equal(c.path,`/mon-hoc/${c.code.toLowerCase()}/`)}
  for(const r of resources) {if(r.course)assert.ok(courses.some(c=>c.code===r.course));else assert.ok(topics.some(t=>t.id===r.topic));assert.ok(existsSync('docs'+r.path+'.md'));assert.ok(r.source);assert.equal(r.status,'available')}
})
test('all three majors expose eight semesters',()=>{
  assert.equal(majors.length,3)
  for(const m of majors) for(let term=1;term<=8;term++) {
    assert.ok(placements.some(p=>p.major===m.id&&p.term===term))
    assert.match(programContent(m.id,term),new RegExp(`Học kỳ ${term}`))
  }
})
test('every course has one canonical page and honest material status',()=>{
  for(const c of courses) {
    const body=courseContent(c.code)
    assert.ok(body.includes(c.name))
    if(!resources.some(r=>r.course===c.code))assert.ok(body.includes('Chưa có tài liệu'))
    for(const p of placements.filter(p=>p.course===c.code)) assert.ok(body.includes(`/chuong-trinh/${p.major}/hk-${p.term}/`))
  }
})
test('search normalizes Vietnamese and course codes',()=>{
  assert.equal(normalize(' ĐẠI SỐ Tuyến tính '),'dai so tuyen tinh')
  assert.ok(filterCourses({q:'co so toan'}).some(c=>c.code==='COMP1800'))
  assert.deepEqual(filterCourses({q:'comp1801'}).map(c=>c.code),['COMP1801'])
  assert.equal(filterCourses({q:'xyz-no-such-course'}).length,0)
})
test('combined filters must match the same curriculum placement',()=>{
  for(const m of majors)for(let t=1;t<=8;t++) {
    const result=filterCourses({major:m.id,term:String(t)})
    assert.ok(result.length)
    for(const c of result)assert.ok(placements.some(p=>p.course===c.code&&p.major===m.id&&p.term===t))
  }
  assert.equal(filterCourses({major:'unknown'}).length,0)
  assert.equal(filterCourses({term:'9'}).length,0)
  assert.deepEqual(filterCourses({status:'available'}).map(c=>c.code).sort(),['COMP1701','COMP1800','COMP1801'])
})
test('credits and requirements retain per-major differences',()=>{
  const groups=Map.groupBy(placements,p=>p.course)
  assert.ok([...groups.values()].some(list=>new Set(list.map(p=>p.credits+':'+p.requirement)).size>1))
  const differing=[...groups.values()].find(list=>new Set(list.map(p=>p.credits+':'+p.requirement)).size>1)
  const body=courseContent(differing[0].course)
  for(const p of differing) assert.ok(body.includes(`| ${p.term} | ${p.credits} | ${p.requirement} |`))
})
test('resources combine course, major, type and exam year',()=>{
  const found=filterResources({q:'toan',course:'COMP1801',kind:'de-thi',year:'2023-2024',major:'sp-tin'})
  assert.ok(found.length)
  for(const r of found) {assert.equal(r.course,'COMP1801');assert.equal(r.year,'2023-2024');assert.equal(r.kind,'de-thi')}
  assert.equal(filterResources({course:'COMP1010'}).length,0)
  assert.equal(filterResources({year:'1990-1991'}).length,0)
})
test('cohorts use configurable academic year, not hard-coded semester mapping',()=>{
  for(const c of cohorts){assert.equal(cohortYear(c.startYear),academicYear-c.startYear+1);assert.equal(c.verified,false);assert.equal(Object.keys(c.programs).length,3)}
  assert.equal(filterCourses({cohort:'K49'}).length,filterCourses({}).length)
})
test('77 original pages are archived and every legacy route still exists',()=>{
  assert.equal(Object.keys(originals).length,77);assert.equal(ledger.length,77)
  for(const item of ledger) {
    assert.ok(existsSync('docs/'+item.path),item.path)
    assert.equal(createHash('sha256').update(originals[item.path]).digest('hex'),item.sha256)
    if(item.action==='redirect') {const text=readFileSync('docs/'+item.path,'utf8');assert.ok(text.includes('redirect:'));assert.ok(text.includes(item.target))}
  }
})
test('editorial changes preserve formulas, code and numerical data',()=>{
  for(const [path,body] of Object.entries(originals)) {
    if(!/^(calculus|algebra|discrete-math|exams|exams-discrete|exercises|cheatsheet)\//.test(path)||path.includes('quiz-'))continue
    const current=readFileSync('docs/'+path,'utf8')
    assert.deepEqual(protectedContent(current),protectedContent(body),path+' formulas/code')
    assert.deepEqual(numericData(current),numericData(body),path+' numeric data')
    if(/^exams(?:-discrete)?\//.test(path))assert.equal(examQuestions(current),examQuestions(body),path+' questions')
  }
})
test('quiz questions, choices, correct answers and solution mathematics are preserved',()=>{
  const source=originals['exams/quiz-giua-ky.md'].match(/const questions = (\[.*?\n\])/s)[1]
  const questions=Function('return ('+source+')')()
  const current=JSON.parse(readFileSync('docs/.vitepress/data/quiz.json','utf8'))
  assert.equal(current.length,questions.length)
  current.forEach((q,i)=>{
    const {explanation,...fixed}=q
    const {explanation:originalExplanation,...originalFixed}=questions[i]
    assert.deepEqual(fixed,originalFixed)
    assert.deepEqual(protectedContent(explanation),protectedContent(originalExplanation))
    assert.deepEqual(numericData(explanation),numericData(originalExplanation))
  })
  unique(current.map(q=>q.id))
  for(const q of current)assert.ok(q.options.some(o=>o.id===q.answer))
})

test('resource titles match page headings in every catalog-driven view',()=>{
  for(const r of resources){
    const heading=readFileSync('docs'+r.path+'.md','utf8').match(/^# (.+?)(?: \{#[^}]+\})?\r?$/m)?.[1]
    assert.equal(r.title,heading,r.path)
    if(r.course)assert.ok(courseContent(r.course).includes(`[${r.title}](${r.path})`))
  }
})

test('all 55 supplied PDFs have archived pages and a substantive native web adaptation',()=>{
  const sources=JSON.parse(readFileSync('content-archive/drive-20261020/sources.json','utf8'))
  const pages=JSON.parse(readFileSync('content-archive/drive-20261020/extracted-pages.json','utf8'))
  assert.equal(sources.length,55)
  assert.equal(sources.reduce((n,s)=>n+s.pages,0),1288)
  unique(sources.map(s=>s.sha256));unique(sources.map(s=>s.id))
  for(const source of sources){
    assert.match(source.sha256,/^[a-f0-9]{64}$/)
    assert.equal(pages[source.id].length,source.pages)
    const resource=resources.find(r=>r.id===source.resource)
    assert.ok(resource)
    assert.deepEqual(resource.sourceIds,[source.id])
    const body=readFileSync('docs'+resource.path+'.md','utf8')
    assert.ok(body.includes(source.path.split('/').at(-1)))
    assert.ok(body.includes('## Nguồn tài liệu'))
    assert.ok(body.length>1300,resource.path)
    assert.doesNotMatch(body,/<iframe|<embed|<object|!\[[^\]]*\]\([^)]*\.(?:png|jpg|svg)/i)
    assert.doesNotMatch(body,/[\uE000-\uF8FF\uFFFD]/u)
  }
})

test('unassigned topics remain searchable without invented curriculum placements',()=>{
  for(const topic of topics){
    const found=filterResources({topic:topic.id})
    assert.ok(found.length)
    assert.ok(found.every(r=>r.topic===topic.id))
  }
  const group=filterResources({topic:'ly-thuyet-nhom'})
  assert.equal(group.length,5)
  assert.ok(group.every(r=>!r.course))
  assert.equal(filterResources({topic:'ly-thuyet-nhom',major:'cntt'}).length,0)
  assert.ok(filterResources({q:'stirling'}).length)
  assert.ok(filterResources({topic:'toan-to-hop',course:'COMP1701'}).length)
})

test('roadmap keeps its formulas and stable keys for existing saved progress',()=>{
  const body=readFileSync('docs/roadmap.md','utf8')
  assert.deepEqual(protectedContent(body),protectedContent(originals['roadmap.md']))
  const keys=[...body.matchAll(/data-task-key="([^"]+)"/g)].map(m=>m[1])
  const legacy=JSON.parse(readFileSync('docs/.vitepress/data/checklist-keys.json','utf8'))
  unique(keys)
  assert.deepEqual(new Set(keys),new Set(legacy))
})

test('preservation checks detect changed math, code, exercise data and exam answers',()=>{
  assert.notDeepEqual(protectedContent('Giới hạn $x+1$'),protectedContent('Giới hạn $x+2$'))
  assert.notDeepEqual(protectedContent('```js\nreturn 1\n```'),protectedContent('```js\nreturn 2\n```'))
  assert.notDeepEqual(numericData('Có 50 sinh viên'),numericData('Có 51 sinh viên'))
  assert.notEqual(examQuestions('## Đề bài\nA. Đúng\n## Lời giải\n'),examQuestions('## Đề bài\nA. Sai\n## Lời giải\n'))
})
