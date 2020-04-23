import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { StatsService } from './stats/stats.service';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
