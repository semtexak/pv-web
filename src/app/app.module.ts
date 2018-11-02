import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import { FixedHeaderDirective } from './shared/directive/fixed-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    FixedHeaderDirective
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
