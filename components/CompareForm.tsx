'use client';

import { Metric } from '@/lib/openaiMessages';
import { Jet } from '@prisma/client';
import { useState } from 'react';

interface CompareFormProps {
  selectedJets: Jet[];
  handleCompare: (jets: Jet[], metric: Metric) => void;
}

/**
 * Form to select the metric by which to compare selected jets and make the comparison
 * @param selectedJets
 * @param handleCompare
 * @component
 */
export default function CompareForm({
  selectedJets,
  handleCompare,
}: CompareFormProps) {
  const [metric, setMetric] = useState<Metric>('top speed');

  return (
    <form className="m-5 mb-10">
      <span>Ask OpenAI GPT to Compare Selected Jets By </span>
      <select
        className="ml-1 mr-5 border-2 rounded"
        value={metric}
        onChange={e => setMetric(e.target.value as Metric)}
      >
        <option value="top speed">Top Speed</option>
        <option value="fuel efficiency">Fuel Efficiency</option>
        <option value="max seats">Max Seats</option>
      </select>
      <button
        className="bg-gray-500 hover:bg-gray-400 text-white py-1 px-2 rounded"
        type="button"
        onClick={() => handleCompare(selectedJets, metric)}
      >
        Compare Selected Jets
      </button>
    </form>
  );
}
