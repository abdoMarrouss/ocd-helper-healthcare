import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroundingPage } from './grounding.page';

const routes: Routes = [
  {
    path: '',
    component: GroundingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroundingPageRoutingModule {}
