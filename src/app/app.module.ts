import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CountryComponent } from './country/country.component';
import { CountryService } from './country/country.service';
import { HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards/cards.component';
import { CountUpModule } from 'ngx-countup';
import { ChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    CardsComponent,
    MapComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CountUpModule,
    ChartsModule
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
