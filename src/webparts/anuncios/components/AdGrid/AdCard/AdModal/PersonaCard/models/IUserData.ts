import { PersonaPresence } from '@fluentui/react/lib/Persona';

export interface IUserData {
    displayName: string;
    givenName: string;
    mail: string;
    mobilePhone: string | null;
    officeLocation: string | null;
    surname: string;
    userPrincipalName: string;
    jobTitle: string;
    department: string;
    presence: PersonaPresence;
  }