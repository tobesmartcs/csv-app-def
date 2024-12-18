import { Company, FileType } from '../../types';
import { parseItalianNumber } from '../number/parse';
import { formatItalianNumber } from '../number/format';

interface MonthlyTotals {
  amount: string;
  tax: string;
}

/**
 * Calculates monthly totals for each file type
 */
export function calculateMonthlyTotals(company: Company): Partial<Record<FileType, MonthlyTotals>> {
  const totals: Partial<Record<FileType, MonthlyTotals>> = {};

  Object.entries(company.files).forEach(([type, files]) => {
    if (!files?.length) return;

    let totalAmount = 0;
    let totalTax = 0;

    files.forEach(file => {
      const amountIndex = file.headers.findIndex(h => 
        h.toLowerCase().includes('imponibile/importo')
      );
      const taxIndex = file.headers.findIndex(h => 
        h.toLowerCase().includes('imposta')
      );

      if (amountIndex !== -1 || taxIndex !== -1) {
        file.data.forEach(row => {
          if (amountIndex !== -1) {
            totalAmount += parseItalianNumber(row[amountIndex]);
          }
          if (taxIndex !== -1) {
            totalTax += parseItalianNumber(row[taxIndex]);
          }
        });
      }
    });

    totals[type as FileType] = {
      amount: formatItalianNumber(totalAmount),
      tax: formatItalianNumber(totalTax)
    };
  });

  return totals;
}