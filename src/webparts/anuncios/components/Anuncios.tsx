import * as React from 'react';
import { FunctionComponent, useReducer, useEffect } from 'react';
import * as strings from 'AnunciosWebPartStrings';
import { IAnunciosProps, IAnunciosState} from './models';
import { reducer } from './AnunciosReducer';
import { escape } from '@microsoft/sp-lodash-subset';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IDropdownOption, initializeIcons } from '@fluentui/react';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import AdToolbar from './AdToolbar';
import AdGrid from './AdGrid';

export const AnunciosWebPartContext = React.createContext<WebPartContext>(null);

initializeIcons();

const Anuncios: FunctionComponent<IAnunciosProps> = ({listId, itemsPerPage, defaultImage, context}) => {

  const initialState: IAnunciosState = {
    loading: false,
    items: [],
    itemCount: 0,
    nextLink: '',
    category: { key: null, text: '' }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function getApiUrl(category: IDropdownOption, more: boolean): { items: string; count?: string } {
    if (more){
      return {items:state.nextLink};
    }else{
      let apiUrl = `${context.pageContext.web.absoluteUrl}/_api/web/`;
      apiUrl += `lists(guid'${listId}')/items`;
      apiUrl += `?$skiptoken=Paged=TRUE`;
      apiUrl += `&$select=Author,Title,cscDescription,cscPrice,cscStatus,cscExpirationDate,cscPublicationDate,cscCategory,cscImage,Author/Title,Author/UserName,TaxCatchAll/Term,TaxCatchAll/IdForTerm`;
      apiUrl += `${category && category.key!==null  ? '&$filter=TaxCatchAll/IdForTerm eq %27'+ category.key +'%27' : ''}`;
      apiUrl += `&$expand=Author,TaxCatchAll`;
      apiUrl += `&$orderBy= cscPublicationDate desc`;
      apiUrl += `&$top=${itemsPerPage}`;

      let countUrl = 
        category.key === null 
          ? `${context.pageContext.web.absoluteUrl}/_api/web/lists(guid%27${listId}%27)/ItemCount`
          : `${context.pageContext.web.absoluteUrl}/_api/web/lists(guid%27${listId}%27)/items?%24select=cscCategory%2cTaxCatchAll%2fID%2cTaxCatchAll%2fTerm%2cTaxCatchAll%2fIdForTerm${category.key!==null  ? '&%24filter=TaxCatchAll%2fIdForTerm%20eq%20%27'+ category.key +'%27' : ''}&%24expand=TaxCatchAll&%24count`;
      
      return {items: apiUrl, count: countUrl};
    }
  }

  async function getListItems(category?: IDropdownOption, more?: boolean) {
    if (listId !== '') {
      if(more){
        dispatch({ type: "FETCH_MORE_ITEMS"});
      }else{
        if(category.key !== null){
          dispatch({ type: "FETCH_CATEGORY_ITEMS", category});
        }else{
          dispatch({ type: "FETCH_ITEMS"});
        }
      }
      const resp = await context.spHttpClient.get(getApiUrl(category, more).items, SPHttpClient.configurations.v1);
      const obj = await resp.json();
      console.log('items', obj);

      if(more){
        dispatch({ type: "FETCH_MORE_ITEMS_SUCCESS", items: obj.value, nextLink: obj['@odata.nextLink'] });
      }else{
        const objC = await (await context.spHttpClient.get(getApiUrl(category, more).count, SPHttpClient.configurations.v1)).json();
        console.log('count', objC);
        let count = category.key !== null ? objC.value.length : objC.value;
        dispatch({ type: "FETCH_ITEMS_SUCCESS", items: obj.value, itemCount: count, nextLink: obj['@odata.nextLink'] });
      }
    }
  }

  useEffect(() => {
      getListItems({ key: null, text: '' }, false);
  }, [listId, itemsPerPage]);

  if (listId === ""){
    return(
      <Placeholder iconName='Settings'
        iconText={strings.ConfigureWebPart}
        description={strings.ConfigureWebPartDescription}
        buttonLabel={strings.Configure}
        onConfigure={()=>context.propertyPane.open()}
      />
    );
  }

  return(
    <>
      <AnunciosWebPartContext.Provider value={context}>
        <AdToolbar
          count={state.itemCount}
          category={state.category}
          handleCategoryChange={(cat:IDropdownOption)=>getListItems(cat)}
        />
        <AdGrid
          items={state.items}
          loading={state.loading}
          nextLink={state.nextLink}
          getMoreItems={()=>getListItems(null, true)}
          defaultImageUrl={escape(defaultImage)}
        />
      </AnunciosWebPartContext.Provider>
    </>
  );
};

export default Anuncios;