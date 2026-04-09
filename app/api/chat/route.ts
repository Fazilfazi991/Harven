import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { messages, pageContext } = await req.json()
    
    // Check if open ai key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: "OpenAI API is not configured on this server. This is a mock response from the Harven Chatbot." })
    }

    const supabase = await createClient()
    const { data: settings } = await supabase
      .from('chatbot_settings')
      .select('*')
      .single()

    // If database connection fails or settings don't exist, we fallback
    // Since we are mocking DB initially, we provide a fallback setting block.
    const isEnabled = settings ? settings.is_enabled : true
    const dbSystemPrompt = settings ? settings.system_prompt : "You are HARVEN, the professional B2B trading assistant for HARVEN LLC based in Dubai, UAE. You specialize in food commodities."

    if (!isEnabled) {
      return NextResponse.json({ error: 'Chatbot disabled' }, { status: 503 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const systemPrompt = dbSystemPrompt + 
      (pageContext ? `\n\nPAGE CONTEXT: The user is currently viewing: ${pageContext}. Use this context to inform your initial response.` : '')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      max_tokens: 600,
      temperature: 0.5
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
