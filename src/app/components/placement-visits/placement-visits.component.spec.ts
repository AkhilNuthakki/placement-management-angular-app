import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementVisitsComponent } from './placement-visits.component';

describe('PlacementVisitsComponent', () => {
  let component: PlacementVisitsComponent;
  let fixture: ComponentFixture<PlacementVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementVisitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
