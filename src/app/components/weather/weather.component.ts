import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/interfaces/weather-data';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  myWeather: any;

  city: string = '';
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconUrl: string = '';

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    this.weatherSvc.getWeather(this.city).subscribe((res) => {
      console.log(res);
      this.myWeather = res;
      this.city = this.myWeather.name;
      this.temperature = this.myWeather.main.temp;
      this.feelsLikeTemp = this.myWeather.main.feels_like;
      this.humidity = this.myWeather.main.humidity;
      this.pressure = this.myWeather.main.pressure;
      this.summary = this.myWeather.weather[0].main;
      let icon = this.myWeather.weather[0].icon;
      this.iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      console.log(this.myWeather);
    });
    // throw new Error('Method not implemented.');
  }
}
