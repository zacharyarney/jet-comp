'use client';

import { useMemo, useState } from 'react';
import {
  JetTableColumn,
  JetTableColumnKey,
  SortConfig,
  SortDirection,
} from '@/components/JetsTable';
import { Jet } from '@prisma/client';

interface UseTableProps {
  data: Jet[];
  columns: JetTableColumn[];
}

/**
 * Custom hook to handle sorting and selecting jets
 * @param data {Jet[]}
 * @param columns {JetTableColumn[]}
 * @returns sortedData, selectedJets, handleSort, handleSelect
 */
export const useJetsTable = ({ data, columns }: UseTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'ascending',
  });
  const [selectedJets, setSelectedJets] = useState<Jet[]>([]);

  /**
   * Sorts Jets based on the sortConfig
   */
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    sortableData.sort(
      (a, b) =>
        columns
          .find(column => column.key === sortConfig.key)
          ?.sortFunction(a, b, sortConfig.direction) || 0
    );

    return sortableData;
  }, [data, sortConfig]);

  /**
   * Changes the sortConfig based on the key
   * @param key {JetTableColumnKey}
   */
  const handleSort = (key: JetTableColumnKey) => {
    let direction: SortDirection = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  /**
   * Adds or removes Jet from selectedJets
   * @param jet {Jet}
   */
  const handleSelect = (jet: Jet) => {
    setSelectedJets(prevState => {
      if (prevState.includes(jet)) {
        return prevState.filter(jet => jet !== jet);
      }
      return [...prevState, jet];
    });
  };

  return {
    sortedData,
    selectedJets,
    handleSort,
    handleSelect,
  };
};
