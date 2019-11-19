import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { MdbTableSortDirective, MdbTableDirective, MdbTablePaginationComponent } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
import { SystemRecipientService } from '../system-recipient.service';
import { ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/shared/system.service';
import { of } from 'rxjs';

@Component({
  selector: 'hm-system-recipients-view',
  templateUrl: './system-recipients-view.component.html',
  styleUrls: ['./system-recipients-view.component.scss']
})
export class SystemRecipientsViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;

  firstItemIndex: any;
  lastItemIndex: any;
  currentSystem: any;
  currentSystemId: any;
  searchText = '';
  escalationLevelId: any;
  EscalationLevels: any;
  elements: any;
  all: any;
  escalations: any;
  previous: any = [];
  visibleItems: number = 5;
  headElements: string[] = ['userName', 'escalationLevel', 'notificationType', 'status', 'dateCreated', 'action'];
  Elements = {
    userName: 'User Name', escalationLevel: 'Escalation Level', notificationType: 'Notification Type', status: 'Status',
    dateCreated: 'Date Created', action: 'Action'
  };
  level: any;

  constructor(private systemRecipientService: SystemRecipientService, private cdRef: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute, private systemService: SystemService) {
                of(this.getEscalationLevels()).subscribe( data => {
                  console.log(data);
                  this.EscalationLevels = data;
                });
              }
  @HostListener('input') oninput() {
   this.searchItems();
 }

  ngOnInit() {
    console.log(this.level);
    this.currentSystem = this.systemService.getCurrentSystem();
    this.currentSystemId = this.currentSystem.id;
    this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(response => {
      this.elements = response;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
    this.getEscalationLevels();
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.visibleItems);
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

  filterSystemRecipients(level: any) {
    if (level === 'all') {
      this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(response => {
      console.log(response);
      this.elements = response;
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
      });
    } else {
      this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(response => {
        response = response.filter((item) => item.escalationLevel === level);
        console.log(response);
        this.elements = response;
        this.mdbTable.setDataSource(this.elements);
        this.elements = this.mdbTable.getDataSource();
        this.previous = this.mdbTable.getDataSource();
      });
    }
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
  getEscalationLevels() {
    this.systemRecipientService.getLevels().subscribe(data => {
      this.EscalationLevels = data;
    });
  }
   delete(systemRecipientId) {
    console.log(systemRecipientId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this recipient!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the recipient!',
      cancelButtonText: 'No, keep the recipient'
    }).then((result) => {
      if (result.value) {
        console.log(systemRecipientId);
        this.systemRecipientService.deleteItem(systemRecipientId).subscribe(
          response => {
            console.log(response);
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
        this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(
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
