import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateIncidentComponent } from './update-incident.component';
import { UpdateHistoryComponent } from './update-history/update-history.component';
import { IncidentEventsComponent } from './incident-events/incident-events.component';

const routes: Routes = [
  { path: '', component: UpdateIncidentComponent , children: [
    { path: 'history', component: UpdateHistoryComponent},
    { path: 'events', component: IncidentEventsComponent},
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'history'
    },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateIncidentRoutingModule { }
