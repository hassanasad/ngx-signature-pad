import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePad } from './ngx-signaturepad.component';

describe('NgxSignaturepadComponent', () => {
  let component: SignaturePad;
  let fixture: ComponentFixture<SignaturePad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignaturePad],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
