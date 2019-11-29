import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { Page } from './model/page';
import { HttpWrapperService } from '../helpers/http-wrapper.service';


@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  constructor(private httpWrapperService: HttpWrapperService) {
  }
  public reloadTable(page: Page): Observable<any> {
    const body = {
      pageSize: `${page.size}`,
      pageNumber: `${page.offset + 1}`,
      orderColumn: `${page.orderBy}`,
      searchQuery: `${page.searchQuery}`,
      systemId: `${page.systemId}`,
      orderDir: `${page.orderDir}`
    };
    return this.httpWrapperService.post(page.url, {body});

  }
}
