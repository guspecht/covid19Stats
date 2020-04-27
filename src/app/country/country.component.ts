import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countryChosen;

  countries: [];
  barChartData;


  constructor( private countryService: CountryService) { }


  ngOnInit(){
    this.countryService.getCountries()
    .subscribe(AllCountries => {
      // console.log(AllCountries.countries)
      this.countries = AllCountries.countries;
    })


  }


  onChange(countryName:String){
    if(!(countryName === "choose")){
      this.countryService.getCountryInfo(countryName)
      .subscribe(countryData => {
        this.countryChosen = countryData;
        this.countryService.countryInfo.emit(this.countryChosen);



        this.countryService.getLatLong()
        .subscribe(data => {
          if(countryName == "Taiwan*"){
            countryName = "Taiwan";
          }
          this.countryService.countryLatLong.emit(data.countries.find( country => country.name == countryName));

             // get the information to fill the Chart
            // i have to call here otherwise the chart will be always 0!
          this.barChartData = [
            { data: [countryData.confirmed.value], label: 'Confirmed' },
            { data: [countryData.recovered.value], label: 'Recovered' },
            { data: [countryData.deaths.value], label: 'Deaths' }
          ];
          this.countryService.chartInfo.emit(this.barChartData)
        })

      })

    }
  }
}
