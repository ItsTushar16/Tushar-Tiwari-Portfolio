const validator = require("validator");

// Emails go out through Brevo's HTTPS API (not SMTP). Free Render services block
// the SMTP ports (25/465/587) but HTTPS is fine, and an API key is safer to hand
// to a host than your real Google password.
const BREVO_URL = process.env.BREVO_API_URL || "https://api.brevo.com/v3/smtp/email";
const TIMEOUT_MS = Number(process.env.EMAIL_TIMEOUT_MS) || 10000;

// A submitted name or message becomes part of an HTML email. Without
// escaping, someone typing "<img src=x onerror=...>" as their name would
// have that markup interpreted by whatever reads the email — the visitor's
// own inbox for the confirmation mail, and yours for the admin summary.
const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// reusable sender
const sendEmail = async ({ to, subject, html }) => {
  if (!validator.isEmail(to)) {
    throw new Error("Invalid email");
  }
  if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error("Email is not configured (BREVO_API_KEY / EMAIL_FROM missing)");
  }

  // never let a slow email provider hang a request or a background job
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: process.env.EMAIL_FROM_NAME || "Tushar Tiwari", email: process.env.EMAIL_FROM },
        to: [{ email: to }],
        // replies land in your real inbox even if the sender address is a throwaway
        replyTo: { email: process.env.ADMIN_EMAIL || process.env.EMAIL_FROM },
        subject,
        htmlContent: html,
      }),
      signal: controller.signal,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Brevo ${res.status}: ${data.message || res.statusText}`);
    }

    console.log("Email sent", data.messageId || "");
    return data;
  } catch (err) {
    const message = err.name === "AbortError" ? "Brevo request timed out" : err.message;
    console.error("Mail error:", message);
    throw new Error(message);
  } finally {
    clearTimeout(timer);
  }
};

const sendUserConfirmation = async (data) => {
  const name = escapeHtml(data.name);
  const message = escapeHtml(data.message);

  const html = `
  <div style="font-family: Arial, sans-serif; background:#0f0f0f; padding:30px 20px;">
    <div style="max-width:620px; margin:auto; background:#1a1a1a; border-radius:12px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.6); border:1px solid #333;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1f1f1f, #0a0a0a); padding:32px 40px; text-align:center; border-bottom:1px solid #333;">
        <h1 style="color:#f0c14d; margin:0; font-size:28px; font-weight:700; letter-spacing:1px;">Thank You for Reaching Out</h1>
      </div>

      <!-- Body -->
      <div style="padding:40px 40px;">

        <p style="font-size:17px; line-height:1.6; color:#e0e0e0;">
          Hello <strong style="color:#ffffff;">${name}</strong>,
        </p>

        <p style="font-size:16.5px; line-height:1.7; color:#d0d0d0;">
          Thank you for reaching out. I have received your message and truly appreciate you taking the time to connect.
        </p>

        <p style="font-size:16.5px; line-height:1.7; color:#d0d0d0;">
          I will personally review it and get back to you within <strong style="color:#f0c14d;">24–48 hours</strong>.
        </p>

        <!-- Message Box -->
        <div style="margin:35px 0; padding:25px; background:#111111; border-radius:8px; border-left:5px solid #f0c14d;">
          <strong style="color:#f0c14d;">Your Message:</strong>
          <p style="margin:15px 0 0 0; font-size:15.5px; line-height:1.65; color:#bbbbbb;">
            ${message}
          </p>
        </div>

        <p style="font-size:16.5px; line-height:1.7; color:#d0d0d0;">
          I'm looking forward to speaking with you soon.
        </p>

        <p style="margin-top:40px; font-size:16.5px; color:#e0e0e0;">
          Best regards,<br>
          <strong style="font-size:19px; color:#ffffff;">Tushar Tiwari</strong>
        </p>

        <!-- Contact Links -->
        <p style="margin:25px 0 0 0; color:#aaaaaa; font-size:15px;">
          <a href="https://www.linkedin.com/in/tushar-tiwari-dev" target="_blank" style="color:#f0c14d; text-decoration:none;">
            🔗 LinkedIn Profile
          </a>
          <br/>
          <a href="mailto:tushartiwari.tech@gmail.com" style="color:#f0c14d; text-decoration:none;">
            ✉️ tushartiwari.tech@gmail.com
          </a>
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#111111; padding:25px 40px; text-align:center; border-top:1px solid #333; color:#777; font-size:13.5px; line-height:1.5;">
        You can expect my reply within 24–48 hours.<br>

      </div>

    </div>
  </div>
  `;

  return sendEmail({
    to: data.email,
    subject: "Thanks for reaching out",
    html,
  });
};

const sendAdminSummary = async (inquiries) => {
  if (!inquiries || inquiries.length === 0) return;
  if (!process.env.ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is not set — can't send the daily summary");
  }

  const rows = inquiries
    .map(
      (i, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(i.name)}</td>
      <td>${escapeHtml(i.email)}</td>
      <td>${escapeHtml(i.phone || "N/A")}</td>
      <td>${escapeHtml(i.message)}</td>
      <td>${new Date(i.createdAt).toLocaleString("en-IN")}</td>
    </tr>
  `
    )
    .join("");

  const html = `
  <div style="font-family: Arial; padding:20px;">
    <h2>📬 Daily Inquiry Summary</h2>

    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width:100%;">
      <thead style="background:#007bff; color:white;">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Message</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "Daily Inquiry Summary",
    html,
  });
};

module.exports = {
  sendUserConfirmation,
  sendAdminSummary,
};
