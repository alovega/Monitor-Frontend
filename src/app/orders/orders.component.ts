import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GetOrdersService } from './get-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  orders: any[];
  previous: any = [];

  headElements = ['Order Number', 'Purchased on', 'Bill to Name', 'Ship to Name', 'Status', 'Action'];

  constructor(
    private getOrders: GetOrdersService,
    private cdRef: ChangeDetectorRef
    ) {}

  ngOnInit() {
    this.orders = this.getOrders.getOrders();
    this.mdbTable.setDataSource(this.orders);
    this.orders = this.mdbTable.getDataSource();
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
      this.orders = this.mdbTable.getDataSource();
    }

    if (search) {
      this.orders = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }
}
