import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  private apiKey = '4f1d2dd3848f952428b4afd1cc36277b';
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Milano&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getCityWeather(cityName: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
