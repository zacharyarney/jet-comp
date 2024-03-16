'use client';

import { ComparisonItem } from '@/lib/hooks/useCompare';

export type ComparisonTableColumnKey = 'rank' | 'name' | 'value';

interface CompareTableColumn {
  key: ComparisonTableColumnKey;
  label: string;
}

interface ComparisonTableProps {
  comparison: ComparisonItem[];
  columns: CompareTableColumn[];
}

/**
 * Table to display comparison results
 * @param comparison
 * @param columns
 * @component
 */
export default function ComparisonTable({
  comparison,
  columns,
}: ComparisonTableProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Comparison Results</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} className="px-4 py-2">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key} className="border px-4 py-2">
                  {item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
