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
  timeFromSunrise: string = '';
  timeFromSunset: string = '';
  sunset: string = '';
  windspeed: string = '';
  // rain: number = 0;
  date: string = '';
  monthYear: string = '';
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconUrl: string = '';

  constructor(private weatherSvc: WeatherService) {}

  ngOnInit(): void {
    this.weatherSvc.currentCity.subscribe((city) => {
      if (city) {
        this.weatherSvc.getCityWeather(city).subscribe((res) => {
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
          let sunriseMinuti = sunriseData
            .getMinutes()
            .toString()
            .padStart(2, '0');
          this.sunrise = `${sunriseOra}:${sunriseMinuti}`;

          // Hours from Sunrise
          // Calcola la differenza in millisecondi

          let differenceSr = data.getTime() - sunriseData.getTime();

          // Converte la differenza in ore
          let differenceHoursSr = differenceSr / (1000 * 60 * 60);

          // Arrotonda alla seconda cifra decimale
          differenceHoursSr = Math.round(differenceHoursSr * 100) / 100;

          // Calcola le ore e i minuti trascorsi dall'alba
          let hoursSr = Math.floor(differenceHoursSr);
          let minutesSr = Math.round((differenceHoursSr - hoursSr) * 60);
          this.timeFromSunrise = `${hoursSr} hours and ${minutesSr} minutes ago`;

          // Sunset
          let sunsetTs = this.myWeather.sys.sunset;
          let sunsetData = new Date(sunsetTs * 1000);
          let sunsetOra = sunsetData.getHours();
          let sunsetMinuti = sunriseData
            .getMinutes()
            .toString()
            .padStart(2, '0');
          this.sunset = `${sunsetOra}:${sunsetMinuti}`;

          // Hours from Sunset
          let differenceSs = data.getTime() - sunsetData.getTime();
          let differenceHoursSs = differenceSs / (1000 * 60 * 60);
          differenceHoursSs = Math.round(differenceHoursSs * 100) / 100;

          // Calcola le ore e i minuti trascorsi dal tramonto
          let hoursSs = Math.floor(differenceHoursSs);
          let minutesSs = Math.round((differenceHoursSs - hoursSs) * 60);
          this.timeFromSunset = `${hoursSs} hours and ${minutesSs} minutes ago`;

          // Wind
          this.windspeed = `${(this.myWeather.wind.speed * 3.6).toFixed(
            1
          )} km/h`; // toFixed() di JavaScript per arrotondare un numero a un numero specifico di cifre decimali

          // Rain
          // let rainvalue = this.myWeather.precipitation.value;
          // this.rain = this.myWeather.precipitation.value;
          // console.log('ciao');

          // Data
          let today = new Date();
          let giorno = today.getDate();
          let giornoSettimana = today.getDay();
          let giorniSettimana = [
            'Domenica',
            'Lunedì',
            'Martedì',
            'Mercoledì',
            'Giovedì',
            'Venerdì',
            'Sabato',
          ];
          let giornoSettimanaNome = giorniSettimana[giornoSettimana];
          let mese = today.getMonth(); // I mesi iniziano da 0 in JavaScript
          let mesi = [
            'Gennaio',
            'Febbraio',
            'Marzo',
            'Aprile',
            'Maggio',
            'Giugno',
            'Luglio',
            'Agosto',
            'Settembre',
            'Ottobre',
            'Novembre',
            'Dicembre',
          ];
          let meseNome = mesi[mese];
          let anno = today.getFullYear();
          this.monthYear = `${meseNome} ${anno}`;
          this.date = `${giornoSettimanaNome}, ${giorno} ${meseNome}, ${anno}`;

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
    });
  }
}
