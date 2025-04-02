import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarSComponent } from './searchbar-s.component';

describe('SearchbarSComponent', () => {
  let component: SearchbarSComponent;
  let fixture: ComponentFixture<SearchbarSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbarSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
