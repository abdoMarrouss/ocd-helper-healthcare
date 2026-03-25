import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LadderPage } from './ladder.page';

describe('LadderPage', () => {
  let component: LadderPage;
  let fixture: ComponentFixture<LadderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LadderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
