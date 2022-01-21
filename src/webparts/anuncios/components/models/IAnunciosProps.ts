import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAnunciosProps {
  listId: string;
  itemsPerPage: number;
  defaultImage: string;
  context: WebPartContext;
}
