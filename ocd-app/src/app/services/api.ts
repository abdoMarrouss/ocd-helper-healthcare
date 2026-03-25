import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Preferences } from '@capacitor/preferences';
import { from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<HttpHeaders> {
    const { value } = await Preferences.get({ key: 'token' });
    if (!value) return new HttpHeaders();
    return new HttpHeaders({ Authorization: `Bearer ${value}` });
  }

  get<T>(path: string) {
    return from(this.getHeaders()).pipe(
      switchMap(headers => this.http.get<T>(`${this.base}/${path}`, { headers }))
    );
  }

  post<T>(path: string, body: any) {
    return from(this.getHeaders()).pipe(
      switchMap(headers => this.http.post<T>(`${this.base}/${path}`, body, { headers }))
    );
  }

  patch<T>(path: string, body: any) {
    return from(this.getHeaders()).pipe(
      switchMap(headers => this.http.patch<T>(`${this.base}/${path}`, body, { headers }))
    );
  }

  delete<T>(path: string) {
    return from(this.getHeaders()).pipe(
      switchMap(headers => this.http.delete<T>(`${this.base}/${path}`, { headers }))
    );
  }

  postPublic<T>(path: string, body: any) {
    return this.http.post<T>(`${this.base}/${path}`, body);
  }
}
