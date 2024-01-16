import { Component, OnInit } from '@angular/core';ng add ng2-charts
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
            label: 'Temperatura',
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
        // Elabora la risposta per ottenere i dati di cui hai bisogno
        let labels = forecast.list
          .slice(0, 8)
          .map((h: any) => new Date(h.dt * 1000).toLocaleString());
        let data = forecast.list.slice(0, 8).map((h: any) => h.main.temp);

        // Aggiorna i dati del grafico
        this.myChart.data.labels = labels;
        this.myChart.data.datasets[0].data = data;
        this.myChart.update();

        console.log('forecast', forecast);
      });
    });
  }
}
