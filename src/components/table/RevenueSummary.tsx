import React, { useState, useMemo } from 'react';
import { formatItalianNumber } from '../../utils/number/format';
import { RevenueSummaryFilters } from './RevenueSummaryFilters';
import { getUniqueYears, filterByYearAndQuarter } from '../../utils/date/quarters';

interface MonthlyTotal {
  month: string;
  amount: number;
  tax: number;
  count: number;
}

interface RevenueSummaryProps {
  monthlyTotals: {
    'fatture-emesse': MonthlyTotal[];
    'fatture-ricevute': MonthlyTotal[];
    'corrispettivi': MonthlyTotal[];
  };
}

export function RevenueSummary({ monthlyTotals }: RevenueSummaryProps) {
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');

  // Get all unique years from the data
  const availableYears = useMemo(() => {
    const allMonths = [
      ...monthlyTotals['fatture-emesse'].map(t => t.month),
      ...monthlyTotals['fatture-ricevute'].map(t => t.month),
      ...monthlyTotals['corrispettivi'].map(t => t.month),
    ];
    return getUniqueYears(allMonths);
  }, [monthlyTotals]);

  // Filter totals based on selected year and quarter
  const filteredTotals = useMemo(() => ({
    'fatture-emesse': filterByYearAndQuarter(monthlyTotals['fatture-emesse'], year, quarter),
    'fatture-ricevute': filterByYearAndQuarter(monthlyTotals['fatture-ricevute'], year, quarter),
    'corrispettivi': filterByYearAndQuarter(monthlyTotals['corrispettivi'], year, quarter),
  }), [monthlyTotals, year, quarter]);

  // Calculate totals from filtered data
  const activeRevenue = (
    filteredTotals['fatture-emesse'].reduce((sum, t) => sum + t.amount, 0) +
    filteredTotals['corrispettivi'].reduce((sum, t) => sum + t.amount, 0)
  );

  const vatDebit = (
    filteredTotals['fatture-emesse'].reduce((sum, t) => sum + t.tax, 0) +
    filteredTotals['corrispettivi'].reduce((sum, t) => sum + t.tax, 0)
  );

  const passiveRevenue = filteredTotals['fatture-ricevute'].reduce((sum, t) => sum + t.amount, 0);
  const vatCredit = filteredTotals['fatture-ricevute'].reduce((sum, t) => sum + t.tax, 0);
  const vatBalance = vatDebit - vatCredit;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Fatturato</h3>
      </div>

      <RevenueSummaryFilters
        year={year}
        quarter={quarter}
        availableYears={availableYears}
        onYearChange={setYear}
        onQuarterChange={setQuarter}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Fatturato Attivo
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatItalianNumber(activeRevenue)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                IVA Debito
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatItalianNumber(vatDebit)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Fatturato Passivo
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatItalianNumber(passiveRevenue)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                IVA Credito
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                {formatItalianNumber(vatCredit)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Liquidazione IVA
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                {formatItalianNumber(vatBalance)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}