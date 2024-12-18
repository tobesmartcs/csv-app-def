/**
 * Parses a date string in Italian format (dd/mm/yyyy)
 */
export const parseDate = (value: string): Date | null => {
  if (!value) return null;
  
  // Try Italian format (dd/mm/yyyy)
  const parts = value.split(/[/-]/);
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    if (!isNaN(date.getTime())) {
      return date;
    }
  }
  
  // Fallback to standard date parsing
  const date = new Date(value);
  return !isNaN(date.getTime()) ? date : null;
};