import { Resend } from "resend";
import { formatUsd } from "@/lib/donations";

export type ThankYouEmailPayload = {
  to: string;
  donorFirstName?: string;
  amountCents: number;
  donationDate: string;
  organizationName: string;
  organizationEin: string;
  organizationEmail: string;
  siteUrl: string;
  logoUrl: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  /** Stripe session id for idempotent delivery on webhook retries */
  idempotencyKey?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildText(payload: ThankYouEmailPayload): string {
  const greeting = payload.donorFirstName
    ? `Dear ${payload.donorFirstName},`
    : "Dear Friend,";
  const amount = formatUsd(payload.amountCents);
  const lines = [
    "Nigeria Water Project",
    "Thank you for your gift",
    "",
    greeting,
    "",
    "Thank you for supporting clean, sustainable water access for communities in Nigeria. Your generosity helps fund boreholes, infrastructure, and long-term reliability for families who need it most.",
    "",
    `Donation amount: ${amount}`,
    `Donation date: ${payload.donationDate}`,
    `Organization: ${payload.organizationName}`,
    `EIN: ${payload.organizationEin}`,
    "",
    `${payload.organizationName} is a 501(c)(3) nonprofit organization (EIN ${payload.organizationEin}). Your donation may be tax-deductible to the extent allowed by law. Please keep this email as your receipt and consult a tax professional for advice specific to your situation.`,
    "",
    `Visit us: ${payload.siteUrl}`,
    `Questions: ${payload.organizationEmail}`,
  ];
  if (payload.facebookUrl) lines.push(`Facebook: ${payload.facebookUrl}`);
  if (payload.linkedinUrl) lines.push(`LinkedIn: ${payload.linkedinUrl}`);
  lines.push("", "With deep appreciation,", "The Nigeria Water Project team");
  return lines.join("\n");
}

function buildHtml(payload: ThankYouEmailPayload): string {
  const greeting = payload.donorFirstName
    ? `Dear ${escapeHtml(payload.donorFirstName)},`
    : "Dear Friend,";
  const amount = escapeHtml(formatUsd(payload.amountCents));
  const orgName = escapeHtml(payload.organizationName);
  const ein = escapeHtml(payload.organizationEin);
  const orgEmail = escapeHtml(payload.organizationEmail);
  const siteUrl = escapeHtml(payload.siteUrl);
  const logoUrl = escapeHtml(payload.logoUrl);
  const donationDate = escapeHtml(payload.donationDate);

  const socialRows: string[] = [];
  if (payload.facebookUrl) {
    socialRows.push(
      `<a href="${escapeHtml(payload.facebookUrl)}" style="color:#0d7377;text-decoration:none;font-weight:600;">Facebook</a>`,
    );
  }
  if (payload.linkedinUrl) {
    socialRows.push(
      `<a href="${escapeHtml(payload.linkedinUrl)}" style="color:#0d7377;text-decoration:none;font-weight:600;">LinkedIn</a>`,
    );
  }
  const socialHtml =
    socialRows.length > 0
      ? `<p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#2a4549;">Follow our work: ${socialRows.join(" · ")}</p>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>Thank you for your donation</title>
</head>
<body style="margin:0;padding:0;background:#e8f2f1;font-family:Arial,Helvetica,sans-serif;color:#0c2428;-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Thank you for your ${amount} gift to Nigeria Water Project. Your tax receipt is inside.
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#e8f2f1;padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #cfe0de;">
          <tr>
            <td style="background:linear-gradient(145deg,#0d7377 0%,#0a5c60 55%,#0c2428 100%);padding:28px 28px 24px;text-align:center;">
              <img src="${logoUrl}" width="64" height="64" alt="Nigeria Water Project" style="display:block;margin:0 auto 14px;border:0;border-radius:12px;background:#ffffff;padding:6px;" />
              <div style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#b7e4e2;font-weight:700;">Nigeria Water Project</div>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;font-weight:700;color:#ffffff;">Thank you for your gift</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <p style="margin:0 0 14px;font-size:17px;line-height:1.6;color:#0c2428;">${greeting}</p>
              <p style="margin:0 0 14px;font-size:16px;line-height:1.7;color:#2a4549;">
                Thank you for supporting clean, sustainable water access for communities in Nigeria.
                Your generosity helps fund boreholes, infrastructure, and long-term reliability for families who need it most.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 8px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef7f6;border-radius:14px;border:1px solid #d5e8e6;">
                <tr>
                  <td style="padding:20px 22px;font-size:14px;line-height:1.8;color:#0c2428;">
                    <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#0d7377;font-weight:700;margin-bottom:8px;">Donation receipt</div>
                    <div><strong style="color:#0c2428;">Amount:</strong> ${amount}</div>
                    <div><strong style="color:#0c2428;">Date:</strong> ${donationDate}</div>
                    <div><strong style="color:#0c2428;">Organization:</strong> ${orgName}</div>
                    <div><strong style="color:#0c2428;">EIN:</strong> ${ein}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 8px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#2a4549;">
                ${orgName} is a 501(c)(3) nonprofit organization (EIN ${ein}).
                Your donation may be tax-deductible to the extent allowed by law. Please keep this email as your official receipt
                and consult a tax professional for advice specific to your situation.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 8px;" align="center">
              <a href="${siteUrl}" style="display:inline-block;background:#0d7377;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-size:15px;font-weight:700;">
                Visit nigeriawaterproject.org
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px 28px;">
              <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#0c2428;">
                With deep appreciation,<br />
                <strong>The Nigeria Water Project team</strong>
              </p>
              <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#2a4549;">
                Questions? Contact us at
                <a href="mailto:${orgEmail}" style="color:#0d7377;font-weight:600;">${orgEmail}</a>
              </p>
              ${socialHtml}
            </td>
          </tr>
          <tr>
            <td style="background:#0c2428;padding:18px 28px;text-align:center;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#9cb5b8;">
                ${orgName} · EIN ${ein}<br />
                <a href="${siteUrl}" style="color:#7ad4d0;text-decoration:none;">nigeriawaterproject.org</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendDonationThankYouEmail(
  payload: ThankYouEmailPayload,
): Promise<{ sent: boolean; reason?: string; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set; skipping thank-you email");
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }
  if (!payload.to) {
    return { sent: false, reason: "No donor email provided" };
  }

  const from =
    process.env.RESEND_FROM_EMAIL ||
    `Nigeria Water Project <${payload.organizationEmail}>`;

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: payload.to,
    subject: `Thank you for your ${formatUsd(payload.amountCents)} donation`,
    html: buildHtml(payload),
    text: buildText(payload),
    replyTo: payload.organizationEmail,
    headers: payload.idempotencyKey
      ? { "Idempotency-Key": payload.idempotencyKey }
      : undefined,
    tags: [
      { name: "category", value: "donation_thank_you" },
      ...(payload.idempotencyKey
        ? [{ name: "stripe_session", value: payload.idempotencyKey.slice(0, 64) }]
        : []),
    ],
  });

  if (error) {
    console.error("[email] Failed to send thank-you email", error);
    throw new Error(error.message || "Failed to send thank-you email");
  }

  return { sent: true, id: data?.id };
}
