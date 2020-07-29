import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';

@Component({
  selector: 'app-circular',
  templateUrl: './circular.component.html',
  styleUrls: ['./circular.component.css'],
})
export class CircularComponent implements OnInit {
  constructor(private http: HttpClient) {}

  countriesTotal: StatsDaily[];
  countries: Country[];
  wordlTotal: StatsDaily;
  percent: number[] = [];

  ngOnInit(): void {
    this.getCountryTotal().subscribe((data) => {
      this.countriesTotal = data;
    });

    this.getCountries().subscribe((data) => {
      this.countries = data;
    });

    this.getWorldTotal().subscribe((data) => {
      this.wordlTotal = data;
    });
  }

  getCountryTotal() {
    return this.http.get<StatsDaily[]>(
      'http://localhost:8080/api/countrytotal'
    );
  }

  getCountries() {
    return this.http.get<Country[]>('http://localhost:8080/api/countries');
  }

  getWorldTotal() {
    return this.http.get<StatsDaily>('http://localhost:8080/api/worldtotal');
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
