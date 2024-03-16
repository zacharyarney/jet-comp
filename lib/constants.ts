import { Jet } from '@prisma/client';
import { JetTableColumnKey, SortDirection } from '@/components/JetsTable';
import { ComparisonTableColumnKey } from '@/components/ComparisonTable';

export const OPENAI_MODEL = 'gpt-3.5-turbo'

export const JET_TABLE_KEYS: JetTableColumnKey[] = [
  'name',
  'wingspan',
  'engines',
  'year',
];
export const JET_TABLE_LABELS = ['Name', 'Wingspan', 'Engines', 'Year'];

/**
 * Array of JetTableColumn objects
 */
export const JET_TABLE_COLUMNS = JET_TABLE_KEYS.map((key, index) => ({
  key,
  label: JET_TABLE_LABELS[index],
  sortFunction: (a: Jet, b: Jet, direction: SortDirection) => {
    if (direction === 'ascending') {
      return a[key] > b[key] ? 1 : -1;
    } else {
      return a[key] < b[key] ? 1 : -1;
    }
  },
}));

export const COMP_TABLE_KEYS: ComparisonTableColumnKey[] = [
  'rank',
  'name',
  'value',
];
export const COMP_TABLE_LABELS = ['Rank', 'Name', 'Value'];

/**
 * Array of CompareTableColumn objects
 */
export const COMP_TABLE_COLUMNS = COMP_TABLE_KEYS.map((key, index) => ({
  key,
  label: COMP_TABLE_LABELS[index],
}));
