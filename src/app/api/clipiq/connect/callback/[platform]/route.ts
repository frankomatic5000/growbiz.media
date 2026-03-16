import { NextRequest } from 'next/server'
import { auth } from '@/auth'
import { savePlatformTokens } from '@/lib/clipiq/publish'
import type { PlatformKey } from '@/types/clipiq'

interface Params { params: Promise<{ platform: string }> }

const PLATFORM_CONFIGS: Record<string, {
  tokenUrl: string
  clientId: () => string
  clientSecret: () => string
  redirectUri: () => string
  parseTokens: (data: Record<string, unknown>, platform: PlatformKey) => { accessToken: string; refreshToken?: string; expiresAt?: number; accountId?: string }
}> = {
  x: {
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    clientId: () => process.env.TWITTER_CLIENT_ID!,
    clientSecret: () => process.env.TWITTER_CLIENT_SECRET!,
    redirectUri: () => `${process.env.NEXTAUTH_URL}/api/clipiq/connect/callback/x`,
    parseTokens: (d) => ({
      accessToken: d.access_token as string,
      refreshToken: d.refresh_token as string,
      expiresAt: Date.now() + (d.expires_in as number ?? 7200) * 1000,
    }),
  },
  tiktok: {
    tokenUrl: 'https://open.tiktokapis.com/v2/oauth/token/',
    clientId: () => process.env.TIKTOK_CLIENT_KEY!,
    clientSecret: () => process.env.TIKTOK_CLIENT_SECRET!,
    redirectUri: () => `${process.env.NEXTAUTH_URL}/api/clipiq/connect/callback/tiktok`,
    parseTokens: (d) => ({
      accessToken: d.access_token as string,
      refreshToken: d.refresh_token as string,
      expiresAt: Date.now() + (d.expires_in as number ?? 86400) * 1000,
    }),
  },
  meta: {
    tokenUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    clientId: () => process.env.META_APP_ID!,
    clientSecret: () => process.env.META_APP_SECRET!,
    redirectUri: () => `${process.env.NEXTAUTH_URL}/api/clipiq/connect/callback/meta`,
    parseTokens: (d) => ({
      accessToken: d.access_token as string,
      expiresAt: Date.now() + (d.expires_in as number ?? 3600) * 1000,
    }),
  },
}

export async function GET(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.redirect(new URL('/clipiq/login', req.nextUrl))
  }

  const { platform } = await params
  const code = req.nextUrl.searchParams.get('code')
  const error = req.nextUrl.searchParams.get('error')

  if (error || !code) {
    return Response.redirect(new URL(`/clipiq/connect?error=${error ?? 'denied'}`, req.nextUrl))
  }

  const config = PLATFORM_CONFIGS[platform]
  if (!config) {
    return Response.redirect(new URL('/clipiq/connect?error=unknown_platform', req.nextUrl))
  }

  try {
    // Exchange code for token
    const tokenRes = await fetch(config.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        client_id: config.clientId(),
        client_secret: config.clientSecret(),
        redirect_uri: config.redirectUri(),
      }),
    })
    const tokenData = await tokenRes.json()

    const tokens = config.parseTokens(tokenData, platform as PlatformKey)

    // For Meta: fetch page info for Facebook and IG user ID for Instagram
    if (platform === 'meta') {
      const pagesRes = await fetch(
        `https://graph.facebook.com/v18.0/me/accounts?access_token=${tokens.accessToken}&fields=id,name,instagram_business_account`
      )
      const pages = await pagesRes.json()
      const page = pages.data?.[0]
      if (page) {
        // Save Facebook token
        await savePlatformTokens(session.user.email, 'facebook', {
          ...tokens,
          accountId: page.id,
          accountName: page.name,
        })
        // Save Instagram token if page has linked IG
        if (page.instagram_business_account?.id) {
          await savePlatformTokens(session.user.email, 'instagram', {
            ...tokens,
            accountId: page.instagram_business_account.id,
            accountName: `${page.name} (Instagram)`,
          })
        }
      }
    } else {
      await savePlatformTokens(session.user.email, platform as PlatformKey, tokens)
    }

    return Response.redirect(new URL('/clipiq/connect?success=true', req.nextUrl))
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'OAuth failed'
    return Response.redirect(new URL(`/clipiq/connect?error=${encodeURIComponent(msg)}`, req.nextUrl))
  }
}
