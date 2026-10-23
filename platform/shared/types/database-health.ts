export type DatabaseHealthResponse
  = | { status: 'ok', database: 'connected' }
    | { status: 'error', database: 'unavailable' }
