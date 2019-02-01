// import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }
  public loadMessage = true;
  public errorMessage = false;
  public showWeather = false;
  public hourlyForeCast = false;
  currentweatherData;
  time;
  icon_url;
  forecastData;
  cityName;
  forecastFlag = 0;
  onClickSubmit(data) {
    this.http.get('http://api.wunderground.com/api/4bbbc25f4f5946dd/conditions/q/' + data.state + '/' + data.city + '.json').
    subscribe((respDataCondition) => this.weatherDataCondition(respDataCondition));
    this.http.get('http://api.wunderground.com/api/36b799dc821d5836/hourly/q/' + data.state + '/' + data.city + '.json').
    subscribe((respData) => this.weatherData(respData));
    this.forecastFlag = 1;
  }
  weatherDataCondition(respDataCondition) {
    if (!respDataCondition.hasOwnProperty('current_observation')) {
      this.loadMessage = false;
      this.errorMessage = true;
      this.showWeather = false;
    } else {this.loadMessage = false;
      this.showWeather = true;
      this.errorMessage = false;
      this.currentweatherData = respDataCondition.current_observation;
      this.cityName = 'Current Weather Report in ' + respDataCondition.current_observation.display_location.city;
    }
  }
  weatherData(respData) {
    if (!respData.hasOwnProperty('hourly_forecast')) {
      this.loadMessage = false;
      this.errorMessage = true;
      this.hourlyForeCast = false;
    } else {
      this.hourlyForeCast = true;
      this.loadMessage = false;
      this.errorMessage = false;
      this.forecastData = respData.hourly_forecast;
    }
    }
  ngOnInit() {
  }
}
