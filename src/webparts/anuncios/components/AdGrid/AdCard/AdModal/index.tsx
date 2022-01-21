import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import styles from './AdModal.module.scss';
import { IModalProps } from './models/IModalProps';
import PersonaCard from './PersonaCard';
import { AnunciosWebPartContext } from '../../../Anuncios';
import { Modal } from '@fluentui/react/lib/Modal';
import { IconButton } from '@fluentui/react/lib/Button';
import { FontIcon } from '@fluentui/react/lib/Icon';
import * as strings from 'AnunciosWebPartStrings';
import { WebPartContext } from '@microsoft/sp-webpart-base';

const AdModal: FunctionComponent<IModalProps> = 
  ({  
      title,
      description,
      price,
      category,
      status,
      authorUsername,
      image,
      publicationDate,
      expirationDate,
      isModalOpen,
      hideModal,
    }) => {
  
  const context: WebPartContext = useContext(AnunciosWebPartContext);
 
  return (
    <Modal
      className={styles.modal}
      titleAriaId={title}
      isOpen={isModalOpen}
      onDismiss={hideModal}
      isBlocking={false}
      containerClassName={styles.container}
      dragOptions={undefined}
    >
      <div className={styles.container}>
        <IconButton
            className={styles.closeButton}
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close popup modal"
            onClick={hideModal}
        />
        <div 
          className={styles.image}
          title={image.description}
          style={{backgroundImage:"url("+image.url+")"}}
        >
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.adInfo}>
          <div className={styles.category}>
            <FontIcon className={styles.label} aria-label={category} iconName='Tag' />
            {category}
          </div>
          <p className={styles.price}>{price}</p>
          <p className={styles.description}>{description}</p>
          <div className={styles.status}>
            <p className={styles.label}>{strings.Status}</p>
            {status}
          </div>
          <div className={styles.publicationDate}>
            <p className={styles.label}>{strings.PublicationDate}</p>
            {new Date(publicationDate).toLocaleDateString(context.pageContext.cultureInfo.currentUICultureName,{year: 'numeric',month: 'long',day: 'numeric'})}
          </div>
          <div className={styles.expirationDate}>
            <p className={styles.label}>{strings.ExpirationDate}</p>
            {new Date(expirationDate).toLocaleDateString(context.pageContext.cultureInfo.currentUICultureName,{year: 'numeric',month: 'long',day: 'numeric'})}
          </div>
          <div className={styles.persona}>
            <PersonaCard username={authorUsername} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdModal;




