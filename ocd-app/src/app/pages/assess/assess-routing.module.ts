import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssessPage } from './assess.page';

const routes: Routes = [
  {
    path: '',
    component: AssessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssessPageRoutingModule {}
