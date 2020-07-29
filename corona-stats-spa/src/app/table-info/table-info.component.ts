import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css'],
})
export class TableInfoComponent implements OnInit {

  constructor(private http:HttpClient) {}

  countriesTotal:StatsDaily[];
  countries:Country[];

  ngOnInit(): void {
    this.getCountryTotal().subscribe(data=>{
      this.countriesTotal = data;
    });

    this.getCountries().subscribe(data=> {
      this.countries = data;
    });
  }

  getCountryTotal() {
    return this.http.get<StatsDaily[]>("http://localhost:8080/api/countrytotal");
  }
  
  getCountries() {
    return this.http.get<Country[]>("http://localhost:8080/api/countries");
  }
}
