import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hm-time-picker',
  templateUrl: './time.picker.component.html',
  styleUrls: ['./time.picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  time = {hour: 13, minute: 30};
  constructor() { }

  ngOnInit() {
  }

}
