import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSkippingComponent } from './show-skipping.component';

describe('ShowSkippingComponent', () => {
  let component: ShowSkippingComponent;
  let fixture: ComponentFixture<ShowSkippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSkippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSkippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
