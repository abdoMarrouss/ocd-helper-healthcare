import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FearHierarchyService, FearItem } from '../../../services/fear-hierarchy';
import { LanguageService } from '../../../services/language';

@Component({
  selector: 'app-ladder',
  templateUrl: './ladder.page.html',
  styleUrls: ['./ladder.page.scss'],
  standalone: false,
})
export class LadderPage implements OnInit {
  items: FearItem[] = [];

  constructor(
    private service: FearHierarchyService,
    private alert: AlertController,
    private toast: ToastController,
    private router: Router,
    public lang: LanguageService,
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(items => this.items = items);
  }

  async addItem() {
    const alert = await this.alert.create({
      header: this.lang.t('addFear'),
      inputs: [
        { name: 'situation', type: 'text', placeholder: this.lang.t('situationPlaceholder') },
        { name: 'suds', type: 'number', placeholder: this.lang.t('sudsPlaceholder'), min: 0, max: 100 },
      ],
      buttons: [
        { text: this.lang.t('cancel'), role: 'cancel' },
        {
          text: this.lang.t('save'),
          handler: (data) => {
            if (!data.situation || data.suds === '') { return false; }
            this.service.create(data.situation, +data.suds).subscribe({
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

  async deleteItem(item: FearItem) {
    const alert = await this.alert.create({
      header: this.lang.t('deleteFearTitle'),
      message: item.situation,
      buttons: [
        { text: this.lang.t('cancel'), role: 'cancel' },
        {
          text: this.lang.t('delete'), role: 'destructive',
          handler: () => {
            this.service.remove(item.id).subscribe(() => this.load());
          }
        }
      ]
    });
    await alert.present();
  }

  markCompleted(item: FearItem) {
    this.service.update(item.id, { completed: !item.completed }).subscribe(() => this.load());
  }

  startSession(item: FearItem) {
    this.router.navigate(['/tabs/erp/session'], {
      queryParams: { itemId: item.id, situation: item.situation, suds: item.sudsRating }
    });
  }

  sudsColor(suds: number): string {
    if (suds <= 30) return '#6BAE8E';
    if (suds <= 60) return '#F97316';
    return '#EF4444';
  }

  private async showToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2000, position: 'top' });
    t.present();
  }
}
