import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the error message', ()=> {
    component.errorMessage = 'Testing Error Message';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain(component.errorMessage);
  });
});
