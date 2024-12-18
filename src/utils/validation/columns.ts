import { FileType } from '../../types';

/**
 * Gets the required column name based on file type
 */
export function getRequiredColumnName(fileType: FileType): string {
  return fileType === 'corrispettivi' ? 'id invio' : 'sdi';
}

/**
 * Finds the index of the required column based on file type
 */
export function findRequiredColumnIndex(headers: string[], fileType: FileType): number {
  const lowerHeaders = headers.map(h => h.toLowerCase());
  
  if (fileType === 'corrispettivi') {
    return lowerHeaders.findIndex(header => header.includes('id invio'));
  }
  
  // For fatture, check both SDI and File columns
  return lowerHeaders.findIndex(header => 
    header.includes('sdi') || header.includes('file')
  );
}

/**
 * Checks if the required column exists in the headers
 */
export function hasRequiredColumn(headers: string[], fileType: FileType): boolean {
  const lowerHeaders = headers.map(h => h.toLowerCase());
  
  if (fileType === 'corrispettivi') {
    return lowerHeaders.some(header => header.includes('id invio'));
  }
  
  return lowerHeaders.some(header => 
    header.includes('sdi') || header.includes('file')
  );
}