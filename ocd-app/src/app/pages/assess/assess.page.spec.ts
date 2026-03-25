import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessPage } from './assess.page';

describe('AssessPage', () => {
  let component: AssessPage;
  let fixture: ComponentFixture<AssessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
