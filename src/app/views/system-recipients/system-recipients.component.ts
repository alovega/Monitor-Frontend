import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, TemplateRef} from '@angular/core';
import Swal from 'sweetalert2';
import { SystemRecipientService } from './system-recipient.service';
import { SystemService } from 'src/app/shared/system.service';
import { of } from 'rxjs';
import {DataSource} from '../../shared/data-table/model/dataSource';
import { SystemRecipientResponse } from './system-recipient';

@Component({
  selector: 'hm-system-recipients-view',
  templateUrl: './system-recipients.component.html',
  styleUrls: ['./system-recipients.component.scss']
})
export class SystemRecipientsComponent implements OnInit, AfterViewInit {
  @ViewChild('visibleItemsInput', { static: true }) visibleItemsInput;
  @ViewChild('buttonsTemplate', {static: true}) buttonsTemplate: TemplateRef<any>;
  @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;

  currentSystem: any;
  currentSystemId: any;
  EscalationLevels: any;
  elements: any;
  escalations: any;
  level: any;
  public dataSource = new DataSource();
  constructor(
    private systemRecipientService: SystemRecipientService,
    private systemService: SystemService) {
    }
  ngOnInit() {
    this.dataSource.columns = [
        {prop: 'item_index', name: 'Index'},
        {prop: 'userName', name: 'User Name', sortable: true}, {prop: 'escalationLevel', name: 'Escalation Level', sortable: true},
        {prop: 'notificationType', name: 'Notification Type', sortable: true}, {prop: 'status', name: 'Status', sortable: true},
        {name: 'Action', cellTemplate: this.buttonsTemplate, sortable: false}
    ];
    this.currentSystem = this.systemService.getCurrentSystem();
    this.dataSource.url = 'get_system_recipient_data/';
    this.currentSystemId = this.currentSystem.id;
  }
  ngAfterViewInit() {}
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
        this.systemRecipientService.deleteItem<SystemRecipientResponse>(systemRecipientId).subscribe(
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

