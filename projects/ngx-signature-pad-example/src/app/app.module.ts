import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignaturePadModule } from 'ngx-signature-pad';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
