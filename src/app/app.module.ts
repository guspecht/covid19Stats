import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { StatsService } from './stats/stats.service';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards/cards.component';
import { CountUpModule } from 'ngx-countup';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CountUpModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
