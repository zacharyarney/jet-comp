import { Jet } from '@prisma/client';

export type JetTableColumnKey = 'name' | 'wingspan' | 'engines' | 'year';
export type SortDirection = 'ascending' | 'descending';

export interface JetTableColumn {
  key: JetTableColumnKey;
  label: string;
  sortFunction: (a: Jet, b: Jet, direction: SortDirection) => number;
}

export interface SortConfig {
  key: JetTableColumnKey;
  direction: SortDirection;
}

interface SortableTableProps {
  sortedData: Jet[];
  columns: JetTableColumn[];
  handleSort: (key: JetTableColumnKey) => void;
  handleSelect: (item: Jet) => void;
}

/**
 * Sortable table component to display Jets
 * @param sortedData
 * @param columns
 * @param handleSort
 * @param handleSelect
 * @component
 */
export default function JetsTable({
  sortedData,
  columns,
  handleSort,
  handleSelect,
}: SortableTableProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Top 10 Jets</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className="px-4 py-2"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column.key} className="border px-4 py-2">
                  {column.key === 'name' && (
                    <input
                      className="mr-5"
                      type="checkbox"
                      onChange={() => handleSelect(item)}
                    />
                  )}
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
