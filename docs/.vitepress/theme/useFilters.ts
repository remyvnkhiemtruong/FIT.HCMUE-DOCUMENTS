import { onMounted, onUnmounted, reactive, watch } from 'vue'

export function useFilters(defaults: Record<string,string>) {
  const filters=reactive({...defaults})
  let ready=false
  const read=()=> {
    ready=false
    const query=new URLSearchParams(location.search)
    for (const key of Object.keys(defaults)) filters[key]=query.get(key) ?? defaults[key]
    ready=true
  }
  onMounted(()=>{read();window.addEventListener('popstate',read)})
  onUnmounted(()=>window.removeEventListener('popstate',read))
  watch(filters,()=>{
    if (!ready) return
    const url=new URL(location.href)
    for (const key of Object.keys(defaults)) {
      if (filters[key] && filters[key]!==defaults[key]) url.searchParams.set(key,filters[key])
      else url.searchParams.delete(key)
    }
    history.replaceState(history.state,'',url)
  },{flush:'sync'})
  return {filters,reset:()=>Object.assign(filters,defaults)}
}
