import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { isCurrencyColumn, isDateColumn } from '../../utils/table/columns';

interface TableHeaderProps {
  headers: string[];
  sortConfig: { column: number; direction: 'asc' | 'desc' | null } | null;
  onSort: (columnIndex: number) => void;
}

export function TableHeader({ headers, sortConfig, onSort }: TableHeaderProps) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {headers.map((header, index) => {
          const isSortable = isDateColumn(header) || isCurrencyColumn(header);
          const isCurrentSort = sortConfig?.column === index;
          
          return (
            <th 
              key={index} 
              className={`px-6 py-3 ${isCurrencyColumn(header) ? 'text-right' : 'text-left'}`}
            >
              <div className="flex items-center justify-between cursor-pointer group">
                <span>{header}</span>
                {isSortable && (
                  <button
                    onClick={() => onSort(index)}
                    className="ml-2 text-gray-400 group-hover:text-gray-600"
                  >
                    {isCurrentSort ? (
                      sortConfig.direction === 'asc' ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )
                    ) : (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}