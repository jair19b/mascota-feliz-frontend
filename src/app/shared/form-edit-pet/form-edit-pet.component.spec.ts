import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditPetComponent } from './form-edit-pet.component';

describe('FormEditPetComponent', () => {
  let component: FormEditPetComponent;
  let fixture: ComponentFixture<FormEditPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditPetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
