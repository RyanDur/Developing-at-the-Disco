import {PageDone, PageActions, Page} from './types';

export const pageDone = (page: Page): PageDone => ({
  type: PageActions.DONE,
  page
});
