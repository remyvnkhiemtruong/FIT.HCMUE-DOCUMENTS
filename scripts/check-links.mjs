import { readFile, readdir } from 'node:fs/promises'
import { resolve, relative, sep } from 'node:path'
const root=resolve('docs/.vitepress/dist')
const base='/FIT.HCMUE-DOCUMENTS/'
const errors=[]
async function walk(dir) {const entries=await readdir(dir,{withFileTypes:true});return (await Promise.all(entries.map(e=>e.isDirectory()?walk(resolve(dir,e.name)):[resolve(dir,e.name)]))).flat()}
const allFiles=await walk(root)
const fileSet=new Set(allFiles)
const files=allFiles.filter(f=>f.endsWith('.html'))
const cache=new Map()
const decode=(text)=>text.replace(/&amp;/g,'&').replace(/&quot;/g,'"')
async function existing(path) {return fileSet.has(path)}
async function html(path) {if(!cache.has(path))cache.set(path,await readFile(path,'utf8'));return cache.get(path)}
for(const file of files) {
  const content=await html(file)
  const pathname=base+relative(root,file).split(sep).join('/').replace(/index\.html$/,'').replace(/\.html$/,'')
  for(const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value=decode(match[1])
    if(/^(?:https?:|data:|mailto:|tel:|javascript:)/.test(value)||!value)continue
    const url=new URL(value,'https://local.test'+pathname)
    if(url.origin!=='https://local.test')continue
    if(!url.pathname.startsWith(base)){errors.push(`${relative(root,file)}: missing base in ${value}`);continue}
    const path=resolve(root,decodeURIComponent(url.pathname.slice(base.length)))
    if(!path.startsWith(root+sep)&&path!==root){errors.push(`${file}: outside output ${value}`);continue}
    const candidates=[path,path+'.html',resolve(path,'index.html')]
    const target=candidates.find(c=>fileSet.has(c))
    if(!target){errors.push(`${relative(root,file)}: missing ${value}`);continue}
    if(url.hash&&target.endsWith('.html')) {
      const id=decodeURIComponent(url.hash.slice(1))
      if(id && !(await html(target)).includes(`id="${id}"`))errors.push(`${relative(root,file)}: missing anchor ${value}`)
    }
  }
}
const ledger=JSON.parse(await readFile('content-archive/migration.json','utf8'))
for(const old of ledger)if(!await existing(resolve(root,old.path.replace(/\.md$/,'.html'))))errors.push(`Legacy route lost: ${old.path}`)
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exitCode=1}
else console.log(`Checked ${files.length} HTML pages, all internal links/assets/anchors and ${ledger.length} original routes.`)
