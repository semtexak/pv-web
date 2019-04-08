export interface IApplication {

  appId: string;
  domain: string;
  name: string;
  image: string;
  active: boolean;
  createdAt: number;
  configurations: Array<any>;

}

export enum Service {

  SUBSCRIPTION = 'subscription',
  DONATION = 'donation',

}
