import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  private apiKey = '4f1d2dd3848f952428b4afd1cc36277b';

  // Imposta la città predefinita su 'Milano'
  private citySource = new BehaviorSubject<string>('Milano');
  currentCity = this.citySource.asObservable();

  constructor(private http: HttpClient) {}

  getCityWeather(cityName: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getHourlyForecast(cityName: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  // Cambia città di ricerca
  changeCity(city: string) {
    this.citySource.next(city);
  }
}
