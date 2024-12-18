import { formatNumber, parseNumber, parseDate } from './formatters';

export const isCurrencyColumn = (header: string): boolean => {
  const lowerHeader = header.toLowerCase();
  return lowerHeader.includes('imponibile/importo') ||
         lowerHeader.includes('imposta');
};

export const isDateColumn = (header: string): boolean => {
  const lowerHeader = header.toLowerCase();
  return lowerHeader.includes('data');
};

export const formatCell = (header: string, value: string): string => {
  if (!value) return '';
  
  if (isCurrencyColumn(header)) {
    const num = parseNumber(value);
    return formatNumber(num);
  }
  return value;
};

export const calculateTotals = (headers: string[], data: string[][]): { [key: string]: number } => {
  const totals: { [key: string]: number } = {};

  headers.forEach((header, columnIndex) => {
    if (isCurrencyColumn(header)) {
      totals[header] = data.reduce((sum, row) => {
        const value = parseNumber(row[columnIndex] || '0');
        return sum + value;
      }, 0);
    }
  });

  return totals;
};

export const filterData = (
  data: string[][],
  headers: string[],
  startDate: string,
  endDate: string,
  documentType: string
): string[][] => {
  if (!data.length) return [];

  const dateColumnIndices = headers
    .map((header, index) => ({ header: header.toLowerCase(), index }))
    .filter(({ header }) => header.includes('data'))
    .map(({ index }) => index);

  const documentTypeIndex = headers.findIndex(header => 
    header.toLowerCase().includes('tipo documento')
  );

  return data.filter(row => {
    // Document type filter
    if (documentType && documentTypeIndex !== -1) {
      const rowDocType = row[documentTypeIndex]?.toLowerCase() || '';
      if (rowDocType !== documentType.toLowerCase()) {
        return false;
      }
    }

    // Date filter
    if (startDate || endDate) {
      const rowDates = dateColumnIndices.map(index => parseDate(row[index]));
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return rowDates.some(date => {
        if (!date) return false;
        if (start && date < start) return false;
        if (end) {
          end.setHours(23, 59, 59, 999);
          if (date > end) return false;
        }
        return true;
      });
    }

    return true;
  });
};