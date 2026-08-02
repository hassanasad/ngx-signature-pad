# Forked Project
THIS IS A FORKED PROJECT FROM THE ORIGINAL REPO

# ngx-signature-pad
Angular component for [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

## Install
`npm install @viablelogic/ngx-signature-pad`

## Compatibility

Supports Angular 18–22. The component uses `OnPush` change detection with signal-based
`input()`/`output()` and has no dependency on `zone.js`, so it works in both zone-based and
[zoneless](https://angular.dev/guide/zoneless) applications (`provideZonelessChangeDetection()`).

## Reference Implementation

* [Live Demo](http://lathonez.com/angular2-signaturepad-demo/)
* [Source](https://github.com/lathonez/angular2-signaturepad-demo)

## Usage example

API is identical to [szimek/signature_pad](https://www.npmjs.com/package/signature_pad).

Options are as per [szimek/signature_pad](https://www.npmjs.com/package/signature_pad) with the following additions:
* canvasWidth: width of the canvas (px)
* canvasHeight: height of the canvas (px)
The above options are provided to avoid accessing the DOM directly from your component to adjust the canvas size.

Add `SignaturePadModule` to a standalone component's `imports` (Angular's
default), then query the component with a signal-based `viewChild()`:

```typescript
import { AfterViewInit, Component, viewChild } from '@angular/core';
import { SignaturePad, SignaturePadModule } from '@viablelogic/ngx-signature-pad';

@Component({
  selector: 'app-sign',
  imports: [SignaturePadModule],
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

> **NgModule-based apps:** instead of a standalone component, add
> `SignaturePadModule` to your `@NgModule({ imports: [...] })` and declare the
> component there. If you prefer the classic decorator query, `@ViewChild(SignaturePad)`
> still works — the signal `viewChild()` above is just the current idiom.
