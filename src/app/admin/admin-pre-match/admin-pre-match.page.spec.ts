import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPreMatchPage } from './admin-pre-match.page';

describe('AdminPreMatchPage', () => {
  let component: AdminPreMatchPage;
  let fixture: ComponentFixture<AdminPreMatchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
