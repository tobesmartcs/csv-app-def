import React from 'react';
import { Pencil, Trash2, Building2 } from 'lucide-react';
import type { Company } from '../../types';

interface CompanyListProps {
  companies: Company[];
  onEditCompany: (company: Company) => void;
  onDeleteCompany: (companyId: string) => void;
  onSelectCompany: (company: Company) => void;
}

export function CompanyList({
  companies,
  onEditCompany,
  onDeleteCompany,
  onSelectCompany,
}: CompanyListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Companies</h2>
      </div>
      <div className="divide-y">
        {companies.map((company) => (
          <div key={company.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-400 mr-3" />
              <span className="font-medium">{company.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSelectCompany(company)}
                className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
              >
                Select
              </button>
              <button
                onClick={() => onEditCompany(company)}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDeleteCompany(company.id)}
                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {companies.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No companies added yet
          </div>
        )}
      </div>
    </div>
  );
}