import { FileType } from '../../../types';

export const MONETARY_COLUMNS: Record<FileType, string[]> = {
  'fatture-emesse': ['Imponibile/Importo', 'Imposta'],
  'fatture-ricevute': ['Imponibile/Importo', 'Imposta'],
  'corrispettivi': ['Ammontare delle vendite', 'Imponibile vendite', 'Imposta vendite']
};

export function isMonetaryColumn(header: string, fileType: FileType): boolean {
  return MONETARY_COLUMNS[fileType].some(col => 
    header.toLowerCase().includes(col.toLowerCase())
  );
}