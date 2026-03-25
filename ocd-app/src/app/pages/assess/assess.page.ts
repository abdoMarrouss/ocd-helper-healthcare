import { Component, OnInit } from '@angular/core';
import { YbocsService, YbocsAssessment } from '../../services/ybocs';
import { ToastController } from '@ionic/angular';
import { LanguageService } from '../../services/language';

// Y-BOCS Questions — Goodman et al. 1989
// Q1-5: Obsessions | Q6-10: Compulsions
const YBOCS_QUESTIONS: Record<string, string>[] = [
  {
    ar: 'كم من الوقت تقضي في الأفكار الوسواسية؟',
    fr: 'Combien de temps passez-vous dans les pensées obsessionnelles ?',
    en: 'How much time do you spend on obsessive thoughts?',
    es: '¿Cuánto tiempo dedicas a los pensamientos obsesivos?',
  },
  {
    ar: 'كم تعيق الأفكار الوسواسية حياتك اليومية؟',
    fr: 'Dans quelle mesure les obsessions perturbent-elles votre vie quotidienne ?',
    en: 'How much do obsessive thoughts interfere with your daily life?',
    es: '¿Cuánto interfieren los pensamientos obsesivos en tu vida diaria?',
  },
  {
    ar: 'ما مستوى الضيق الذي تسببه الأفكار الوسواسية؟',
    fr: 'Quel niveau de détresse les pensées obsessionnelles causent-elles ?',
    en: 'How much distress do your obsessive thoughts cause?',
    es: '¿Cuánto malestar te causan tus pensamientos obsesivos?',
  },
  {
    ar: 'ما مدى مقاومتك للأفكار الوسواسية؟',
    fr: 'Dans quelle mesure résistez-vous aux pensées obsessionnelles ?',
    en: 'How much do you resist your obsessive thoughts?',
    es: '¿Cuánto resistes tus pensamientos obsesivos?',
  },
  {
    ar: 'ما مدى سيطرتك على الأفكار الوسواسية؟',
    fr: 'Quel contrôle avez-vous sur vos pensées obsessionnelles ?',
    en: 'How much control do you have over your obsessive thoughts?',
    es: '¿Cuánto control tienes sobre tus pensamientos obsesivos?',
  },
  {
    ar: 'كم من الوقت تقضي في الأفعال الوسواسية؟',
    fr: 'Combien de temps passez-vous dans les compulsions ?',
    en: 'How much time do you spend on compulsive behaviors?',
    es: '¿Cuánto tiempo dedicas a las compulsiones?',
  },
  {
    ar: 'كم تعيق الأفعال الوسواسية حياتك اليومية؟',
    fr: 'Dans quelle mesure les compulsions perturbent-elles votre vie quotidienne ?',
    en: 'How much do compulsions interfere with your daily life?',
    es: '¿Cuánto interfieren las compulsiones en tu vida diaria?',
  },
  {
    ar: 'ما مستوى الضيق إذا لم تقم بالأفعال الوسواسية؟',
    fr: 'Quel niveau d\'anxiété si vous ne réalisez pas la compulsion ?',
    en: 'How anxious would you be if you did not perform your compulsions?',
    es: '¿Cuánta ansiedad sentirías si no realizaras tus compulsiones?',
  },
  {
    ar: 'ما مدى مقاومتك للأفعال الوسواسية؟',
    fr: 'Dans quelle mesure résistez-vous aux compulsions ?',
    en: 'How much do you resist your compulsions?',
    es: '¿Cuánto resistes tus compulsiones?',
  },
  {
    ar: 'ما مدى سيطرتك على الأفعال الوسواسية؟',
    fr: 'Quel contrôle avez-vous sur vos compulsions ?',
    en: 'How much control do you have over your compulsions?',
    es: '¿Cuánto control tienes sobre tus compulsiones?',
  },
];

@Component({
  selector: 'app-assess',
  templateUrl: './assess.page.html',
  styleUrls: ['./assess.page.scss'],
  standalone: false,
})
export class AssessPage implements OnInit {
  questions = YBOCS_QUESTIONS;
  answers: number[] = new Array(10).fill(null);
  history: YbocsAssessment[] = [];
  loading = false;
  submitted = false;
  lastResult: YbocsAssessment | null = null;
  activeView: 'form' | 'history' = 'form';

  constructor(
    private ybocs: YbocsService,
    private toast: ToastController,
    public lang: LanguageService,
  ) {}

  ngOnInit() { this.loadHistory(); }

  loadHistory() {
    this.ybocs.getHistory().subscribe(h => this.history = h);
  }

  get allAnswered() { return this.answers.every(a => a !== null); }
  get answeredCount() { return this.answers.filter(a => a !== null).length; }

  get answerLabels(): string[] {
    return [
      this.lang.t('ans0'), this.lang.t('ans1'), this.lang.t('ans2'),
      this.lang.t('ans3'), this.lang.t('ans4'),
    ];
  }

  submit() {
    if (!this.allAnswered) {
      this.showToast(this.lang.t('allAnsweredRequired'));
      return;
    }
    this.loading = true;
    this.ybocs.submit(this.answers).subscribe({
      next: (result) => {
        this.loading = false;
        this.lastResult = result;
        this.submitted = true;
        this.loadHistory();
      },
      error: () => {
        this.loading = false;
        this.showToast(this.lang.t('error'));
      }
    });
  }

  reset() {
    this.answers = new Array(10).fill(null);
    this.submitted = false;
    this.lastResult = null;
  }

  severityLabel(s: string): string {
    const key = 'sev_' + s;
    return this.lang.t(key);
  }

  severityColor(s: string): string {
    const map: any = { subclinical: '#6BAE8E', mild: '#EAB308', moderate: '#F97316', severe: '#EF4444', extreme: '#991B1B' };
    return map[s] ?? '#8A8A8A';
  }

  private async showToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2500, position: 'top' });
    t.present();
  }
}
