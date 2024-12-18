import { FileType } from '../../types';
import { getStandardHeaders } from './headers';

const REQUIRED_COLUMNS: Record<FileType, string[]> = {
  'fatture-emesse': ['Sdi/file', 'Data emissione', 'Imponibile/Importo', 'Imposta'],
  'fatture-ricevute': ['Sdi/file', 'Data emissione', 'Imponibile/Importo', 'Imposta'],
  'corrispettivi': ['Id invio', 'Data e ora rilevazione', 'Ammontare delle vendite']
};

/**
 * Validates that required columns are present in CSV headers
 */
export function validateRequiredColumns(headers: string[], fileType: FileType): void {
  const lowerHeaders = headers.map(h => h.toLowerCase().trim());
  const requiredColumns = REQUIRED_COLUMNS[fileType];
  
  const missingColumns = requiredColumns.filter(column => 
    !lowerHeaders.some(h => h.includes(column.toLowerCase()))
  );
  
  if (missingColumns.length > 0) {
    throw new Error(
      `Colonne obbligatorie mancanti: ${missingColumns.join(', ')}`
    );
  }
}

/**
 * Validates that all rows have the correct number of columns
 */
export function validateRowLength(
  data: string[][],
  expectedLength: number
): void {
  data.forEach((row, index) => {
    if (row.length !== expectedLength) {
      throw new Error(
        `La riga ${index + 1} contiene ${row.length} colonne invece di ${expectedLength}`
      );
    }
  });
}