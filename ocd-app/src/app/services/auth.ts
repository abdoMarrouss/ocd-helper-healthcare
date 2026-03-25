import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthUser {
  id: string;
  email: string;
  language: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiUrl;
  currentUser$ = new BehaviorSubject<AuthUser | null>(null);

  constructor(private http: HttpClient) {}

  register(email: string, password: string, language = 'ar') {
    return this.http.post<{ access_token: string; user: AuthUser }>(
      `${this.base}/auth/register`, { email, password, language }
    ).pipe(tap(res => this.saveSession(res)));
  }

  login(email: string, password: string) {
    return this.http.post<{ access_token: string; user: AuthUser }>(
      `${this.base}/auth/login`, { email, password }
    ).pipe(tap(res => this.saveSession(res)));
  }

  private saveSession(res: { access_token: string; user: AuthUser }) {
    Preferences.set({ key: 'token', value: res.access_token });
    Preferences.set({ key: 'user', value: JSON.stringify(res.user) });
    this.currentUser$.next(res.user);
  }

  async loadSession() {
    const { value } = await Preferences.get({ key: 'user' });
    if (value) this.currentUser$.next(JSON.parse(value));
  }

  async logout() {
    await Preferences.remove({ key: 'token' });
    await Preferences.remove({ key: 'user' });
    this.currentUser$.next(null);
  }

  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  }

  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    if (!token) return false;
    try {
      // Decode JWT payload to check expiry without a library
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        await this.logout();
        return false;
      }
      return true;
    } catch {
      return !!token;
    }
  }
}
