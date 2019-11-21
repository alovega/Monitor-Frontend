import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
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
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @Input() dataSource;
  ColumnMode = ColumnMode;
  loading = false;
  public columns;
  public rows;
  public temp;
  // columns = [{ name: 'Name', sortable: true }, { name: 'Gender',  sortable: true }, { name: 'Company',  sortable: true }];
  page = new Page();
  // rows = new Array();
  // temp = [];
  constructor(private dataService: DataTableService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = this.dataSource.columns;
    this.rows = this.dataSource.rows;
    console.log(this.dataSource.rows[0]);
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.dataService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
      this.temp = [...this.rows];
    });
  }

  onSort(event) {
    console.log('Sort Event', event);
    this.loading = true;
    setTimeout(() => {
      const rows = [...this.rows];
      const sort = event.sorts[0];
      rows.sort((a, b) => {
        return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
      });

      this.rows = rows;
      this.loading = false;
    }, 1000);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(d => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
  }
}
