import { isDateColumn, isCurrencyColumn } from './columns';
import { parseDate } from '../date/parse';
import { parseItalianNumber } from '../number/parse';

interface SortConfig {
  column: number;
  direction: 'asc' | 'desc' | null;
}

/**
 * Sorts table data based on column type and sort direction
 */
export function sortTableData(
  data: string[][],
  headers: string[],
  sortConfig: SortConfig
): string[][] {
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.column];
    const bValue = b[sortConfig.column];
    
    if (isDateColumn(headers[sortConfig.column])) {
      const aDate = parseDate(aValue);
      const bDate = parseDate(bValue);
      
      if (!aDate || !bDate) return 0;
      return sortConfig.direction === 'asc' 
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    }
    
    if (isCurrencyColumn(headers[sortConfig.column])) {
      const aNum = parseItalianNumber(aValue);
      const bNum = parseItalianNumber(bValue);
      return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
    }
    
    // Default string comparison
    return sortConfig.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
}