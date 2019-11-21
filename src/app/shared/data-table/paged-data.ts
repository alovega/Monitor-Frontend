
import { Page } from './page';

// An array of data with an associated page object used for paging
export class PagedData<T> {
  data = new Array<T>();
  temp = [...this.data];
  page = new Page();
}
