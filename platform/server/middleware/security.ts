export default defineEventHandler((event) => {
  const limit
    = getRequestURL(event).pathname === '/api/v1/files'
      ? 50 * 1024 * 1024
      : 2_100_000
  if (Number(getHeader(event, 'content-length')) > limit)
    throw createError({ statusCode: 413, message: 'Dữ liệu gửi quá lớn.' })
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'Referrer-Policy', 'same-origin')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'Cache-Control', 'private, no-store')
  setHeader(
    event,
    'Content-Security-Policy',
    'default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data:; font-src \'self\'; connect-src \'self\'; frame-ancestors \'none\'; object-src \'none\'; base-uri \'self\'; form-action \'self\'',
  )
})
