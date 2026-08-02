import { NgModule } from '@angular/core';
import { SignaturePad } from './ngx-signature-pad.component';

// SignaturePad is a standalone component; this module is kept as a
// backwards-compatible re-export for consumers still importing SignaturePadModule.
@NgModule({
  imports: [SignaturePad],
  exports: [SignaturePad],
})
export class SignaturePadModule {}
