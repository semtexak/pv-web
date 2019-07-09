import {IPage} from './i-page';
import {INotification} from '../base/i-notification';

export interface IPageNotification extends IPage {

  content: Array<INotification>[];
}
