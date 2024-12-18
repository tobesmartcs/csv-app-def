import React from 'react';
import { Building2 } from 'lucide-react';
import type { Company } from '../types';

interface CompanySelectorProps {
  companies: Company[];
  selectedCompany: Company | null;
  onSelectCompany: (company: Company) => void;
  onAddCompany: () => void;
}

export function CompanySelector({
  companies,
  selectedCompany,
  onSelectCompany,
  onAddCompany,
}: CompanySelectorProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex-1">
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedCompany?.id || ''}
          onChange={(e) => {
            const company = companies.find((c) => c.id === e.target.value);
            if (company) onSelectCompany(company);
          }}
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={onAddCompany}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Building2 className="w-4 h-4 mr-2" />
        Add Company
      </button>
    </div>
  );
}