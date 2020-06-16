import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkippingsComponent } from './skippings.component';

describe('SkippingsComponent', () => {
  let component: SkippingsComponent;
  let fixture: ComponentFixture<SkippingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkippingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkippingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
