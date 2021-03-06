import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import {EndpointService} from './endpoint.service';
import {DataSource} from '../../shared/data-table/model/dataSource';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EndpointResponse } from './model/endpoint-response';


@Component({
  selector: 'hm-endpoint-view',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit, AfterViewInit {
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  elements: any;
  endpointId: any;
  public dataSource = new DataSource();

  constructor(
    private endpointService: EndpointService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) {}
  ngOnInit() {
    this.dataSource.columns = [
      {prop: 'item_index', name: 'Index'},
      {prop: 'endpointName', name: 'Name', sortable: true}, {prop: 'endpointDescription', name: 'Description', sortable: true},
      {prop: 'Url', name: 'Url', sortable: true}, {prop: 'status', name: 'Status', sortable: true},
      { prop: 'dateCreated', cellTemplate: this.dateColumn, name: 'Date Created', sortable: true},
      {prop: 'type', name: 'Type', sortable: false},
      {name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}];
    this.dataSource.url = 'get_endpoints_data/';
    this.endpointId = this.activatedRoute.snapshot.params.id;
  }
  public back(): void {
    this.router.navigate(['dashboard', 'endpoints']);
  }
  ngAfterViewInit() { }
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
        this.endpointService.deleteItem<EndpointResponse>(endpointId).subscribe(
          response => {
            if (response.body.code === '800.200.001') {
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

