import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageStorelocationsComponent } from './store-locations.component';

describe('StorelocationsComponent', () => {
  let component: LandingPageStorelocationsComponent;
  let fixture: ComponentFixture<LandingPageStorelocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageStorelocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageStorelocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
