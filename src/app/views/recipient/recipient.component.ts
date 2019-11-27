import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { RecipientService } from './recipient.service';
import { ActivatedRoute } from '@angular/router';

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
  visibleItems = 5;
  public dataSource = {
    columns: [],
    url: '',
    systemId: ''
  };
  currentSystem: any;
  currentSystemId: any;
  recipientId: any;

  constructor(private recipientService: RecipientService, private activatedRoute: ActivatedRoute) { }
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
    this.dataSource.columns = [
      {prop: 'userName', name: 'User Name', sortable: true}, {prop: 'phoneNumber', name: 'Phone Number', sortable: true},
      {prop: 'status', name: 'Status', sortable: 'true'},
      {prop: 'dateCreated', name: 'Date Created', cellTemplate: this.dateColumn, sortable: true},
      {prop: 'action', name: 'Action', cellTemplate: this.buttonsTemplate}
    ];
    this.dataSource.url = 'get_recipients_data/';
  }

  ngAfterViewInit() {}

  changeVisibleItems(maxNumber: number) {
    this.visibleItems = maxNumber;
    if (!maxNumber) {
      this.visibleItemsInput.nativeElement.value = 1;
      this.visibleItems = 1;
    }
  }

  searchItems() {}
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
        this.recipientService.deleteItem(recipientId).subscribe(
          response => {
            if (response.code === '800.200.001') {
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
        this.recipientService.getRecipients().subscribe(
          (response) => {
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

