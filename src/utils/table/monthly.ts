import { parseDate } from '../date/parse';
import { getColumnIndices, extractNumericValue } from './totals';
import { FileType } from '../../types';

export interface MonthlyTotal {
  month: string;
  amount: number;
  tax: number;
  count: number;
}

/**
 * Calculates totals grouped by month
 */
export function calculateMonthlyTotals(
  headers: string[],
  data: string[][],
  fileType: FileType
): MonthlyTotal[] {
  if (!headers?.length || !data?.length) {
    console.warn('No data available for monthly totals calculation');
    return [];
  }

  try {
    const { date: dateIndex, amount: amountIndex, tax: taxIndex } = 
      getColumnIndices(headers, fileType);

    if (dateIndex === -1) {
      console.warn('Date column not found for monthly totals');
      return [];
    }

    // Group data by month
    const monthlyTotals = new Map<string, MonthlyTotal>();

    data.forEach((row, rowIndex) => {
      try {
        const date = parseDate(row[dateIndex]);
        if (!date) {
          console.warn(`Invalid date at row ${rowIndex + 1}:`, row[dateIndex]);
          return;
        }

        // Format month key as "MM/YYYY"
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const monthKey = `${month}/${year}`;

        // Get or initialize monthly total
        let monthTotal = monthlyTotals.get(monthKey);
        if (!monthTotal) {
          monthTotal = {
            month: monthKey,
            amount: 0,
            tax: 0,
            count: 0
          };
          monthlyTotals.set(monthKey, monthTotal);
        }

        // Add values
        if (amountIndex !== -1) {
          monthTotal.amount += extractNumericValue(row[amountIndex]);
        }
        if (taxIndex !== -1) {
          monthTotal.tax += extractNumericValue(row[taxIndex]);
        }
        monthTotal.count++;
      } catch (err) {
        console.warn(`Error processing row ${rowIndex + 1}:`, err);
      }
    });

    // Convert to array and sort by date
    return Array.from(monthlyTotals.values())
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split('/');
        const [bMonth, bYear] = b.month.split('/');
        const yearDiff = parseInt(aYear) - parseInt(bYear);
        if (yearDiff !== 0) return yearDiff;
        return parseInt(aMonth) - parseInt(bMonth);
      });
  } catch (err) {
    console.error('Error calculating monthly totals:', err);
    return [];
  }
}