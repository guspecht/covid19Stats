import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment.prod"
import { Injectable } from '@angular/core';


const BACKEND_URL = environment.apiUrl;

@Injectable()
export class StatsService{
  constructor( private http:HttpClient){}


  getGlobal(){
    return this.http.get<{confirmed,recovered,deaths, lastUpdate}>(BACKEND_URL);
  }

  getCountries(){
    return this.http.get<{countries:[]}>(BACKEND_URL + "/countries");
  }

  getCountryInfo(countryName: String){
      return this.http.get<{confirmed,recovered,deaths, lastUpdate}>(BACKEND_URL + "/countries/" + countryName)
  }


}
