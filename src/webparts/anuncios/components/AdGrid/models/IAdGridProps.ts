import { IAdRawData } from ".";

export interface IAdGridProps {
  loading: boolean;
  items: IAdRawData[];
  nextLink: string;
  getMoreItems: ()=>void;
  defaultImageUrl: string;
}
