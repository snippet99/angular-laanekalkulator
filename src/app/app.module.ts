import {  LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { LoanAppComponent } from './loanapp.component';
import { Term } from './term';
import localeNb from '@angular/common/locales/nb';

registerLocaleData(localeNb, 'nb');

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ LoanAppComponent ],
  providers: [ { provide: LOCALE_ID, useValue: 'nb' } ],
  bootstrap:    [ LoanAppComponent ]
})


export class AppModule { 
  
}
