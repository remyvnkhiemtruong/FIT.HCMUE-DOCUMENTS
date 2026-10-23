import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
import { mathjax } from 'mathjax-full/js/mathjax.js'
import { TeX } from 'mathjax-full/js/input/tex.js'
import { SVG } from 'mathjax-full/js/output/svg.js'
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js'
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js'
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js'

const adaptor = liteAdaptor()
RegisterHTMLHandler(adaptor)
const math = mathjax.document('', {
  InputJax: new TeX({
    packages: AllPackages.filter(
      p => !['html', 'require', 'autoload'].includes(p),
    ),
    maxBuffer: 32_000,
    maxMacros: 1000,
  }),
  OutputJax: new SVG({ fontCache: 'none' }),
})
const md = new MarkdownIt({ html: true, linkify: false, breaks: false })
export function renderMath(tex: string, display = false) {
  if (tex.length > 32_000) throw new Error('Công thức quá dài.')
  return adaptor.outerHTML(math.convert(tex, { display }))
}
md.inline.ruler.before('escape', 'math', (state, silent) => {
  const start = state.pos
  const delimiter = state.src.startsWith('$$', start)
    ? '$$'
    : state.src[start] === '$'
      ? '$'
      : null
  if (!delimiter) return false
  const end = state.src.indexOf(delimiter, start + delimiter.length)
  if (end < 0) return false
  if (!silent) {
    const token = state.push('html_inline', '', 0)
    token.content = renderMath(
      state.src.slice(start + delimiter.length, end),
      delimiter === '$$',
    )
  }
  state.pos = end + delimiter.length
  return true
})
md.block.ruler.before('fence', 'math_block', (state, line, endLine, silent) => {
  const start = state.bMarks[line]! + state.tShift[line]!
  if (!state.src.slice(start, state.eMarks[line]).trim().startsWith('$$'))
    return false
  let text = state.src.slice(start, state.eMarks[line]).trim().slice(2)
  let last = line
  if (!text.endsWith('$$')) {
    for (last = line + 1; last < endLine; last++) {
      const part = state.src.slice(state.bMarks[last], state.eMarks[last])
      text += '\n' + part
      if (part.trim().endsWith('$$')) break
    }
  }
  if (!text.trim().endsWith('$$')) return false
  if (!silent) {
    const token = state.push('html_block', '', 0)
    token.content = renderMath(text.trim().slice(0, -2), true)
  }
  state.line = last + 1
  return true
})
md.core.ruler.push('headings', (state) => {
  const seen = new Map<string, number>()
  state.tokens.forEach((token, i) => {
    if (token.type !== 'heading_open') return
    const inline = state.tokens[i + 1]!
    const explicit = inline.content.match(/\s*\{#([^}]+)\}\s*$/)
    let id
      = explicit?.[1]
        || inline.content
          .toLowerCase()
          .trim()
          .replace(/[^\p{L}\p{N}\s_-]/gu, '')
          .replace(/\s+/g, '-')
    if (explicit) {
      inline.content = inline.content.replace(explicit[0], '')
      inline.children = md.parseInline(inline.content, {})[0]?.children || []
    }
    const count = seen.get(id) || 0
    seen.set(id, count + 1)
    if (count) id += `-${count}`
    token.attrSet('id', id)
  })
})
export function renderMarkdown(source: string) {
  if (Buffer.byteLength(source) > 1_000_000)
    throw new Error('Bài viết quá dài.')
  const clean = source
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?(?:Quiz|LearningChecklist)\b[^>]*>/g, '')
    .replace(/^:::\s*(?:tip|warning|info|danger|details)\s*(.*)$/gm, '> **$1**')
    .replace(/^:::.*$/gm, '')
    .replace(/\/FIT\.HCMUE-DOCUMENTS\//g, '/')
  return sanitizeHtml(md.render(clean), {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      'img',
      'span',
      'input',
      'details',
      'summary',
      'mjx-container',
      'svg',
      'g',
      'path',
      'rect',
      'use',
      'line',
      'circle',
      'polygon',
      'polyline',
      'defs',
      'title',
    ],
    allowedAttributes: {
      '*': ['id', 'class', 'aria-label', 'role', 'data-task-key'],
      'a': ['href', 'title'],
      'img': ['src', 'alt', 'width', 'height'],
      'svg': [
        'xmlns',
        'width',
        'height',
        'viewBox',
        'style',
        'role',
        'focusable',
      ],
      'g': ['transform', 'data-mml-node', 'fill', 'stroke', 'stroke-width'],
      'path': ['d', 'fill', 'stroke', 'transform'],
      'rect': ['x', 'y', 'width', 'height', 'fill'],
      'use': ['href', 'xlink:href', 'transform'],
      'mjx-container': ['class', 'jax', 'display'],
      'input': ['type', 'disabled', 'checked'],
    },
    allowedSchemes: ['https', 'http', 'mailto'],
    allowProtocolRelative: false,
    parser: { lowerCaseAttributeNames: false, lowerCaseTags: false },
    allowedStyles: {
      '*': { 'vertical-align': [/^-?[\d.]+ex$/], 'min-width': [/^[\d.]+ex$/] },
    },
    transformTags: {
      img: (_tag, attrs) => ({
        tagName: 'img',
        attribs: {
          ...attrs,
          src: attrs.src?.startsWith('/api/v1/files/') ? attrs.src : '',
        },
      }),
      a: (_tag, attrs) => ({
        tagName: 'a',
        attribs: {
          ...attrs,
          href: attrs.href?.startsWith('//') ? '' : attrs.href || '',
        },
      }),
    },
  })
}
