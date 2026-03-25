import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth';
import { LanguageService, Lang } from '../../../services/language';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email = '';
  password = '';
  language = 'en';
  loading = false;

  constructor(
    public lang: LanguageService,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController
  ) {}

  async setLang(l: Lang) {
    await this.lang.setLanguage(l);
    this.language = l;
  }

  async register() {
    if (!this.email || !this.password) {
      this.showToast(this.lang.t('fillAllFields'));
      return;
    }
    if (this.password.length < 6) {
      this.showToast(this.lang.t('minPasswordError'));
      return;
    }
    this.loading = true;
    this.auth.register(this.email, this.password, this.language).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/tabs/home'], { replaceUrl: true });
      },
      error: (err) => {
        this.loading = false;
        const msg = err.status === 409 ? this.lang.t('duplicateEmailError') : this.lang.t('error');
        this.showToast(msg);
      }
    });
  }

  private async showToast(message: string) {
    const t = await this.toast.create({ message, duration: 2500, position: 'top' });
    t.present();
  }
}
