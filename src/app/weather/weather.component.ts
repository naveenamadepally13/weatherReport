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
    subscribe((respDataCondition) => this.weatherDataCondition(respDataCondition, data));
    this.http.get('http://api.wunderground.com/api/36b799dc821d5836/forecast/q/' + data.state + '/' + data.city + '.json').
    subscribe((respData) => this.weatherData(respData, data));
    this.forecastFlag = 1;
  }
  weatherDataCondition(respDataCondition, data) {
    if (!respDataCondition.hasOwnProperty('current_observation')) {
      this.loadMessage = false;
      this.errorMessage = true;
      this.showWeather = false;
    } else {this.loadMessage = false;
      this.showWeather = true;
      this.errorMessage = false;
    this.currentweatherData = respDataCondition.current_observation;
      /*'Current weather in city is Temperature:' + respDataCondition.current_observation.temperature_string +
      ' Pressure:' + respDataCondition.current_observation.pressure_mb + ' Wind:' + respDataCondition.current_observation.wind_string;*/
    this.cityName = 'Current Weather Report in ' + respDataCondition.current_observation.display_location.city;
    }
  }
  weatherData(respData, data) {
    if (!respData.hasOwnProperty('forecast')) {
      this.loadMessage = false;
      this.errorMessage = true;
      this.hourlyForeCast = false;
    } else { this.hourlyForeCast = true;
      this.loadMessage = false;
      this.errorMessage = false;
      this.forecastData = respData.forecast.txt_forecast.forecastday;
    }

  }
  ngOnInit() {
    // this.http.get('http://api.wunderground.com/api/36b799dc821d5836/forecast/q/MO/Kansas City.json').
    // subscribe((respData) => this.weatherData(respData));
  }

}
