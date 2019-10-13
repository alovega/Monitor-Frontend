import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecipientService } from '../recipient.service'

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
  previous: any = [];
  headElements: string[] = [ 'Phone-Number', 'date-created', 'action'];
  constructor(private recipientService:RecipientService, private cdRef: ChangeDetectorRef) { 
    this.elements = []
  }

  ngOnInit() {
    this.elements = this.showRecipients()
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
    return this.recipientService.getEndpoints()
       .subscribe((data) => {
         console.log(data)
         this.elements = data.filter(data => data.notification_type === 'SMS')
       });
   }
  
}