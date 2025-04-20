/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckandpayComponent } from './checkandpay.component';

describe('CheckandpayComponent', () => {
  let component: CheckandpayComponent;
  let fixture: ComponentFixture<CheckandpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckandpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckandpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
