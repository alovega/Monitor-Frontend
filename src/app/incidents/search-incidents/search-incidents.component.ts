import { Component, OnInit, Input } from '@angular/core';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'hm-search-incidents',
  templateUrl: './search-incidents.component.html',
  styleUrls: ['./search-incidents.component.scss']
})
export class SearchIncidentsComponent implements OnInit {
  @Input() incidents: Incident[];
  dateCreated = new Date();
  constructor() { }

  ngOnInit() {
  }

  showSearchResults() {

  }

}
