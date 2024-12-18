import { FileType } from '../../types';
import { REQUIRED_COLUMNS, FOREIGN_SUPPLIER_COLUMNS } from '../table/columns';
import { getColumnsForFileType } from '../table/columns';

/**
 * Valida la struttura dei dati CSV e le colonne richieste
 */
export function validateCSVData(headers: string[], data: string[][], fileType: FileType): void {
  if (!headers || headers.length === 0) {
    throw new Error('Il file CSV non contiene intestazioni valide');
  }

  const expectedColumns = getColumnsForFileType(fileType);
  const lowerHeaders = headers.map(h => h.toLowerCase());
  const expectedLowerColumns = expectedColumns.map(h => h.toLowerCase());

  // Verifica le colonne richieste
  const requiredColumns = REQUIRED_COLUMNS[fileType];
  const missingColumns = requiredColumns.filter(column => 
    !lowerHeaders.some(h => h.includes(column.toLowerCase()))
  );

  if (missingColumns.length > 0) {
    throw new Error(
      `Colonne obbligatorie mancanti: ${missingColumns.join(', ')}`
    );
  }

  // Verifica il numero di colonne per ogni riga
  data.forEach((row, index) => {
    if (row.length !== headers.length) {
      throw new Error(
        `La riga ${index + 1} contiene ${row.length} colonne invece di ${headers.length}`
      );
    }
  });

  // Per fatture-ricevute, verifica le colonne dei fornitori esteri
  if (fileType === 'fatture-ricevute') {
    const foreignColumns = lowerHeaders.filter(header => 
      FOREIGN_SUPPLIER_COLUMNS.some(col => header.includes(col))
    );

    if (foreignColumns.length > 0) {
      validateForeignSupplierData(headers, data, foreignColumns);
    }
  }
}

/**
 * Valida la consistenza dei dati dei fornitori esteri
 */
function validateForeignSupplierData(
  headers: string[],
  data: string[][],
  foreignColumns: string[]
): void {
  const columnIndices = foreignColumns.map(col => 
    headers.findIndex(h => h.toLowerCase().includes(col))
  );

  data.forEach((row, rowIndex) => {
    const hasForeignData = columnIndices.some(index => 
      row[index]?.trim().length > 0
    );

    if (hasForeignData) {
      const missingFields = columnIndices.filter(index => 
        !row[index]?.trim()
      );

      if (missingFields.length > 0) {
        const missingFieldNames = missingFields
          .map(index => headers[index])
          .join(', ');
        
        throw new Error(
          `Riga ${rowIndex + 1}: Dati fornitore estero incompleti. ` +
          `Campi mancanti: ${missingFieldNames}`
        );
      }
    }
  });
}