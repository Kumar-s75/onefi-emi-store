export function formatInr(value: number | string): string {
  const numericValue = typeof value === 'string' ? Number(value.replace(/[^\d.-]/g, '')) : Number(value);

  if (Number.isNaN(numericValue)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numericValue);
}
