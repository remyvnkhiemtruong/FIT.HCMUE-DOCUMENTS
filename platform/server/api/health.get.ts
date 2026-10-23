import type { HealthResponse } from '#shared/types/health'

export default defineEventHandler((event): HealthResponse => {
  setResponseHeader(event, 'Cache-Control', 'no-store')

  return {
    status: 'ok',
    service: 'fit-hcmue-learning-hub',
  }
})
