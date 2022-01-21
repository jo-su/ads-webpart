import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IAdRawData } from '.';

export interface IAnunciosState {
  loading: boolean;
  items: IAdRawData[];
  itemCount: number;
  nextLink: string;
  category: IDropdownOption;
}
