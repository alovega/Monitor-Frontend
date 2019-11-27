import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef,
   ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { BehaviorSubject, fromEvent, Observable, of } from 'rxjs';
import { DataTableService} from './data-table.service';
import { Page } from './model/page';
import { debounceTime, distinctUntilChanged, tap, catchError, finalize } from 'rxjs/operators';

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
  public rows;
  public loading$ = this.loadingSubject.asObservable();
  load: boolean;
  public columns;
  public temp;
  pagination = [5, 10, 25, 50, 100]
  page = new Page();
  paginator: any;
  constructor(private dataService: DataTableService, private cd: ChangeDetectorRef) {
    this.page.offset = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    console.log(this.dataSource);
    this.loading$.subscribe((response) =>{
      this.load = response.valueOf();
      this.cd.detectChanges();
      console.log(response.valueOf());
    }
    );
    this.page.url = this.dataSource.url;
    this.page.systemId = this.dataSource.systemId;
    this.columns = this.dataSource.columns;
    this.pageCallback({ offset: 0 });
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                  this.updateFilter();
                })
            )
            .subscribe();
  }
  pageCallback(pageInfo: { count?: number, pageSize?: number, size?: number, offset?: number }) {
    this.page.offset = pageInfo.offset;
    this.getTableData(this.page);
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    // there will always be one "sort" object if "sortType" is set to "single"
    this.page.orderDir = sortInfo.sorts[0].dir;
    this.page.orderBy = sortInfo.sorts[0].prop;
    console.log(this.table.offset);
    this.getTableData(this.page);
  }
  updateFilter() {
    this.page.searchQuery = this.input.nativeElement.value;
    this.getTableData(this.page);
  }
  getTableData(page: Page) {
    this.loadingSubject.next(true);
    this.dataService.reloadTable(page).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((response) => {
      this.page.totalPages = response.totalPages;
      this.page.totalElements = response.totalElements;
      this.rows = response.row;
      this.cd.detectChanges();
    });
  }
  changePagination(event) {
    this.page.size = event.target.value;
    this.getTableData(this.page);
  }
}
