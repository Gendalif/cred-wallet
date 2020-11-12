export type VerifyPanelStatus =
  | 'check-biometric-verify'
  | 'check-pin-keychain'
  | 'pin-create'
  | 'pin-create-verify'
  | 'save-pin-keychain'
  | 'pin-enter'
  | 'pin-verify'
  | 'biometric-verify'
  | 'verified';

export interface ICertificate {
  '@context': string[];
  type: string[];
  id: string;
  issuerId: string;
  issuanceDate: string;
  credentialSubject: {
    id: string;
    type: string;
    name: string;
    hasAchieved: {
      type: string[];
      id: string;
      name: string;
      description: string;
    };
  };
  proofType: string;
  proof: { [proofUrl: string]: Object | string };
}

export interface IIssuer {
  type: 'issuer';
  id: string;
  image: string;
  name: string;
  url: string;
}

export interface ICertificateDeeplink {
  challenge: any;
  requestUrl: any;
}

export interface ISubjectDID {
  did: string;
}

export interface ICertificateDeeplinkWithDID
  extends ICertificateDeeplink,
    ISubjectDID {}
