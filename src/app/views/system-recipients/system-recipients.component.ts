import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef, AfterViewInit, TemplateRef} from '@angular/core';
import Swal from 'sweetalert2';
import { SystemRecipientService } from './system-recipient.service';
import { SystemService } from 'src/app/shared/system.service';
import { of } from 'rxjs';

@Component({
  selector: 'hm-system-recipients-view',
  templateUrl: './system-recipients.component.html',
  styleUrls: ['./system-recipients.component.scss']
})
export class SystemRecipientsComponent implements OnInit, AfterViewInit {
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

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
  visibleItems = 5;
  headElements: string[] = ['userName', 'escalationLevel', 'notificationType', 'status', 'dateCreated', 'action'];
  Elements = {
    userName: 'User Name', escalationLevel: 'Escalation Level', notificationType: 'Notification Type', status: 'Status',
    dateCreated: 'Date Created', action: 'Action'
  };
  level: any;
  public dataSource = {
    columns: [],
    url: '',
    systemId: ''
  };
  constructor(private systemRecipientService: SystemRecipientService, private cdRef: ChangeDetectorRef,
              private systemService: SystemService) {
                of(this.getEscalationLevels()).subscribe( data => {
                  this.EscalationLevels = data;
                });
              }
  @HostListener('input') oninput() {
   this.searchItems();
 }

  ngOnInit() {
    this.dataSource.columns = [
        {prop: 'userName', name: 'User Name', sortable: true}, {prop: 'escalationLevel', name: 'Escalation Level', sortable: true},
        {prop: 'notificationType', name: 'Notification Type', sortable: true}, {prop: 'status', name: 'Status', sortable: true},
        {prop: 'dateCreated', name: 'Date Created', cellTemplate: this.dateColumn, sortable: true},
        {name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}
    ];
    this.currentSystem = this.systemService.getCurrentSystem();
    this.dataSource.systemId = this.currentSystem.id;
    this.dataSource.url = 'get_system_recipient_data/';
    this.currentSystemId = this.currentSystem.id;
    this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(response => {
      this.elements = response;
    });
    this.getEscalationLevels();
  }
  ngAfterViewInit() {}

  changeVisibleItems(maxNumber: number) {}

  filterSystemRecipients(level: any) {
    if (level === 'all') {
      this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(response => {
      this.elements = response;
      // this.mdbTable.setDataSource(this.elements);
      // this.elements = this.mdbTable.getDataSource();
      // this.previous = this.mdbTable.getDataSource();
      });
    } else {
      this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(response => {
        response = response.filter((item) => item.escalationLevel === level);
        this.elements = response;
        // this.mdbTable.setDataSource(this.elements);
        // this.elements = this.mdbTable.getDataSource();
        // this.previous = this.mdbTable.getDataSource();
      });
    }
  }
  searchItems() {}
  getEscalationLevels() {
    this.systemRecipientService.getLevels().subscribe(data => {
      this.EscalationLevels = data;
    });
  }
   delete(systemRecipientId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this recipient!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete the recipient!',
      cancelButtonText: 'No, keep the recipient'
    }).then((result) => {
      if (result.value) {
        this.systemRecipientService.deleteItem(systemRecipientId).subscribe(
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
        this.systemRecipientService.getSystemRecipients(this.currentSystemId).subscribe(
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

