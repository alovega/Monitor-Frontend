import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import {EndpointService} from '../endpoint.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/shared/system.service';


@Component({
  selector: 'hm-endpoint-view',
  templateUrl: './endpoint-view.component.html',
  styleUrls: ['./endpoint-view.component.scss']
})
export class EndpointViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  elements: any;
  searchText = '';
  previous: any = [];

  headElements = ['name', 'description', 'url', 'endpointType', 'status', 'dateCreated', 'action'];
  Elements = {
    name: 'Endpoint', description: 'description', url: 'Url', dateCreated: 'Date Created', status: 'Status', action: 'Action',
    endpointType: 'Type'
  };
  currentSystem: any;
  currentSystemId: any;
  endpointId: any;

  constructor(
    private endpointService: EndpointService,
    private systemService: SystemService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    ) {}
    @HostListener('input') oninput() {
      this.searchItems();
    }
  ngOnInit() {
    this.endpointId = this.activatedRoute.snapshot.params.id;
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;

    this.endpointService.getEndpoints(this.currentSystemId).subscribe(
      (data) => {
        this.elements = data;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(10);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    console.log(prev);

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  delete(endpointId) {
    console.log(endpointId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this endpoint!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the endpoint!',
      cancelButtonText: 'No, keep the endpoint'
    }).then((result) => {
      if (result.value) {
        console.log(endpointId);
        this.endpointService.deleteItem(endpointId).subscribe(
          response => {
            if (response.code === '800.200.001') {
              Swal.fire(
                'Deleted!',
                'This endpoint has been deleted.',
                'success'
              );
            } else {
              Swal.fire(
                'Failed!',
                'This endpoint could not be deleted.',
                'error'
              );
            }
          }
        );
        this.endpointService.getEndpoints(this.currentSystemId).subscribe(
          response => {
            this.elements = response;
            this.mdbTable.setDataSource(this.elements);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          '',
          'error'
        );
      }
    });
  }
}
