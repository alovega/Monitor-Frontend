import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Page } from './model/page';
import { HttpWrapperService } from '../helpers/http-wrapper.service';
import { HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  constructor(private httpWrapperService: HttpWrapperService) {
  }
  public reloadTable<T>(page: Page): Observable<HttpResponse<T>> {
    const body = {
      page_size: `${page.size}`,
      page_number: `${page.offset + 1}`,
      order_column: `${page.orderBy}`,
      search_query: `${page.searchQuery}`,
      order_dir: `${page.orderDir}`
    };
    return this.httpWrapperService.post<T>(page.url, {body});
  }
}
