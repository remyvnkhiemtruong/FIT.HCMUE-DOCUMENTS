import type { Viewer } from '../../shared/types/platform'

export async function useViewer() {
  const result = await useFetch<{ user: Viewer | null }>('/api/v1/me', {
    key: 'viewer',
  })
  return {
    user: computed(() => result.data.value?.user || null),
    refresh: result.refresh,
  }
}
