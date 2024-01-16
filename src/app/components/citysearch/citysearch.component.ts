import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['./citysearch.component.scss'],
})
export class CitysearchComponent {
  city: string = '';
  weatherData: any;

  constructor(private weatherSvc: WeatherService) {}

  onSearch(): void {
    this.weatherSvc.changeCity(this.city);
    this.weatherSvc.getCityWeather(this.city).subscribe((res) => {
      console.log(res);
      this.weatherData = res;
      console.log(this.weatherData);
    });
    // throw new Error('Method not implemented.');
  }
}
