import { Component, OnInit, DoCheck } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { StatsService } from '../stats/stats.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartLabels: Label[] = ['2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
     {backgroundColor:'#007BFF'},
     {backgroundColor:'#28A745'},
     {backgroundColor:'#DC3545'}
    ];
    public barChartData: ChartDataSets[] = [
      { data: [0], label: 'Confirmed' },
      { data: [0], label: 'Recovered' },
      { data: [0], label: 'Deaths' }
    ];


  constructor( private statsService: StatsService) {
  }

  ngOnInit() {

    // Subscribing to get the information
    this.statsService.chartInfo
    .subscribe(charInformation => {
      this.barChartData = charInformation;
    })

  }




}
