'use client';
import { Jet } from '@prisma/client';
import { useEffect, useState } from 'react';

// extracting business logic out of the component with custom hook
// keeps components clean and easier to read

/**
 * Fetches jets from the API
 */
export const useJets = () => {
  const [jets, setJets] = useState<Jet[]>([]);
  const fetchJets = async () => {
    const res = await fetch('/api/jets');
    const data = await res.json();
    setJets(data.data);
  };

  useEffect(() => {
    fetchJets().catch(console.error);
  }, []);

  return { jets };
};
