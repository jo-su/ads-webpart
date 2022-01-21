import * as React from 'react';
import { FunctionComponent, useState, useEffect, useContext } from 'react';
import styles from './PersonaCard.module.scss';
import * as strings from 'AnunciosWebPartStrings';
import { IPersonaCardProps, IUserData } from './models';
import { MSGraphClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { AnunciosWebPartContext } from '../../../../Anuncios';
import { Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Shimmer, ShimmerElementType, ShimmerElementsGroup } from '@fluentui/react/lib/Shimmer';
import { mergeStyles } from '@fluentui/merge-styles';
import { User, Presence } from '@microsoft/microsoft-graph-types';

const PersonaCard: FunctionComponent<IPersonaCardProps> = ({username}) => {

  const context: WebPartContext = useContext(AnunciosWebPartContext);

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUserData>(null);

  const wrapperClass = mergeStyles({
    padding: 2,
    selectors: {
      '& > .ms-Shimmer-container': {
        margin: '10px 0',
      },
    },
  });

  async function getUserInfo(){
    setLoading(true);
    await context.msGraphClientFactory
      .getClient()
      .then(async (client: MSGraphClient) => {
        try {
          let info: User = await client
            .api(`/users/${username}`)
            .select('id,displayName,givenName,surname,mail,mobilePhone,officeLocation,userPrincipalName,jobTitle,department')
            .get();
          console.log('userinfo', info);
          let presence: Presence = await client
            .api(`/users/${info.id}/presence`)
            .get();
          console.log('presence', presence);
          setUser(
            {
              displayName: info.displayName,
              givenName: info.givenName,
              mail: info.mail,
              mobilePhone: info.mobilePhone,
              officeLocation: info.officeLocation===null ? 'Sin oficina' : info.officeLocation,
              surname: info.surname,
              userPrincipalName: info.userPrincipalName,
              jobTitle: info.jobTitle===null ? 'Sin titulo' : info.jobTitle,
              department: info.department===null ? 'Sin departamento' : info.department,
              presence: toPersonaPresence(presence.availability)
            }
          );
        } catch (error) {
          console.log(error);
        }
      });
      setLoading(false);   
  }

  function toPersonaPresence(availability: string): PersonaPresence {
    switch (availability) {
      case 'Available':
      case 'AvailableIdle':
        return PersonaPresence.online;
      case 'Away':
      case 'BeRightBack':
        return PersonaPresence.away;
      case 'Busy':
      case 'BusyIdle':
        return PersonaPresence.busy;
      case 'DoNotDisturb':
        return PersonaPresence.dnd;
      case 'Offline':
        return PersonaPresence.offline;
      default: //PresenceUnknown
        return PersonaPresence.none;
    }
  }

  const personaShimmer = (): JSX.Element => {
    return (
      <div style={{display: 'flex'}}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ShimmerElementType.circle, height: 72 }
          ]}
        />
      </div>
    );
  };

  const actionsShimmer = (): JSX.Element => {
    return (
      <div style={{display: 'flex', width: '100%'}}>
        <ShimmerElementsGroup
          shimmerElements={[
            { type: ShimmerElementType.line, width: 10, height: 27 }
          ]}
        />
      </div>
    );
  };

  useEffect(()=> {
    getUserInfo();
  }, []);

  return (
    <div className={styles.personaCard}>
      <div className={styles.container}>
       { loading
        ?
        <>
          <div className={styles.persona}>
            <Shimmer customElementsGroup={personaShimmer()}/>
          </div>
          <hr/>
          <div className={wrapperClass}>
            <Shimmer customElementsGroup={actionsShimmer()}/>
          </div>
        </>
        : 
        <>
          <div className={styles.persona}>
              <Persona
                size={PersonaSize.size72}
                //imageInitials?
                imageUrl={`${context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?size=L&accountname=${username}`}
                presence={user.presence}
                text={user.displayName}
                secondaryText={user.department}
                tertiaryText={user.officeLocation}
                optionalText={user.jobTitle}
              />
            </div>
            <hr/>
            <div className={styles.actions}>
            <ActionButton 
                href={`https://teams.microsoft.com/l/chat/0/0?users=${user.mail}`}
                target="_blank" 
                title={strings.TeamsChat}
                text={strings.ChatWithUser.replace("{{name}}", user.givenName)}
                iconProps={{ iconName: 'Chat' }}
              />
              <ActionButton 
                href={`mailto:${user.mail}`}
                target="_blank"
                title={strings.SendEmail}
                text={user.mail}
                iconProps={{ iconName: 'Mail' }}
              />
              {user.mobilePhone !== null &&
                <ActionButton 
                  href={`tel:${user.mobilePhone}`}
                  title={strings.CallMobile}
                  text={user.mobilePhone}
                  iconProps={{ iconName: 'Phone' }}
                />
              }
          </div>
        </>
       }
      </div>
    </div>
  );
};

export default PersonaCard;