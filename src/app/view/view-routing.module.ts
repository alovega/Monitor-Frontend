import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndpointFormComponent } from './endpoint/endpoint-form/endpoint-form.component';



const routes: Routes = [
    {path:'endpoint-form', component:EndpointFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule { }
