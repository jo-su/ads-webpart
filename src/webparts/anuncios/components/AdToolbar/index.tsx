import * as React from 'react';
import { FunctionComponent} from 'react';
import { IAdToolbarProps } from './models';
import styles from './AdToolbar.module.scss';
import * as strings from 'AnunciosWebPartStrings';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownProps, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { Icon } from '@fluentui/react/lib/Icon';

const AdToolbar: FunctionComponent<IAdToolbarProps> = ({count, category, handleCategoryChange}) => {

    const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 180 } };
    const iconStyles= { marginRight: '8px' };
    const stackTokens: IStackTokens = { childrenGap: 5 };

    const categoryDropdownOptions: IDropdownOption[] = [
        { key: null, text: strings.AllCategories, data: { icon: 'ClearFilter'} },
        { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
        { key: '91f1dc70-2283-4887-9d43-f83bb7c7a8bd', text: 'Vehículos', data: { icon: 'Car'} },
        { key: '0c688fe0-e3af-49a2-9ef6-5c76c3effb76', text: 'Deportes', data: { icon: 'MoreSports'} },
        { key: '3a277411-f68b-4baa-ab69-afec46b8f717', text: 'Tecnología', data: { icon: 'Devices2'} },
        { key: '1a8b9719-89b6-4c26-9844-2a77f7ae2455', text: 'Ropa', data: { icon: 'Shirt'} },
        { key: '19213dfa-76e6-4006-ba8b-c4c2ac41003d', text: 'Otros', data: { icon: 'Product'} }
    ];

    const onRenderOption = (option: IDropdownOption): JSX.Element => {
        return (
            <div>
                {option.data && option.data.icon && (
                <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
                )}
                <span>{option.text}</span>
            </div>
        );
    };

    const onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
        const option = options[0];
        return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            {option.data && option.data.icon && (
            <Icon style={iconStyles} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
            )}
            <span>{option.text}</span>
        </div>
        );
    };

    const onRenderPlaceholder = (p: IDropdownProps): JSX.Element => {
        return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Icon style={iconStyles} iconName={'Filter'} aria-hidden="true" />
            <span>{p.placeholder}</span>
        </div>
        );
    };

    const onCategoryDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        if(category.key !== item.key) {
          handleCategoryChange(item);
        }
      };

    return (
        <Stack className={styles.toolbar} horizontal horizontalAlign="space-between" verticalAlign="center">
          <Label>{count+' '+strings.Ads} </Label>
          <Stack horizontal horizontalAlign="end" verticalAlign="center" tokens={stackTokens} >
            {/*space for more filters, icon buttons ...*/}
            <Dropdown
              selectedKey={category ? category.key : null}
              onRenderTitle={onRenderTitle}
              onRenderOption={onRenderOption}
              onRenderPlaceholder={onRenderPlaceholder}
              onChange={onCategoryDropdownChange}
              placeholder={strings.FilterByCategory}
              options={categoryDropdownOptions}
              styles={dropdownStyles}
            />
          </Stack>  
        </Stack>
    );
  
};

export default AdToolbar;
