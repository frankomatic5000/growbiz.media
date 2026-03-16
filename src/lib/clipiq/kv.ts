import { Redis } from '@upstash/redis'
import type { QueueItem, BrandProfile } from '@/types/clipiq'

function getRedis() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) throw new Error('KV_REST_API_URL or KV_REST_API_TOKEN not set')
  return new Redis({ url, token })
}

export async function getUserQueue(userId: string): Promise<QueueItem[]> {
  try {
    const kv = getRedis()
    return (await kv.get<QueueItem[]>(`clipiq:queue:${userId}`)) ?? []
  } catch {
    return []
  }
}

export async function saveUserQueue(userId: string, queue: QueueItem[]): Promise<void> {
  const kv = getRedis()
  await kv.set(`clipiq:queue:${userId}`, queue)
}

export async function getUserBrands(userId: string): Promise<BrandProfile[]> {
  try {
    const kv = getRedis()
    return (await kv.get<BrandProfile[]>(`clipiq:brands:${userId}`)) ?? []
  } catch {
    return []
  }
}

export async function saveUserBrands(userId: string, brands: BrandProfile[]): Promise<void> {
  const kv = getRedis()
  await kv.set(`clipiq:brands:${userId}`, brands)
}
