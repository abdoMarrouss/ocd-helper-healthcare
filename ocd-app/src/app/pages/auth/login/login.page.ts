import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth';
import { LanguageService, Lang } from '../../../services/language';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  constructor(
    public lang: LanguageService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController
  ) {}

  async setLang(l: Lang) {
    await this.lang.setLanguage(l);
  }

  async login() {
    if (!this.email || !this.password) {
      this.showToast(this.lang.t('fillAllFields'));
      return;
    }
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        const msg = err?.error?.message || err?.message || JSON.stringify(err);
        this.showToast(msg || this.lang.t('invalidCredentials'));
      }
    });
  }

  private async showToast(message: string) {
    const t = await this.toast.create({ message, duration: 2500, position: 'top' });
    t.present();
  }
}
