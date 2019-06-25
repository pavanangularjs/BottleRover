import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SorryPageComponent } from './sorry-page.component';

describe('SorryPageComponent', () => {
  let component: SorryPageComponent;
  let fixture: ComponentFixture<SorryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SorryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SorryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
