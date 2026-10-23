export function useSectionTab(options: MaybeRefOrGetter<{ id: string, name: string }[]>, fallback: string) {
  const route = useRoute()
  const router = useRouter()
  return computed({
    get: () => {
      const value = String(route.query.tab || '')
      return toValue(options).some(option => option.id === value) ? value : fallback
    },
    set: (value: string) => {
      void router.push({ query: { ...route.query, tab: value === fallback ? undefined : value }, hash: route.hash })
    },
  })
}
