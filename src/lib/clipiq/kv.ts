import { kv } from '@vercel/kv'
import type { QueueItem, BrandProfile } from '@/types/clipiq'

export async function getUserQueue(userId: string): Promise<QueueItem[]> {
  try {
    return (await kv.get<QueueItem[]>(`clipiq:queue:${userId}`)) ?? []
  } catch {
    return []
  }
}

export async function saveUserQueue(userId: string, queue: QueueItem[]): Promise<void> {
  await kv.set(`clipiq:queue:${userId}`, queue)
}

export async function getUserBrands(userId: string): Promise<BrandProfile[]> {
  try {
    return (await kv.get<BrandProfile[]>(`clipiq:brands:${userId}`)) ?? []
  } catch {
    return []
  }
}

export async function saveUserBrands(userId: string, brands: BrandProfile[]): Promise<void> {
  await kv.set(`clipiq:brands:${userId}`, brands)
}
