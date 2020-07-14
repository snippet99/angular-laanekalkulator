import {  LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { LoanAppComponent } from './loanapp.component';
import { Term } from './term';
import localeNb from '@angular/common/locales/nb';
import { AdsenseModule } from 'ng2-adsense';

registerLocaleData(localeNb, 'nb');

@NgModule({
  imports:      [ BrowserModule, FormsModule,
  AdsenseModule.forRoot({
      adClient: 'ca-pub-4020578640432504',
      adSlot: 7259870550,
    }) ],
  declarations: [ LoanAppComponent ],
  providers: [ { provide: LOCALE_ID, useValue: 'nb' } ],
  bootstrap:    [ LoanAppComponent ]
})


export class AppModule { 
  
}
