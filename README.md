# Forked Project
THIS IS A FORKED PROJECT FROM THE ORIGINAL REPO

# ngx-signature-pad
Angular component for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

## Install
`npm install @viablelogic/ngx-signature-pad`

## Reference Implementation

* [Live Demo](http://lathonez.com/angular2-signaturepad-demo/)
* [Source](https://github.com/lathonez/angular2-signaturepad-demo)

## Usage example

API is identical to [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

Options are as per [szimek/signature_pad](https://www.npmjs.com/package/signature_pad) with the following additions:
* canvasWidth: width of the canvas (px)
* canvasHeight: height of the canvas (px)
The above options are provided to avoid accessing the DOM directly from your component to adjust the canvas size.

`SignaturePad` is a standalone component — add it to your component's
`imports`, then query it with a signal-based `viewChild()`:

```typescript
import { AfterViewInit, Component, viewChild } from '@angular/core';
import { SignaturePad } from '@viablelogic/ngx-signature-pad';

@Component({
  selector: 'app-sign',
  imports: [SignaturePad],
  template: `
    <signature-pad
      [options]="signaturePadOptions"
      (onBeginEvent)="drawStart()"
      (onEndEvent)="drawComplete()">
    </signature-pad>
  `,
})
export class SignaturePadPage implements AfterViewInit {

  // Signal-based view query — read it by calling the signal: this.signaturePad()
  readonly signaturePad = viewChild<SignaturePad>(SignaturePad);

  signaturePadOptions = { // passed through to the szimek/signature_pad constructor
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 300,
  };

  ngAfterViewInit(): void {
    // the query is resolved once the view has initialized
    this.signaturePad()?.set('minWidth', 5); // set a signature_pad option at runtime
    this.signaturePad()?.clear();             // call any signature_pad API method
  }

  drawComplete(): void {
    // notified of signature_pad's onEnd event
    console.log(this.signaturePad()?.toDataURL());
  }

  drawStart(): void {
    // notified of signature_pad's onBegin event
    console.log('begin drawing');
  }
}
```

> **NgModule-based apps:** add `SignaturePad` (or the back-compat
> `SignaturePadModule`) to your `@NgModule({ imports: [...] })`. If you prefer the
> classic decorator query, `@ViewChild(SignaturePad)` still works — the signal
> `viewChild()` above is just the current idiom.
