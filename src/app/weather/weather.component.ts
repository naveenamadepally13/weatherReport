//import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }
  currentweatherData;
  cityName;
  onClickSubmit(data) {
    this.http.get('http://api.wunderground.com/api/36b799dc821d5836/forecast/q/' + data.state + '/' + data.city + '.json').
    subscribe((respData) => this.weatherData(respData, data));
  }
  weatherData(respData, data) {
this.currentweatherData = respData.forecast.txt_forecast.forecastday[0];
this.cityName = data.city;
  }
  ngOnInit() {
    //this.http.get('http://api.wunderground.com/api/36b799dc821d5836/forecast/q/MO/Kansas City.json').
    //subscribe((respData) => this.weatherData(respData));
  }

}
