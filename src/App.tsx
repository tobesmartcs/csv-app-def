import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { FileViewer } from './components/FileViewer';
import { CompanyOverview } from './components/CompanyOverview';
import { AccountPage } from './components/account/AccountPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { useRouter } from './hooks/useRouter';
import type { Company, FileType, CSVFile } from './types';

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<FileType | null>(null);
  const { currentPath } = useRouter();

  const handleAddCompany = (name: string) => {
    const newCompany: Company = {
      id: Date.now().toString(),
      name,
      files: {},
    };
    setCompanies([...companies, newCompany]);
  };

  const handleEditCompany = (companyId: string, name: string) => {
    setCompanies(companies.map(company =>
      company.id === companyId
        ? { ...company, name }
        : company
    ));
  };

  const handleDeleteCompany = (companyId: string) => {
    setCompanies(companies.filter(company => company.id !== companyId));
    if (selectedCompany?.id === companyId) {
      setSelectedCompany(null);
      setSelectedFileType(null);
    }
  };

  const handleFileUpload = (fileType: FileType, newFile: CSVFile) => {
    if (!selectedCompany) return;

    const updatedCompany = {
      ...selectedCompany,
      files: {
        ...selectedCompany.files,
        [fileType]: [
          ...(selectedCompany.files[fileType] || []),
          newFile,
        ],
      },
    };

    setCompanies(companies.map(c =>
      c.id === selectedCompany.id ? updatedCompany : c
    ));
    setSelectedCompany(updatedCompany);
  };

  const handleDeleteFile = (fileType: FileType, fileId: string) => {
    if (!selectedCompany) return;

    const updatedFiles = selectedCompany.files[fileType]?.filter(
      file => file.id !== fileId
    ) || [];

    const updatedCompany = {
      ...selectedCompany,
      files: {
        ...selectedCompany.files,
        [fileType]: updatedFiles,
      },
    };

    setCompanies(companies.map(c =>
      c.id === selectedCompany.id ? updatedCompany : c
    ));
    setSelectedCompany(updatedCompany);
  };

  const handleBack = () => {
    if (selectedFileType) {
      setSelectedFileType(null);
    } else if (selectedCompany) {
      setSelectedCompany(null);
    }
  };

  const renderContent = () => {
    if (currentPath === '/account') {
      return <AccountPage />;
    }

    if (!selectedCompany) {
      return (
        <Dashboard
          companies={companies}
          onAddCompany={handleAddCompany}
          onEditCompany={handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
          onSelectCompany={setSelectedCompany}
        />
      );
    }

    if (selectedFileType) {
      return (
        <FileViewer
          company={selectedCompany}
          fileType={selectedFileType}
          onFileUpload={handleFileUpload}
          onDeleteFile={handleDeleteFile}
          onBack={() => setSelectedFileType(null)}
        />
      );
    }

    return (
      <CompanyOverview
        company={selectedCompany}
        onSelectFileType={setSelectedFileType}
      />
    );
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-100">
          <Header 
            companyName={selectedCompany?.name}
            onBack={selectedCompany ? handleBack : undefined}
          />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;