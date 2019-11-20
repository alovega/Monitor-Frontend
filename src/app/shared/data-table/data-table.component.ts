import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { DataTableService} from './data-table.service';
import { PagedData } from './paged-data';
import { CorporateEmployee } from './corporate-employee';
import { Page } from './page';

@Component({
  selector: 'hm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit {
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  ColumnMode = ColumnMode;
  columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }];
  page = new Page();
  rows = new Array<CorporateEmployee>();
  temp = [];
  constructor(private dataService: DataTableService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.dataService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

}
