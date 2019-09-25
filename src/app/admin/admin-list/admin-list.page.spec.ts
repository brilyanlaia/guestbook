import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListPage } from './admin-list.page';

describe('AdminListPage', () => {
  let component: AdminListPage;
  let fixture: ComponentFixture<AdminListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
