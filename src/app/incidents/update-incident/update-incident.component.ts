import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IncidentService } from '../incident.service';

import { Incident } from '../incident';

@Component({
  selector: 'hm-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.scss']
})
export class UpdateIncidentComponent implements OnInit{
  updateIncidentForm = new FormGroup ({
    incidentStatus: new FormControl('Investigating'),
    message: new FormControl('')
  });
  incidents: Incident[];
  incident: Incident;
  constructor(
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) { }

  // ngOnChanges() {
  //   console.log("Changes");
  //   this.showIncident();
  // }

  ngOnInit() {
    console.log("Init");
    this.showIncident();

  }

  // public showIncident(): void {
  //   const id = this.route.snapshot.paramMap.get('incident-id');
  //   this.incidentService.getIncident(id)
  //     .subscribe((data: Incident[]) => {
  //       this.incidents = data.filter(incident => incident.incident_id === id);
  //       // console.log(this.incidents);
  //       this.incident = this.incidents[0];
  //     });
  // }


  public showIncident(): void {
    const id = this.route.snapshot.paramMap.get('incident-id');
    this.incidentService.getIncident(id).subscribe(
      (data: Incident) => {
        this.incident = data;
      }
    );
  }
}
