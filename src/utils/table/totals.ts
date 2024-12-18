import { FileType } from '../../types';
import { parseItalianNumber } from '../number/parse';

interface ColumnIndices {
  date: number;
  amount: number;
  tax: number;
}

const COLUMN_MAPPINGS: Record<FileType, { date: string; amount: string; tax: string }> = {
  'fatture-emesse': {
    date: 'data emissione',
    amount: 'imponibile/importo',
    tax: 'imposta'
  },
  'fatture-ricevute': {
    date: 'data emissione',
    amount: 'imponibile/importo',
    tax: 'imposta'
  },
  'corrispettivi': {
    date: 'data e ora rilevazione',
    amount: 'ammontare delle vendite',
    tax: 'imposta vendite'
  }
};

/**
 * Gets column indices for date, amount, and tax fields
 */
export function getColumnIndices(headers: string[], fileType: FileType): ColumnIndices {
  const lowerHeaders = headers.map(h => h.toLowerCase().trim());
  const mapping = COLUMN_MAPPINGS[fileType];

  return {
    date: lowerHeaders.findIndex(h => h.includes(mapping.date)),
    amount: lowerHeaders.findIndex(h => h.includes(mapping.amount)),
    tax: lowerHeaders.findIndex(h => h.includes(mapping.tax))
  };
}

/**
 * Extracts numeric value from a cell
 */
export function extractNumericValue(value: string): number {
  try {
    return parseItalianNumber(value);
  } catch (err) {
    console.warn('Error parsing numeric value:', value, err);
    return 0;
  }
}