import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  constructor(private apiService : ApiService) { }

  countriesTotal: StatsDaily[];
  countries: Country[];
  filterText: "";

  ngOnInit() {
    this.apiService.getCountryTotal().subscribe(data => {
      this.countriesTotal = data;
    })

    this.apiService.getCountries().subscribe(data => {
      this.countries = data;
    })
  }

}
