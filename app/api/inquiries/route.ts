import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, company, country, email, phone, product_interest, quantity, message, source, landing_page_slug } = body

    const supabase = await createClient()

    // 1. Save to Database
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          company,
          country,
          email,
          phone,
          product_interest,
          quantity,
          message,
          source,
          landing_page_slug,
          status: 'new'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      // We don't fail here if it's just a missing mocking setup
    }

    // 2. Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend?.emails.send({
        from: 'HARVEN Notifications <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL || 'harvenllc@gmail.com'],
        subject: `New Inquiry from ${company} - ${product_interest}`,
        html: `
          <h3>New Inquiry Received</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Product Interest:</strong> ${product_interest}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p><strong>Source:</strong> ${source} ${landing_page_slug ? `(${landing_page_slug})` : ''}</p>
        `
      })
    }

    return NextResponse.json({ success: true, inquiry: data?.[0] })

  } catch (error: any) {
    console.error('Inquiries API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
