import { FileType } from '../../types';
import {
  FATTURE_EMESSE_COLUMNS,
  FATTURE_RICEVUTE_COLUMNS,
  CORRISPETTIVI_COLUMNS
} from '../../constants/csvColumns';

// Define column aliases for monetary values
const MONETARY_COLUMN_ALIASES: Record<string, string[]> = {
  'Imponibile/Importo': [
    'imponibile/importo',
    'imponibile',
    'importo',
    'totale imponibile',
    'totale importo'
  ],
  'Imposta': [
    'imposta',
    'iva',
    'totale imposta',
    'totale iva'
  ],
  'Ammontare delle vendite': [
    'ammontare delle vendite',
    'ammontare vendite',
    'totale vendite',
    'importo vendite',
    'totale corrispettivi'
  ],
  'Imponibile vendite': [
    'imponibile vendite',
    'totale imponibile vendite',
    'imponibile delle vendite',
    'base imponibile'
  ],
  'Imposta vendite': [
    'imposta vendite',
    'iva vendite',
    'imposta sulle vendite',
    'iva sulle vendite',
    'totale iva vendite'
  ]
};

/**
 * Gets the standard headers for a given file type
 */
export function getStandardHeaders(fileType: FileType): readonly string[] {
  switch (fileType) {
    case 'fatture-emesse':
      return FATTURE_EMESSE_COLUMNS;
    case 'fatture-ricevute':
      return FATTURE_RICEVUTE_COLUMNS;
    case 'corrispettivi':
      return CORRISPETTIVI_COLUMNS;
  }
}

/**
 * Finds the matching standard header for a CSV header
 */
function findMatchingHeader(csvHeader: string, standardHeaders: readonly string[]): string | undefined {
  const normalizedCsvHeader = csvHeader.toLowerCase().trim();

  // First try exact match
  const exactMatch = standardHeaders.find(h => 
    h.toLowerCase().trim() === normalizedCsvHeader
  );
  if (exactMatch) return exactMatch;

  // Then try monetary column aliases
  for (const [standardHeader, aliases] of Object.entries(MONETARY_COLUMN_ALIASES)) {
    if (aliases.some(alias => normalizedCsvHeader.includes(alias))) {
      return standardHeader;
    }
  }

  // Finally try partial match for other columns
  return standardHeaders.find(h => 
    normalizedCsvHeader.includes(h.toLowerCase().trim())
  );
}

/**
 * Maps CSV headers to standard headers
 */
export function mapHeadersToStandard(
  csvHeaders: string[],
  fileType: FileType
): { headers: string[]; mapping: Map<number, number> } {
  const standardHeaders = getStandardHeaders(fileType);
  const mapping = new Map<number, number>();
  
  // Map CSV headers to standard headers
  csvHeaders.forEach((header, index) => {
    const matchingHeader = findMatchingHeader(header, standardHeaders);
    if (matchingHeader) {
      const standardIndex = standardHeaders.indexOf(matchingHeader);
      if (standardIndex !== -1) {
        mapping.set(index, standardIndex);
      }
    }
  });
  
  return {
    headers: [...standardHeaders],
    mapping
  };
}

/**
 * Maps a row of data to match standard headers
 */
export function mapRowToStandardHeaders(
  row: string[],
  mapping: Map<number, number>,
  totalColumns: number
): string[] {
  const newRow = new Array(totalColumns).fill('');
  
  mapping.forEach((newIndex, oldIndex) => {
    if (oldIndex < row.length) {
      newRow[newIndex] = row[oldIndex].trim();
    }
  });
  
  return newRow;
}