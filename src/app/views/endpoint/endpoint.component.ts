
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, TemplateRef } from '@angular/core';
import {EndpointService} from './endpoint.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/shared/system.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'hm-endpoint-view',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;

  elements: any;
  searchText = '';
  previous: any = [];
  visibleItems: number = 5;
  headElements = ['name', 'description', 'url', 'endpointType', 'status', 'dateCreated', 'action'];
  Elements = {
    name: 'Endpoint', description: 'description', url: 'Url', dateCreated: 'Date Created', status: 'Status', action: 'Action',
    endpointType: 'Type'
  };
  currentSystem: any;
  currentSystemId: any;
  endpointId: any;
  public dataSource = {
    rows: [],
    columns: []
  };

  constructor(
    private endpointService: EndpointService,
    private systemService: SystemService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    ) {}
  ngOnInit() {
    this.dataSource.columns = [
      {name: 'Name', sortable: true}, {name: 'Description', sortable: true},
      {prop: 'Url', name: 'Url', sortable: true}, {name: 'Date Created', sortable: true},
      {name: 'Status', sortable: true}, {name: 'Type'}, {name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}];
    this.endpointId = this.activatedRoute.snapshot.params.id;
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;

    this.endpointService.getEndpoints(this.currentSystemId).subscribe(
      (data) => {
        this.elements = data;
        console.log(data.length);
        data.forEach(element => {
          this.dataSource.rows.push(element);
        });
        // this.mdbTable.setDataSource(this.elements);
        // this.elements = this.mdbTable.getDataSource();
        // this.previous = this.mdbTable.getDataSource();
        // this.logSomething();
    });

  }

  // public logSomething() {
  //   console.log(this.elements);
  //   console.log(this.dataSource);
  // }

  ngAfterViewInit() {
  //   this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
  //   this.mdbTablePagination.calculateFirstItemIndex();
  //   this.mdbTablePagination.calculateLastItemIndex();
  //   if (this.elements.length > this.visibleItems) {
  //     this.mdbTablePagination.nextShouldBeDisabled = false;
  //   }
  //   this.cdRef.detectChanges();
  }

  // changeVisibleItems(maxNumber: number) {
  //   this.visibleItems = maxNumber;
  //   if (!maxNumber) {
  //     this.visibleItemsInput.nativeElement.value = 1;
  //     this.visibleItems = 1;
  //   }
  //   this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
  //   this.mdbTablePagination.calculateFirstItemIndex();
  //   this.mdbTablePagination.calculateLastItemIndex();
  //   if (this.elements.length > this.visibleItems) {
  //     this.mdbTablePagination.nextShouldBeDisabled = false;
  //   }
  //   this.cdRef.detectChanges();
  // }

  // searchItems() {
  //   const prev = this.mdbTable.getDataSource();

  //   if (!this.searchText) {
  //     this.mdbTable.setDataSource(this.previous);
  //     this.elements = this.mdbTable.getDataSource();
  //   }

  //   if (this.searchText) {
  //     this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
  //     this.mdbTable.setDataSource(prev);
  //   }
  // }
  delete(endpointId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this endpoint!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the endpoint!',
      cancelButtonText: 'No, keep the endpoint'
    }).then((result) => {
      if (result.value) {
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

