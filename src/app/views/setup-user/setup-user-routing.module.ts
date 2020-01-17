import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupUserComponent } from './setup-user.component';

const routes: Routes = [{ path: '', component: SetupUserComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SetupUserRoutingModule { }
