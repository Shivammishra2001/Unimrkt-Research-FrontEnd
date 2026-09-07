import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const redirectPath = request.nextUrl.searchParams.get('redirect') ?? '/';

  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 });
  }
  // Blocks an open-redirect via an absolute/external URL in the query param.
  if (!redirectPath.startsWith('/')) {
    return new Response('Invalid redirect target', { status: 400 });
  }

  draftMode().enable();
  redirect(redirectPath);
}
