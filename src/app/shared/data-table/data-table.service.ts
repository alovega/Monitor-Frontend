import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from './paged-data';
import { CorporateEmployee } from './corporate-employee';
import { Page } from './page';

import data from '../../../assets/data.json';
const companyData = data as any[];
/**
 * A server used to mock a paged data result from a server
 */
@Injectable({
  providedIn: 'root'
})
export class DataTableService {
  /**
   * A method that mocks a paged server response
   * @param page The selected page
   * @returns {any} An observable containing the employee data
   */
  public getResults(page: Page): Observable<PagedData<any>> {
    return of(companyData).pipe(map(d => this.getPagedData(page)));
  }

  /**
   * Package companyData into a PagedData object based on the selected Page
   * @param page The page data used to get the selected data from companyData
   * tslint:disable-next-line: no-redundant-jsdoc
   * @returns {PagedData<any>} An array of the selected data and page
   */
  private getPagedData(page: Page): PagedData<any> {
    const pagedData = new PagedData<any>();
    page.totalElements = companyData.length;
    page.totalPages = page.totalElements / page.size;
    const start = page.pageNumber * page.size;
    const end = Math.min(start + page.size, page.totalElements);
    for (let i = start; i < end; i++) {
      const jsonObj = companyData[i];
      const employee = new CorporateEmployee(jsonObj.name, jsonObj.gender, jsonObj.company, jsonObj.age);
      pagedData.data.push(employee);
    }
    pagedData.page = page;
    return pagedData;
  }
}
