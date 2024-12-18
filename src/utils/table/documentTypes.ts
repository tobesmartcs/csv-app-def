/**
 * Gets unique document types from the data
 */
export function getUniqueDocumentTypes(headers: string[], data: string[][]): string[] {
  if (!data.length) return [];
  
  const typeColumnIndex = headers.findIndex(header => 
    header.toLowerCase().includes('tipo documento')
  );
  
  if (typeColumnIndex === -1) return [];

  return Array.from(new Set(
    data.map(row => row[typeColumnIndex])
  )).filter(Boolean).sort();
}