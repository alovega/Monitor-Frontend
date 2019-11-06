import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hm-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public router: Router) {
   }

  ngOnInit() {
  }

}
