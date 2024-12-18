import { FileType } from '../../../types';
import { parseItalianNumber } from '../../number/parse';
import { formatItalianNumber } from '../../number/format';
import { getDocumentTypeIndex, processMonetaryValueByDocumentType } from '../documentTypes';
import { MONETARY_COLUMNS } from './columns';
import { DERIVED_CALCULATIONS } from './calculations';

export function processMonetaryValues(
  row: string[],
  headers: string[],
  fileType: FileType
): string[] {
  const monetaryColumns = MONETARY_COLUMNS[fileType];
  const derivedCalculations = DERIVED_CALCULATIONS[fileType] || {};
  
  // Get document type for invoice files
  const documentTypeIndex = fileType !== 'corrispettivi' ? 
    getDocumentTypeIndex(headers) : -1;
  const documentType = documentTypeIndex !== -1 ? 
    row[documentTypeIndex] : undefined;
  
  return row.map((value, index) => {
    const header = headers[index];
    
    // Handle derived values first
    if (header in derivedCalculations) {
      const calculatedValue = derivedCalculations[header](row, headers);
      return formatItalianNumber(calculatedValue);
    }
    
    // Handle regular monetary columns
    if (monetaryColumns.includes(header)) {
      try {
        const numValue = parseItalianNumber(value || '0');
        const processedValue = processMonetaryValueByDocumentType(numValue, documentType);
        return formatItalianNumber(processedValue);
      } catch (err) {
        console.warn(`Error processing monetary value: ${value}`, err);
        return value;
      }
    }
    
    return value;
  });
}