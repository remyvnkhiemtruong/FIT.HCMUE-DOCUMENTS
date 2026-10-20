"""One-time migration of the original portal. Run only on the original tree."""
from pathlib import Path
import json, re, subprocess, hashlib

root = Path(__file__).resolve().parents[1]
docs = root / 'docs'
def write(path, text):
    path = root / path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')
def dump(value):
    return json.dumps(value, ensure_ascii=False, indent=2)

snapshot = root / 'content-archive/original-pages.json'
if snapshot.exists():
    raise SystemExit('Migration already applied; use the catalog to maintain content.')
originals = {str(p.relative_to(docs)).replace('\\', '/'): p.read_text(encoding='utf-8-sig')
             for p in docs.rglob('*.md') if '.vitepress' not in p.parts}
write('content-archive/original-pages.json', dump(originals) + '\n')
lookup = originals['khoa/tra-cuu-hoc-phan.md']
array = re.search(r'const courses = (\[.*?\n\])', lookup, re.S).group(1)
result = subprocess.run(['node', '-e', 'process.stdout.write(JSON.stringify(' + array + '))'], capture_output=True, text=True, encoding='utf-8', check=True)
seed = json.loads(result.stdout)
major_info = [('cntt', 'CNTT', 'Công nghệ Thông tin', '7480201'), ('sp-tin', 'SP Tin', 'Sư phạm Tin học', '7140210'), ('cngd', 'CNGD', 'Công nghệ Giáo dục', '7140103')]
majors = [dict(id=id, short=short, name=name, code=code, version='du-lieu-hien-co', verified=False) for id,short,name,code in major_info]
courses = {c['code']: dict(code=c['code'], name=c['name'], description='Thông tin và học liệu môn ' + c['name'] + '.', path='/mon-hoc/' + c['code'].lower() + '/') for c in seed}
entries = {}
issues = []
for id,short,name,code in major_info:
    term = 0
    path = f'khoa/nganh-{id}.md'
    for line in originals[path].splitlines():
        heading = re.match(r'## Học kỳ (\d)', line)
        if heading: term = int(heading.group(1))
        cells = [c.strip() for c in line.strip('|').split('|')]
        if not term or len(cells) < 5 or not re.fullmatch(r'`[A-Z]+\d+`', cells[1]): continue
        course_code = cells[1].strip('`')
        course_name = re.sub(r'[*_]', '', cells[2])
        if not cells[3].isdigit(): continue
        if course_code not in courses:
            courses[course_code] = dict(code=course_code, name=course_name, description='Thông tin và học liệu môn ' + course_name + '.', path='/mon-hoc/' + course_code.lower() + '/')
        entries[(id,course_code,term)] = dict(major=id, version='du-lieu-hien-co', course=course_code, term=term, credits=int(cells[3]), requirement=cells[4], source=path, verified=False)
for c in seed:
    for id,short,_,_ in major_info:
        if short not in c['majors']: continue
        key=(id,c['code'],c['term'])
        if key not in entries:
            entries[key]=dict(major=id, version='du-lieu-hien-co', course=c['code'], term=c['term'], credits=c['credits'], requirement=c['type'], source='khoa/tra-cuu-hoc-phan.md', verified=False)
        elif entries[key]['credits'] != c['credits'] or entries[key]['requirement'] != c['type']:
            issues.append(dict(course=c['code'], major=id, note='Khác biệt giữa bảng ngành và tra cứu; ưu tiên bảng ngành, chưa xác minh với đề cương chính thức.', lookup=dict(credits=c['credits'], requirement=c['type']), selected=entries[key]))

resources=[]
groups = {'calculus':('COMP1800','ly-thuyet','Giải tích'), 'algebra':('COMP1800','ly-thuyet','Đại số tuyến tính'), 'discrete-math':('COMP1801','ly-thuyet','Toán rời rạc'), 'exams':('COMP1800','de-thi','Đề thi'), 'exams-discrete':('COMP1801','de-thi','Đề thi'), 'exercises':('COMP1800','bai-tap','Bài tập'), 'cheatsheet':('COMP1800','cong-thuc','Sổ tay')}
for path,body in originals.items():
    folder=path.split('/')[0]
    if folder not in groups: continue
    code,kind,section=groups[folder]
    if path == 'exercises/index.md': continue
    if 'quiz' in path: kind='trac-nghiem'
    title=re.search(r'^# (.+)',body,re.M).group(1)
    title=re.sub(r'^[^\wÀ-ỹ]+', '', title).strip()
    year=re.search(r'(20\d{2})-(20\d{2})',path)
    route='/' + path[:-3]
    resource=dict(id=path[:-3].replace('/','--'), course=code, kind=kind, section=section, title=title, order=len(resources)+1, path=route, source='Nội dung biên soạn trong kho hiện có; chưa đối chiếu nguồn gốc độc lập.', status='available', verified=False)
    if year: resource['year']=year.group(1)+'-'+year.group(2)
    resources.append(resource)

