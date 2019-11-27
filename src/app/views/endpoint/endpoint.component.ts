import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ChangeDetectorRef, TemplateRef } from '@angular/core';
import {EndpointService} from './endpoint.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SystemService } from 'src/app/shared/system.service';


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
  currentSystem: any;
  currentSystemId: any;
  endpointId: any;
  public dataSource = {
    columns: [],
    url: '',
    systemId: ''
  };

  constructor(
    private endpointService: EndpointService,
    private systemService: SystemService,
    private cdRef: ChangeDetectorRef,
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
    this.currentSystem = this.systemService.getCurrentSystem();
    this.dataSource.url = 'get_endpoints_data/';
    this.dataSource.systemId = this.currentSystem.id;
    this.endpointId = this.activatedRoute.snapshot.params.id;
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

