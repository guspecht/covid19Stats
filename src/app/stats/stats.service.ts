import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment.prod"
import { Injectable, EventEmitter } from '@angular/core';


const BACKEND_URL = environment.apiUrl;

@Injectable()
export class StatsService{
  constructor( private http:HttpClient){}
  countries: [];
  country;

  countryLatLong = new EventEmitter();
  countryInfo = new EventEmitter();

  getGlobal(){
    return this.http.get<{confirmed,recovered,deaths, lastUpdate}>(BACKEND_URL);
  }

  getCountries(){
    return this.http.get<{countries:[]}>(BACKEND_URL + "/countries");
  }

  getCountryInfo(countryName: String){
      return this.http.get<{confirmed,recovered,deaths, lastUpdate}>(BACKEND_URL + "/countries/" + countryName)
  }

  getLatLong(){
    return this.http.get<{countries}>("assets/maps.json");
  }


}
