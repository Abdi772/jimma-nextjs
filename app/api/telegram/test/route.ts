import { NextResponse } from 'next/server';
import { adminClient, userFromRequest } from '../../../../lib/telegramServer';

// Sends a test message to the logged-in person's own Telegram and says
// exactly what went wrong if it fails.
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const user = await userFromRequest(req);
  if (!user) {
    return NextResponse.json({ ok: false, reason: 'Please log in again.' });
  }

  const admin = adminClient();
  if (!admin) {
    return NextResponse.json({
      ok: false,
      reason: 'Server setting missing: SUPABASE_SERVICE_ROLE_KEY (add it in Vercel, then redeploy).',
    });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    return NextResponse.json({
      ok: false,
      reason: 'Server setting missing: TELEGRAM_BOT_TOKEN (add it in Vercel, then redeploy).',
    });
  }

  const { data: link } = await admin
    .from('telegram_links')
    .select('chat_id')
    .eq('user_id', user.id)
    .maybeSingle();
  if (!link?.chat_id) {
    return NextResponse.json({
      ok: false,
      reason: 'This account is not connected to Telegram yet. Tap Connect first.',
    });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: Number(link.chat_id),
        text: '✅ Test alert from Jimma. Telegram alerts are working.',
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && json.ok) return NextResponse.json({ ok: true });
    return NextResponse.json({
      ok: false,
      reason: `Telegram said: ${json.description ?? res.status}`,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      reason: 'Could not reach Telegram from the server.',
    });
  }
        }
