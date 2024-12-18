export type FileType = 'fatture-emesse' | 'fatture-ricevute' | 'corrispettivi';

export interface CSVFile {
  id: string;
  name: string;
  data: string[][];
  headers: string[];
  uploadDate: string;
}

export interface Company {
  id: string;
  name: string;
  files: {
    [K in FileType]?: CSVFile[];
  };
}

export const FILE_TYPE_LABELS: Record<FileType, string> = {
  'fatture-emesse': 'Fatture Emesse',
  'fatture-ricevute': 'Fatture Ricevute',
  'corrispettivi': 'Corrispettivi',
};