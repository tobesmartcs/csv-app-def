import { FileType } from '../../types';

export const DOCUMENT_TYPES = {
  CREDIT_NOTE: 'nota di credito',
} as const;

/**
 * Checks if a document type is a credit note
 */
export function isCreditNote(documentType: string): boolean {
  return documentType.toLowerCase().trim() === DOCUMENT_TYPES.CREDIT_NOTE;
}

/**
 * Gets the document type column index for invoice types
 */
export function getDocumentTypeIndex(headers: string[]): number {
  return headers.findIndex(header => 
    header.toLowerCase().includes('tipo documento')
  );
}

/**
 * Processes monetary values based on document type
 */
export function processMonetaryValueByDocumentType(
  value: number,
  documentType: string | undefined
): number {
  if (documentType && isCreditNote(documentType)) {
    return -Math.abs(value); // Ensure negative value for credit notes
  }
  return value;
}