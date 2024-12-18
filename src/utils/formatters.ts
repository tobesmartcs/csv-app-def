export const parseNumber = (value: string): number => {
  if (!value || typeof value !== 'string') return 0;

  // Remove currency symbol and spaces
  let cleanValue = value.replace(/[€\s]/g, '');
  
  // Check if the value is negative (either with minus sign or parentheses)
  const isNegative = cleanValue.startsWith('-') || 
    (cleanValue.startsWith('(') && cleanValue.endsWith(')'));
  
  // Remove parentheses if present
  cleanValue = cleanValue.replace(/[()]/g, '');
  
  // Convert Italian number format to standard format
  // Replace thousand separators (.) and decimal comma (,)
  cleanValue = cleanValue.replace(/\./g, '').replace(',', '.');
  
  // Parse the number
  let number = Number(cleanValue);
  
  // Handle parsing errors
  if (isNaN(number)) return 0;
  
  // Apply negative sign if needed
  return isNegative ? -number : number;
};

export const formatNumber = (value: number): string => {
  // Format number with Italian locale (1.234,56)
  const formatted = new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  }).format(Math.abs(value));

  // Add minus sign for negative values
  return value < 0 ? `-${formatted}` : formatted;
};

export const parseDate = (value: string): Date | null => {
  if (!value) return null;
  
  // Try to parse Italian date format (dd/mm/yyyy)
  const parts = value.split(/[/-]/);
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const parsedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate;
    }
  }
  
  // Fallback to standard date parsing
  const date = new Date(value);
  return !isNaN(date.getTime()) ? date : null;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};