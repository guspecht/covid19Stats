import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  countryChosen;

  countries: [];
  barChartData;


  constructor( private statsService: StatsService) { }


  ngOnInit(){
    this.statsService.getCountries()
    .subscribe(AllCountries => {
      // console.log(AllCountries.countries)
      this.countries = AllCountries.countries;
    })


  }


  onChange(countryName:String){
    if(!(countryName === "choose")){
      this.statsService.getCountryInfo(countryName)
      .subscribe(countryData => {
        this.countryChosen = countryData;
        this.statsService.countryInfo.emit(this.countryChosen);



        this.statsService.getLatLong()
        .subscribe(data => {
          if(countryName == "Taiwan*"){
            countryName = "Taiwan";
          }
          this.statsService.countryLatLong.emit(data.countries.find( country => country.name == countryName));

             // get the information to fill the Chart
            // i have to call here otherwise the chart will be always 0!
          this.barChartData = [
            { data: [countryData.confirmed.value], label: 'Confirmed' },
            { data: [countryData.recovered.value], label: 'Recovered' },
            { data: [countryData.deaths.value], label: 'Deaths' }
          ];
          this.statsService.chartInfo.emit(this.barChartData)
        })

      })

    }
  }
}
