import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'hm-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  showLoader: boolean;
  constructor(
    public loaderService: LoaderService
  ) {
    console.log('At the component its' + this.loaderService.visibility.value);

  }

  ngOnInit() {
    // this.showLoader = this.loaderService.visibility.value;
  }
}
