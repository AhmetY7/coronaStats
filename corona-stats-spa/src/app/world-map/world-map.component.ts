import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css'],
  providers: [ApiService]
})
export class WorldMapComponent implements OnInit {

  constructor(private apiService : ApiService) {}

  countriesTotal: StatsDaily[];
  countries: Country[];
  wordlTotal: StatsDaily;
  countriesDays: StatsDaily[];
  worldDays: StatsDaily[];

  currentStats:StatsDaily;
  currentCountryName:String = "Dünya Geneli";
  currentDays:StatsDaily[];


  ngOnInit(): void {
    this.apiService.getCountryTotal().subscribe((data) => {
      this.countriesTotal = data;
    });

    this.apiService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    this.apiService.getWorldTotal().subscribe((data) => {
      this.wordlTotal = data;
      this.currentStats = data;
    });

    this.apiService.getWorldDays().subscribe((data) => {
      this.worldDays = data;
      this.currentDays = data;
    })

    this.apiService.getCountriesDays().subscribe((data) => {
      this.countriesDays = data;
    })
  }

  onOptionsSelected(value:number) {
    if(value == 0) {
      this.currentStats = this.wordlTotal;
      this.currentCountryName = "Dünya Geneli";
      this.currentDays = this.worldDays;
    } else {
      for(let i=0; i<this.countriesTotal.length;i++) {
        if(this.countriesTotal[i].countryId == value) {
          this.currentStats = this.countriesTotal[i];
          this.currentCountryName = this.countries[this.countriesTotal[i].countryId - 1].name;
          this.currentDays = [];
          for(let j=0; j<this.countriesDays.length; j++) {
            if(this.countriesDays[j].countryId == value) {
              this.currentDays.push(this.countriesDays[j]);
            }
          }
        }
      }
    }
  }

  

}
