import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeessstttComponent } from './teesssttt.component';

describe('TeessstttComponent', () => {
  let component: TeessstttComponent;
  let fixture: ComponentFixture<TeessstttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeessstttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeessstttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
