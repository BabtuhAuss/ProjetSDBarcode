import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProduitPage } from './edit-produit.page';

describe('EditProduitPage', () => {
  let component: EditProduitPage;
  let fixture: ComponentFixture<EditProduitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProduitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
