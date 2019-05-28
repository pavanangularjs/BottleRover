import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByAddressComponent } from './search-by-address.component';

describe('SearchByAddressComponent', () => {
  let component: SearchByAddressComponent;
  let fixture: ComponentFixture<SearchByAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