cohorts=[dict(id=f'K{k}',startYear=2026-(52-k),programs={m['id']:'du-lieu-hien-co' for m in majors},verified=False) for k in [52,51,50,49]]
write('docs/.vitepress/data/catalog.mts', '''// Single source of truth. Curriculum data is provisional, not an official program.
export interface Major { id: string; short: string; name: string; code: string; version: string; verified: boolean }
export interface Course { code: string; name: string; description: string; path: string }
export interface Placement { major: string; version: string; course: string; term: number; credits: number; requirement: string; source: string; verified: boolean }
export interface Resource { id: string; course: string; kind: string; section: string; title: string; order: number; path: string; source: string; status: string; verified: boolean; year?: string }
export interface Cohort { id: string; startYear: number; programs: Record<string, string>; verified: boolean }
export const academicYear = 2026
export const repository = 'https://github.com/remyvnkhiemtruong/FIT.HCMUE-DOCUMENTS'
export const majors: Major[] = '''+dump(majors)+'''
export const courses: Course[] = '''+dump(list(courses.values()))+'''
export const placements: Placement[] = '''+dump(list(entries.values()))+'''
export const resources: Resource[] = '''+dump(resources)+'''
export const cohorts: Cohort[] = '''+dump(cohorts)+'''
export const resourceKinds: Record<string, string> = { 'ly-thuyet': 'Lý thuyết', 'bai-tap': 'Bài tập', 'de-thi': 'Đề thi', 'trac-nghiem': 'Trắc nghiệm', 'cong-thuc': 'Công thức' }
export function normalize(value: string) { return value.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim() }
export function resourcesFor(code: string) { return resources.filter(r => r.course === code).sort((a,b) => a.order-b.order) }
export function statusFor(code: string) { return resourcesFor(code).length ? 'Có tài liệu' : 'Chưa có tài liệu' }
export function cohortYear(startYear: number) { return academicYear - startYear + 1 }
''')
write('content-archive/data-issues.json', dump(issues + [dict(course='COMP1801', note='roadmap.md ghi COMP1802 cho Toán rời rạc; chuẩn hóa theo bảng ngành và tra cứu thành COMP1801. Chưa đối chiếu đề cương chính thức.'),dict(course='COMP1808',note='Trang hk8/comp1808 ghi Hồ sơ tốt nghiệp, trong khi bảng ngành SP Tin ghi Thực hành dạy học môn Tin học tại HK7. Giữ trang cũ thành thông báo cần đối chiếu; không tự gộp sang môn khác.'),dict(course='COMP1411',note='Trang HK8 ghi Thực tập nghề nghiệp 2 với mã COMP1411, bảng ngành ghi COMP1811. Chưa xác minh tương đương; giữ cảnh báo ở đường dẫn cũ.')])+'\n')

# Preserve all original text outside the published corpus and retain every old route.
redirects={ 'mon-hoc/index.md':'/chuong-trinh/', 'khoa/index.md':'/chuong-trinh/', 'khoa/tra-cuu-hoc-phan.md':'/chuong-trinh/tra-cuu' }
for id,_,_,_ in major_info: redirects[f'khoa/nganh-{id}.md']=f'/chuong-trinh/{id}/'
for path in originals:
    if re.match(r'mon-hoc/hk\d/index.md',path): redirects[path]='/chuong-trinh/tra-cuu?term='+re.search(r'hk(\d)',path).group(1)
    match=re.match(r'mon-hoc/hk\d/([a-z]+\d+)\.md',path)
    if match and match.group(1).upper() in courses and path != 'mon-hoc/hk8/comp1808.md': redirects[path]=courses[match.group(1).upper()]['path']
for path,target in redirects.items():
    write('docs/'+path, f'---\ntitle: "Trang đã chuyển vị trí"\nredirect: "{target}"\nsearch: false\n---\n\n# Trang đã chuyển vị trí\n\n<LegacyRedirect />\n\n[Tiếp tục đến trang mới]({target})\n')
for path in ['mon-hoc/hk8/comp1808.md','mon-hoc/hk8/comp1411.md']:
    body=originals[path]
    write('docs/'+path, body.replace('\n# ', '\n::: warning Thông tin cần đối chiếu\nMã hoặc tên học phần trong trang cũ chưa thống nhất với bảng chương trình. Nội dung dưới đây được giữ để tham khảo, chưa xác nhận thuộc chương trình hiện hành. [Tra cứu danh mục mới](/chuong-trinh/tra-cuu).\n:::\n\n# ',1))

# Quiz question text is compiled to static mathematical HTML by VitePress Markdown.
quiz=originals['exams/quiz-giua-ky.md']
questions=re.search(r'const questions = (\[.*?\n\])',quiz,re.S).group(1)
qjson=subprocess.run(['node','-e','process.stdout.write(JSON.stringify('+questions+'))'],capture_output=True,text=True,encoding='utf-8',check=True).stdout
write('docs/.vitepress/data/quiz.json', dump(json.loads(qjson))+'\n')
quiz=re.sub(r'<script setup>.*?</ClientOnly>', '<Quiz />',quiz,flags=re.S)
write('docs/exams/quiz-giua-ky.md',quiz)
roadmap=originals['roadmap.md'].replace('COMP1802','COMP1801')
write('docs/roadmap.md',roadmap)
write('content-archive/migration.json',dump([dict(path=p, sha256=hashlib.sha256(b.encode()).hexdigest(), action='redirect' if p in redirects else 'quiz-component' if p=='exams/quiz-giua-ky.md' else 'corrected' if p=='roadmap.md' else 'retained', target=redirects.get(p)) for p,b in originals.items()])+'\n')
print(f'Archived {len(originals)} pages; {len(courses)} courses, {len(entries)} placements, {len(resources)} resources, {len(redirects)} redirects.')
