import { CSVFile, FileType } from '../types';
import { processCSVData } from './csv/process';
import { validateCSVData } from './validation/validate';
import { findDuplicates } from './validation/duplicates';

export { validateCSVData, findDuplicates };

/**
 * Creates a new CSV file with processed data
 */
export function createCSVFile(
  fileName: string,
  headers: string[],
  data: string[][],
  fileType: FileType
): CSVFile {
  // Validate data structure and required columns
  validateCSVData(headers, data, fileType);

  // Process data to match standard format
  const processedResult = processCSVData(fileType, headers, data);

  return {
    id: Date.now().toString(),
    name: fileName,
    headers: processedResult.headers,
    data: processedResult.data,
    uploadDate: new Date().toISOString(),
  };
}

/**
 * Merges data from multiple CSV files
 */
export function mergeCSVData(files: CSVFile[]): { headers: string[]; data: string[][] } {
  if (!files?.length) {
    return { headers: [], data: [] };
  }

  try {
    // Ensure files array is valid and contains data
    if (!Array.isArray(files)) {
      console.error('Invalid files array:', files);
      return { headers: [], data: [] };
    }

    // Use headers from the first file
    const headers = files[0].headers;
    if (!headers?.length) {
      console.error('No headers found in first file');
      return { headers: [], data: [] };
    }

    // Merge data from all files
    const data = files.reduce<string[][]>((acc, file) => {
      if (!file?.data || !Array.isArray(file.data)) {
        console.warn('Invalid data in file:', file.name);
        return acc;
      }

      // Ensure file headers match
      if (!file.headers || file.headers.length !== headers.length) {
        console.warn('Header mismatch in file:', file.name);
        return acc;
      }

      return [...acc, ...file.data];
    }, []);

    return { headers, data };
  } catch (error) {
    console.error('Error merging CSV data:', error);
    return { headers: [], data: [] };
  }
}