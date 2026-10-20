import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
const questions=JSON.parse(readFileSync('docs/.vitepress/data/quiz.json','utf8'))

test('three majors lead through a semester to the shared course and lesson',async({page})=>{
  for(const major of ['cntt','sp-tin','cngd']) {
    await page.goto(`chuong-trinh/${major}/`)
    await page.locator('.semester-link').first().click()
    await expect(page).toHaveURL(new RegExp(`/chuong-trinh/${major}/hk-1/`))
    await page.locator('.vp-doc table').getByRole('link',{name:'Cơ sở toán trong Công nghệ thông tin',exact:true}).click()
    await expect(page).toHaveURL(/\/mon-hoc\/comp1800\//)
    await expect(page.locator('.vp-doc h1')).toHaveText('Cơ sở toán trong Công nghệ thông tin')
  }
  await page.locator('.vp-doc a[href$="/calculus/01-gioi-han-day-va-ham"]').first().click()
  await expect(page).toHaveURL(/\/calculus\/01-gioi-han-day-va-ham/)
  await expect(page.locator('.lesson-context')).toContainText('COMP1800')
  await expect(page.locator('mjx-container').first()).toBeVisible()
})

test('early navigation waits for initial hydration on a slow connection',async({page})=>{
  await page.route(/\.lean\.js$/,async route=>{
    await new Promise(resolve=>setTimeout(resolve,700))
    await route.continue()
  })
  await page.goto('chuong-trinh/cngd/')
  await page.locator('.semester-link').first().click()
  await expect(page.locator('.vp-doc h1')).toContainText('Học kỳ 1')
  await page.locator('.vp-doc table').getByRole('link',{name:'Cơ sở toán trong Công nghệ thông tin',exact:true}).click()
  await expect(page.locator('.vp-doc h1')).toHaveText('Cơ sở toán trong Công nghệ thông tin')
})

test('URL filters support Vietnamese search, restore and empty state',async({page})=>{
  await page.goto('chuong-trinh/tra-cuu?q=co+so+toan&major=cntt&term=1')
  await expect(page.locator('.course-result')).toHaveCount(1)
  await expect(page.locator('#catalog-q')).toHaveValue('co so toan')
  await page.reload()
  await expect(page.locator('.course-result')).toHaveCount(1)
  await page.locator('#catalog-q').fill('khong tim thay mon xyz')
  await expect(page.locator('.empty-state')).toBeVisible()
  await expect(page).toHaveURL(/q=khong/)
  await page.locator('.empty-state button').click()
  await expect(page.locator('.course-result')).toHaveCount(15)
  await page.locator('#catalog-status').selectOption('available')
  await expect(page.locator('.course-result')).toHaveCount(2)
})

test('resource filters combine type, year and major',async({page})=>{
  await page.goto('hoc-lieu/?course=COMP1801&kind=de-thi&year=2023-2024&major=sp-tin')
  await expect(page.locator('.resource-result')).toHaveCount(2)
  await page.locator('#catalog-year').selectOption('2024-2025')
  await expect(page.locator('.resource-result')).toHaveCount(1)
  await page.locator('.resource-result a').click()
  await expect(page).toHaveURL(/exams-discrete\/kthp-2024-2025/)
})

test('legacy redirects honor base, query and destination',async({page})=>{
  await page.goto('mon-hoc/hk1/comp1010')
  await expect(page).toHaveURL(/\/mon-hoc\/comp1010\//)
  await expect(page.locator('.vp-doc')).toContainText('Chưa có tài liệu')
  await page.goto('mon-hoc/hk3/?major=sp-tin')
  await expect(page).toHaveURL(/chuong-trinh\/tra-cuu\?term=3&major=sp-tin/)
  await expect(page.locator('#catalog-term')).toHaveValue('3')
  await expect(page.locator('#catalog-major')).toHaveValue('sp-tin')
  await page.goto('khoa/nganh-cntt.html')
  await expect(page).toHaveURL(/\/chuong-trinh\/cntt\//)
  await expect(page.locator('.vp-doc h1')).toContainText('Công nghệ Thông tin')
})

test('quiz displays math, scores every question and resets',async({page})=>{
  await page.goto('exams/quiz-giua-ky')
  await expect(page.locator('.quiz-question')).toHaveCount(questions.length)
  await expect(page.locator('.quiz-question mjx-container').first()).toBeVisible()
  for(const q of questions)await page.locator(`input[name="question-${q.id}"][value="${q.answer}"]`).check()
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(questions.length)
  await page.getByRole('button',{name:'Nộp bài & Xem điểm',exact:true}).click()
  await expect(page.locator('.quiz-score')).toContainText(`${questions.length} / ${questions.length}`)
  await expect(page.locator('.quiz-explanation')).toHaveCount(questions.length)
  await page.getByRole('button',{name:'Làm lại bài thi'}).click()
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0)
  await page.getByRole('button',{name:'Nộp bài & Xem điểm',exact:true}).click()
  await expect(page.locator('.quiz-score')).toContainText(`0 / ${questions.length}`)
})

test('roadmap saves progress, resets and survives blocked storage',async({page})=>{
  await page.goto('roadmap')
  const boxes=page.locator('.learning-task input')
  await expect(boxes.first()).toBeVisible()
  await boxes.first().check()
  await page.locator('.VPNavBarMenu').getByRole('link',{name:'Hướng dẫn & Đóng góp',exact:true}).click()
  await expect(page).toHaveURL(/\/huong-dan/)
  await page.locator('.VPNavBarMenu').getByRole('link',{name:'Lộ trình ôn tập',exact:true}).click()
  await expect(boxes.first()).toBeChecked()
  await expect(page.locator('.checklist-summary')).toContainText('1 /')
  await page.reload()
  await expect(boxes.first()).toBeChecked()
  await page.getByRole('button',{name:'Bỏ đánh dấu tất cả'}).click()
  await expect(boxes.first()).not.toBeChecked()
  await page.addInitScript(()=>{Storage.prototype.setItem=function(){throw new Error('blocked')}})
  await page.reload()
  await boxes.first().check()
  await expect(page.locator('.checklist-summary')).toContainText('Trình duyệt không cho lưu tiến độ')
})

test('local full-text search supports unaccented terms',async({page})=>{
  const errors:string[]=[]
  page.on('pageerror',error=>errors.push(error.message))
  await page.goto('')
  await page.getByRole('button',{name:'Tìm kiếm tài liệu',exact:true}).click()
  await page.locator('#localsearch-input').fill('khong gian vecto')
  await expect(page.locator('.VPLocalSearchBox .result').first()).toBeVisible()
  expect(errors).toEqual([])
})

for (const width of [360,768,1280,1440]) for (const mode of ['light','dark']) test(`reading and controls at ${width}px in ${mode} mode`, async ({page}) => {
  await page.setViewportSize({width,height:900})
  await page.emulateMedia({colorScheme:'light'})
  const errors:string[]=[]
  page.on('pageerror',error=>errors.push(error.message))
  page.on('response',response=>{if(response.status()>=400 && response.url().startsWith('http://127.0.0.1:4173/')) errors.push(`${response.status()} ${response.url()}`)})
  await page.goto('')
  await expect(page.locator('.theme-toggle')).toBeEnabled()
  if(mode==='dark') await page.locator('.theme-toggle').click()
  await page.reload()
  await expect(page.locator('.theme-toggle')).toBeEnabled()
  await expect(page.locator('.theme-toggle')).toHaveAttribute('aria-checked',String(mode==='dark'))

  for (const route of ['', 'chuong-trinh/cntt/', 'chuong-trinh/cntt/hk-1/', 'mon-hoc/comp1800/', 'chuong-trinh/tra-cuu', 'hoc-lieu/', 'exams/quiz-giua-ky', 'algebra/01-ma-tran-va-dinh-thuc']) {
    await page.goto(route)
    await expect(page.locator('.theme-toggle')).toBeEnabled()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('.theme-toggle')).toHaveAttribute('aria-checked',String(mode==='dark'))
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true)
    if(route==='chuong-trinh/cntt/') {
      await expect(page.locator('.semester-grid > .semester-link')).toHaveCount(8)
      const first=await page.locator('.semester-link').nth(0).boundingBox()
      const second=await page.locator('.semester-link').nth(1).boundingBox()
      if(width>=768) expect(second!.x).toBeGreaterThan(first!.x)
      else expect(second!.y).toBeGreaterThan(first!.y)
    }
    if(!route) await page.locator('#home-query').focus()
    const failures=await page.evaluate(()=>{
      function luminance(color:string) {
        const rgb=color.match(/[\d.]+/g)!.slice(0,3).map(Number).map(v=>v/255).map(v=>v<=.04045 ? v/12.92 : ((v+.055)/1.055)**2.4)
        return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722
      }
      function background(element:Element):string {
        let current:Element|null=element
        while(current) {
          const color=getComputedStyle(current).backgroundColor
          if(color!=='rgba(0, 0, 0, 0)' && color!=='transparent') return color
          current=current.parentElement
        }
        return 'rgb(255, 255, 255)'
      }
      function ratio(a:string,b:string) {const x=luminance(a), y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
      const errors:string[]=[]
      const selectors='.home-heading h1,.home-heading p,.home-lookup label,.subject-row h3 a,.subject-row p,.course-code,.brand-name,.brand-name small,.VPNavBarMenuLink,.vp-doc h1,.vp-doc td,.vp-doc th,.status-label,.primary-button,.secondary-button,.catalog-filters label,input[type="search"],select'
      document.querySelectorAll(selectors).forEach(element=>{
        if(!element.getClientRects().length)return
        const style=getComputedStyle(element)
        const contrast=ratio(style.color,background(element))
        if(contrast<4.5)errors.push(`${element.tagName}.${element.className}: text ${contrast.toFixed(2)}`)
      })
      document.querySelectorAll('input[type="search"],select,.theme-toggle,.quiz-option,.semester-link,.DocSearch-Button').forEach(element=>{
        if(!element.getClientRects().length)return
        if(element.matches('.DocSearch-Button') && innerWidth<768)return
        const style=getComputedStyle(element)
        const contrast=ratio(style.borderTopColor,background(element))
        if(contrast<3)errors.push(`${element.tagName}.${element.className}: border ${contrast.toFixed(2)}`)
      })
      document.querySelectorAll(':focus-visible').forEach(element=>{
        const style=getComputedStyle(element)
        if(parseFloat(style.outlineWidth)<3 || ratio(style.outlineColor,background(element))<3)errors.push(`${element.tagName}: focus outline`)
      })
      return errors
    })
    expect(failures,route).toEqual([])
    if (!route) {
      const logos=page.locator('.brand-lockup img')
      await expect(logos).toHaveCount(2)
      expect(await logos.evaluateAll(elements=>elements.every(image=>{
        const img=image as HTMLImageElement
        const rect=img.getBoundingClientRect()
        return img.complete && img.naturalWidth>0 && Math.abs(rect.width/rect.height-img.naturalWidth/img.naturalHeight)<.02 && getComputedStyle(img).filter==='none'
      }))).toBe(true)
      await page.screenshot({path:`test-results/home-${width}-${mode}.png`,fullPage:true,animations:'disabled'})
      if(width<1280) {
        await page.getByRole('button',{name:'mobile navigation',exact:true}).click()
        await expect(page.locator('.VPNavScreen')).toBeVisible()
        await page.locator('.VPNavScreen').getByRole('link',{name:'Kho học liệu',exact:true}).click()
        await expect(page).toHaveURL(/\/hoc-lieu\//)
      }
    }
  }
  await page.screenshot({path:`test-results/lesson-${width}-${mode}.png`,fullPage:false,animations:'disabled'})
  await page.emulateMedia({media:'print'})
  await expect(page.locator('.VPNav')).not.toBeVisible()
  expect(errors).toEqual([])
})

test('home search sends the selected major and semester',async({page})=>{
  await page.goto('')
  await expect(page.locator('.theme-toggle')).toBeEnabled()
  await page.getByLabel('Mã môn hoặc tên môn',{exact:true}).fill('co so toan')
  await page.getByLabel('Ngành học',{exact:true}).selectOption('cntt')
  await page.getByLabel('Học kỳ',{exact:true}).selectOption('1')
  await page.getByRole('button',{name:'Tìm môn',exact:true}).click()
  await expect(page.locator('.course-result')).toHaveCount(1)
  await expect(page.locator('.course-result')).toContainText('COMP1800')
  await expect(page).toHaveURL(/major=cntt/)
  await expect(page).toHaveURL(/term=1/)
})

test('appearance toggle supports keyboard, reload and system preference',async({page})=>{
  await page.emulateMedia({colorScheme:'dark'})
  await page.goto('')
  const toggle=page.locator('.theme-toggle')
  await expect(toggle).toBeEnabled()
  await expect(toggle).toHaveAttribute('aria-checked','true')
  await toggle.focus();await page.keyboard.press('Space')
  await expect(toggle).toHaveAttribute('aria-checked','false')
  await page.reload()
  await expect(toggle).toBeEnabled()
  await expect(toggle).toHaveAttribute('aria-checked','false')
  await page.getByRole('link',{name:'Xem tất cả học liệu',exact:true}).click()
  await expect(toggle).toHaveAttribute('aria-checked','false')
  await toggle.focus();await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-checked','true')
})

test('copy, select, print and developer tools key actions remain usable',async({page})=>{
  await page.goto('mon-hoc/comp1010/')
  await expect(page.locator('.vp-doc')).toContainText('Chưa có tài liệu')
  const result=await page.evaluate(()=>{
    const el=document.querySelector('.vp-doc h1')!
    const range=document.createRange();range.selectNodeContents(el)
    const selection=getSelection()!;selection.removeAllRanges();selection.addRange(range)
    return {selected:selection.toString(),copy:document.dispatchEvent(new KeyboardEvent('keydown',{key:'c',ctrlKey:true,cancelable:true})),print:document.dispatchEvent(new KeyboardEvent('keydown',{key:'p',ctrlKey:true,cancelable:true})),context:el.dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,cancelable:true}))}
  })
  expect(result.selected).toContain('Lập trình cơ bản');expect(result.copy&&result.print&&result.context).toBe(true)
})
