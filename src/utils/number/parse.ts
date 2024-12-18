/**
 * Converts an Italian formatted number string to a number
 * Examples: 
 * "1.087,20" -> 1087.20
 * "43,36" -> 43.36
 */
export const parseItalianNumber = (value: string): number => {
  if (!value || typeof value !== 'string') return 0;

  // Remove currency symbols and spaces
  let cleanValue = value.replace(/[€\s]/g, '');
  
  // Handle negative values (minus sign or parentheses)
  const isNegative = cleanValue.startsWith('-') || 
    (cleanValue.startsWith('(') && cleanValue.endsWith(')'));
  
  // Remove parentheses if present
  cleanValue = cleanValue.replace(/[()]/g, '');
  
  // First check if it's already a valid number with decimal point
  const simpleNumber = Number(cleanValue);
  if (!isNaN(simpleNumber)) {
    return isNegative ? -Math.abs(simpleNumber) : simpleNumber;
  }
  
  // Handle Italian format:
  // 1. Check if there's a decimal comma
  const hasComma = cleanValue.includes(',');
  
  if (hasComma) {
    // Split by comma to separate integer and decimal parts
    const parts = cleanValue.split(',');
    if (parts.length === 2) {
      // Remove thousand separators from integer part
      const integerPart = parts[0].replace(/\./g, '');
      // Combine with decimal part using decimal point
      const normalizedNumber = `${integerPart}.${parts[1]}`;
      const number = Number(normalizedNumber);
      
      if (!isNaN(number)) {
        return isNegative ? -Math.abs(number) : number;
      }
    }
  }
  
  // If all else fails, try removing all non-numeric characters except decimal point
  const fallbackValue = cleanValue
    .replace(/[^\d.-]/g, '')
    .replace(',', '.');
  const number = Number(fallbackValue);
  
  return isNaN(number) ? 0 : (isNegative ? -Math.abs(number) : number);
};