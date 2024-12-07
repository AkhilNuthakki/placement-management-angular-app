import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationRequestFormComponent } from './authorization-request-form.component';

describe('AuthorizationRequestFormComponent', () => {
  let component: AuthorizationRequestFormComponent;
  let fixture: ComponentFixture<AuthorizationRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationRequestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
