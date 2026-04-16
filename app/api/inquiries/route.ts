import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, company, email, phone, product_interest, quantity, message, source } = body

    const supabase = await createClient()

    // 1. Insert into Supabase
    const { error: dbError } = await supabase.from('inquiries').insert([
      {
        name,
        company,
        email,
        phone,
        product_interest,
        quantity,
        message,
        source: source || 'direct',
        status: 'new'
      }
    ])

    if (dbError) {
      console.error('Database Error:', dbError)
      return NextResponse.json({ error: 'Failed to save inquiry to database' }, { status: 500 })
    }

    // 2. Send Email Notification (if API key is present)
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Harven Inquiries <onboarding@resend.dev>', // Update this with client's domain later
          to: ['harvenllc@gmail.com'],
          subject: `New Trade Inquiry: ${name} (${company})`,
          html: `
            <h2>New Inquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Interest:</strong> ${product_interest}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Message:</strong> ${message}</p>
            <hr />
            <p>This inquiry was captured from: ${source}</p>
          `
        })
      } catch (emailError) {
        console.error('Email Notification Error:', emailError)
        // We don't return error here because DB was successful
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Inquiry API Error:', error)
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 })
  }
}
