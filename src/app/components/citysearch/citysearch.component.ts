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
  iconUrl: string = '';

  constructor(private weatherSvc: WeatherService) {}

  onSearch(): void {
    this.weatherSvc.getCityWeather(this.city).subscribe((res) => {
      console.log(res);
      this.weatherData = res;
      let icon = this.weatherData.weather[0].icon;
      this.iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      console.log(this.weatherData);
    });
    // throw new Error('Method not implemented.');
  }
}
