import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import { CSVFile } from '../types';
import { formatItalianDate } from '../utils/date/format';

interface FileListProps {
  files: CSVFile[];
  onDeleteFile: (fileId: string) => void;
}

export function FileList({ files, onDeleteFile }: FileListProps) {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="font-medium">{file.name}</h3>
              <p className="text-sm text-gray-500">
                Caricato il {formatItalianDate(file.uploadDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onDeleteFile(file.id)}
              className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}