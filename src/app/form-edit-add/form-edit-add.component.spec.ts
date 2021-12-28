import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditAddComponent } from './form-edit-add.component';

describe('FormEditAddComponent', () => {
  let component: FormEditAddComponent;
  let fixture: ComponentFixture<FormEditAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
