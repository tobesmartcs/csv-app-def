import React from 'react';
import { FileText, Building2 } from 'lucide-react';
import type { Company, FileType } from '../../types';
import { FILE_TYPE_LABELS } from '../../types';

interface SidebarProps {
  companies: Company[];
  selectedCompany: Company | null;
  selectedFileType: FileType | null;
  onSelectCompany: (company: Company) => void;
  onSelectFileType: (type: FileType) => void;
  onAddCompany: () => void;
}

export function Sidebar({
  companies,
  selectedCompany,
  selectedFileType,
  onSelectCompany,
  onSelectFileType,
  onAddCompany,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold">CSV Viewer</h1>
        </div>
      </div>
      
      <div className="p-4">
        <button
          onClick={onAddCompany}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Building2 className="w-4 h-4 mr-2" />
          Add Company
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {companies.map((company) => (
          <div key={company.id} className="px-2">
            <button
              onClick={() => onSelectCompany(company)}
              className={`w-full text-left px-4 py-2 rounded-lg mb-1 ${
                selectedCompany?.id === company.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{company.name}</span>
            </button>
            
            {selectedCompany?.id === company.id && (
              <div className="ml-4 space-y-1">
                {(Object.entries(FILE_TYPE_LABELS) as [FileType, string][]).map(([type, label]) => (
                  <button
                    key={type}
                    onClick={() => onSelectFileType(type)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                      selectedFileType === type
                        ? 'bg-gray-100 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {label}
                    {company.files[type] && (
                      <span className="ml-2 text-green-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}