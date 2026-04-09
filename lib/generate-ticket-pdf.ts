import { TicketOrder } from "@/types";

export function generateTicketPDF(order: TicketOrder): void {
  const ticketHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Ticket - ${order.eventTitle}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #0A0A0F; color: #fff; padding: 40px; }
  .ticket { max-width: 680px; margin: 0 auto; background: linear-gradient(135deg, #111118 0%, #1A1A24 100%); border: 1px solid rgba(212,175,55,0.3); border-radius: 24px; overflow: hidden; position: relative; }
  .ticket::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #B8960F, #D4AF37, #E8C547, #D4AF37, #B8960F); }
  .header { padding: 32px 32px 20px; text-align: center; border-bottom: 1px dashed rgba(255,255,255,0.1); }
  .logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 28px; color: #D4AF37; margin-bottom: 4px; }
  .tagline { font-size: 11px; color: #71717a; letter-spacing: 3px; text-transform: uppercase; }
  .event-section { padding: 28px 32px; border-bottom: 1px dashed rgba(255,255,255,0.1); }
  .event-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 22px; color: #fff; margin-bottom: 16px; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .info-item .label { font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
  .info-item .value { font-size: 14px; color: #e4e4e7; font-weight: 500; }
  .tier-section { padding: 24px 32px; background: rgba(212,175,55,0.05); border-bottom: 1px dashed rgba(255,255,255,0.1); }
  .tier-badge { display: inline-block; padding: 6px 20px; background: linear-gradient(135deg, #D4AF37, #E8C547); color: #000; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 14px; border-radius: 20px; margin-bottom: 12px; }
  .perks { list-style: none; padding: 0; }
  .perks li { font-size: 12px; color: #a1a1aa; padding: 3px 0; padding-left: 16px; position: relative; }
  .perks li::before { content: '✓'; position: absolute; left: 0; color: #D4AF37; font-weight: bold; }
  .buyer-section { padding: 24px 32px; border-bottom: 1px dashed rgba(255,255,255,0.1); }
  .buyer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .footer { padding: 24px 32px; text-align: center; }
  .ticket-id { font-family: monospace; font-size: 16px; color: #D4AF37; letter-spacing: 2px; margin-bottom: 8px; }
  .qr-placeholder { width: 100px; height: 100px; margin: 12px auto; border: 2px solid rgba(212,175,55,0.3); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .qr-placeholder svg { width: 60px; height: 60px; }
  .qr-text { font-size: 10px; color: #52525b; margin-top: 8px; }
  .total-price { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 28px; background: linear-gradient(135deg, #E8C547, #D4AF37); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .disclaimer { font-size: 9px; color: #3f3f46; margin-top: 16px; line-height: 1.5; }
  @media print { body { background: #fff; } .ticket { border: 2px solid #D4AF37; } }
</style>
</head>
<body>
<div class="ticket">
  <div class="header">
    <div class="logo">XED 256</div>
    <div class="tagline">FortPortal Ni Dubai</div>
  </div>

  <div class="event-section">
    <div class="event-title">${order.eventTitle}</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="label">Date</div>
        <div class="value">${new Date(order.eventDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
      </div>
      <div class="info-item">
        <div class="label">Time</div>
        <div class="value">${order.eventTime}</div>
      </div>
      <div class="info-item">
        <div class="label">Venue</div>
        <div class="value">${order.venue}</div>
      </div>
      <div class="info-item">
        <div class="label">City</div>
        <div class="value">${order.city}</div>
      </div>
    </div>
  </div>

  <div class="tier-section">
    <div class="tier-badge">${order.tier.name} × ${order.quantity}</div>
    <ul class="perks">
      ${order.tier.perks.map((p) => `<li>${p}</li>`).join("")}
    </ul>
  </div>

  <div class="buyer-section">
    <div class="buyer-grid">
      <div class="info-item">
        <div class="label">Ticket Holder</div>
        <div class="value">${order.buyerName}</div>
      </div>
      <div class="info-item">
        <div class="label">Email</div>
        <div class="value">${order.buyerEmail}</div>
      </div>
      <div class="info-item">
        <div class="label">Phone</div>
        <div class="value">${order.buyerPhone}</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <div class="ticket-id">${order.id}</div>
    <div class="qr-placeholder">
      <svg viewBox="0 0 100 100" fill="none">
        <rect x="5" y="5" width="25" height="25" rx="3" stroke="#D4AF37" stroke-width="2"/>
        <rect x="10" y="10" width="15" height="15" rx="1" fill="#D4AF37"/>
        <rect x="70" y="5" width="25" height="25" rx="3" stroke="#D4AF37" stroke-width="2"/>
        <rect x="75" y="10" width="15" height="15" rx="1" fill="#D4AF37"/>
        <rect x="5" y="70" width="25" height="25" rx="3" stroke="#D4AF37" stroke-width="2"/>
        <rect x="10" y="75" width="15" height="15" rx="1" fill="#D4AF37"/>
        <rect x="40" y="40" width="20" height="20" rx="2" fill="#D4AF37" opacity="0.5"/>
        <rect x="70" y="70" width="10" height="10" rx="1" fill="#D4AF37" opacity="0.3"/>
        <rect x="85" y="70" width="10" height="10" rx="1" fill="#D4AF37" opacity="0.3"/>
        <rect x="70" y="85" width="10" height="10" rx="1" fill="#D4AF37" opacity="0.3"/>
      </svg>
    </div>
    <div class="qr-text">Scan QR code at venue entrance</div>
    <div style="margin-top: 16px;">
      <div class="total-price">${order.currency === "USD" ? "$" + order.totalPrice.toFixed(2) : "UGX " + order.totalPrice.toLocaleString()}</div>
      <div style="font-size: 10px; color: #71717a; margin-top: 4px;">Paid via ${getPaymentLabel(order.paymentMethod)} • ${new Date(order.purchasedAt).toLocaleString()}</div>
    </div>
    <div class="disclaimer">
      This ticket is non-transferable. Present this ticket (printed or digital) at the venue entrance.
      For questions, contact muligirwaxed12@gmail.com or +256751155990.
      © ${new Date().getFullYear()} Xed 256. All rights reserved.
    </div>
  </div>
</div>
</body>
</html>`;

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(ticketHTML);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  }
}

function getPaymentLabel(method: string): string {
  const labels: Record<string, string> = {
    visa: "Visa/Mastercard",
    "bank-transfer": "Bank Transfer",
    "mtn-momo": "MTN Mobile Money",
    "mtn-momo-code": "MTN MoMo Code",
    "airtel-pay": "Airtel Pay",
    "airtel-money": "Airtel Money",
  };
  return labels[method] || method;
}

export function simulateEmailTicket(order: TicketOrder): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[Ticket Email] Sent to ${order.buyerEmail} for ${order.eventTitle} (${order.id})`);
      resolve();
    }, 1500);
  });
}
