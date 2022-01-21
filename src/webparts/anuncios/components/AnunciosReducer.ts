import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IAnunciosState, IAdRawData } from './models';

interface IFetch{
    type: "FETCH_ITEMS";
    category?: IDropdownOption;
}
  
interface IFetchSuccess{
    type: "FETCH_ITEMS_SUCCESS";
    items: IAdRawData[];
    itemCount: number;
    nextLink: string;
}

interface IFetchMore{
    type: "FETCH_MORE_ITEMS";
}

interface IFetchMoreSuccess{
    type: "FETCH_MORE_ITEMS_SUCCESS";
    items: IAdRawData[];
    nextLink: string;
}

interface IFetchCategory{
    type: "FETCH_CATEGORY_ITEMS";
    category: IDropdownOption;
}
  
type Actions = IFetch | IFetchSuccess | IFetchMore | IFetchMoreSuccess | IFetchCategory;
  
export function reducer(state:IAnunciosState, action:Actions) {
    switch(action.type){
        case "FETCH_ITEMS":
            return {
                ...state,
                items: [],
                nextLink: '',
                category: { key: null, text: '' },
                loading: true,
            };
        case "FETCH_CATEGORY_ITEMS":
            return {
                ...state,
                items: [],
                nextLink: '',
                category: action.category,
                loading: true,
            };
        case "FETCH_MORE_ITEMS":
            return {
                ...state,
                loading: true,
            };
        case "FETCH_ITEMS_SUCCESS":
            return {
                ...state,
                items: [...state.items, ...action.items],
                itemCount: action.itemCount,
                nextLink: action.nextLink,
                loading: false,
            };
        case "FETCH_MORE_ITEMS_SUCCESS":
            return {
                ...state,
                items: [...state.items, ...action.items],
                nextLink: action.nextLink,
                loading: false,
            };
        default:
            return state;
    }
}