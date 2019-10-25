import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecipientService } from '../recipient.service'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sms-recipients',
  templateUrl: './sms-recipients.component.html',
  styleUrls: ['./sms-recipients.component.scss']
})
export class SmsRecipientsComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  firstItemIndex: any;
  lastItemIndex: any;
  elements: any;
  currentSystem: any;
  currentSystemId: any;
  previous: any = [];
  headElements: string[] = [ 'Phone Number','EscalationLevels', 'Username', 'Date Created','Status','Action'];
  constructor(
    private recipientService:RecipientService, 
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute 
    ) { 
    this.elements = []
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe(
      (param: any) => {
        this.currentSystemId = param['system-id'];
        console.log(this.currentSystemId);
      });
    this.elements = this.showRecipients()
    console.log(this.elements)
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  searchItems(search: string) {
    const prev = this.mdbTable.getDataSource();

    if (!search) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (search) {
      this.elements = this.mdbTable.searchLocalDataBy(search);
      this.mdbTable.setDataSource(prev);
    }
  }

  showRecipients() {
    return this.recipientService.getSmsRecipients(this.currentSystemId)
       .subscribe((response) => {
         console.log(response)
         this.elements = response
       });
   }

   delete(recipient_id){
    console.log(recipient_id)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this recipient!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the recipient!',
      cancelButtonText: 'No, keep the recipient'
    }).then((result) => {
      if (result.value) {
        console.log(recipient_id);
        this.recipientService.deleteItem(recipient_id).subscribe(
          response => {
            console.log(response)
            if (response.code === '800.200.001') {
              Swal.fire(
                'Deleted!',
                'This recipient has been deleted.',
                'success'
              )
            } else {
              Swal.fire(
                'Failed!',
                'This recipient could not be deleted.',
                'error'
              )
            }
          }
        )
        this.recipientService.getSmsRecipients(this.currentSystemId).subscribe(
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