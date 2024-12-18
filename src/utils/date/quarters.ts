/**
 * Gets the quarter number (1-4) for a given month
 */
export function getQuarter(month: number): number {
  return Math.ceil(month / 3);
}

/**
 * Gets all unique years from a list of month/year strings
 */
export function getUniqueYears(monthYearStrings: string[]): string[] {
  const years = new Set<string>();
  
  monthYearStrings.forEach(monthYear => {
    const [, year] = monthYear.split('/');
    if (year) {
      years.add(year);
    }
  });
  
  return Array.from(years).sort((a, b) => parseInt(a) - parseInt(b));
}

/**
 * Filters monthly totals by year and quarter
 */
export function filterByYearAndQuarter<T extends { month: string }>(
  totals: T[],
  year: string,
  quarter: string
): T[] {
  return totals.filter(total => {
    // Month format is "MM/YYYY"
    const [monthStr, yearStr] = total.month.split('/');
    if (!monthStr || !yearStr) return false;

    const monthNum = parseInt(monthStr, 10);
    
    // Year filter
    if (year && yearStr !== year) {
      return false;
    }
    
    // Quarter filter
    if (quarter) {
      const quarterNum = getQuarter(monthNum);
      if (quarterNum !== parseInt(quarter, 10)) {
        return false;
      }
    }
    
    return true;
  });
}