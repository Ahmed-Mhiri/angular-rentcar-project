import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPackageCardComponent } from './car-package-card.component';

describe('CarPackageCardComponent', () => {
  let component: CarPackageCardComponent;
  let fixture: ComponentFixture<CarPackageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarPackageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPackageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
