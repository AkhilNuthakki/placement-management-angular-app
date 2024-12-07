import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessageComponent } from './success-message.component';

describe('SuccessMessageComponent', () => {
  let component: SuccessMessageComponent;
  let fixture: ComponentFixture<SuccessMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the success message', ()=> {
    component.successMessage = 'Testing Success Message';
    fixture.detectChanges();
    const h5 = fixture.nativeElement.querySelector('h5');
    expect(h5.textContent).toContain(component.successMessage);
  });
});
