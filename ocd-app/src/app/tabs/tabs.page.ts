import { Component } from '@angular/core';
import { LanguageService } from '../services/language';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  constructor(public lang: LanguageService) {}
}
