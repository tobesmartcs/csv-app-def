import React from 'react';
import { Filter } from 'lucide-react';

interface MonthlyTotalsFiltersProps {
  year: string;
  quarter: string;
  availableYears: string[];
  onYearChange: (year: string) => void;
  onQuarterChange: (quarter: string) => void;
}

export function MonthlyTotalsFilters({
  year,
  quarter,
  availableYears,
  onYearChange,
  onQuarterChange,
}: MonthlyTotalsFiltersProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center text-gray-700">
        <Filter className="w-5 h-5 mr-2" />
        <span className="font-medium">Filtri</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tutti gli anni</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={quarter}
          onChange={(e) => onQuarterChange(e.target.value)}
          className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tutti i trimestri</option>
          <option value="1">1° Trimestre (Gen-Mar)</option>
          <option value="2">2° Trimestre (Apr-Giu)</option>
          <option value="3">3° Trimestre (Lug-Set)</option>
          <option value="4">4° Trimestre (Ott-Dic)</option>
        </select>
      </div>
    </div>
  );
}