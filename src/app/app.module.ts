import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { StatsService } from './stats/stats.service';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards/cards.component';
import { CountUpModule } from 'ngx-countup';
import { ChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    CardsComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CountUpModule,
    ChartsModule
  ],
  providers: [StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
