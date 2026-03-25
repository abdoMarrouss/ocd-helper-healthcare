import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const loggedIn = await this.auth.isLoggedIn();
    if (loggedIn) {
      this.router.navigate(['/tabs/home'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
