import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {GetRecipientsService} from '../get-recipients.service'

@Component({
  selector: 'app-email-recipients',
  templateUrl: './email-recipients.component.html',
  styleUrls: ['./email-recipients.component.scss']
})
export class EmailRecipientsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'email', 'date-created', 'action'];
  elements: any[];
  dataSource: any;
  selection: any;

  constructor(private getRecipients: GetRecipientsService) {

   }

  ngOnInit() {
    this.elements = this.getRecipients.getEmail();
    this.dataSource = new MatTableDataSource<any>(this.elements)
    this.selection = new SelectionModel<any>(true, [])
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
