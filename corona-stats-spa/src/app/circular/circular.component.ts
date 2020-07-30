import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css'],
  providers: [ApiService]
})
export class CircularComponent implements OnInit {
  constructor(private apiService : ApiService) {}

  countriesTotal: StatsDaily[];
  countries: Country[];
  wordlTotal: StatsDaily;
  percent: number[] = [];

  ngOnInit(): void {
    this.apiService.getCountryTotal().subscribe((data) => {
      this.countriesTotal = data;
    });

    this.apiService.getCountries().subscribe((data) => {
      this.countries = data;
    });

    this.apiService.getWorldTotal().subscribe((data) => {
      this.wordlTotal = data;
    });
  }

  

  getPercent() {
    this.percent.push(
      (this.countriesTotal[0].infected * 100) / this.wordlTotal.infected
    );
    this.percent.push(
      (this.countriesTotal[1].infected * 100) / this.wordlTotal.infected
    );
    this.percent.push(
      (this.countriesTotal[2].infected * 100) / this.wordlTotal.infected
    );
    this.percent.push(
      (this.countriesTotal[3].infected * 100) / this.wordlTotal.infected
    );
    this.percent.push(
      (this.countriesTotal[4].infected * 100) / this.wordlTotal.infected
    );
    this.percent.push(
      100 -
        this.percent[0] -
        this.percent[1] -
        this.percent[2] -
        this.percent[3] -
        this.percent[4]
    );
  }
}
