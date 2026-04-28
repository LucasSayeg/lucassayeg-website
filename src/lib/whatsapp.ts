export function buildWhatsappHref(number: string, prefill: string): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(prefill)}`;
}
