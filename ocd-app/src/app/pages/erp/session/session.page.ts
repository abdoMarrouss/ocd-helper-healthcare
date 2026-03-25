import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ErpSessionsService } from '../../../services/erp-sessions';
import { LanguageService } from '../../../services/language';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
  standalone: false,
})
export class SessionPage implements OnInit, OnDestroy {
  situation = '';
  hierarchyItemId = '';
  sudsBaseline = 50;
  sudsCurrent = 50;
  sudsPeak = 50;
  sudsEnd = 50;
  compulsionResisted = true;
  notes = '';
  phase: 'baseline' | 'active' | 'done' = 'baseline';
  elapsed = 0;
  private timer: any;
  sudsHistory: { time: number; value: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ErpSessionsService,
    private toast: ToastController,
    public lang: LanguageService,
  ) {}

  ngOnInit() {
    this.situation = this.route.snapshot.queryParams['situation'] ?? '';
    this.hierarchyItemId = this.route.snapshot.queryParams['itemId'] ?? '';
    const suds = this.route.snapshot.queryParams['suds'];
    if (suds) { this.sudsBaseline = +suds; this.sudsCurrent = +suds; }
  }

  startSession() {
    this.phase = 'active';
    this.sudsPeak = this.sudsCurrent;
    this.sudsHistory = [{ time: 0, value: this.sudsCurrent }];
    this.timer = setInterval(() => {
      this.elapsed++;
      if (this.elapsed % 30 === 0) {
        this.sudsHistory.push({ time: this.elapsed, value: this.sudsCurrent });
      }
      if (this.sudsCurrent > this.sudsPeak) this.sudsPeak = this.sudsCurrent;
    }, 1000);
  }

  endSession() {
    clearInterval(this.timer);
    this.sudsEnd = this.sudsCurrent;
    this.sudsHistory.push({ time: this.elapsed, value: this.sudsEnd });
    this.phase = 'done';
  }

  saveSession() {
    this.service.create({
      hierarchyItemId: this.hierarchyItemId || undefined,
      sudsBaseline: this.sudsBaseline,
      sudsPeak: this.sudsPeak,
      sudsEnd: this.sudsEnd,
      compulsionResisted: this.compulsionResisted,
      durationMinutes: Math.round(this.elapsed / 60),
      notes: this.notes,
    }).subscribe({
      next: () => {
        this.showToast(this.lang.t('sessionSaved'));
        setTimeout(() => this.router.navigate(['/tabs/erp']), 1000);
      },
      error: () => this.showToast(this.lang.t('error'))
    });
  }

  get elapsedFormatted(): string {
    const m = Math.floor(this.elapsed / 60);
    const s = this.elapsed % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  sudsColor(v: number): string {
    if (v <= 30) return '#6BAE8E';
    if (v <= 60) return '#F97316';
    return '#EF4444';
  }

  ngOnDestroy() { clearInterval(this.timer); }

  private async showToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2000, position: 'top' });
    t.present();
  }
}
