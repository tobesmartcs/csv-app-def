import React, { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { DataTable } from './DataTable';
import { FileList } from './FileList';
import { ScrollToTop } from './common/ScrollToTop';
import { findDuplicates, createCSVFile, mergeCSVData } from '../utils/validation';
import type { Company, FileType, CSVFile } from '../types';
import { FILE_TYPE_LABELS } from '../types';

interface FileViewerProps {
  company: Company;
  fileType: FileType;
  onFileUpload: (fileType: FileType, file: CSVFile) => void;
  onDeleteFile: (fileType: FileType, fileId: string) => void;
  onBack: () => void;
}

export function FileViewer({
  company,
  fileType,
  onFileUpload,
  onDeleteFile,
  onBack,
}: FileViewerProps) {
  const [error, setError] = useState<string | null>(null);
  const [duplicates, setDuplicates] = useState<string[][] | null>(null);
  
  const files = company.files[fileType] || [];
  const label = FILE_TYPE_LABELS[fileType];

  // Memoize merged data to prevent unnecessary recalculations
  const { headers, data } = useMemo(() => {
    if (!files?.length) return { headers: [], data: [] };
    
    try {
      // Ensure files array is valid
      if (!Array.isArray(files)) {
        throw new Error('Invalid files data');
      }

      const result = mergeCSVData(files);
      if (!result.headers?.length) {
        throw new Error('No valid headers found in files');
      }

      return result;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore durante la fusione dei file');
      return { headers: [], data: [] };
    }
  }, [files]);

  const handleCheckDuplicates = (headers: string[], data: string[][]) => {
    setError(null);
    setDuplicates(null);
    
    try {
      const duplicateRows = findDuplicates(files, [headers, ...data], fileType);
      if (duplicateRows.length > 0) {
        setDuplicates(duplicateRows);
      } else {
        setError('Nessun duplicato trovato nel file.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore durante la verifica dei duplicati');
    }
  };

  const handleFileUpload = (fileName: string, headers: string[], data: string[][]) => {
    setError(null);
    setDuplicates(null);
    
    try {
      const newFile = createCSVFile(fileName, headers, data, fileType);
      onFileUpload(fileType, newFile);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Errore durante il caricamento del file');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Indietro
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{label}</h2>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {duplicates && duplicates.length > 0 && (
        <div className="mb-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg mb-2">
            Trovati {duplicates.length} record duplicati
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <DataTable
              headers={headers}
              data={duplicates}
            />
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div className="max-w-2xl">
          <FileUpload 
            fileType={fileType}
            onFileUpload={handleFileUpload}
            onCheckDuplicates={handleCheckDuplicates}
          />
        </div>

        {files.length > 0 && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">File Caricati</h3>
              <FileList
                files={files}
                onDeleteFile={(fileId) => onDeleteFile(fileType, fileId)}
              />
            </div>

            {headers.length > 0 && data.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Dati Combinati</h3>
                <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
                  <DataTable
                    headers={headers}
                    data={data}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <ScrollToTop />
    </div>
  );
}