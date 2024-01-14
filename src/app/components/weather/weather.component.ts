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
  country: string = '';
  daytime: string = '';
  sunrise: string = '';
  sunset: string = '';
  windspeed: string = '';
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
      this.country = this.myWeather.sys.country;

      // Conversione del timestamp Unix
      let timestamp = this.myWeather.dt;
      let data = new Date(timestamp * 1000);
      let ora = data.getHours();
      let minuti = data.getMinutes().toString().padStart(2, '0'); // Aggiunge uno zero all'inizio se i minuti sono meno di 10
      this.daytime = `${ora}:${minuti}`;

      // Sunrise
      let sunriseTs = this.myWeather.sys.sunrise;
      let sunriseData = new Date(sunriseTs * 1000);
      let sunriseOra = sunriseData.getHours();
      let sunriseMinuti = sunriseData.getMinutes().toString().padStart(2, '0');
      this.sunrise = `${sunriseOra}:${sunriseMinuti}`;

      // Sunset
      let sunsetTs = this.myWeather.sys.sunset;
      let sunsetData = new Date(sunsetTs * 1000);
      let sunsetOra = sunsetData.getHours();
      let sunsetMinuti = sunriseData.getMinutes().toString().padStart(2, '0');
      this.sunset = `${sunsetOra}:${sunsetMinuti}`;

      // Wind
      let windspeed_ms = this.myWeather.wind.speed;
      let windspeed_km = windspeed_ms * 3.6;
      this.windspeed = `${windspeed_km.toFixed(1)} km/h`; // toFixed() di JavaScript per arrotondare un numero a un numero specifico di cifre decimali

      this.temperature = this.myWeather.main.temp;
      this.feelsLikeTemp = this.myWeather.main.feels_like;
      this.humidity = this.myWeather.main.humidity;
      this.pressure = this.myWeather.main.pressure;
      this.summary = this.myWeather.weather[0].main;
      let icon = this.myWeather.weather[0].icon;
      this.iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    });
    // throw new Error('Method not implemented.');
  }
}
