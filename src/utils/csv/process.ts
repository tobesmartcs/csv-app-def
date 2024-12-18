import { FileType } from '../../types';
import { mapHeadersToStandard, mapRowToStandardHeaders } from './headers';
import { validateRequiredColumns, validateRowLength } from './validation';
import { processMonetaryValues } from './monetary/processor';

/**
 * Processes CSV data, mapping to standard headers and handling formatting
 */
export function processCSVData(
  fileType: FileType,
  csvHeaders: string[],
  csvData: string[][]
): { headers: string[]; data: string[][] } {
  try {
    // Validate required columns
    validateRequiredColumns(csvHeaders, fileType);
    
    // Map headers to standard format
    const { headers, mapping } = mapHeadersToStandard(csvHeaders, fileType);
    
    // Process and map each row
    const data = csvData.map((row, rowIndex) => {
      try {
        // Map row to standard headers
        const mappedRow = mapRowToStandardHeaders(row, mapping, headers.length);
        
        // Process monetary values
        return processMonetaryValues(mappedRow, headers, fileType);
      } catch (err) {
        console.warn(`Error processing row ${rowIndex + 1}:`, err);
        return new Array(headers.length).fill('');
      }
    });
    
    // Validate row lengths
    validateRowLength(data, headers.length);
    
    return { headers, data };
  } catch (err) {
    console.error(`Error processing ${fileType}:`, err);
    return { headers: [], data: [] };
  }
}