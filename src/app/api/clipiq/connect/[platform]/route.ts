import { NextRequest } from 'next/server'
import { auth } from '@/auth'

interface Params { params: Promise<{ platform: string }> }

const OAUTH_CONFIGS: Record<string, {
  authUrl: string
  clientId: () => string
  redirectUri: () => string
  scope: string
  extra?: Record<string, string>
}> = {
  x: {
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    clientId: () => process.env.TWITTER_CLIENT_ID!,
    redirectUri: () => `${process.env.NEXTAUTH_URL}/api/clipiq/connect/callback/x`,
    scope: 'tweet.read tweet.write users.read offline.access media.write',
    extra: { code_challenge: 'challenge', code_challenge_method: 'plain' },
  },
  tiktok: {
    authUrl: 'https://www.tiktok.com/v2/auth/authorize/',
    clientId: () => process.env.TIKTOK_CLIENT_KEY!,
    redirectUri: () => `${process.env.NEXTAUTH_URL}/api/clipiq/connect/callback/tiktok`,
    scope: 'user.info.basic,video.upload,video.publish',
  },
  meta: {
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    clientId: () => process.env.META_APP_ID!,
    redirectUri: () => `${process.env.NEXTAUTH_URL}/api/clipiq/connect/callback/meta`,
    scope: 'pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish,public_profile',
  },
}

export async function GET(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.email) {
    return Response.redirect(new URL('/clipiq/login', req.nextUrl))
  }

  const { platform } = await params
  const config = OAUTH_CONFIGS[platform]
  if (!config) {
    return Response.redirect(new URL('/clipiq/connect?error=unknown_platform', req.nextUrl))
  }

  const state = Buffer.from(JSON.stringify({ platform, ts: Date.now() })).toString('base64url')
  const url = new URL(config.authUrl)
  url.searchParams.set('client_id', config.clientId())
  url.searchParams.set('redirect_uri', config.redirectUri())
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('scope', config.scope)
  url.searchParams.set('state', state)
  if (config.extra) {
    for (const [k, v] of Object.entries(config.extra)) {
      url.searchParams.set(k, v)
    }
  }

  return Response.redirect(url.toString())
}
