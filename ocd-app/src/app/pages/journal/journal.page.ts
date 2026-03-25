import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ThoughtRecordsService, ThoughtRecord } from '../../services/thought-records';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
  standalone: false,
})
export class JournalPage implements OnInit {
  records: ThoughtRecord[] = [];

  constructor(
    private service: ThoughtRecordsService,
    private alert: AlertController,
    private toast: ToastController,
    public lang: LanguageService,
  ) {}

  ngOnInit() { this.load(); }

  load() { this.service.getAll().subscribe(r => this.records = r); }

  async addRecord() {
    const alert = await this.alert.create({
      header: this.lang.t('addThought'),
      inputs: [
        { name: 'thought', type: 'textarea', placeholder: this.lang.t('thoughtPlaceholder') },
        { name: 'anxiety', type: 'number', placeholder: this.lang.t('anxietyPlaceholder'), min: 0, max: 10 },
        { name: 'compulsion', type: 'text', placeholder: this.lang.t('compulsionPlaceholder') },
      ],
      buttons: [
        { text: this.lang.t('cancel'), role: 'cancel' },
        {
          text: this.lang.t('save'),
          handler: (data) => {
            if (!data.thought) { return false; }
            this.service.create({
              intrusiveThought: data.thought,
              anxietyLevel: +data.anxiety || 0,
              compulsionPerformed: data.compulsion || '',
              resisted: !data.compulsion,
            }).subscribe({
              next: () => this.load(),
              error: () => this.showToast(this.lang.t('error'))
            });
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  anxietyColor(level: number): string {
    if (level <= 3) return '#6BAE8E';
    if (level <= 6) return '#F97316';
    return '#EF4444';
  }

  private async showToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2000, position: 'top' });
    t.present();
  }
}
