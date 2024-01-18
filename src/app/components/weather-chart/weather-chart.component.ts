import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss'],
})
export class WeatherChartComponent implements OnInit {
  myChart!: Chart;
  myWeather: any;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    // Crea un grafico vuoto
    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperature',
            data: [],
            // ...
          },
        ],
      },
      // ...
    });

    this.weatherService.currentCity.subscribe((city) => {
      this.weatherService.getHourlyForecast(city).subscribe((forecast: any) => {
        this.myWeather = forecast;

        // RILEVAZIONE PROSSIMI 5 GIORNI
        // Calcola l'ora di previsione più vicina all'ora corrente
        // let oraCorrente = new Date().getHours();
        // let oraPrevista = Math.ceil(oraCorrente / 3) * 3;
        // if (oraPrevista >= 24) oraPrevista = 0; // Se supera la mezzanotte, reimposta a 0

        // // Filtra i dati di previsione per quelli che corrispondono all'ora prevista
        // let previsioniFiltrate = forecast.list.filter((h: any) => {
        //   let oraPrevisione = new Date(h.dt_txt).getHours();
        //   return oraPrevisione === oraPrevista;
        // });

        // // Prendi solo le prime 5 previsioni (per i prossimi 5 giorni)
        // previsioniFiltrate = previsioniFiltrate.slice(0, 5);

        // // Estrai le etichette e i dati del grafico
        // let labels = previsioniFiltrate.map((h: any) =>
        //   new Date(h.dt_txt).toLocaleString()
        // );
        // let dataChart = previsioniFiltrate.map((h: any) => h.main.temp);

        // RILEVAZIONE PROSSIME 8 PREVISIONI
        // Elabora la risposta per ottenere i dati
        // let labels = forecast.list
        //   .slice(0, 8)
        //   .map((h: any) => new Date(h.dt * 1000).toLocaleString());
        // let dataChart = forecast.list.slice(0, 8).map((h: any) => h.main.temp);
        // console.log(forecast.list);
        // console.log(labels);

        // RILEVAZIONE 24H
        // Ottieni l'ora corrente e calcola l'ora di previsione più vicina
        let oraCorrente = new Date();
        let oraPrevista = Math.ceil(oraCorrente.getHours() / 3) * 3;
        oraCorrente.setHours(oraPrevista, 0, 0, 0); // Imposta l'ora corrente all'ora di previsione più vicina

        // Calcola il timestamp per le prossime 24 ore
        let oraFutura = new Date(oraCorrente.getTime() + 24 * 60 * 60 * 1000);

        // Filtra i dati di previsione per quelli che sono tra l'ora corrente e l'ora futura
        let previsioniFiltrate = forecast.list.filter((h: any) => {
          let dataPrevisione = new Date(h.dt_txt);
          return dataPrevisione >= oraCorrente && dataPrevisione <= oraFutura;
        });

        // Estrai le etichette e i dati del grafico
        let labels = previsioniFiltrate.map((h: any) =>
          new Date(h.dt_txt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        let dataChart = previsioniFiltrate.map((h: any) => h.main.temp);

        // Aggiorna i dati del grafico
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = dataChart;
        this.myChart.update();

        console.log('forecast', forecast);
      });
    });
  }
}
