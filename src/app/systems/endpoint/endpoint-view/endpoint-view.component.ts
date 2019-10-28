import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import {EndpointService} from '../endpoint.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-endpoint-view',
  templateUrl: './endpoint-view.component.html',
  styleUrls: ['./endpoint-view.component.scss']
})
export class EndpointViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  elements: any;
  searchText: string = '';
  previous: any = [];

  
  headElements = ['endpoint', 'description', 'endpointUrl', 'responseTime', 'type',  'dateCreated', 'status', 'action'];
  currentSystem: any;
  currentSystemId: any;
  endpoint_id:any;

  constructor(
    private endpointService: EndpointService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    ) {}
    @HostListener('input') oninput() {
      this.searchItems();
    }
  ngOnInit() {
    this.endpoint_id = this.activatedRoute.snapshot.params["id"];
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });

    this.endpointService.getEndpoints(this.currentSystemId).subscribe(
      (data) => {
        console.log(data)
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    console.log(prev)

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  delete(endpoint_id){
    console.log(endpoint_id)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this endpoint!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the endpoint!',
      cancelButtonText: 'No, keep the endpoint'
    }).then((result) => {
      if (result.value) {
        console.log(endpoint_id);
        this.endpointService.deleteItem(endpoint_id).subscribe(
          response => {
            if (response.code === '800.200.001') {
              Swal.fire(
                'Deleted!',
                'This endpoint has been deleted.',
                'success'
              )
            } else {
              Swal.fire(
                'Failed!',
                'This endpoint could not be deleted.',
                'error'
              )
            }
          }
        )
        this.endpointService.getEndpoints(this.currentSystemId).subscribe(
          result => {
            this.elements = result;
            this.mdbTable.setDataSource(this.elements);
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        )
      }
    })
  }
}
