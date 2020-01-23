import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef,
   ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { BehaviorSubject, fromEvent, of, merge } from 'rxjs';
import { DataTableService} from './data-table.service';
import { Page, TableResponse } from './model/page';
import { debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

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
  @ViewChild('myTable', { static: true }) table: any;
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() dataSource;
  ColumnMode = ColumnMode;
  loaded = false;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public rows: any[];
  public message: string;
  public loading$ = this.loadingSubject.asObservable();
  load: boolean;
  public columns: any[];
  pagination = [5, 10, 25, 50, 100];
  page: any = new Page();
  paginator: any;
  constructor(private dataService: DataTableService, private cd: ChangeDetectorRef) {
    this.page.offset = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.loading$.subscribe((response) => {
      this.load = response.valueOf();
      this.cd.detectChanges();
    }
    );
    this.page.url = this.dataSource.url;
    this.columns = this.dataSource.columns;
    this.page.extraKwargs = this.dataSource.extraKwargs;
    this.pageCallback({ offset: 0 });
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(800),
      distinctUntilChanged(),
      tap(() => {
        this.updateFilter();
      })
      ).subscribe();
  }
  pageCallback(pageInfo: { count?: number, pageSize?: number, size?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getTableData(this.page);
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    this.getTableData(this.page);
  }
  updateFilter() {
    this.page.searchQuery = this.input.nativeElement.value;
    this.getTableData(this.page);
  }
  getTableData<T>(page: Page) {
    this.loadingSubject.next(true);
    this.dataService.reloadTable<TableResponse>(page)
    .subscribe(response => {
      if (response.ok) {
        if (response.body.code === '800.200.001') {
          this.page.totalPages = response.body.data.totalPages;
          this.page.totalElements = response.body.data.totalElements;
          this.rows = response.body.data.row;
          this.message = response.body.data.range;
        } else {

        }
      }
      this.loadingSubject.next(false);
      this.cd.detectChanges();
    });
  }
  changePagination(event) {
    this.page.size = event.target.value;
    this.getTableData(this.page);
  }
}
