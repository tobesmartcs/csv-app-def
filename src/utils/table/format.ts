import { isCurrencyColumn } from './columns';
import { formatDisplayNumber } from '../number/format';
import { parseItalianNumber } from '../number/parse';

/**
 * Formats a cell value based on its column type
 */
export const formatCell = (header: string, value: string): string => {
  if (!value) return '';
  
  if (isCurrencyColumn(header)) {
    const num = parseItalianNumber(value);
    return formatDisplayNumber(num);
  }
  
  return value;
};

/**
 * Calculates column totals for currency columns
 */
export const calculateTotals = (headers: string[], data: string[][]): { [key: string]: number } => {
  const totals: { [key: string]: number } = {};

  headers.forEach((header, columnIndex) => {
    if (isCurrencyColumn(header)) {
      totals[header] = data.reduce((sum, row) => {
        const value = parseItalianNumber(row[columnIndex] || '0');
        return sum + value;
      }, 0);
    }
  });

  return totals;
};