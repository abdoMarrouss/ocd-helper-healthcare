import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language';
import { YbocsService, YbocsAssessment } from '../../services/ybocs';
import { ErpSessionsService, ErpStats } from '../../services/erp-sessions';
import { AuthService } from '../../services/auth';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis,
  ApexStroke, ApexTooltip, ApexMarkers, ApexAnnotations
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  markers: ApexMarkers;
  annotations: ApexAnnotations;
  colors: string[];
};

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  lastAssessment: YbocsAssessment | null = null;
  erpStats: ErpStats | null = null;
  userName = '';
  chartOptions: Partial<ChartOptions> | null = null;
  hasChartData = false;

  private cachedHistory: YbocsAssessment[] = [];
  private langSub?: Subscription;

  constructor(
    public lang: LanguageService,
    private ybocs: YbocsService,
    private erpSessions: ErpSessionsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(u => {
      if (u) this.userName = u.email.split('@')[0];
    });
    // Rebuild chart whenever language changes
    this.langSub = this.lang.lang$.subscribe(() => {
      if (this.cachedHistory.length >= 2) this.buildChart(this.cachedHistory);
    });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData(event?: any) {
    this.ybocs.getLatest().subscribe({
      next: a => this.lastAssessment = a,
      error: () => this.lastAssessment = null
    });
    this.ybocs.getHistory().subscribe({
      next: history => {
        this.cachedHistory = history ?? [];
        this.buildChart(this.cachedHistory);
      },
      error: () => this.hasChartData = false
    });
    this.erpSessions.getStats().subscribe({
      next: s => {
        this.erpStats = s;
        event?.target?.complete();
      },
      error: () => {
        this.erpStats = null;
        event?.target?.complete();
      }
    });
  }

  private buildChart(history: YbocsAssessment[]) {
    if (!history || history.length < 2) {
      this.hasChartData = false;
      return;
    }
    const sorted = [...history].sort((a, b) => new Date(a.takenAt).getTime() - new Date(b.takenAt).getTime());
    const scores = sorted.map(a => a.totalScore);
    const dates = sorted.map(a => this.formatChartDate(new Date(a.takenAt)));

    this.chartOptions = {
      series: [{ name: 'Y-BOCS', data: scores }],
      chart: { type: 'line', height: 180, toolbar: { show: false }, background: 'transparent', fontFamily: 'Tajawal, Inter, sans-serif' },
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#4F7CAC'],
      markers: { size: 5, colors: ['#4F7CAC'], strokeColors: '#fff', strokeWidth: 2 },
      xaxis: { categories: dates, labels: { style: { fontSize: '10px', colors: '#9CA3AF' } }, axisBorder: { show: false }, axisTicks: { show: false } },
      yaxis: { min: 0, max: 40, tickAmount: 4, labels: { style: { fontSize: '10px', colors: '#9CA3AF' } } },
      tooltip: { theme: 'light', y: { formatter: (v: number) => `${v}/40` } },
      annotations: {
        yaxis: [
          { y: 7, y2: 15, fillColor: '#EAB308', opacity: 0.08, label: { text: '' } },
          { y: 16, y2: 23, fillColor: '#F97316', opacity: 0.08, label: { text: '' } },
          { y: 24, y2: 40, fillColor: '#EF4444', opacity: 0.08, label: { text: '' } },
        ]
      }
    };
    this.hasChartData = true;
  }

  private formatChartDate(d: Date): string {
    const day = d.getDate();
    const m = d.getMonth();
    const months: Record<string, string[]> = {
      ar: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
      fr: ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'],
      en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    };
    const lang = this.lang.current in months ? this.lang.current : 'en';
    return `${day} ${months[lang][m]}`;
  }

  severityColor(s: string): string {
    const map: any = { subclinical: '#6BAE8E', mild: '#EAB308', moderate: '#F97316', severe: '#EF4444', extreme: '#991B1B' };
    return map[s] ?? '#8A8A8A';
  }

  severityLabel(s: string): string {
    return this.lang.t(`sev_${s}`) || s;
  }
}
