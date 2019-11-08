import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged, filter } from 'rxjs/operators';

import { Incident } from './incident';
import { IncidentService } from './incident.service';
import { SystemService } from 'src/app/shared/system.service';


@Component({
  selector: 'hm-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidents: Incident[];
  // private searchTerms = new Subject<string>();
  isHidden = true;
  public currentSystem: any;
  public isLoaded = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private incidentService: IncidentService,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    this.currentSystem = this.systemService.getCurrentSystem();
    this.isLoaded = true;
  }

  searchIncident(searchTerms: string) {
    if (searchTerms.length < 1) {
      this.incidents = [];
      this.isHidden = true;
    } else {
      this.incidentService.searchIncidents(searchTerms).subscribe(
        (results: Incident[]) => this.incidents = results.filter(
          (incident) => {
            return incident.description.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 || 
            incident.name.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1;
        }));
      this.isHidden = false;
    }
    // console.log(searchTerms.length);
  }
}
