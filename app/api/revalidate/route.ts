import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Called by every backend lifecycle hook on afterCreate/afterUpdate, using
 * FRONTEND_URL + REVALIDATE_SECRET. A JSON-parse failure on the body is
 * treated identically to a missing tag (400, not 500).
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tag = body && typeof body === 'object' ? (body as Record<string, unknown>).tag : undefined;
  if (!tag || typeof tag !== 'string') {
    return NextResponse.json({ revalidated: false, error: 'Missing "tag"' }, { status: 400 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
