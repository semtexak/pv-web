import {IPage} from '../i-page';
import {IClient} from '../base/i-client';
import {IApplication} from '../base/i-application';

export interface IPageApplication extends IPage {

  content: Array<IApplication>[];
}
