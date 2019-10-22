import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RecipientService } from '../recipient.service'
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

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
  headElements: string[] = [ 'Phone Number', 'Date Created','EscalationLevels', 'Username','Status','Action'];
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

   delete(item){
    this.recipientService.deleteItem(item.id).subscribe(response => {
      this.showRecipients();
    })
  }
  
}