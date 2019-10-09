import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';

import { Incident } from './incident';
import { IncidentService } from './incident.service';


@Component({
  selector: 'hm-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidents: Incident[];
  // private searchTerms = new Subject<string>();
  isHidden = true;
  constructor(
    public router: Router,
    private incidentService: IncidentService
  ) { }

  ngOnInit() {
    // this.incidents$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.incidentService.searchIncidents(term)),
    // );
  }

  // searchIncident(term: string): void {
  //   this.searchTerms.next(term);
  // }

  searchIncident(searchTerms: string) {
    if (searchTerms.length < 1) {
      this.incidents = [];
      this.isHidden = true;
    } else {
      this.incidentService.searchIncidents(searchTerms).subscribe(
        (results: Incident[]) => this.incidents = results.filter(
          (incident) => {
            return incident.description.indexOf(searchTerms) > -1 || incident.name.indexOf(searchTerms) > -1;
        }));
      this.isHidden = false;
    }
    // console.log(searchTerms.length);
  }
}
