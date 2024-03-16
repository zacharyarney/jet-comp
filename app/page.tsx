'use client';
import JetsTable from '@/components/JetsTable';
import { JET_TABLE_COLUMNS, COMP_TABLE_COLUMNS } from '@/lib/constants';
import { useJets } from '@/lib/hooks/useJets';
import { useJetsTable } from '@/lib/hooks/useJetsTable';
import CompareForm from '@/components/CompareForm';
import { useCompare } from '@/lib/hooks/useCompare';
import ComparisonTable from '@/components/ComparisonTable';

/**
 * Home page rendering JetsTable, CompareForm, and ComparisonTable
 * @component
 */
export default function Home() {
  const { jets } = useJets();
  const { sortedData, selectedJets, handleSort, handleSelect } = useJetsTable({
    data: jets,
    columns: JET_TABLE_COLUMNS,
  });
  const { comparison, handleCompare } = useCompare();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <JetsTable
        sortedData={sortedData}
        columns={JET_TABLE_COLUMNS}
        handleSort={handleSort}
        handleSelect={handleSelect}
      />
      <CompareForm
        selectedJets={selectedJets}
        handleCompare={handleCompare}
      />
      <ComparisonTable comparison={comparison} columns={COMP_TABLE_COLUMNS} />
    </main>
  );
}
