/**
 * Formats a price value to currency or returns 'Coming Soon' / custom display.
 * @param {number|null|undefined} price - Price in currency units
 * @param {string} currencySymbol - Default '$'
 * @returns {string} Formatted string
 */
export function formatPrice(price, currencySymbol = '$') {
  if (price === null || price === undefined || price === '') {
    return 'Coming Soon';
  }
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) {
    return 'Coming Soon';
  }
  return `${currencySymbol}${numericPrice.toFixed(2)}`;
}
