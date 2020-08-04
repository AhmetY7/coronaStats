import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';
import { ApiService } from '../services/api.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";

import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css'],
})
export class WorldMapComponent implements OnInit {
  @ViewChild("chartTimeLine") chartTimeLine: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor(
    private apiService: ApiService,
    private zone: NgZone,
  ) {
    this.currentCountry.name = 'Dünya Geneli';
    this.currentCountry.id = 0;
    
  }

  countriesTotal: StatsDaily[];
  countries: Country[];
  wordlTotal: StatsDaily;
  countriesDays: StatsDaily[];
  worldDays: StatsDaily[];
  activeCase:number;

  currentStats: StatsDaily = new StatsDaily();
  currentDays: StatsDaily[];
  currentCountry:Country = new Country();

  private chart: am4maps.MapChart;
  polygonTemplate:any;
  polygonSeries:any;
  lastSelected:am4maps.MapObject;

  ngOnInit(): void {
    am4core.useTheme(am4themes_animated);
    this.apiService.getCountryTotal().subscribe((data) => {
      this.countriesTotal = data;
      this.apiService.getCountries().subscribe((data2) => {
        this.countries = data2;
        this.apiService.getWorldTotal().subscribe((data3) => {
          this.wordlTotal = data3;
          this.currentStats.id = data3.id;
          this.currentStats.countryId = data3.countryId;
          this.currentStats.date = data3.date;
          this.currentStats.infected = data3.infected;
          this.currentStats.death = data3.death;
          this.currentStats.recovered = data3.recovered;

            let chart = am4core.create('chartdiv', am4maps.MapChart);
            chart.geodata = am4geodata_worldLow;
            
            chart.projection = new am4maps.projections.Miller();

            this.polygonSeries = chart.series.push(
              new am4maps.MapPolygonSeries()
            );

            this.polygonSeries.useGeodata = true;

            this.polygonTemplate = this.polygonSeries.mapPolygons.template;
            this.polygonTemplate.togglable = true;
            //polygonTemplate.tooltipText = "{name}";
            this.polygonTemplate.strokeOpacity = 0.6;

            let hs = this.polygonTemplate.states.create('hover');
            hs.properties.fill = chart.colors.getIndex(0);

            
            
            let selectMethod = this;
            
            this.polygonTemplate.events.on('hit', function (ev) {
              if (selectMethod.lastSelected) {
                selectMethod.lastSelected.isActive = false;
              }
              ev.target.series.chart.zoomToMapObject(ev.target);
              if (selectMethod.lastSelected !== ev.target) {
                selectMethod.lastSelected = ev.target;
                selectMethod.lastSelected.isActive = true;
                for(let i=0; i<selectMethod.countries.length;i++) {
                  if(selectMethod.lastSelected.cloneId == selectMethod.polygonSeries.getPolygonById(selectMethod.countries[i].code).cloneId) {
                    selectMethod.onOptionsSelected(i+1);
                    break;
                  }
                }
              }
            });

            let ss = this.polygonTemplate.states.create('active');
            ss.properties.fill = chart.colors.getIndex(0);

            this.polygonSeries.exclude = ['AQ'];

            chart.smallMap = new am4maps.SmallMap();
            chart.smallMap.align = "right";
            chart.smallMap.valign = "top";
            chart.smallMap.series.push(this.polygonSeries);

            chart.zoomControl = new am4maps.ZoomControl();
            
            let homeButton = new am4core.Button();
            homeButton.events.on('hit', function () {
              chart.goHome();
              if(selectMethod.lastSelected){
                selectMethod.lastSelected.isActive = false;
              }
              selectMethod.onOptionsSelected(0);
            });

            homeButton.icon = new am4core.Sprite();
            homeButton.padding(7, 5, 7, 5);
            homeButton.width = 30;
            homeButton.icon.path =
              'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
            homeButton.marginBottom = 10;
            homeButton.parent = chart.zoomControl;
            homeButton.insertBefore(chart.zoomControl.plusButton);
            

            let imageSeries = chart.series.push(new am4maps.MapImageSeries());
            imageSeries.mapImages.template.propertyFields.longitude =
              'longitude';
            imageSeries.mapImages.template.propertyFields.latitude = 'latitude';
            imageSeries.mapImages.template.tooltipText = '{title}';
            imageSeries.mapImages.template.propertyFields.url = 'url';

            let circle = imageSeries.mapImages.template.createChild(
              am4core.Circle
            );
            circle.radius = 2;
            circle.propertyFields.fill = 'color';

            let circle2 = imageSeries.mapImages.template.createChild(
              am4core.Circle
            );
            circle2.radius = 2;
            circle2.propertyFields.fill = 'color';

            circle2.events.on('inited', function (event) {
              animateBullet(event.target);
            });

            function animateBullet(circle) {
              let animation = circle.animate(
                [
                  { property: 'scale', from: 1, to: 2 },
                  { property: 'opacity', from: 1, to: 0 },
                ],
                1000,
                am4core.ease.circleOut
              );
              animation.events.on('animationended', function (event) {
                animateBullet(event.target.object);
              });
            }

            let colorSet = new am4core.ColorSet();
            for (let i = 0; i < this.countries.length; i++) {
              if(i < this.countriesTotal.length) {
                imageSeries.data.push({
                  title: this.countries[this.countriesTotal[i].countryId-1].name + ": Vaka: " + this.countriesTotal[i].infected + " Ölüm: " + this.countriesTotal[i].death + " İyileşen: " + this.countriesTotal[i].recovered,
                  color: colorSet.next(),
                  latitude: this.countries[this.countriesTotal[i].countryId-1].latitude,
                  longitude: this.countries[this.countriesTotal[i].countryId-1].longitude,
                });
              } else {
                let inIt:boolean = false;
                for(let j=0;j<this.countriesTotal.length;j++) {
                  if(i == this.countriesTotal[j].countryId){
                    inIt = true;
                    break;
                  }
                }
                if(!inIt) {
                  imageSeries.data.push({
                    title: this.countries[i].name + ": Henüz Bilgi Girilmedi!",
                    color: colorSet.next(),
                    latitude: this.countries[i].latitude,
                    longitude: this.countries[i].longitude,
                  });
                }
                
              }
            }
            
            this.activeCase = this.currentStats.infected - (this.currentStats.death + this.currentStats.recovered);
            this.chart = chart;
        });
      });
    });
    

    this.apiService.getWorldDays().subscribe((data) => {
      this.worldDays = data;
      this.currentDays = data;
      this.apiService.getCountriesDays().subscribe((data2) => {
        this.countriesDays = data2;
        this.timeLineData();
      });
    }); 
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  timeLineData() {
    let dataInfected:number[] = [];
    let dataDeath:number[] = [];
    let dataRecovered:number[] = [];
    let dataDate:Date[] = [];
    let dataActive:number[] = [];
    let maxLimit:number;
    if(this.currentCountry.id == 0) {
      for(let i=0; i<this.worldDays.length; i++) {
        dataInfected.push(this.worldDays[i].infected);
        dataDeath.push(this.worldDays[i].death);
        dataRecovered.push(this.worldDays[i].recovered);
        dataDate.push(this.worldDays[i].date);
        dataActive.push(this.worldDays[i].infected - (this.worldDays[i].death + this.worldDays[i].recovered));
        maxLimit = this.worldDays[this.worldDays.length-1].infected;
      }
    } else {
      for(let i=0; i<this.countriesDays.length; i++) {
        if(this.countriesDays[i].countryId == this.currentCountry.id) {
          dataInfected.push(this.countriesDays[i].infected);
          dataDeath.push(this.countriesDays[i].death);
          dataRecovered.push(this.countriesDays[i].recovered);
          dataDate.push(this.countriesDays[i].date);
          dataActive.push(this.countriesDays[i].infected - (this.countriesDays[i].death + this.countriesDays[i].recovered));
          maxLimit = this.countriesDays[i].infected;
        }
      }
    }
    this.chartOptions = {
      series: [
        {
          name: "Toplam Vaka",
          data: dataInfected
        },
        {
          name: "Aktif Vaka",
          data: dataActive
        },
        {
          name: "Ölüm",
          data: dataDeath
        },
        {
          name: "İyileşme",
          data: dataRecovered
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#EE4949","#FFB266", "#959191", "#66FF66"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: this.currentCountry.name,
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: dataDate,
        title: {
          text: "Day"
        }
      },
      yaxis: {
        title: {
          text: "Rakamlar"
        },
        min: 0,
        max: maxLimit
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  onOptionsSelected(value: number) {
    if (value == 0) {
      this.currentStats.id = this.wordlTotal.id;
      this.currentStats.countryId = this.wordlTotal.countryId;
      this.currentStats.date = this.wordlTotal.date;
      this.currentStats.death = this.wordlTotal.death;
      this.currentStats.infected = this.wordlTotal.infected;
      this.currentStats.recovered = this.wordlTotal.recovered;

      this.currentCountry.name = 'Dünya Geneli';
      this.currentCountry.id = 0;

      if (this.lastSelected) { 
        this.lastSelected.isActive = false;
      }
      this.chart.goHome();

      this.currentDays = this.worldDays;
    } else {
      if (this.lastSelected) { 
        this.lastSelected.isActive = false;
      }
      this.lastSelected = this.polygonSeries.getPolygonById(this.countries[value-1].code);
      this.chart.zoomToMapObject(this.lastSelected);
      this.lastSelected.isActive = true;

      let isThereInfo:boolean = false;
      for (let i = 0; i < this.countriesTotal.length; i++) {
        if (this.countriesTotal[i].countryId == value) {
          isThereInfo = true;
          this.currentStats.id = this.countriesTotal[i].id;
          this.currentStats.countryId = this.countriesTotal[i].countryId;
          this.currentStats.date = this.countriesTotal[i].date;
          this.currentStats.death = this.countriesTotal[i].death;
          this.currentStats.infected = this.countriesTotal[i].infected;
          this.currentStats.recovered = this.countriesTotal[i].recovered;


          this.currentCountry.id = this.countries[
            this.countriesTotal[i].countryId - 1
          ].id;
          this.currentCountry.latitude = this.countries[
            this.countriesTotal[i].countryId - 1
          ].latitude;
          this.currentCountry.longitude = this.countries[
            this.countriesTotal[i].countryId - 1
          ].longitude;
          this.currentCountry.name = this.countries[
            this.countriesTotal[i].countryId - 1
          ].name;
          this.currentCountry.code = this.countries[
            this.countriesTotal[i].countryId - 1
          ].code;
          this.currentDays = [];
          for (let j = 0; j < this.countriesDays.length; j++) {
            if (this.countriesDays[j].countryId == value) {
              this.currentDays.push(this.countriesDays[j]);
            }
          }
        } 
      }
      if(!isThereInfo) {
        
        this.currentStats.countryId = this.countries[value-1].id;
        this.currentStats.infected = 0;
        this.currentStats.death = 0;
        this.currentStats.recovered = 0;
        
        this.currentCountry.name = this.countries[value-1].name + " (Henüz bilgi girilmedi!)";
        this.currentCountry.id = value;

      }
    }
    this.activeCase = this.currentStats.infected - (this.currentStats.death + this.currentStats.recovered);
    this.timeLineData();
  }
}
