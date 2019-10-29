import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hm-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss']
})
export class RecipientComponent implements OnInit {
  isHidden = true;
  public systemId: string;

  constructor(private activatedRoute: ActivatedRoute, public router: Router) {
    this.systemId = this.activatedRoute.snapshot.paramMap.get('system-id');
    console.log(this.systemId);
   }

  ngOnInit() {
  }

}
