import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementAddComponent } from './evenement-add.component';

describe('EvenementAddComponent', () => {
  let component: EvenementAddComponent;
  let fixture: ComponentFixture<EvenementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
