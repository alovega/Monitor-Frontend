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
  public systemId: string;
  public incidentType: string;
  public maintenanceUrl: string;
  public isLoaded = false;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private incidentService: IncidentService,
    private systemService: SystemService
  ) {
    this.systemId = this.activatedRoute.snapshot.paramMap.get('system-id');
    this.incidentType = this.activatedRoute.snapshot.paramMap.get('incident-type');
    this.maintenanceUrl = '/system/' + this.systemId + '/incidents/maintenance';
  }

  ngOnInit() {
    // console.log(this.router.url === '/system/' + this.systemId + '/incidents/maintenance');
    // this.incidents$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.incidentService.searchIncidents(term)),
    // );
    setTimeout(() => this.isLoaded = true, 500);
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
