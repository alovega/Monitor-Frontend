import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hm-time-picker',
  templateUrl: './time.picker.component.html',
  styleUrls: ['./time.picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  now = {hour: 13, minute: 30};
  @Input() parentForm: FormGroup;
  @Input() submitted: string;
  @Input() time: string;
  constructor() { }

  ngOnInit() {
  }

}
