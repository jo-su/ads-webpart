interface IODataCommon {
    "@odata.id": string;
    "@odata.type": string;
}

export interface IRawAuthorData extends IODataCommon{
    Title: string;
    UserName: string;
}

export interface IRawTaxField extends IODataCommon{
    IdForTerm: string;
    Term: string;
}

export interface IRawCategory {
    Label: string;
    TermGuid: string;
    WssId: 6;
}

export interface IRawImage {
    Url: string;
    Description: string;
}

export interface IAdRawData extends IODataCommon{
    "@odata.editLink": string;
    "@odata.etag": string;
    Author: IRawAuthorData;
    "Author@odata.navigationLink": string;
    TaxCatchAll: IRawTaxField[];
    "TaxCatchAll@odata.navigationLink": string;
    Title: string;
    cscCategory: IRawCategory;
    cscDescription: string;
    cscExpirationDate: string;
    cscImage: IRawImage | null;
    cscPrice: string;
    cscPublicationDate: string;
    cscStatus: string;
}





  