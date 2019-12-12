import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KursiDetailPage } from './kursi-detail.page';

describe('KursiDetailPage', () => {
  let component: KursiDetailPage;
  let fixture: ComponentFixture<KursiDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KursiDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KursiDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
