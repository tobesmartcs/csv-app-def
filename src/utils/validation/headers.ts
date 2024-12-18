import { REQUIRED_COLUMNS } from '../table/columns';

/**
 * Validates that two sets of headers are compatible
 */
export function validateHeaders(baseHeaders: string[], newHeaders: string[]): void {
  const baseHeadersLower = baseHeaders.map(h => h.toLowerCase());
  const newHeadersLower = newHeaders.map(h => h.toLowerCase());

  // Check if all required columns from the base headers are present
  const missingHeaders = baseHeadersLower.filter(header => {
    // Only check for required columns
    const isRequired = Object.values(REQUIRED_COLUMNS).some(columns =>
      columns.some(col => header.includes(col.toLowerCase()))
    );
    return isRequired && !newHeadersLower.some(h => h.includes(header));
  });

  if (missingHeaders.length > 0) {
    throw new Error(
      `Colonne obbligatorie mancanti: ${missingHeaders.join(', ')}`
    );
  }
}