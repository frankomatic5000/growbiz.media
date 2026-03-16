export type PlatformKey = 'instagram' | 'youtube' | 'tiktok' | 'x' | 'linkedin'
export type PostStatus = 'draft' | 'review' | 'approved' | 'scheduled' | 'published'
export type UserRole = 'free' | 'studio' | 'agency'
export type ContentTone = 'inspirational' | 'educational' | 'controversial' | 'emotional' | 'entertaining'
export type CtaType = 'watch' | 'follow' | 'save' | 'comment' | 'share'
export type ContentType = 'interview' | 'clip' | 'tip' | 'story' | 'educational'

export interface BrandProfile {
  id: string
  name: string
  emoji: string
  handle: string
  audience: string
  voice: string
  niche: string
  language: 'en' | 'pt-BR' | 'es'
  createdAt: string
}

export interface PlatformCaption {
  hook: string
  caption: string
  hashtags: string
  altHooks: string[]
  bestTime: string
  formatTip: string
}

export interface GenerateResult {
  hookScore: number
  hookScoreReason: string
  bestHook: string
  seoKeywords: string[]
  instagram?: PlatformCaption
  youtube?: PlatformCaption
  tiktok?: PlatformCaption
  x?: PlatformCaption
  linkedin?: PlatformCaption
}

export interface QueueItem {
  id: string
  userId: string
  title: string
  guest?: string
  platform: PlatformKey
  brandId: string
  brandName: string
  hook: string
  caption: string
  hashtags: string
  status: PostStatus
  scheduledDate?: string
  publishedDate?: string
  hookScore?: number
  teamsNotifiedAt?: string
  createdAt: string
  updatedAt: string
}

export interface TeamsDigest {
  weekLabel: string
  postsPublished: number
  avgHookScore: number
  pendingApprovals: number
  scheduledThisWeek: number
  topPost?: {
    title: string
    platform: string
    hookScore: number
  }
}
