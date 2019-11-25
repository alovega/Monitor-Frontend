import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { BehaviorSubject } from 'rxjs';
import { DataTableService} from './data-table.service';
import { HttpClient} from '@angular/common/http';
import { Page } from './model/page';

@Component({
  selector: 'hm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DataTableService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit, AfterViewInit {
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
  constructor(private dataService: DataTableService) {
    this.page.offset = 0;
    this.page.size = 2;
  }

  ngOnInit() {
    console.log(this.dataSource);
    this.page.url = this.dataSource.url;
    console.log(this.page);
    this.columns = this.dataSource.columns;
  }
  ngAfterViewInit() {
    this.pageCallback({ offset: 0 });
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
    this.dataService.reloadTable(this.page).subscribe((response) => {
      this.page.totalElements = response.data.totalElements;
      this.page.totalPages = response.data.size;
      this.rows = response.data.data;
    });
  }
  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter((d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
