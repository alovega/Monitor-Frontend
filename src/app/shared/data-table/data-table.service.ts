import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { Page } from './model/page';
import { environment } from 'src/environments/environment';
import { HttpWrapperService } from '../helpers/http-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  constructor(private httpWrapperService: HttpWrapperService) {
  }
  public reloadTable(page: Page): Observable<any> {
    const body = {
      page_size: `${page.size}`,
      page_number: `${page.offset + 1}`,
      order_column: `${page.orderBy}`,
      search_query: `${page.searchQuery}`,
      order_dir: `${page.orderDir}`
    };
    console.log(this.httpWrapperService.post(page.url, {body}));
    return this.httpWrapperService.post(page.url, {body});
  }
}
