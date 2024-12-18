import { FileType } from '../../../types';
import { parseItalianNumber } from '../../number/parse';

interface ColumnCalculation {
  (row: string[], headers: string[]): number;
}

export const DERIVED_CALCULATIONS: Partial<Record<FileType, Record<string, ColumnCalculation>>> = {
  'corrispettivi': {
    'Imponibile vendite': calculateBaseAmount,
    'Imposta vendite': calculateTaxAmount
  }
};

function calculateBaseAmount(row: string[], headers: string[]): number {
  const amountIndex = headers.findIndex(h => 
    h.toLowerCase().includes('ammontare delle vendite')
  );
  const taxIndex = headers.findIndex(h => 
    h.toLowerCase().includes('imposta vendite')
  );
  
  if (amountIndex === -1) return 0;
  
  const amount = parseItalianNumber(row[amountIndex]);
  const tax = taxIndex !== -1 ? parseItalianNumber(row[taxIndex]) : 0;
  
  return amount - tax;
}

function calculateTaxAmount(row: string[], headers: string[]): number {
  const amountIndex = headers.findIndex(h => 
    h.toLowerCase().includes('ammontare delle vendite')
  );
  
  if (amountIndex === -1) return 0;
  
  const amount = parseItalianNumber(row[amountIndex]);
  return amount * 0.22; // 22% IVA
}