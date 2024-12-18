import { CSVFile } from '../../types';
import { validateHeaders } from './headers';
import { REQUIRED_COLUMNS } from '../table/columns';

/**
 * Merges data from multiple CSV files, ensuring header compatibility
 */
export function mergeCSVData(files: CSVFile[]): { headers: string[]; data: string[][] } {
  if (!files.length) {
    return { headers: [], data: [] };
  }

  try {
    const baseHeaders = files[0].headers;
    const mergedData: string[][] = [];

    // Validate headers compatibility across all files
    for (const file of files) {
      try {
        validateHeaders(baseHeaders, file.headers);
      } catch (error) {
        console.error('Header validation error:', error);
        throw new Error(`Il file "${file.name}" ha una struttura diversa dagli altri file`);
      }
    }

    // Merge data from all files
    for (const file of files) {
      try {
        // Create a mapping of header positions
        const headerMap = new Map<number, number>();
        
        file.headers.forEach((header, index) => {
          const baseIndex = baseHeaders.findIndex(h => 
            h.toLowerCase() === header.toLowerCase()
          );
          if (baseIndex !== -1) {
            headerMap.set(index, baseIndex);
          }
        });

        // Map data to match base headers structure
        const mappedData = file.data.map((row, rowIndex) => {
          try {
            const newRow = new Array(baseHeaders.length).fill('');
            headerMap.forEach((newIndex, oldIndex) => {
              newRow[newIndex] = row[oldIndex] || '';
            });
            return newRow;
          } catch (err) {
            console.warn(`Error mapping row ${rowIndex + 1} in file "${file.name}":`, err);
            return new Array(baseHeaders.length).fill('');
          }
        });

        mergedData.push(...mappedData);
      } catch (error) {
        console.error(`Error processing file "${file.name}":`, error);
        throw new Error(`Errore durante l'elaborazione del file "${file.name}"`);
      }
    }

    return { headers: baseHeaders, data: mergedData };
  } catch (err) {
    console.error('Error merging CSV data:', err);
    return { headers: [], data: [] };
  }
}