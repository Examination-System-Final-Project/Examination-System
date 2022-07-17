import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewGroupsComponent } from './preview-groups.component';

describe('PreviewGroupsComponent', () => {
  let component: PreviewGroupsComponent;
  let fixture: ComponentFixture<PreviewGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
