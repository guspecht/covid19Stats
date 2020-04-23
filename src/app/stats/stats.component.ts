import { Component, OnInit } from '@angular/core';
import { StatsService } from './stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  countries: [];

  constructor( private statsService: StatsService) { }

  countryChosen;

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
      })
    }
  }
}
