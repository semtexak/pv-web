import {IPage} from '../i-page';
import {IDonation} from '../base/i-donation';

export interface IPageDonation extends IPage {

  content: Array<IDonation>[];
}
