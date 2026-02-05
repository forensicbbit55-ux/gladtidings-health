import { query } from '../../../../lib/db'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Spam keywords to block
const SPAM_KEYWORDS = [
  'viagra', 'cialis', 'lottery', 'winner', 'congratulations',
  'free money', 'click here', 'limited time', 'act now',
  'guaranteed', 'risk free', 'million dollars', 'weight loss',
  'casino', 'poker', 'blackjack', 'roulette', 'betting',
  'make money fast', 'work from home', 'multi-level marketing',
  'pyramid scheme', 'scam', 'fraud', 'illegal', 'drugs',
  'pharmacy', 'medication', 'prescription', 'overnight',
  'miracle', 'breakthrough', 'secret', 'exclusive', 'urgent',
  'act immediately', 'limited offer', 'special promotion'
]

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map()

// Check if message contains spam keywords
function containsSpamKeywords(message) {
  const lowerMessage = message.toLowerCase()
  return SPAM_KEYWORDS.some(keyword => lowerMessage.includes(keyword))
}

// Rate limiting function
function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour window
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: 4 }
  }
  
  const rateData = rateLimitStore.get(ip)
  
  // Reset window if expired
  if (now > rateData.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: 4 }
  }
  
  // Check rate limit
  if (rateData.count >= 5) {
    return { 
      allowed: false, 
      remaining: 0,
      resetTime: rateData.resetTime
    }
  }
  
  // Increment counter
  rateData.count++
  rateLimitStore.set(ip, rateData)
  
  return { 
    allowed: true, 
    remaining: 5 - rateData.count,
    resetTime: rateData.resetTime
  }
}

// Create Nodemailer transporter
function createTransporter() {
  try {
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  } catch (error) {
    console.error('Failed to create email transporter:', error)
    return null
  }
}

// Send email notification
async function sendContactEmail(contactData) {
  const transporter = createTransporter()
  
  if (!transporter) {
    console.error('Email transporter not available - skipping email notification')
    return false
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Glad Tidings" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New Contact Form Submission: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
            
            <div style="background-color: #ffffff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <div style="margin-bottom: 15px;">
                <strong style="color: #666;">From:</strong> ${contactData.name} &lt;${contactData.email}&gt;
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Subject:</strong> ${contactData.subject}
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Message:</strong>
                <div style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; margin-top: 5px; white-space: pre-wrap;">
                  ${contactData.message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #666;">Submitted:</strong> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// Get client IP address
function getClientIP(request) {
  // Try various methods to get IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.ip
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  if (clientIP) {
    return clientIP
  }
  
  return 'unknown'
}

export async function POST(request) {
  try {
    const clientIP = getClientIP(request)
    const rateLimitResult = checkRateLimit(clientIP)
    
    // Check rate limiting
    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        success: false,
        error: 'Too many requests. Please try again later.',
        message: `Rate limit exceeded. You can send another message in ${Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)} minutes.`,
        type: 'rate_limit',
        remaining: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime
      }, { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString()
        }
      })
    }

    const body = await request.json()
    const { name, email, subject, message, honeypot } = body

    // Check honeypot field (should be empty/absent)
    if (honeypot) {
      console.log('Spam detected via honeypot:', { clientIP, email, honeypot })
      return NextResponse.json({
        success: false,
        error: 'Invalid submission detected',
        message: 'Your submission appears to be spam.',
        type: 'honeypot'
      }, { status: 400 })
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required',
        fields: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          subject: !subject ? 'Subject is required' : null,
          message: !message ? 'Message is required' : null
        },
        type: 'validation'
      }, { status: 400 })
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Please enter a valid email address',
        field: 'email',
        type: 'validation'
      }, { status: 400 })
    }

    // Check for spam keywords
    if (containsSpamKeywords(message)) {
      console.log('Spam keywords detected:', { clientIP, email, message })
      return NextResponse.json({
        success: false,
        error: 'Message contains content that appears to be spam',
        message: 'Please remove promotional or inappropriate content and try again.',
        type: 'spam_filter'
      }, { status: 400 })
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json({
        success: false,
        error: 'Message must be at least 10 characters long',
        field: 'message',
        type: 'validation'
      }, { status: 400 })
    }

    // Validate name length
    if (name.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Name must be at least 2 characters long',
        field: 'name',
        type: 'validation'
      }, { status: 400 })
    }

    // Additional spam checks
    if (message.length > 2000) {
      return NextResponse.json({
        success: false,
        error: 'Message is too long (maximum 2000 characters)',
        field: 'message',
        type: 'validation'
      }, { status: 400 })
    }

    if (name.length > 100) {
      return NextResponse.json({
        success: false,
        error: 'Name is too long (maximum 100 characters)',
        field: 'name',
        type: 'validation'
      }, { status: 400 })
    }

    // Check if contact_messages table exists, create if not
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          status TEXT DEFAULT 'new',
          ip_address TEXT,
          user_agent TEXT,
          created_at TIMESTAMP DEFAULT now()
        )
      `)
    } catch (error) {
      console.error('Error creating contact_messages table:', error)
    }

    // Insert contact message into database
    const result = await query(`
      INSERT INTO contact_messages (name, email, subject, message, status, ip_address, user_agent) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `, [
      name.trim(), 
      email.trim(), 
      subject.trim(), 
      message.trim(), 
      'new',
      clientIP,
      request.headers.get('user-agent') || 'unknown'
    ])

    const contactData = result.rows[0]

    // Try to send email notification
    const emailSent = await sendContactEmail(contactData)

    // Log submission details
    console.log('Contact form submission:', {
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      ip: clientIP,
      emailSent: emailSent,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: emailSent 
        ? 'Thank you for contacting us! We will respond as soon as possible.'
        : 'Thank you for contacting us! We will respond as soon as possible.',
      contact: {
        id: contactData.id,
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        status: contactData.status,
        created_at: contactData.created_at
      },
      emailSent: emailSent,
      rateLimit: {
        remaining: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime
      }
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to submit contact form',
      message: 'An unexpected error occurred. Please try again later.',
      type: 'server_error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Check SMTP configuration
    const smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
    
    // Check if contact_messages table exists
    const tableCheck = await query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'contact_messages'
      ) as exists
    `)

    return NextResponse.json({
      success: true,
      smtp_configured: !smtpConfigured,
      table_exists: tableCheck.rows[0].exists,
      message: tableCheck.rows[0].exists 
        ? 'Contact system is ready with spam protection'
        : 'Contact messages table will be created on first submission',
      smtp_status: smtpConfigured 
        ? 'SMTP is configured - email notifications will be sent'
        : 'SMTP is not configured - emails will not be sent',
      protection: {
        rate_limit: '5 requests per hour per IP',
        spam_filter: 'Keyword-based spam detection',
        honeypot: 'Hidden field spam detection'
      }
    })

  } catch (error) {
    console.error('Contact API health check error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to check contact API status'
    }, { status: 500 })
  }
}
