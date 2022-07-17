import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProfileSettingsComponent } from './dash-profile-settings.component';

describe('DashProfileSettingsComponent', () => {
  let component: DashProfileSettingsComponent;
  let fixture: ComponentFixture<DashProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashProfileSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
