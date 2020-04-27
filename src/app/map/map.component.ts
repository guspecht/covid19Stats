import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment.prod';
import { StatsService } from '../stats/stats.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit{

  token = environment.mapApiToken;
  // https://account.mapbox.com/access-tokens/
  constructor( private statsService: StatsService) { }

  mymap;
  lat = 0;
  long = 0;
  confirmed = 0;
  recovered = 0;
  deaths = 0;

  ngOnInit(){


    this.mymap = L.map('mapid').setView([-15,-47], 3);

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${environment.mapApiToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 3,
      minZoom: 2,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: `${environment.mapApiToken}`
      }).addTo(this.mymap);

      this.statsService.countryLatLong
      .subscribe(
        countryData =>{
          this.lat = countryData.latitude;
          this.long = countryData.longitude;

            // get the information to fill the map
            // i have to call before i make the marker otherwise the market will be always 0!
            this.statsService.getCountryInfo(countryData.name)
            .subscribe(countryInfo => {
              this.confirmed = countryInfo.confirmed.value;
              this.recovered = countryInfo.recovered.value;
              this.deaths = countryInfo.deaths.value;

              L.marker([this.lat, this.long]).addTo(this.mymap)
              .bindPopup(`
              <h4>${countryData.name}</h4>
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Confirmed:
                  <span class="badge badge-primary badge-pill">${this.confirmed}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Recovered:
                  <span class="badge badge-success badge-pill">${this.recovered}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Deaths:
                  <span class="badge badge-danger badge-pill">${this.deaths}</span>
                </li>
              </ul>
              `).openPopup();
            })
        }
      );


    }










}
