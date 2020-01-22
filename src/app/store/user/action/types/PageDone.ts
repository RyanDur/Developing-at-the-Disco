import {PageActions} from './PageActions';
import {Action} from '../../../../../lib/redux/types';
import {Page} from './Page';

export interface PageDone extends Action<PageActions.DONE> {
  page: Page;
}
