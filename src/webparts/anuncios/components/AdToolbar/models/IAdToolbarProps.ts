import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

export interface IAdToolbarProps {
  count: number;
  category: IDropdownOption;
  handleCategoryChange: (IDropdownOption)=>void;
}
