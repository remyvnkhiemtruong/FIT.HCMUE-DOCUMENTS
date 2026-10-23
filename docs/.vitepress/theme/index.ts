import DefaultTheme from 'vitepress/theme'
import type { EnhanceAppContext } from 'vitepress'
import { defineAsyncComponent, defineComponent, h, nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
import HomePortal from './components/HomePortal.vue'
import MajorDirectory from './components/MajorDirectory.vue'
import CohortSelector from './components/CohortSelector.vue'
import LessonContext from './components/LessonContext.vue'
import LearningChecklist from './components/LearningChecklist.vue'
import LegacyRedirect from './components/LegacyRedirect.vue'
import CohortOverview from './components/CohortOverview.vue'
import BrandIdentity from './components/BrandIdentity.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import CourseMaterials from './components/CourseMaterials.vue'
import './custom.css'
import './interface.css'

// VitePress hydrates the initial page from a lean module. Navigating before
// that mount can hydrate a new route against the previous page's static DOM.
// Queue early client navigation until the initial layout has mounted.
let hydrated=false
let markHydrated:()=>void=()=>{}
const mounted=new Promise<void>(resolve=>{markHydrated=()=>{hydrated=true;resolve()}})

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    setup() {
      const route = useRoute()
      watch(() => route.path, async () => {
        await nextTick()
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        document.querySelector('.VPContent')?.animate([{ opacity: .75 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' })
      })
      onMounted(markHydrated)
      return () => h(DefaultTheme.Layout, null, {
        'nav-bar-title-before': () => h(BrandIdentity),
        'nav-bar-content-after': () => h(ThemeToggle),
        'doc-before': () => h(LessonContext),
        'doc-after': () => h(LearningChecklist)
      })
    }
  }),
  enhanceApp({ app, router }: EnhanceAppContext) {
    if (typeof window!=='undefined') {
      let initialNavigation=true
      router.onBeforeRouteChange=async ()=>{
        if (initialNavigation) {initialNavigation=false;return}
        if (!hydrated) await mounted
      }
    }
    app.component('CourseMaterials',CourseMaterials)
    app.component('HomePortal',HomePortal)
    app.component('MajorDirectory',MajorDirectory)
    app.component('CohortSelector',CohortSelector)
    app.component('LegacyRedirect',LegacyRedirect)
    app.component('CohortOverview',CohortOverview)
    app.component('CatalogBrowser',defineAsyncComponent(()=>import('./components/CatalogBrowser.vue')))
    app.component('Quiz',defineAsyncComponent(()=>import('./components/Quiz.vue')))
  }
}
