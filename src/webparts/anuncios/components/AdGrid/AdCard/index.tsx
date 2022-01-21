import * as React from 'react';
import { FunctionComponent, useState, useContext } from 'react';
import styles from './AdCard.module.scss';
import { IAdCardProps } from './models';
import AdModal from './AdModal';
import { IImageProps, Image, ImageFit } from '@fluentui/react/lib/Image';
import { IPersonaSharedProps, Persona, PersonaSize} from '@fluentui/react/lib/Persona';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AnunciosWebPartContext } from '../../Anuncios';

const AdCard: FunctionComponent<IAdCardProps> = 
  ({
    title,
    description,
    price,
    category,
    status,
    image,
    publicationDate,
    expirationDate,
    author,
   }) => {
  
  const context: WebPartContext = useContext(AnunciosWebPartContext);

  const persona: IPersonaSharedProps = {
    imageUrl: `${context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?size=M&accountname=${author.username}`,
    text: author.title
  };

  const imageProps: Partial<IImageProps> = {
    className: styles.image,
    imageFit: ImageFit.cover,
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.card} onClick={()=>setIsModalOpen(true)}>
        <div className={styles.container}>
          <Image
            className={styles.image}
            {...imageProps}
            src={image.url}
            alt={image.description}
          />
          <div className={styles.body}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <p className={styles.price}>{price}</p>
            <p className={styles.category}>{category}</p>
            <Persona 
              className={styles.persona}
              size={PersonaSize.size40}
              {...persona}
            />
          </div>
        </div>
      </div>
      <AdModal 
        title={title} 
        description={description}
        price={price}
        category={category}
        status={status}
        authorUsername={author.username}
        image={image}
        publicationDate={publicationDate}
        expirationDate={expirationDate}
        isModalOpen={isModalOpen}
        hideModal={()=>setIsModalOpen(false)}
      />
    </>
  );
};

export default AdCard;
