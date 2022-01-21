import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AnunciosWebPartStrings';
import Anuncios from './components/Anuncios';
import { IAnunciosProps } from './components/models/IAnunciosProps';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

export interface IAnunciosWebPartProps {
  description: string;
  listId: string;
  itemsPerPage: number;
  defaultImage: string;
}

export default class AnunciosWebPart extends BaseClientSideWebPart<IAnunciosWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAnunciosProps> = React.createElement(
      Anuncios,
      {
        listId: this.properties.listId,
        itemsPerPage: this.properties.itemsPerPage,
        defaultImage: this.properties.defaultImage,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyFieldListPicker('listId', {  
                  label: strings.SelectList,
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId'
                }),
                PropertyPaneSlider('itemsPerPage', {
                  ariaLabel: strings.AdsPerPage,
                  label: strings.AdsPerPage,
                  max: 20,
                  min: 1,
                  step: 1,
                  showValue: true,
                  value: this.properties.itemsPerPage,
                }),
                PropertyPaneTextField('defaultImage', {
                  ariaLabel: strings.DefaultImageForAds,
                  label: strings.DefaultImageForAds,
                  placeholder: 'URL',
                  value: this.properties.defaultImage,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
