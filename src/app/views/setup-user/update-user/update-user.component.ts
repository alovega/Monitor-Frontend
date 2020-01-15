import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hm-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
