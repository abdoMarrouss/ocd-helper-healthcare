import { Component } from '@angular/core';
import { AuthService } from './services/auth';
import { LanguageService } from './services/language';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private auth: AuthService, private lang: LanguageService) {
    this.auth.loadSession();
    this.lang.init();
  }
}
