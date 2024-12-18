import React, { useState, useMemo } from 'react';
import { formatItalianNumber } from '../../utils/number/format';
import { MonthlyTotalsFilters } from './MonthlyTotalsFilters';
import { getUniqueYears, filterByYearAndQuarter } from '../../utils/date/quarters';

interface MonthlyTotal {
  month: string;
  amount: number;
  tax: number;
  count: number;
}

interface MonthlyTotalsTableProps {
  totals: MonthlyTotal[];
}

export function MonthlyTotalsTable({ totals }: MonthlyTotalsTableProps) {
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');

  // Get all unique years from the data
  const availableYears = useMemo(() => 
    getUniqueYears(totals.map(t => t.month)),
    [totals]
  );

  // Filter totals based on selected year and quarter
  const filteredTotals = useMemo(() => 
    filterByYearAndQuarter(totals, year, quarter),
    [totals, year, quarter]
  );

  if (!totals.length) return null;

  return (
    <div>
      <MonthlyTotalsFilters
        year={year}
        quarter={quarter}
        availableYears={availableYears}
        onYearChange={setYear}
        onQuarterChange={setQuarter}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mese
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Numero Documenti
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imponibile/Importo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imposta
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTotals.map((total) => (
              <tr key={total.month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {total.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {total.count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {formatItalianNumber(total.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {formatItalianNumber(total.tax)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Totale
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                {filteredTotals.reduce((sum, t) => sum + t.count, 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                {formatItalianNumber(
                  filteredTotals.reduce((sum, t) => sum + t.amount, 0)
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                {formatItalianNumber(
                  filteredTotals.reduce((sum, t) => sum + t.tax, 0)
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}