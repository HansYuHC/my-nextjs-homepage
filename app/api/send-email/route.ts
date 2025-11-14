import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const form = await req.formData()

  const name = form.get('name')
  const email = form.get('email')
  const message = form.get('message')

  await resend.emails.send({
    from: 'Hans Website <onboarding@resend.dev>',  // 固定不用改
    to: 'yhchuan962@outlook.com',                           // 这里填你的邮箱
    subject: `Website Contact Form - ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  })

  return NextResponse.json({ success: true })
}
