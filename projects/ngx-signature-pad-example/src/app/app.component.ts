import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'ngx-signature-pad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngx-signature-pad-example';

  @ViewChild('signaturePad') signaturePad: SignaturePad;

  signature: string;
  isTurnOn : boolean;

  readonly signaturePadOptions = { // passed through to szimek/signature_pad constructor
		minWidth    : 0.5,			 // Line size
		canvasWidth : 725,			 // Max width that can be used
		canvasHeight: 150,
	};


  drawComplete(): void {
    console.log('drawing complete');

    // To use signature image as data URL
    this.signature = this.signaturePad?.toDataURL();
	}


  clearSign(): void {
		this.signature = null;
		this.signaturePad?.clear();
	}


  drawStart(): void {
    console.log('drawing began');
  }


  turnOn(): void {
    this.signaturePad?.on();
    this.isTurnOn = true;
  }


  turnOff(): void {
    this.signaturePad?.off();
    this.isTurnOn = false;
  }


  get isEmpty(): boolean {
    return this.signaturePad?.isEmpty();
  }

}
