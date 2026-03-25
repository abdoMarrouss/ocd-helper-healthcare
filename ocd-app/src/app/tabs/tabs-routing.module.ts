import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule) },
      { path: 'learn', loadChildren: () => import('../pages/learn/learn.module').then(m => m.LearnPageModule) },
      { path: 'assess', loadChildren: () => import('../pages/assess/assess.module').then(m => m.AssessPageModule) },
      { path: 'erp', loadChildren: () => import('../pages/erp/ladder/ladder.module').then(m => m.LadderPageModule) },
      { path: 'erp/session', loadChildren: () => import('../pages/erp/session/session.module').then(m => m.SessionPageModule) },
      { path: 'journal', loadChildren: () => import('../pages/journal/journal.module').then(m => m.JournalPageModule) },
      { path: 'grounding', loadChildren: () => import('../pages/grounding/grounding.module').then(m => m.GroundingPageModule) },
      { path: 'settings', loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
