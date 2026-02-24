import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Resolve "content/*" imports from the project root
    config.resolve.alias['content'] = path.join(__dirname, 'content')
    return config
  },
}

export default nextConfig
