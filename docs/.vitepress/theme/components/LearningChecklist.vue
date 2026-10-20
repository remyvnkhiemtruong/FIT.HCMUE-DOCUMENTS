<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
const {page}=useData()
const total=ref(0),done=ref(0),storageAvailable=ref(true)
const storageKey='fit-hcmue:roadmap:v1'
let inputs:HTMLInputElement[]=[]
let removeListeners:(()=>void)[]=[]
function clear() {removeListeners.forEach(fn=>fn());removeListeners=[];inputs=[];total.value=0}
function state() {return Object.fromEntries(inputs.map(input=>[input.dataset.checklistKey,input.checked]))}
function save() {
  done.value=inputs.filter(input=>input.checked).length
  try {localStorage.setItem(storageKey,JSON.stringify(state()))} catch {storageAvailable.value=false}
}
function key(text:string) {let hash=2166136261;for (const c of text) hash=Math.imul(hash^c.charCodeAt(0),16777619);return (hash>>>0).toString(36)}
async function setup() {
  clear()
  if(page.value.relativePath!=='roadmap.md') return
  await nextTick()
  let stored:Record<string,boolean>={}
  try {stored=JSON.parse(localStorage.getItem(storageKey)||'{}');if(!stored || typeof stored!=='object')stored={}}catch{storageAvailable.value=false}
  document.querySelectorAll('.vp-doc li').forEach(li=>{
    const first=li.firstChild
    if(first?.nodeType!==Node.TEXT_NODE || !/^\[ \]\s/.test(first.textContent || ''))return
    const text=(li.textContent || '').replace(/^\[ \]\s/,'')
    first.textContent=first.textContent!.replace(/^\[ \]\s/,'')
    const input=document.createElement('input')
    // Keep the existing keys when wording changes, so saved progress survives.
    input.type='checkbox';input.dataset.checklistKey=li.querySelector('[data-task-key]')?.getAttribute('data-task-key') || key(text);input.setAttribute('aria-label',text)
    li.prepend(input);input.checked=stored[input.dataset.checklistKey]===true
    li.classList.add('learning-task')
    inputs.push(input)
    input.addEventListener('change',save)
    removeListeners.push(()=>input.removeEventListener('change',save))
  })
  total.value=inputs.length;done.value=inputs.filter(i=>i.checked).length
}
function reset() {inputs.forEach(i=>i.checked=false);save()}
onMounted(setup)
watch(()=>page.value.relativePath,setup,{flush:'post'})
onUnmounted(clear)
</script>
<template><aside v-if="total" class="checklist-summary" aria-label="Tiến độ ôn tập"><h2>Tiến độ của bạn</h2><p role="status">Đã hoàn thành {{done}} / {{total}} mục.</p><p>{{storageAvailable ? 'Đã lưu trên trình duyệt này.' : 'Trình duyệt không cho lưu tiến độ. Bạn vẫn có thể đánh dấu trong lần mở trang này.'}}</p><button class="secondary-button" @click="reset">Bỏ đánh dấu tất cả</button></aside></template>
