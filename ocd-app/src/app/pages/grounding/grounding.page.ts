import { Component } from '@angular/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-grounding',
  templateUrl: './grounding.page.html',
  styleUrls: ['./grounding.page.scss'],
  standalone: false,
})
export class GroundingPage {
  // 4-7-8 Breathing
  breathPhase: 'idle' | 'inhale' | 'hold' | 'exhale' = 'idle';
  breathCount = 0;

  // 5-4-3-2-1 Grounding
  groundingActive = false;
  groundingStep = 0; // 0 = not started, 1-5 = steps
  groundingDone = false;

  readonly groundingSteps = [
    { count: 5, icon: '👁️', keyTitle: 'groundingStep1', keySub: 'groundingStep1Sub', color: '#EFF6FF' },
    { count: 4, icon: '✋', keyTitle: 'groundingStep2', keySub: 'groundingStep2Sub', color: '#F0FDF4' },
    { count: 3, icon: '👂', keyTitle: 'groundingStep3', keySub: 'groundingStep3Sub', color: '#FFF7ED' },
    { count: 2, icon: '👃', keyTitle: 'groundingStep4', keySub: 'groundingStep4Sub', color: '#FDF4FF' },
    { count: 1, icon: '👅', keyTitle: 'groundingStep5', keySub: 'groundingStep5Sub', color: '#FFF1F2' },
  ];

  constructor(public lang: LanguageService) {}

  // Breathing
  startBreathing() {
    this.breathCount = 0;
    this.runCycle();
  }

  private runCycle() {
    this.breathPhase = 'inhale';
    setTimeout(() => {
      this.breathPhase = 'hold';
      setTimeout(() => {
        this.breathPhase = 'exhale';
        setTimeout(() => {
          this.breathCount++;
          if (this.breathCount < 4) this.runCycle();
          else this.breathPhase = 'idle';
        }, 8000);
      }, 7000);
    }, 4000);
  }

  get breathLabel(): string {
    const map: Record<string, string> = {
      idle: this.lang.t('startExercise'),
      inhale: this.lang.isRtl ? 'استنشق... (4 ثوان)' : (this.lang.current === 'fr' ? 'Inspirez... (4s)' : 'Inhale... (4s)'),
      hold: this.lang.isRtl ? 'امسك... (7 ثوان)' : (this.lang.current === 'fr' ? 'Retenez... (7s)' : 'Hold... (7s)'),
      exhale: this.lang.isRtl ? 'ازفر... (8 ثوان)' : (this.lang.current === 'fr' ? 'Expirez... (8s)' : 'Exhale... (8s)'),
    };
    return map[this.breathPhase];
  }

  get breathColor(): string {
    const map: Record<string, string> = { idle: '#4F7CAC', inhale: '#6BAE8E', hold: '#F97316', exhale: '#4F7CAC' };
    return map[this.breathPhase];
  }

  get breathProgress(): number { return (this.breathCount / 4) * 100; }

  resetBreathing() {
    this.breathPhase = 'idle';
    this.breathCount = 0;
  }

  // 5-4-3-2-1 Grounding
  startGrounding() {
    this.groundingActive = true;
    this.groundingStep = 1;
    this.groundingDone = false;
  }

  nextGroundingStep() {
    if (this.groundingStep < 5) {
      this.groundingStep++;
    } else {
      this.groundingDone = true;
    }
  }

  prevGroundingStep() {
    if (this.groundingStep > 1) this.groundingStep--;
  }

  resetGrounding() {
    this.groundingActive = false;
    this.groundingStep = 0;
    this.groundingDone = false;
  }

  get currentGroundingStep() {
    return this.groundingSteps[this.groundingStep - 1];
  }
}
