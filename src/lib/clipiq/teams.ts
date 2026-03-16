import type { QueueItem, TeamsDigest } from '@/types/clipiq'

const WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL

const PLATFORM_COLORS: Record<string, string> = {
  instagram: 'E1306C',
  youtube: 'FF4444',
  tiktok: '25F4EE',
  x: 'AAAAAA',
  linkedin: '0A66C2',
}

export async function notifyTeamsApproval(item: QueueItem): Promise<void> {
  if (!WEBHOOK_URL) return

  const accentColor = PLATFORM_COLORS[item.platform] ?? '6C63FF'
  const appUrl = process.env.NEXTAUTH_URL ?? 'https://growbiz.media'
  const itemUrl = `${appUrl}/clipiq/queue?item=${item.id}`

  const card = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.4',
          body: [
            { type: 'TextBlock', text: 'ClipIQ — New post ready for review', weight: 'Bolder', size: 'Medium', color: 'Accent' },
            {
              type: 'FactSet',
              facts: [
                { title: 'Title', value: item.title },
                { title: 'Guest', value: item.guest || '—' },
                { title: 'Brand', value: item.brandName },
                { title: 'Platform', value: item.platform.charAt(0).toUpperCase() + item.platform.slice(1) },
                { title: 'Hook score', value: item.hookScore ? `${item.hookScore}/100` : '—' },
              ],
            },
            { type: 'TextBlock', text: `**Hook:** ${item.hook}`, wrap: true, spacing: 'Medium' },
            {
              type: 'TextBlock',
              text: item.caption.length > 200 ? item.caption.slice(0, 200) + '…' : item.caption,
              wrap: true,
              color: 'Default',
              isSubtle: true,
            },
          ],
          actions: [
            {
              type: 'Action.Http',
              title: '✓ Approve',
              method: 'POST',
              url: `${appUrl}/api/clipiq/teams/action`,
              body: JSON.stringify({ itemId: item.id, action: 'approve' }),
              headers: [{ name: 'Content-Type', value: 'application/json' }],
              style: 'positive',
            },
            { type: 'Action.Http', title: '↗ Open in ClipIQ', method: 'GET', url: itemUrl },
            {
              type: 'Action.Http',
              title: '✎ Request changes',
              method: 'POST',
              url: `${appUrl}/api/clipiq/teams/action`,
              body: JSON.stringify({ itemId: item.id, action: 'changes' }),
              headers: [{ name: 'Content-Type', value: 'application/json' }],
            },
          ],
          msteams: { width: 'Full' },
        },
      },
    ],
  }

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  })
}

export async function notifyTeamsDigest(digest: TeamsDigest): Promise<void> {
  if (!WEBHOOK_URL) return

  const appUrl = process.env.NEXTAUTH_URL ?? 'https://growbiz.media'

  const card = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.4',
          body: [
            { type: 'TextBlock', text: `ClipIQ Weekly Digest — ${digest.weekLabel}`, weight: 'Bolder', size: 'Large' },
            {
              type: 'ColumnSet',
              columns: [
                { type: 'Column', width: 'stretch', items: [
                  { type: 'TextBlock', text: `${digest.postsPublished}`, size: 'ExtraLarge', weight: 'Bolder', horizontalAlignment: 'Center' },
                  { type: 'TextBlock', text: 'Posts published', isSubtle: true, horizontalAlignment: 'Center', spacing: 'None' },
                ]},
                { type: 'Column', width: 'stretch', items: [
                  { type: 'TextBlock', text: `${digest.avgHookScore}`, size: 'ExtraLarge', weight: 'Bolder', horizontalAlignment: 'Center' },
                  { type: 'TextBlock', text: 'Avg hook score', isSubtle: true, horizontalAlignment: 'Center', spacing: 'None' },
                ]},
                { type: 'Column', width: 'stretch', items: [
                  { type: 'TextBlock', text: `${digest.pendingApprovals}`, size: 'ExtraLarge', weight: 'Bolder', horizontalAlignment: 'Center', color: digest.pendingApprovals > 0 ? 'Warning' : 'Good' },
                  { type: 'TextBlock', text: 'Pending approval', isSubtle: true, horizontalAlignment: 'Center', spacing: 'None' },
                ]},
              ],
            },
            ...(digest.topPost ? [{ type: 'TextBlock', text: `**Top post:** ${digest.topPost.title} (${digest.topPost.platform}) — Hook score ${digest.topPost.hookScore}/100`, wrap: true, spacing: 'Medium' }] : []),
            ...(digest.scheduledThisWeek > 0 ? [{ type: 'TextBlock', text: `${digest.scheduledThisWeek} posts scheduled for this week.`, wrap: true, isSubtle: true }] : []),
          ],
          actions: [{ type: 'Action.OpenUrl', title: 'Open ClipIQ Dashboard', url: `${appUrl}/clipiq/dashboard` }],
        },
      },
    ],
  }

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  })
}
