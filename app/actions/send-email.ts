"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";

// ---- Simple per-instance rate limit ----
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 min
const RATE_LIMIT_MAX = 5;
const ipToTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string | null): boolean {
  if (!ip) return false;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipToTimestamps.get(ip) || []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  ipToTimestamps.set(ip, recent);
  return false;
}

function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

export async function sendEmail(prevState: unknown, formData: FormData) {
  try {
    // Honeypot (bots fill hidden fields)
    const honey = sanitize(formData.get("company"));
    if (honey) {
      return { success: false, error: "Bot detected." };
    }

    // Get IP from request headers (Vercel/Proxies)
    const h = await headers();
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      null;

    if (isRateLimited(ip)) {
      return { success: false, error: "Too many requests. Try again soon." };
    }

    // Fields (match your form: name, email, phone, message)
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const tel = sanitize(formData.get("tel"));
    const message = sanitize(formData.get("message"));

    if (!name || !email || !message) {
      return {
        success: false,
        error: "Name, email, and message are required.",
      };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { success: false, error: "Please provide a valid email address." };
    }

    // Transport (Gmail: use App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g. no-reply@yourdomain or gmail user
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Bahi branding palette
    const brandRed = "#8d0000"; // primary red
    const accentCopper = "#c47742"; // warm copper accent
    const warmPaper = "#e9dcd4"; // warm paper background
    const deepInk = "#241f20"; // deep ink text

    const submittedAt = new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Amman",
      hour12: false,
    });

    const subject = `Bahi · New Inquiry from ${name}`;
    const fromDisplay = `Bahi Café <${
      process.env.EMAIL_FROM || process.env.EMAIL_USER
    }>`;

    const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0; padding:0; background-color:#f5f5f5; font-family:'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5; padding:32px 16px;">
      <tr>
        <td align="center" style="margin:0; padding:0;">
          <!-- responsive card wrapper -->
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              max-width:600px;
              width:100%;
              background-color:#ffffff;
              border-radius:16px;
              overflow:hidden;
              box-shadow:0 4px 24px rgba(0,0,0,0.08);
            "
          >
            <!-- Header with brand accent -->
            <tr>
              <td style="background-color:${warmPaper}; padding:40px 24px; text-align:center; border-bottom:3px solid ${brandRed};">
                <h1 style="margin:0 0 8px; color:${brandRed}; font-size:32px; font-weight:700; letter-spacing:3px;">
                  BAHI
                </h1>
                <p style="margin:8px 0 0; color:${deepInk}; font-size:13px; letter-spacing:2px; text-transform:uppercase; opacity:0.7;">
                  Café · Amman
                </p>
              </td>
            </tr>

            <!-- Decorative accent line -->
            <tr>
              <td style="height:6px; background:linear-gradient(90deg, ${accentCopper} 0%, ${brandRed} 50%, ${accentCopper} 100%);"></td>
            </tr>

            <!-- Main content -->
            <tr>
              <td style="padding:32px 24px;">
                <!-- Inquiry header -->
                <div style="margin-bottom:24px; text-align:center;">
                  <p style="margin:0 0 8px; font-size:12px; letter-spacing:1.5px; text-transform:uppercase; color:${accentCopper};">
                    New Contact Inquiry
                  </p>
                  <h2 style="margin:0; color:${deepInk}; font-size:22px; font-weight:600;">
                    Message from ${name}
                  </h2>
                </div>

                <!-- Contact details card -->
                <div style="background-color:${warmPaper}; border-radius:12px; padding:20px; margin-bottom:20px; border-left:4px solid ${accentCopper};">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="display:inline-block; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#6d5a52; margin-bottom:4px;">
                          Full Name
                        </span>
                        <p style="margin:0; color:${deepInk}; font-size:16px; font-weight:500;">${name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="display:inline-block; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#6d5a52; margin-bottom:4px;">
                          Email Address
                        </span>
                        <p style="margin:0;">
                          <a href="mailto:${email}" style="color:${brandRed}; text-decoration:none; font-size:16px; font-weight:500;">
                            ${email}
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <span style="display:inline-block; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#6d5a52; margin-bottom:4px;">
                          Phone Number
                        </span>
                        <p style="margin:0; color:${deepInk}; font-size:16px; font-weight:500;">
                          ${tel || "Not provided"}
                        </p>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Message content -->
                <div style="background-color:#ffffff; border:2px solid ${warmPaper}; border-radius:12px; padding:20px; margin-bottom:20px;">
                  <p style="margin:0 0 12px; font-size:11px; letter-spacing:1px; text-transform:uppercase; color:${accentCopper};">
                    Message
                  </p>
                  <p style="margin:0; line-height:1.7; color:${deepInk}; font-size:15px;">
                    ${message}
                  </p>
                </div>

                <!-- Call to action -->
                <div style="text-align:center; padding:16px 0;">
                  <a
                    href="mailto:${email}"
                    style="
                      display:inline-block;
                      background:linear-gradient(135deg, ${brandRed} 0%, #6f0000 100%);
                      color:#ffffff;
                      text-decoration:none;
                      padding:12px 28px;
                      border-radius:8px;
                      font-size:14px;
                      font-weight:600;
                      letter-spacing:0.5px;
                    "
                  >
                    Reply to ${name}
                  </a>
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:${warmPaper}; padding:24px; border-top:1px solid #d3c5ba;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="text-align:center;">
                      <p style="margin:0 0 8px; color:#6d5a52; font-size:12px; line-height:1.6;">
                        This message was received via the <strong>Bahi Café</strong> website contact form
                      </p>
                      <p style="margin:0; color:#6d5a52; font-size:11px;">
                        <strong>Submitted:</strong> ${submittedAt} · Amman Time
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

    const text = [
      `BAHI CAFÉ`,
      `New Contact Inquiry`,
      ``,
      `Message from ${name}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `CONTACT DETAILS`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${tel || "Not provided"}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `MESSAGE`,
      ``,
      `${message}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `Submitted: ${submittedAt} (Amman Time)`,
      ``,
      `Reply to this email to respond to ${name}`,
    ].join("\n");

    await transporter.sendMail({
      from: fromDisplay, // your domain or gmail user (avoid spoofing)
      to: process.env.EMAIL_RECIPIENTS, // comma-separated list
      replyTo: email, // lets you reply straight to the sender
      subject,
      html,
      text,
    });

    return { success: true, error: null };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false, error: "Something went wrong." };
  }
}
