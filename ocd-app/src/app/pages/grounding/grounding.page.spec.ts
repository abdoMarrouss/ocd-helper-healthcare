import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroundingPage } from './grounding.page';

describe('GroundingPage', () => {
  let component: GroundingPage;
  let fixture: ComponentFixture<GroundingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
