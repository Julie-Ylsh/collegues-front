import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCollegueComponent } from './creer-collegue.component';

describe('CreerCollegueComponent', () => {
  let component: CreerCollegueComponent;
  let fixture: ComponentFixture<CreerCollegueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerCollegueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerCollegueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
