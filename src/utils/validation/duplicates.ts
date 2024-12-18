import { CSVFile, FileType } from '../../types';
import { findRequiredColumnIndex } from './columns';

/**
 * Finds duplicate records based on file type
 */
export function findDuplicates(
  existingFiles: CSVFile[],
  newData: string[][],
  fileType: FileType
): string[][] {
  if (!newData || newData.length < 2) return [];

  const headers = newData[0];
  const data = newData.slice(1);

  // Find the appropriate column index based on file type
  const idColumnIndex = findRequiredColumnIndex(headers, fileType);

  if (idColumnIndex === -1) {
    throw new Error(
      fileType === 'corrispettivi'
        ? 'Colonna Id invio non trovata'
        : 'Colonna SDI/File non trovata'
    );
  }

  // Create a map of existing values
  const existingValues = new Set<string>();
  existingFiles.forEach(file => {
    file.data.forEach(row => {
      const value = row[idColumnIndex]?.trim().toLowerCase();
      if (value) existingValues.add(value);
    });
  });

  // Check for duplicates in new data
  const duplicates = new Set<string>();
  const seenValues = new Set<string>();

  data.forEach(row => {
    const value = row[idColumnIndex]?.trim().toLowerCase();
    if (!value) return;

    if (seenValues.has(value) || existingValues.has(value)) {
      duplicates.add(value);
    }
    seenValues.add(value);
  });

  // Return rows with duplicate values
  return data.filter(row => {
    const value = row[idColumnIndex]?.trim().toLowerCase();
    return duplicates.has(value);
  });
}