import { initialValue } from '@app/components/shared/selectFilter/SelectFilter';
import { Application } from '@app/types/application';

export const mapFilters = (key: keyof Application, arr: Application[]) => {
  return [initialValue, ...new Set(arr.map((application) => application[key]))].map((option) => {
    return { label: option, value: option };
  });
};
