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

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
     {backgroundColor:'#007BFF'},
     {backgroundColor:'#28A745'},
     {backgroundColor:'#DC3545'}
    ];

  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Confirmed' },
    { data: [0], label: 'Recovered' },
    { data: [0], label: 'Deaths' }
  ];

  countries: [];



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

        this.barChartData = [
          { data: [countryData.confirmed.value], label: 'Confirmed' },
          { data: [countryData.recovered.value], label: 'Recovered' },
          { data: [countryData.deaths.value], label: 'Deaths' }
        ];

        this.statsService.getLatLong()
        .subscribe(data => {
          if(countryName == "Taiwan*"){
            countryName = "Taiwan";
          }
          this.statsService.countryLatLong.emit(data.countries.find( country => country.name == countryName));
        })

      })

    }
  }
}
