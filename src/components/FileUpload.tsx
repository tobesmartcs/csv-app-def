import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { FileType } from '../types';
import { validateCSVData, findDuplicates } from '../utils/validation';

interface FileUploadProps {
  fileType: FileType;
  onFileUpload: (fileName: string, headers: string[], data: string[][]) => void;
  onCheckDuplicates: (headers: string[], data: string[][]) => void;
}

export function FileUpload({ fileType, onFileUpload, onCheckDuplicates }: FileUploadProps) {
  const [currentFile, setCurrentFile] = useState<{
    headers: string[];
    data: string[][];
    fileName: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        try {
          // Filter out empty rows first
          const rows = (results.data as string[][]).filter(row => 
            row.some(cell => cell?.trim() !== '')
          );

          if (rows.length === 0) {
            throw new Error('Il file CSV è vuoto');
          }

          // Get headers from the first row
          const headers = rows[0].map(header => header?.trim() || '');
          const expectedColumns = headers.length;

          // Process and validate data rows
          const data = rows.slice(1).map(row => {
            // Ensure each row has the correct number of columns
            const processedRow = [...row];
            while (processedRow.length < expectedColumns) {
              processedRow.push(''); // Pad with empty strings if needed
            }
            // Trim excess columns if any
            return processedRow.slice(0, expectedColumns).map(cell => cell?.trim() || '');
          });

          validateCSVData(headers, data, fileType);
          
          setCurrentFile({
            headers,
            data,
            fileName: file.name
          });
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Errore durante il caricamento del file');
          setCurrentFile(null);
        }
      },
      error: (error) => {
        setError(`Errore durante la lettura del file: ${error.message}`);
        setCurrentFile(null);
      },
      skipEmptyLines: true,
      header: false,
      encoding: 'UTF-8',
    });
  }, [fileType]);

  return (
    <div className="w-full space-y-4">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-2 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">CSV files only</p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>

      {error && (
        <div className="p-4 text-red-700 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {currentFile && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onCheckDuplicates(currentFile.headers, currentFile.data)}
            className="flex items-center px-4 py-2 text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Verifica Duplicati
          </button>
          <button
            onClick={() => {
              onFileUpload(currentFile.fileName, currentFile.headers, currentFile.data);
              setCurrentFile(null);
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Carica File
          </button>
        </div>
      )}
    </div>
  );
}