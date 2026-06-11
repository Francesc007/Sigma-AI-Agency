export const WHATSAPP_NUMBER = "525554590883";

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola, vi la página de Sigma AI y me interesa una auditoría de automatización para mi negocio.";

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildProjectInquiryMessage(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return [
    WHATSAPP_DEFAULT_MESSAGE,
    "",
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.phone}`,
    `Proyecto: ${data.message}`,
  ].join("\n");
}

export function openWhatsApp(text: string): void {
  const url = buildWhatsAppUrl(text);
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
