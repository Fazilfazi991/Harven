import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // DIAGNOSTIC BYPASS: temporarily disable middleware to see if it fixes the crash
  return NextResponse.next()
}
