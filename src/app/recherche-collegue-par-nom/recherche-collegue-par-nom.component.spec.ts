import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCollegueParNomComponent } from './recherche-collegue-par-nom.component';

describe('RechercheCollegueParNomComponent', () => {
  let component: RechercheCollegueParNomComponent;
  let fixture: ComponentFixture<RechercheCollegueParNomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheCollegueParNomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheCollegueParNomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
