import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTruckComponent } from './card-truck.component';

describe('CardTruckComponent', () => {
  let component: CardTruckComponent;
  let fixture: ComponentFixture<CardTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTruckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
