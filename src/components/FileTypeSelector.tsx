import React from 'react';
import { FileText } from 'lucide-react';
import type { Company, FileType } from '../types';
import { FILE_TYPE_LABELS } from '../types';

interface FileTypeSelectorProps {
  company: Company;
  onSelect: (type: FileType) => void;
}

export function FileTypeSelector({ company, onSelect }: FileTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(Object.entries(FILE_TYPE_LABELS) as [FileType, string][]).map(([type, label]) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <FileText className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">{label}</h3>
          <p className="mt-2 text-sm text-gray-500">
            {company.files[type]?.length || 0} file caricati
          </p>
        </button>
      ))}
    </div>
  );
}