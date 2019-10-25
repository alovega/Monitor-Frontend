import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import {EndpointService} from '../endpoint.service';
import {Endpoint} from '../endpoint';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-endpoint-view',
  templateUrl: './endpoint-view.component.html',
  styleUrls: ['./endpoint-view.component.scss']
})
export class EndpointViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  elements: any;
  searchText: string = '';
  previous: string;
  maxVisibleItems: number=8;

  dataSource:any;
  headElements = ['Endpoint', 'Endpoint Type', 'Date Created', 'State', 'Action'];
  currentSystem: any;
  currentSystemId: any;
  endpoint_id:any;

  constructor(
    private endpointService: EndpointService,
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    ) {}
    // // @HostListener('input') oninput() {
    // //   this.mdbTablePagination.searchText = this.searchText;
    // }
  ngOnInit() {
    this.endpoint_id = this.activatedRoute.snapshot.params["id"];
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });
    this.elements = this.showEndpoints(this.currentSystemId)
    this.dataSource = new MatTableDataSource<Endpoint>(this.elements)
    console.log(this.dataSource)
    // this.mdbTable.setDataSource(this.elements);
    // this.elements = this.mdbTable.getDataSource();
    // this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    // this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);
    // this.mdbTablePagination.calculateFirstItemIndex();
    // this.mdbTablePagination.calculateLastItemIndex();
    // this.cdRef.detectChanges();
  }
  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      Endpoint: 'Endpoint ' + this.elements.length,
      EndpointType: 'Endpoint Type ' + this.elements.length,
      DateCreated:'Date Created' + this.elements.length,
      State:'elements.state__name' + this.elements.length,
      Action: 'Action' + this.elements.length
    });
    this.emitDataSourceChange();
  }
  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {Endpoint: 'httpp/aajaha', EndpointType: 'Email', DateCreated: '26/10/2017', Action: 'edit'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }
  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }
  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  showEndpoints(currentSystemId) {
   return this.endpointService.getEndpoints(currentSystemId)
      .subscribe((data) => {
        this.dataSource = data
        console.log(data)
    });
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
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();

    this.mdbTable.searchDataObservable(this.searchText).subscribe(() => {
      this.mdbTablePagination.calculateFirstItemIndex();
      this.mdbTablePagination.calculateLastItemIndex();
    });
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
