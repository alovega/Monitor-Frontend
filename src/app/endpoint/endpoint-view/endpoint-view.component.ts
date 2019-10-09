import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {EndpointService} from '../endpoint.service'
import { Endpoint } from '../endpoint'
 
@Component({
  selector: 'app-endpoint-view',
  templateUrl: './endpoint-view.component.html',
  styleUrls: ['./endpoint-view.component.scss']
})
export class EndpointViewComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any;
  previous: any = [];

  
  headElements = ['Endpoint', 'Date Created', 'Action'];
  constructor(
    private endpointService: EndpointService,
    private cdRef: ChangeDetectorRef
    ) {
    }

  ngOnInit() {
    this.elements = this.showEndpoints()
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(3);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  showEndpoints() {
   return this.endpointService.getEndpoints()
      .subscribe((data) => {
        console.log(data)
        this.elements = data
      });
  }
  delete(item){
    this.endpointService.deleteItem(item.id).subscribe(response => {
      this.showEndpoints();
    })
  }
}
