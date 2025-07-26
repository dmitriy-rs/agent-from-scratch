import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const filePath = join(process.cwd(), '..', 'evals', 'results.json')
  const fileContent = await readFile(filePath, 'utf-8')
  const data = JSON.parse(fileContent)

  setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')
  
  return data
}) 