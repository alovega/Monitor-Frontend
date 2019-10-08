import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import {json} from 'json';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {EndpointService} from '../endpoint.service'
import {Endpoint} from '../endpoint'
 
@Component({
  selector: 'app-endpoint-view',
  templateUrl: './endpoint-view.component.html',
  styleUrls: ['./endpoint-view.component.scss']
})
export class EndpointViewComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  firstItemIndex: any;
  lastItemIndex: any;
  elements: Endpoint[];
  previous: any = [];


  headElements = ['Endpoint', 'Date Created', 'Action'];

  constructor(
    private getEndpoints: EndpointService,
    private cdRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.showEndpoints()
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems(search: string) {
    const prev = this.mdbTable.getDataSource();

    if (!search) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (search) {
      this.elements = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }
  showEndpoints() {
    this.getEndpoints.getEndpoints()
      .subscribe((data: Endpoint[]) => {
        this.elements = data
      });
  }
}
