import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlacementsMapViewComponent } from './placements-map-view.component';

describe('PlacementsMapViewComponent', () => {
  let component: PlacementsMapViewComponent;
  let fixture: ComponentFixture<PlacementsMapViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlacementsMapViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacementsMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
