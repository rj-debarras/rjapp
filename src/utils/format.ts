/**
 * Formats a raw phone number (e.g. 0102030405) into a display-friendly French format (01 02 03 04 05).
 * @param phone The raw phone number string
 * @returns The formatted phone number
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as XX XX XX XX XX
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return phone;
}
