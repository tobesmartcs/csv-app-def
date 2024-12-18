import React, { useMemo } from 'react';
import { FileText } from 'lucide-react';
import type { Company, FileType } from '../types';
import { FILE_TYPE_LABELS } from '../types';
import { MonthlyTotalsTable } from './table/MonthlyTotalsTable';
import { RevenueSummary } from './table/RevenueSummary';
import { calculateMonthlyTotals } from '../utils/table/monthly';
import { mergeCSVData } from '../utils/validation';

interface CompanyOverviewProps {
  company: Company;
  onSelectFileType: (type: FileType) => void;
}

export function CompanyOverview({ company, onSelectFileType }: CompanyOverviewProps) {
  // Calculate monthly totals for each type with error handling
  const monthlyTotals = useMemo(() => {
    const totals: Record<FileType, any[]> = {
      'fatture-emesse': [],
      'fatture-ricevute': [],
      'corrispettivi': []
    };

    Object.entries(company.files).forEach(([type, files]) => {
      if (!files?.length) return;

      try {
        const { headers, data } = mergeCSVData(files);
        if (headers.length && data.length) {
          totals[type as FileType] = calculateMonthlyTotals(
            headers,
            data,
            type as FileType
          );
        }
      } catch (error) {
        console.error(`Error processing ${type}:`, error);
      }
    });

    return totals;
  }, [company.files]);

  return (
    <div className="space-y-8">
      {/* File Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.entries(FILE_TYPE_LABELS) as [FileType, string][]).map(([type, label]) => {
          const files = company.files[type] || [];
          
          return (
            <button
              key={type}
              onClick={() => onSelectFileType(type)}
              className="flex flex-col p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="text-sm text-gray-500">
                  {files.length} file
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{label}</h3>
            </button>
          );
        })}
      </div>

      {/* Summary Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Summary */}
        <div className="lg:col-span-2">
          <RevenueSummary monthlyTotals={monthlyTotals} />
        </div>

        {/* Monthly Totals Tables */}
        {(Object.entries(FILE_TYPE_LABELS) as [FileType, string][]).map(([type, label]) => {
          const totals = monthlyTotals[type];
          if (!totals?.length) return null;

          return (
            <div key={type} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">
                Riepilogo Mensile {label}
              </h3>
              <MonthlyTotalsTable totals={totals} />
            </div>
          );
        })}
      </div>
    </div>
  );
}