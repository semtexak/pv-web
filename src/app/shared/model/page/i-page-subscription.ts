import {IPage} from './i-page';
import {ISubscription} from '../i-subscription';

export interface IPageSubscription extends IPage {

  content: Array<ISubscription>[];
}
