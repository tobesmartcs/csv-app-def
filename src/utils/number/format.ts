/**
 * Formats a number to Italian locale string (1.234,56)
 * Handles both large numbers (with thousand separators)
 * and small numbers (without thousand separators)
 */
export const formatItalianNumber = (value: number): string => {
  // Use Italian locale for consistent formatting
  return new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true, // This will add thousand separators
  }).format(value);
};

/**
 * Formats a number with sign for display
 */
export const formatDisplayNumber = (value: number): string => {
  const formatted = formatItalianNumber(Math.abs(value));
  return value < 0 ? `-${formatted}` : formatted;
};