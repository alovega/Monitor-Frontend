import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientComponent } from './recipient.component';
import { RecipientViewComponent } from './recipient-view/recipient-view.component';
import { RecipientUpdateComponent } from './recipient-update/recipient-update.component';
import { RecipientCreateComponent } from './recipient-create/recipient-create.component';

const routes: Routes = [
  { path: '', component: RecipientComponent, children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'recipient-view'
    },
      {
        path: 'recipient-view',
        component: RecipientViewComponent
      }
    ]
  },
  {path: 'recipient-update/:id', component: RecipientUpdateComponent},
  {path: 'recipient-create', component: RecipientCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipientRoutingModule { }
