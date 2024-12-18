import React from 'react';
import { isCurrencyColumn } from '../../utils/table/columns';
import { formatDisplayNumber } from '../../utils/number/format';

interface TableFooterProps {
  headers: string[];
  totals: { [key: string]: number };
  rowCount: number;
}

export function TableFooter({ headers, totals, rowCount }: TableFooterProps) {
  return (
    <tfoot className="text-xs font-semibold text-gray-700 bg-gray-50">
      <tr>
        {headers.map((header, index) => (
          <td
            key={index}
            className={`px-6 py-3 ${
              isCurrencyColumn(header) ? 'text-right' : 'text-left'
            }`}
          >
            {index === 0 ? (
              <span>Totale ({rowCount} righe)</span>
            ) : (
              isCurrencyColumn(header) && header in totals
                ? formatDisplayNumber(totals[header])
                : ''
            )}
          </td>
        ))}
      </tr>
    </tfoot>
  );
}