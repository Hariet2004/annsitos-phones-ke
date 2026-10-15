import sharp from 'sharp'
import { readdir, rm } from 'node:fs/promises'
import { join } from 'node:path'

const dir = 'public/phones'
const files = (await readdir(dir)).filter(f => f.endsWith('.png'))

for (const f of files) {
  const src = join(dir, f)
  const out = src.replace(/\.png$/, '.webp')
  await sharp(src)
    .resize({ width: 700, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  await rm(src)
  console.log(`${f} -> ${f.replace(/\.png$/, '.webp')}`)
}
