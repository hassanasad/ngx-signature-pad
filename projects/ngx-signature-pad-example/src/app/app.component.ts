import { Component, ChangeDetectionStrategy, viewChild, signal } from '@angular/core';
import { SignaturePad } from 'ngx-signature-pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AppComponent {
  title = 'ngx-signature-pad-example';

  readonly signaturePad = viewChild<SignaturePad>('signaturePad');

  readonly signature = signal<string | null>(null);
  readonly isTurnOn = signal<boolean | undefined>(undefined);

  readonly signaturePadOptions = { // passed through to szimek/signature_pad constructor
		minWidth    : 0.5,			 // Line size
		canvasWidth : 725,			 // Max width that can be used
		canvasHeight: 150,
	};


  drawComplete(): void {
    console.log('drawing complete');

    // To use signature image as data URL
    this.signature.set(this.signaturePad()?.toDataURL() ?? null);
	}


  clearSign(): void {
		this.signature.set(null);
		this.signaturePad()?.clear();
	}


  drawStart(): void {
    console.log('drawing began');
  }


  turnOn(): void {
    this.signaturePad()?.on();
    this.isTurnOn.set(true);
  }


  turnOff(): void {
    this.signaturePad()?.off();
    this.isTurnOn.set(false);
  }


  get isEmpty(): boolean {
    return this.signaturePad()?.isEmpty() ?? true;
  }

}
