import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hm-date-picker',
  templateUrl: './date.picker.component.html',
  styleUrls: ['./date.picker.component.scss']
})

export class DatePickerComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() submitted: string;
  @Input() date: string;
  constructor() { }

  ngOnInit() {
  }

}
