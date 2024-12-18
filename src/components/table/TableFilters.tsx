import React from 'react';
import { Filter } from 'lucide-react';

interface TableFiltersProps {
  headers: string[];
  startDate: string;
  endDate: string;
  documentType: string;
  documentTypes: string[];
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onDocumentTypeChange: (type: string) => void;
}

export function TableFilters({
  headers,
  startDate,
  endDate,
  documentType,
  documentTypes,
  onStartDateChange,
  onEndDateChange,
  onDocumentTypeChange,
}: TableFiltersProps) {
  // Find date columns
  const dateColumns = headers
    .map((header, index) => ({ header: header.toLowerCase(), index }))
    .filter(({ header }) => header.includes('data'));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 space-y-4">
      <div className="flex items-center space-x-2 text-gray-700 mb-2">
        <Filter className="w-5 h-5" />
        <h3 className="font-medium">Filtri</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Iniziale
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Finale
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo Documento
          </label>
          <select
            value={documentType}
            onChange={(e) => onDocumentTypeChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tutti</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}