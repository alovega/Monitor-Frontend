import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {EndpointService} from '../endpoint.service';
import { ActivatedRoute } from '@angular/router';
 
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

  
  headElements = ['Endpoint', 'Endpoint Type', 'Date Created', 'State', 'Action'];
  currentSystem: any;
  currentSystemId: any;
  constructor(
    private endpointService: EndpointService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    ) {
      this.elements = []
    }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });
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
   return this.endpointService.getEndpoints(this.currentSystemId)
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
