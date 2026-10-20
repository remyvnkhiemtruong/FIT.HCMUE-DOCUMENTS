import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { courses, majors, placements, resources, normalize, cohorts, cohortYear, academicYear } from '../docs/.vitepress/data/catalog.mts'
import { filterCourses, filterResources } from '../docs/.vitepress/data/filtering.mts'
import { courseContent, programContent } from '../docs/.vitepress/page-content.mts'

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
  for(const r of resources) {assert.ok(courses.some(c=>c.code===r.course));assert.ok(existsSync('docs'+r.path+'.md'));assert.ok(r.source);assert.equal(r.status,'available')}
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
  assert.equal(filterCourses({status:'available'}).length,2)
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
test('lesson bodies, exercises and exams are preserved exactly',()=>{
  for(const [path,body] of Object.entries(originals)) {
    if(/^(calculus|algebra|discrete-math|exams|exams-discrete|exercises|cheatsheet)\//.test(path)&&!path.includes('quiz-'))assert.equal(readFileSync('docs/'+path,'utf8'),body,path)
  }
})
test('all quiz questions and solutions are preserved',()=>{
  const source=originals['exams/quiz-giua-ky.md'].match(/const questions = (\[.*?\n\])/s)[1]
  const questions=Function('return ('+source+')')()
  const current=JSON.parse(readFileSync('docs/.vitepress/data/quiz.json','utf8'))
  assert.deepEqual(current,questions)
  unique(current.map(q=>q.id))
  for(const q of current)assert.ok(q.options.some(o=>o.id===q.answer))
})
