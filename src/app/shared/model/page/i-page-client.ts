import {IPage} from '../i-page';
import {IClient} from '../base/i-client';

export interface IPageClient extends IPage {

  content: Array<IClient>[];
}
