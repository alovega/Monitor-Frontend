import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { RecipientService } from '../recipient.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Recipient } from '../recipient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-recipients',
  templateUrl: './email-recipients.component.html',
  styleUrls: ['./email-recipients.component.scss']
})
export class EmailRecipientsComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;
  firstItemIndex: any;
  lastItemIndex: any;
  currentSystem: any;
  currentSystemId: any;
  elements: any;
  escalations:any
  previous: any = [];
  headElements: string[] = [ 'Email', 'Date Created', 'Escalation Levels','Username', 'Status','Action'];

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
    return this.recipientService.getEmailRecipients(this.currentSystemId)
       .subscribe((response) => {
         console.log(response)
         this.elements = response
         this.escalations = response.escalation_levels
       });
   }

   delete(item){
    this.recipientService.deleteItem(item.id).subscribe(response => {
      this.showRecipients();
    })
  }
}

