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
  public hourlyForeCast = false;
  currentWeatherData;
  currentDate;
  forecastData;
  cityName;
  forecastFlag = 0;
  onClickSubmit(data) {
    this.http.get('http://api.wunderground.com/api/4bbbc25f4f5946dd/conditions/q/' + data.state + '/' + data.city + '.json').
    subscribe(respDataCondition => {
        this.loadMessage = false;
        this.currentWeatherData = respDataCondition;
        this.cityName = 'Current Weather Report in ' + respDataCondition['current_observation']['display_location']['city'];
        this.currentDate = Date.now();
        this.http.get('http://api.wunderground.com/api/36b799dc821d5836/hourly/q/' + data.state + '/' + data.city + '.json').
        subscribe((respData) => { this.forecastFlag = 1;
        this.forecastData = respData['hourly_forecast'];
      }, error => {});
    }, error => {});
  }
  ngOnInit() {
}

}
