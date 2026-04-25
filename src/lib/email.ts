import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(to: string, subject: string, name: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Pinjjai by H <noreply@pinjjai.com>',
      to: [to],
      subject,
      html,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error: error.message }
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendOTPEmail(to: string, otp: string, name: string = 'there') {
  const subject = 'Verify your email - Pinjjai by H'
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #5D4432;
          margin-bottom: 10px;
        }
        .otp {
          background: #5D4432;
          color: white;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
          margin: 30px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Pinjjai by H</div>
          <h1>Email Verification</h1>
        </div>
        
        <p>Hello ${name},</p>
        <p>Thank you for signing up with Pinjjai by H! To complete your registration, please use the following One-Time Password (OTP) to verify your email address:</p>
        
        <div class="otp">${otp}</div>
        
        <p>This OTP will expire in <strong>5 minutes</strong> for security reasons.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
        
        <div class="footer">
          <p>Warm regards,<br>The Pinjjai by H Team</p>
          <p style="margin-top: 20px; font-size: 12px;">
            Preserving tradition, empowering artisans.<br>
            <a href="https://pinjjai.com" style="color: #5D4432;">pinjjai.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  return await sendEmail(to, subject, name, html)
}