import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasProtectionCardsComponent } from './extras-protection-cards.component';

describe('ExtrasProtectionCardsComponent', () => {
  let component: ExtrasProtectionCardsComponent;
  let fixture: ComponentFixture<ExtrasProtectionCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtrasProtectionCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtrasProtectionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
