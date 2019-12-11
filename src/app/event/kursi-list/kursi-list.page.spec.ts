import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KursiListPage } from './kursi-list.page';

describe('KursiListPage', () => {
  let component: KursiListPage;
  let fixture: ComponentFixture<KursiListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursiListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursiListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
