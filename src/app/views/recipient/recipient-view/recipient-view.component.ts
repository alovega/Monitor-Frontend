import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective, MdbTableSortDirective } from 'angular-bootstrap-md';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RecipientService } from '../recipient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hm-recipient-view',
  templateUrl: './recipient-view.component.html',
  styleUrls: ['./recipient-view.component.scss']
})
export class RecipientViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;

  elements: any;
  searchText = '';
  previous: any = [];
  visibleItems: number = 5;

  headElements = ['userName', 'phoneNumber', 'status', 'dateCreated', 'action'];
  Elements = {
    userName: 'User Name', phoneNumber: 'Phone Number', status: 'Status', dateCreated: 'Date Created',
    action: 'Action'
  };
  currentSystem: any;
  currentSystemId: any;
  recipientId: any;

  constructor(private recipientService: RecipientService, private cdRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
              private modalService: NgbModal, private formBuilder: FormBuilder) { }
  @HostListener('input') oninput() {
    this.searchItems();
  }
  ngOnInit() {
    this.recipientService.getRecipients().subscribe(
      (data) => {
        console.log(data);
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
    if (this.elements.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
    this.cdRef.detectChanges();
  }

  changeVisibleItems(maxNumber: number) {
    this.visibleItems = maxNumber;
    if (!maxNumber) {
      this.visibleItemsInput.nativeElement.value = 1;
      this.visibleItems = 1;
    }
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    if (this.elements.length > this.visibleItems) {
      this.mdbTablePagination.nextShouldBeDisabled = false;
    }
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
  delete(recipientId) {
    console.log(recipientId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this recipient!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the recipient!',
      cancelButtonText: 'No, keep the recipient'
    }).then((result) => {
      if (result.value) {
        console.log(recipientId);
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
