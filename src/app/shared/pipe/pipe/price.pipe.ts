import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currency: string): any {
    switch (currency) {
      case Currency.CZK:
        return `${value} Kč`;
      case Currency.EUR:
        return `${value} €`;
      default:
        return `${value}`;
    }
  }

}

export enum Currency {
  CZK = 'CZK',
  EUR = 'EUR'
}
