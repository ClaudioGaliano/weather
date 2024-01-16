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

          // Ottieni il fuso orario dalla tua API (in secondi)
          let timezone = this.myWeather.timezone;

          // Calcola il fuso orario in ore
          let timezoneInHours = timezone / 3600;

          // Aggiungi il fuso orario alla data UTC
          data.setUTCHours(data.getUTCHours() + timezoneInHours);

          // Estrai l'ora e i minuti
          let ora = data.getUTCHours();
          let minuti = data.getUTCMinutes().toString().padStart(2, '0'); // Aggiunge uno zero all'inizio se i minuti sono meno di 10

          // Imposta l'ora locale della città
          this.daytime = `${ora}:${minuti}`;

          // Sunrise
          let sunriseTs = this.myWeather.sys.sunrise;
          let sunriseData = new Date(sunriseTs * 1000);

          // Aggiungi il fuso orario alla data UTC
          sunriseData.setUTCHours(sunriseData.getUTCHours() + timezoneInHours);

          let sunriseHours = sunriseData.getUTCHours();
          let sunriseMinutes = sunriseData
            .getUTCMinutes()
            .toString()
            .padStart(2, '0');
          this.sunrise = `${sunriseHours}:${sunriseMinutes}`;

          // Hours from Sunrise
          let differenceSr = data.getTime() - sunriseData.getTime();

          let differenceHoursSr = differenceSr / (1000 * 60 * 60);
          differenceHoursSr = Math.round(differenceHoursSr * 100) / 100;

          // Calcola le ore e i minuti
          let hoursSr = Math.floor(Math.abs(differenceHoursSr));
          let minutesSr = Math.round(
            (Math.abs(differenceHoursSr) - hoursSr) * 60
          );

          // Controlla se la differenza è negativa
          if (differenceSr < 0) {
            // Se è negativa, l'alba è nel futuro
            this.timeFromSunrise = `In ${hoursSr} hours and ${minutesSr} minutes`;
          } else {
            // Se è positiva, l'alba è nel passato
            this.timeFromSunrise = `${hoursSr} hours and ${minutesSr} minutes ago`;
          }

          // Sunset
          let sunsetTs = this.myWeather.sys.sunset;
          let sunsetData = new Date(sunsetTs * 1000);

          // Aggiungi il fuso orario alla data UTC
          sunsetData.setUTCHours(sunsetData.getUTCHours() + timezoneInHours);

          let sunsetHours = sunsetData.getUTCHours();
          let sunsetMinutes = sunsetData
            .getUTCMinutes()
            .toString()
            .padStart(2, '0');
          this.sunset = `${sunsetHours}:${sunsetMinutes}`;

          // Hours from Sunset
          let differenceSs = data.getTime() - sunsetData.getTime();

          let differenceHoursSs = differenceSs / (1000 * 60 * 60);
          differenceHoursSs = Math.round(differenceHoursSs * 100) / 100;

          // Calcola le ore e i minuti
          let hoursSs = Math.floor(Math.abs(differenceHoursSs));
          let minutesSs = Math.round(
            (Math.abs(differenceHoursSs) - hoursSs) * 60
          );

          // Controlla se la differenza è negativa
          if (differenceSs < 0) {
            // Se è negativa, il tramonto è nel futuro
            this.timeFromSunset = `In ${hoursSs} hours and ${minutesSs} minutes`;
          } else {
            // Se è positiva, il tramonto è nel passato
            this.timeFromSunset = `${hoursSs} hours and ${minutesSs} minutes ago`;
          }

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
