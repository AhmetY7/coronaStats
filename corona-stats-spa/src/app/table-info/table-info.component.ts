import { Component, OnInit } from '@angular/core';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {

  constructor(private apiService : ApiService) {}

  countriesTotal:StatsDaily[];
  countries:Country[];
  filterText: "";

  ngOnInit(): void {
    this.apiService.getCountryTotal().subscribe(data=>{
      this.countriesTotal = data;
    });

    this.apiService.getCountries().subscribe(data=> {
      this.countries = data;
    });
  }

  
}
