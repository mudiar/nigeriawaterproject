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
};

function buildHtml(payload: ThankYouEmailPayload): string {
  const greeting = payload.donorFirstName
    ? `Dear ${payload.donorFirstName},`
    : "Dear Friend,";
  const amount = formatUsd(payload.amountCents);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank you for your donation</title>
</head>
<body style="margin:0;padding:0;background:#eef3f2;font-family:Georgia,'Times New Roman',serif;color:#0c2428;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#eef3f2;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d7e2e0;">
          <tr>
            <td style="background:linear-gradient(145deg,#0d7377,#0c2428);padding:28px 28px 24px;color:#ffffff;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.85;">Nigeria Water Project</div>
              <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:700;">Thank you for your gift</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 16px;font-size:17px;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
                Thank you for supporting clean, sustainable water access for communities in Nigeria.
                Your generosity helps fund boreholes, infrastructure, and long-term reliability for families who need it most.
              </p>
              <table role="presentation" width="100%" style="margin:24px 0;background:#eef3f2;border-radius:12px;">
                <tr>
                  <td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;">
                    <div><strong>Donation amount:</strong> ${amount}</div>
                    <div><strong>Donation date:</strong> ${payload.donationDate}</div>
                    <div><strong>Organization:</strong> ${payload.organizationName}</div>
                    <div><strong>EIN:</strong> ${payload.organizationEin}</div>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
                ${payload.organizationName} is a 501(c)(3) nonprofit organization (EIN ${payload.organizationEin}).
                Your donation may be tax-deductible to the extent allowed by law. Please keep this email as your receipt
                and consult a tax professional for advice specific to your situation.
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.7;">
                With deep appreciation,<br />
                The Nigeria Water Project team
              </p>
              <p style="margin:0;">
                <a href="${payload.siteUrl}" style="display:inline-block;background:#a85a3a;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-family:Arial,Helvetica,sans-serif;font-weight:700;">
                  Visit our website
                </a>
              </p>
              <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#2a4549;font-family:Arial,Helvetica,sans-serif;">
                Questions? Contact us at
                <a href="mailto:${payload.organizationEmail}" style="color:#0d7377;">${payload.organizationEmail}</a>
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
): Promise<{ sent: boolean; reason?: string }> {
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
    `${payload.organizationName} <${payload.organizationEmail}>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: payload.to,
    subject: `Thank you for your ${formatUsd(payload.amountCents)} donation`,
    html: buildHtml(payload),
    replyTo: payload.organizationEmail,
  });

  if (error) {
    console.error("[email] Failed to send thank-you email", error);
    throw new Error(error.message || "Failed to send thank-you email");
  }

  return { sent: true };
}
