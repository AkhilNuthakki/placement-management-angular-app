import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementsListComponent } from './placements-list.component';

describe('PlacementsListComponent', () => {
  let component: PlacementsListComponent;
  let fixture: ComponentFixture<PlacementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
