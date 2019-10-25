import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/auth/authentication.service';

@Component({
  selector: 'hm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentUser: any;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe((user) => this.currentUser = user );
  }

}
