import {Price} from './price';
import {ProductType} from './i-order';

export interface CartItem {

  name: string;
  quantity: number;
  price: Price;
  type: ProductType;
  data?: any;

}


