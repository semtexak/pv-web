export interface IStatistics {

  price: IPrice;
  averagePrice: IPrice;
  sales: number;
  uniqueSales: number;

}

export interface IPrice {

  amount: number;
  currency: string;

}
