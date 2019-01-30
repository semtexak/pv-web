import {IPage} from './i-page';
import {IUser} from '../base/i-user';

export interface IPageUser extends IPage {

  content: Array<IUser>[];
}
