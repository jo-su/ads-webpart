import * as React from 'react';
import { FunctionComponent} from 'react';
import styles from './AdGrid.module.scss';
import * as strings from 'AnunciosWebPartStrings';
import { IImage } from '../models';
import { IAdGridProps, IAdRawData, IRawImage} from './models';
import { ActionButton } from '@fluentui/react/lib/Button';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { Stack } from '@fluentui/react/lib/Stack';
import AdCard from './AdCard';



const AdGrid: FunctionComponent<IAdGridProps> = ({items, loading, nextLink, getMoreItems, defaultImageUrl}) => {

    function getImage(img: IRawImage): IImage{
        if (img === null){
            return {'url': defaultImageUrl, 'description': strings.DefaultImageForAds};
        }else {
            return {'url': img.Url, 'description': img.Description};
        }
    }

    if (!loading && items.length === 0){
        return (
            <div className={styles.emptyGrid}>
                <Stack className={styles.container} horizontalAlign="center" verticalAlign="center" >
                    {/*<FontIcon className={styles.icon} iconName='EmojiNeutral' />*/}
                    <p className={styles.icon}>🙈</p>
                    <p className={styles.label}>{strings.NoAds}</p>
                    <p className={styles.help}>{strings.NoAdsHelp}</p>
                </Stack>
            </div>
        );
    }

    return(
        <>
            <div className={styles.grid}>
                <div className={styles.row}>
                    {items.map((item:IAdRawData) => ( //lacking type for item
                    <div className={styles.column}>
                        <AdCard 
                            key={item["@odata.id"]} 
                            title={item.Title} 
                            description={item.cscDescription} 
                            price={item.cscPrice} 
                            category={item.TaxCatchAll[0].Term} 
                            status={item.cscStatus}
                            image={getImage(item.cscImage)}
                            publicationDate={item.cscPublicationDate}
                            expirationDate={item.cscExpirationDate}
                            author={{'title': item.Author.Title, 'username': item.Author.UserName}}
                        />
                    </div>
                    ))}
                </div>
            </div>
            { (loading) 
                ? <Spinner style={{margin: '10px'}}label={strings.Loading} ariaLive="assertive" labelPosition="right"/>
                : <Stack horizontal horizontalAlign="center" verticalAlign="center" >
                    {nextLink !== undefined 
                        ? <ActionButton iconProps={{iconName: 'Add'}} text={strings.MoreResults} onClick={getMoreItems} />
                        : <ActionButton iconProps={{iconName: 'Accept'}} text={strings.EndReached} disabled={true} />
                    }
                  </Stack>
            }
        </>
    );
};

export default AdGrid;
