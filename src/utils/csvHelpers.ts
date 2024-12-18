import { FileType } from '../types';
import { parseNumber } from './formatters';

export function processCSVData(
  fileType: FileType,
  headers: string[],
  data: string[][]
): string[][] {
  // Only process credit notes for invoice types
  if (fileType !== 'fatture-emesse' && fileType !== 'fatture-ricevute') {
    return data;
  }

  // Find column indices
  const documentTypeIndex = headers.findIndex(h => 
    h.toLowerCase().includes('tipo documento')
  );
  
  const amountIndices = headers.map((h, i) => {
    const lower = h.toLowerCase();
    return (
      lower.includes('imponibile/importo') || 
      lower.includes('imposta')
    ) ? i : -1;
  }).filter(i => i !== -1);

  if (documentTypeIndex === -1 || amountIndices.length === 0) {
    return data;
  }

  // Process each row
  return data.map(row => {
    // Check if it's a credit note (case-insensitive)
    const documentType = (row[documentTypeIndex] || '').toLowerCase();
    const isCreditNote = documentType === 'nota di credito';

    return row.map((cell, index) => {
      // Apply negative sign to amount fields for credit notes
      if (amountIndices.includes(index)) {
        let value = parseNumber(cell);
        if (isCreditNote) {
          value = -Math.abs(value); // Ensure negative value for credit notes
        }
        return value.toString();
      }
      return cell;
    });
  });
}