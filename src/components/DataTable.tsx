import React, { useState, useMemo } from 'react';
import { TableHeader } from './table/TableHeader';
import { TableRow } from './table/TableRow';
import { TableFooter } from './table/TableFooter';
import { TableFilters } from './table/TableFilters';
import { calculateTotals } from '../utils/table/format';
import { filterData } from '../utils/table/filter';
import { sortTableData } from '../utils/table/sort';
import { getUniqueDocumentTypes } from '../utils/table/documentTypes';

interface DataTableProps {
  headers: string[];
  data: string[][];
}

type SortDirection = 'asc' | 'desc' | null;
interface SortConfig {
  column: number;
  direction: SortDirection;
}

export function DataTable({ headers, data }: DataTableProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // Get unique document types for filter
  const documentTypes = useMemo(() => 
    getUniqueDocumentTypes(headers, data),
    [headers, data]
  );

  // Apply filters
  const filteredData = useMemo(() => 
    filterData(data, headers, startDate, endDate, documentType),
    [data, headers, startDate, endDate, documentType]
  );

  // Apply sorting
  const sortedData = useMemo(() => 
    sortConfig ? sortTableData(filteredData, headers, sortConfig) : filteredData,
    [filteredData, headers, sortConfig]
  );

  // Calculate totals
  const totals = useMemo(() => 
    calculateTotals(headers, sortedData),
    [headers, sortedData]
  );

  const handleSort = (columnIndex: number) => {
    setSortConfig(current => {
      if (!current || current.column !== columnIndex) {
        return { column: columnIndex, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { column: columnIndex, direction: 'desc' };
      }
      return null;
    });
  };

  if (!headers?.length || !data?.length) {
    return (
      <div className="w-full p-4 text-center text-gray-500 bg-white rounded-lg">
        Nessun dato disponibile
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TableFilters
        headers={headers}
        startDate={startDate}
        endDate={endDate}
        documentType={documentType}
        documentTypes={documentTypes}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onDocumentTypeChange={setDocumentType}
      />

      <div className="w-full overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <TableHeader 
            headers={headers} 
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                row={row}
                headers={headers}
                rowIndex={rowIndex}
              />
            ))}
          </tbody>
          <TableFooter 
            headers={headers} 
            totals={totals}
            rowCount={sortedData.length}
          />
        </table>
      </div>
    </div>
  );
}