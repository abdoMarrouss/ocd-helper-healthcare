import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroundingPageRoutingModule } from './grounding-routing.module';

import { GroundingPage } from './grounding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
    GroundingPageRoutingModule
  ],
  declarations: [GroundingPage]
})
export class GroundingPageModule {}
