import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country/country.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  confirmed: String;
  recovered: String;
  deaths: String;
  update: String;

  recoveredPer;
  deathsPer;



  constructor(private countryService: CountryService) { }

  ngOnInit(){
      this.countryService.getGlobal()
      .subscribe(globalStats => {
        this.confirmed = globalStats.confirmed.value;
        this.recovered = globalStats.recovered.value;
        this.deaths = globalStats.deaths.value;
        this.recoveredPer = this.getPercent(this.recovered)
        this.deathsPer = this.getPercent(this.deaths)
        this.update = new Date(globalStats.lastUpdate).toDateString();
      })
  }

  getPercent(info){
    let per = (info * 100) / +this.confirmed;
    return Math.floor(per);
  }
}
