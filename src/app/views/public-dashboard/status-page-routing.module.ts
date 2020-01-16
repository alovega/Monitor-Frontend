import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusPageComponent } from './status-page.component';
import { IncidentHistoryComponent } from './incident-history/incident-history.component';


const routes: Routes = [
  {path: '', component: StatusPageComponent},
  {path: 'incident/:incident-id', component: IncidentHistoryComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusPageRoutingModule { }
