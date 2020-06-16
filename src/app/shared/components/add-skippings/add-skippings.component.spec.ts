import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkippingsComponent } from './add-skippings.component';

describe('AddSkippingsComponent', () => {
  let component: AddSkippingsComponent;
  let fixture: ComponentFixture<AddSkippingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkippingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkippingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
