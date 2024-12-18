import React, { useState } from 'react';
import { CompanyList } from './CompanyList';
import { CompanyForm } from './CompanyForm';
import type { Company } from '../../types';

interface DashboardProps {
  companies: Company[];
  onAddCompany: (name: string) => void;
  onEditCompany: (companyId: string, name: string) => void;
  onDeleteCompany: (companyId: string) => void;
  onSelectCompany: (company: Company) => void;
}

export function Dashboard({
  companies,
  onAddCompany,
  onEditCompany,
  onDeleteCompany,
  onSelectCompany,
}: DashboardProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleEditClick = (company: Company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleSave = (name: string) => {
    if (editingCompany) {
      onEditCompany(editingCompany.id, name);
    } else {
      onAddCompany(name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Le tue aziende</h2>
        <button
          onClick={() => {
            setEditingCompany(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Aggiungi Azienda
        </button>
      </div>

      <CompanyList
        companies={companies}
        onEditCompany={handleEditClick}
        onDeleteCompany={onDeleteCompany}
        onSelectCompany={onSelectCompany}
      />

      {showForm && (
        <CompanyForm
          company={editingCompany}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
        />
      )}
    </div>
  );
}