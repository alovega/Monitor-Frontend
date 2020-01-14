import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import {DataSource} from '../../shared/data-table/model/dataSource';
import Swal from 'sweetalert2';
import { RecipientService } from './recipient.service';
import { ActivatedRoute } from '@angular/router';
import { RecipientResponse } from './model/recipient-response';

@Component({
  selector: 'hm-recipient-view',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit, AfterViewInit {
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  elements: any;
  public dataSource = new DataSource();
  recipientId: any;

  constructor(private recipientService: RecipientService, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.dataSource.columns = [
      {prop: 'item_index', name: 'Index'},
      {prop: 'userName', name: 'User Name', sortable: true}, {prop: 'phoneNumber', name: 'Phone Number', sortable: true},
      {prop: 'status', name: 'Status', sortable: 'true'},
      {prop: 'dateCreated', name: 'Date Created', cellTemplate: this.dateColumn, sortable: true},
      {prop: 'action', name: 'Action', cellTemplate: this.buttonsTemplate}
    ];
    this.dataSource.url = 'get_recipients_data/';
  }

  ngAfterViewInit() {}

  delete(recipientId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this recipient!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the recipient!',
      cancelButtonText: 'No, keep the recipient'
    }).then((result) => {
      if (result.value) {
        this.recipientService.deleteItem<RecipientResponse>(recipientId).subscribe(
          response => {
            if (response.body.code === '800.200.001') {
              Swal.fire(
                'Deleted!',
                'This recipient has been deleted.',
                'success'
              );
            } else {
              Swal.fire(
                'Failed!',
                'This recipient could not be deleted.',
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

