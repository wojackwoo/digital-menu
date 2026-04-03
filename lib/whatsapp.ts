import { CartItem } from './types';

export const formatCurrency = (value: number) => `${value.toFixed(0)} DH`;

export function buildWhatsAppMessage(params: {
  restaurantName: string;
  table: string;
  items: CartItem[];
  total: number;
}) {
  const lines: string[] = [
    `*New Table Order*`,
    `Restaurant: ${params.restaurantName}`,
    `Table: ${params.table || 'N/A'}`,
    '',
    '*Items:*'
  ];

  params.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.quantity} x ${item.itemName} (${formatCurrency(item.unitPrice)})`);
    item.selectedOptions.forEach((opt) => lines.push(`   - ${opt.groupLabel}: ${opt.optionLabel}`));
    if (item.notes.trim()) {
      lines.push(`   - Notes: ${item.notes.trim()}`);
    }
    lines.push(`   - Line total: ${formatCurrency(item.quantity * item.unitPrice)}`);
  });

  lines.push('', `*Total: ${formatCurrency(params.total)}*`);

  return lines.join('\n');
}

export function toWhatsAppUrl(phone: string, message: string) {
  const cleaned = phone.replace(/\s+/g, '');
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
