import { FileType } from '../../types';
import {
  FATTURE_EMESSE_COLUMNS,
  FATTURE_RICEVUTE_COLUMNS,
  CORRISPETTIVI_COLUMNS
} from '../../constants/tableColumns';

/**
 * Definisce le colonne richieste per ogni tipo di file
 */
export const REQUIRED_COLUMNS: Record<FileType, string[]> = {
  'fatture-emesse': ['Sdi/file', 'Data emissione', 'Imponibile/Importo', 'Imposta'],
  'fatture-ricevute': ['Sdi/file', 'Data emissione', 'Imponibile/Importo', 'Imposta'],
  'corrispettivi': ['Id invio', 'Data e ora rilevazione', 'Ammontare delle vendite', 'Imposta vendite']
};

/**
 * Definisce le colonne dei fornitori esteri
 */
export const FOREIGN_SUPPLIER_COLUMNS = [
  'codice fiscale fornitore estero',
  'paese fornitore estero',
  'partita iva fornitore estero',
  'denominazione fornitore estero'
];

/**
 * Verifica se una colonna contiene valori monetari
 */
export const isCurrencyColumn = (header: string): boolean => {
  const lowerHeader = header.toLowerCase();
  return lowerHeader.includes('imponibile/importo') ||
         lowerHeader.includes('imposta') ||
         lowerHeader.includes('ammontare delle vendite') ||
         lowerHeader.includes('imponibile vendite');
};

/**
 * Verifica se una colonna contiene date
 */
export const isDateColumn = (header: string): boolean => {
  const lowerHeader = header.toLowerCase();
  return lowerHeader.includes('data');
};

/**
 * Verifica se una colonna è relativa a un fornitore estero
 */
export const isForeignSupplierColumn = (header: string): boolean => {
  return FOREIGN_SUPPLIER_COLUMNS.includes(header.toLowerCase());
};

/**
 * Ottiene le colonne appropriate per il tipo di file specificato
 */
export const getColumnsForFileType = (fileType: FileType): string[] => {
  switch (fileType) {
    case 'fatture-emesse':
      return FATTURE_EMESSE_COLUMNS;
    case 'fatture-ricevute':
      return FATTURE_RICEVUTE_COLUMNS;
    case 'corrispettivi':
      return CORRISPETTIVI_COLUMNS;
  }
};