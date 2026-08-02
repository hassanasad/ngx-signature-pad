import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SignaturePad } from './ngx-signature-pad.component';

describe('NgxSignaturePadComponent', () => {
  let component: SignaturePad;
  let fixture: ComponentFixture<SignaturePad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignaturePad],
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

// Host that consumes the component exactly as a real app would: an output binding
// whose handler mutates state rendered in the template.
@Component({
  imports: [SignaturePad],
  template: `<signature-pad (onEndEvent)="strokes = strokes + 1"></signature-pad><span class="strokes">{{ strokes }}</span>`,
})
class HostComponent {
  strokes = 0;
}

describe('NgxSignaturePadComponent (zoneless)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('propagates output emissions to the consumer without Zone.js', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.strokes').textContent).toBe('0');

    // Simulate signature_pad firing its native `endStroke` event, which invokes onEnd()
    // and emits the output. No manual detectChanges(): the template output binding must
    // notify the zoneless scheduler on its own for the consumer's view to update.
    const pad = fixture.debugElement.query(By.directive(SignaturePad)).componentInstance as SignaturePad;
    pad.onEnd();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.strokes').textContent).toBe('1');
  });
});
