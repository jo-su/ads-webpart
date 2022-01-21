declare interface IAnunciosWebPartStrings {
    Title: string,
    SelectList: string,
    AdsPerPage: string,
    Ads: string,
    FilterByCategory: string,
    ChatWithUser: string,
    MoreResults: string,
    Loading: string,
    EndReached: string,
    Configure: string,
    ConfigureWebPart: string,
    ConfigureWebPartDescription: string,
    DefaultImageForAds: string,
    Status: string,
    PublicationDate: string,
    ExpirationDate: string,
    TeamsChat: string,
    SendEmail: string,
    CallMobile: string,
    AllCategories: string,
    NoAds: string,
    NoAdsHelp: string;
}

declare module 'AnunciosWebPartStrings' {
  const strings: IAnunciosWebPartStrings;
  export = strings;
}
