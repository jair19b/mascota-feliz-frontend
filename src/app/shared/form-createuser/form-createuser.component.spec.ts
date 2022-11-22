import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateuserComponent } from './form-createuser.component';

describe('FormCreateuserComponent', () => {
  let component: FormCreateuserComponent;
  let fixture: ComponentFixture<FormCreateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
