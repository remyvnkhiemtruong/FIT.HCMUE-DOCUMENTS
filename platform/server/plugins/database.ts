import { closeDatabase } from '../utils/database'
import { closeBusinessDatabase } from '../utils/db'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('close', closeDatabase)
  nitroApp.hooks.hook('close', closeBusinessDatabase)
})
