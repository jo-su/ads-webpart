import {IImage} from '../../../../models';

export interface IModalProps {
  title: string;
  description: string;
  price: string;
  category: string;
  status: string;
  authorUsername: string;
  image: IImage;
  publicationDate: string;
  expirationDate: string;
  isModalOpen: boolean;
  hideModal: ()=>void;
}
