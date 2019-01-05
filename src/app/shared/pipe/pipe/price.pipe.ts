import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, currency: string): any {
    switch (currency) {
      case Currency.CZK:
        return `${value} Kč`;
      default:
        return `${value} Kč`;
    }
  }

}

export enum Currency {
  CZK = 'CZK'
}
