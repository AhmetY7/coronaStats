import { Component, OnInit, NgZone } from '@angular/core';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';
import { ApiService } from '../services/api.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css']
})
export class CircularComponent implements OnInit {
  
  countriesTotal: StatsDaily[];
  countries: Country[];
  wordlTotal: StatsDaily;
  percent: number[] = [];

  private chart:am4charts.PieChart;

  constructor(private apiService : ApiService, private zone:NgZone) {}

  

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.apiService.getCountryTotal().subscribe((data) => {
      this.countriesTotal = data;
      this.apiService.getWorldTotal().subscribe((data2) => {
        this.wordlTotal = data2;
        this.getPercent();
        this.apiService.getCountries().subscribe((data3) => {
          this.countries = data3;
          this.zone.runOutsideAngular(() => {
            let chart = am4core.create("chartdivv", am4charts.PieChart);
      
            let pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "litres";
            pieSeries.dataFields.category = "country";
      
            chart.innerRadius = am4core.percent(40);
      
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template
            
            pieSeries.alignLabels = false;
            pieSeries.labels.template.bent = true;
            pieSeries.labels.template.radius = 8;
            pieSeries.labels.template.padding(0,0,0,0);
      
            pieSeries.ticks.template.disabled = true;
      
            let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
            shadow.opacity = 0;
      
            let hoverState = pieSeries.slices.template.states.getKey("hover");
      
            let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
            hoverShadow.opacity = 0.7;
            hoverShadow.blur = 5;
      
            chart.legend = new am4charts.Legend();
            
            let jsonData = [{"country":this.countries[this.countriesTotal[0].countryId-1].name, "litres":this.percent[0]},
            {"country":this.countries[this.countriesTotal[1].countryId-1].name, "litres":this.percent[1]},
            {"country":this.countries[this.countriesTotal[2].countryId-1].name, "litres":this.percent[2]},
            {"country":this.countries[this.countriesTotal[3].countryId-1].name, "litres":this.percent[3]},
            {"country":this.countries[this.countriesTotal[4].countryId-1].name, "litres":this.percent[4]},
            {"country":"Diğer", "litres":this.percent[5]}
          ];

            chart.data = jsonData;
            
            this.chart = chart;
          });
        });
      });    
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if(this.chart) {
        this.chart.dispose();
      }
    });
  }

  getPercent() {
    this.percent.push(
      this.countriesTotal[0].infected
    );
    this.percent.push( 
      this.countriesTotal[1].infected
    );
    this.percent.push(
      this.countriesTotal[2].infected
    );
    this.percent.push(
      this.countriesTotal[3].infected
    );
    this.percent.push(
      this.countriesTotal[4].infected
    );
    this.percent.push(
        this.wordlTotal.infected -
        this.percent[0] -
        this.percent[1] -
        this.percent[2] -
        this.percent[3] -
        this.percent[4]
    );
  }
}
