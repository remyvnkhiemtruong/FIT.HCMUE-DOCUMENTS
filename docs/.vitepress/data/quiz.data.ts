import { createMarkdownRenderer } from 'vitepress'
import questions from './quiz.json'
export default {
  watch: ['./quiz.json'],
  async load() {
    const md=await createMarkdownRenderer(process.cwd()+'/docs',{math:{svg:{fontCache:'local'}}})
    return questions.map(q=>({...q,questionHtml:md.renderInline(q.question),explanationHtml:md.renderInline(q.explanation),options:q.options.map(o=>({
      ...o,
      // Preserve prose choices (including mixed prose/numbers) as Vietnamese text.
      html:md.renderInline(o.text.includes('$') || /[đĐ\u0300-\u036f]/.test(o.text.normalize('NFD')) ? o.text : '$'+o.text+'$')
    }))}))
  }
}
export declare const data: { id: number; question: string; answer: string; explanation: string; questionHtml: string; explanationHtml: string; options: {id:string; text:string; html:string}[] }[]
