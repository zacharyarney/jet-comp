'use client';

import { useState } from 'react';
import { Metric } from '@/lib/openaiMessages';
import { Jet } from '@prisma/client';

export interface ComparisonItem {
  rank: number;
  name: string;
  value: string;
}

/**
 * Custom hook to handle comparing selected jets
 * @returns comparison, metric, setMetric, handleCompare
 */
export const useCompare = () => {
  const [comparison, setComparison] = useState<ComparisonItem[]>([]);

  /**
   * Makes a request to /api/compare with selectedJets and metric
   * and sets comparison with data returned from OpenAI api
   * @param selectedJets {Jet[]}
   * @param metric {Metric}
   */
  const handleCompare = async (selectedJets: Jet[], metric: Metric) => {
    const body = JSON.stringify({ planes: selectedJets, metric });
    const res = await fetch('/api/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await res.json();
    if (data.data) {
      setComparison(data.data);
    }
  };

  return { comparison, handleCompare };
};
