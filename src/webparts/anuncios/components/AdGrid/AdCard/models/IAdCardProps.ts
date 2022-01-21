import {IAuthor, IImage} from '../../../models';

export interface IAdCardProps {
  title: string;
  description: string;
  price: string;
  category: string;
  status: string;
  image: IImage;
  publicationDate: string;
  expirationDate: string;
  author: IAuthor;
}
