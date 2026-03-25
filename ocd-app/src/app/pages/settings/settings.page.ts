import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { LanguageService, Lang } from '../../services/language';
import { ApiService } from '../../services/api';
import { ErpSessionsService } from '../../services/erp-sessions';
import { YbocsService } from '../../services/ybocs';
import { ThoughtRecordsService } from '../../services/thought-records';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  currentLang: Lang = 'ar';
  showChangePwd = false;
  currentPwd = '';
  newPwd = '';
  confirmPwd = '';
  savingPwd = false;

  constructor(
    public lang: LanguageService,
    private auth: AuthService,
    private api: ApiService,
    private erpSessions: ErpSessionsService,
    private ybocs: YbocsService,
    private thoughtRecords: ThoughtRecordsService,
    private router: Router,
    private alert: AlertController,
    private toast: ToastController
  ) {}

  ngOnInit() { this.currentLang = this.lang.current; }

  async changeLanguage(l: Lang) {
    await this.lang.setLanguage(l);
    this.currentLang = l;
    window.location.reload();
  }

  async savePassword() {
    if (!this.currentPwd || !this.newPwd || !this.confirmPwd) {
      this.showToast(this.lang.t('fillAllFields'));
      return;
    }
    if (this.newPwd !== this.confirmPwd) {
      this.showToast(this.lang.t('pwdMismatch'));
      return;
    }
    if (this.newPwd.length < 6) {
      this.showToast(this.lang.t('minPasswordError'));
      return;
    }
    this.savingPwd = true;
    this.api.patch('users/me/password', {
      currentPassword: this.currentPwd,
      newPassword: this.newPwd
    }).subscribe({
      next: () => {
        this.savingPwd = false;
        this.showChangePwd = false;
        this.currentPwd = '';
        this.newPwd = '';
        this.confirmPwd = '';
        this.showToast(this.lang.t('pwdChanged'));
      },
      error: (err) => {
        this.savingPwd = false;
        const msg = err.status === 401 ? this.lang.t('wrongCurrentPwd') : this.lang.t('error');
        this.showToast(msg);
      }
    });
  }

  exportCSV() {
    let csvData: string[][] = [];
    let pending = 3;
    const tryExport = () => {
      if (--pending === 0) this.downloadCSV(csvData);
    };

    this.erpSessions.getAll().subscribe({
      next: sessions => {
        sessions.forEach(s => csvData.push([
          'ERP Session', s.sessionAt, String(s.sudsBaseline), String(s.sudsPeak),
          String(s.sudsEnd), String(s.durationMinutes), String(s.compulsionResisted), s.notes ?? ''
        ]));
        tryExport();
      },
      error: () => tryExport()
    });

    this.ybocs.getHistory().subscribe({
      next: assessments => {
        assessments.forEach(a => csvData.push([
          'Y-BOCS', a.takenAt, String(a.totalScore), a.severity, '', '', '', ''
        ]));
        tryExport();
      },
      error: () => tryExport()
    });

    this.thoughtRecords.getAll().subscribe({
      next: records => {
        records.forEach((r: any) => csvData.push([
          'Thought Record', r.recordedAt ?? '', r.intrusiveThought ?? '', String(r.anxietyLevel ?? 0),
          String(r.resisted ?? false), '', '', r.notes ?? ''
        ]));
        tryExport();
      },
      error: () => tryExport()
    });
  }

  private async downloadCSV(data: string[][]) {
    const headers = ['Type', 'Date', 'Value1', 'Value2', 'Value3', 'Value4', 'Value5', 'Notes'];
    const rows = [headers, ...data].map(r => r.map(c => `"${c}"`).join(','));
    const csvContent = rows.join('\n');
    const fileName = `ocd-data-${new Date().toISOString().split('T')[0]}.csv`;

    if (Capacitor.isNativePlatform()) {
      await Filesystem.writeFile({
        path: fileName,
        data: csvContent,
        directory: Directory.Cache,
        encoding: 'utf8' as any,
      });
      const { uri } = await Filesystem.getUri({ path: fileName, directory: Directory.Cache });
      await Share.share({ title: fileName, url: uri, dialogTitle: this.lang.t('exportCSV') });
    } else {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast(this.lang.t('success'));
    }
  }

  async confirmLogout() {
    const alert = await this.alert.create({
      header: this.lang.t('logout'),
      message: this.lang.isRtl ? 'هل تريد تسجيل الخروج؟' : 'Are you sure you want to logout?',
      buttons: [
        { text: this.lang.t('cancel'), role: 'cancel' },
        {
          text: this.lang.t('logout'),
          role: 'destructive',
          handler: async () => {
            await this.auth.logout();
            this.router.navigate(['/login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  private async showToast(message: string) {
    const t = await this.toast.create({ message, duration: 2500, position: 'top' });
    t.present();
  }
}
