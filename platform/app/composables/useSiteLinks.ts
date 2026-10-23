export function useSiteLinks() {
  const config = useRuntimeConfig()

  return {
    legacyUrl: config.public.legacyUrl,
  }
}
