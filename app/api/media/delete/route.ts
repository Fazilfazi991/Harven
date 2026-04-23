import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { fileName, bucketName } = await req.json()

    if (!fileName || !bucketName) {
      return NextResponse.json({ error: 'Missing fileName or bucketName' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([fileName])

    if (error) {
      console.error('Storage delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('Media delete API error:', err)
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
