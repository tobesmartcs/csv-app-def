import React from 'react';
import { formatItalianNumber } from '../../utils/number/format';

interface MonthlyTotal {
  month: string;
  amount: number;
  tax: number;
  count: number;
}

interface MonthlyTotalsProps {
  totals: MonthlyTotal[];
}

export function MonthlyTotals({ totals }: MonthlyTotalsProps) {
  if (!totals.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Totali Mensili</h3>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            {totals.map((total) => (
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
                {totals.reduce((sum, t) => sum + t.count, 0)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                {formatItalianNumber(
                  totals.reduce((sum, t) => sum + t.amount, 0)
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                {formatItalianNumber(
                  totals.reduce((sum, t) => sum + t.tax, 0)
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}