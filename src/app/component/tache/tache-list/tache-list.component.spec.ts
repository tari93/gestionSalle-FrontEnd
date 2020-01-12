import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheListComponent } from './tache-list.component';

describe('TacheListComponent', () => {
  let component: TacheListComponent;
  let fixture: ComponentFixture<TacheListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacheListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
