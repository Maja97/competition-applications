import { Application } from '@app/types/application';

export const applicationFilterKeys: { [key: string]: keyof Application } = {
  discipline: 'discipline',
  program: 'programName',
  category: 'categoryName',
  status: 'status'
};
