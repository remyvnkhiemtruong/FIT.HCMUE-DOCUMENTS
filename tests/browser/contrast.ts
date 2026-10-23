// Runs in the browser so colors include the active theme and inherited surfaces.
export function contrastSamples() {
  const rgb = (color: string) => (color.match(/[\d.]+/g) || []).map(Number)
  const luminance = (color: string) => {
    const values = rgb(color).slice(0, 3).map(value => {
      const channel = value / 255
      return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4
    })
    return (values[0] || 0) * .2126 + (values[1] || 0) * .7152 + (values[2] || 0) * .0722
  }
  const ratio = (a: string, b: string) => {
    const x = luminance(a), y = luminance(b)
    return (Math.max(x, y) + .05) / (Math.min(x, y) + .05)
  }
  const background = (element: Element | null): string => {
    if (!element) return 'rgb(255, 255, 255)'
    const value = getComputedStyle(element).backgroundColor
    const channels = rgb(value)
    return channels.length === 4 && channels[3] === 0 ? background(element.parentElement) : value
  }
  const results: { name: string, ratio: number, minimum: number }[] = []
  for (const selector of ['h1', 'label', '.muted', '.page-lead', '.home-heading p', '.primary-button', '.auth-panel button[type=submit]', '.section-tabs button[aria-selected=true]']) {
    const element = document.querySelector(selector)
    if (element && element.getBoundingClientRect().width) results.push({ name: selector, ratio: ratio(getComputedStyle(element).color, background(element)), minimum: 4.5 })
  }
  const input = document.querySelector<HTMLInputElement>('input:not([type=checkbox]):not([type=radio])')
  if (input) {
    results.push({ name: 'input border', ratio: ratio(getComputedStyle(input).borderTopColor, background(input)), minimum: 3 })
    input.focus()
    results.push({ name: 'keyboard focus', ratio: ratio(getComputedStyle(input).outlineColor, background(input.parentElement)), minimum: 3 })
    input.blur()
  }
  return results
}
