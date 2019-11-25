import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { DataTableService} from './data-table.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedData } from './model/paged-data';
import { CorporateEmployee } from './corporate-employee';
import { Page } from './model/page';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'hm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit{
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl', { static: true }) hdrTpl: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  @Input() dataSource;
  ColumnMode = ColumnMode;
  loaded = false;
  loading = true;
  public columns;
  public rows;
  public temp;
  // columns = [{ name: 'Name', sortable: true }, { name: 'Gender',  sortable: true }, { name: 'Company',  sortable: true }];
  page = new Page();
  // rows = new Array();
  // temp = [];
  constructor(private dataService: DataTableService, private http: HttpClient) {
    this.page.offset = 0;
    this.page.size = 10;
  }

  ngOnInit() {
    this.pageCallback({ offset: 0 });
    console.log(this.page.totalPages);
    this.columns = this.dataSource.columns;
  }
  pageCallback(pageInfo: { count?: number, pageSize?: number, size?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.dataService.reloadTable(this.page).subscribe((response) => {
      this.page.totalElements = response.data.totalElements;
      this.page.totalPages = response.data.size;
      this.rows = response.data.data;
      console.log(response);
    });
  }
  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.dataService.reloadTable(this.page);
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
