import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  
  // Protect this endpoint in production behind a secret token
  const token = request.nextUrl.searchParams.get('token')
  if (process.env.NODE_ENV === 'production' && token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  if (slug) {
    revalidatePath(`/${slug}`)
    return NextResponse.json({ revalidated: true, now: Date.now(), slug })
  }

  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing slug to revalidate',
  })
}
