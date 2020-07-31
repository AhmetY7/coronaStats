import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ApiService } from '../services/api.service';
import { StatsDaily } from '../models/StatsDaily';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private apiService:ApiService,private formBuilder:FormBuilder) { }

  statOperation:FormGroup;

  stats:StatsDaily[];

  currentStat:StatsDaily;

  countryId:number;
  date:Date;
  infected:number;
  recovered:number;
  death:number;
  statAdded:StatsDaily;

  statOperationFrom() {
    this.statOperation = this.formBuilder.group({
      date:["",Validators.required],
      infected:["",Validators.required],
      recovered:["",Validators.required],
      death:["",Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.countryId = params["countryId"];
      this.apiService.getStatByCountryId(params["countryId"]).subscribe(data => {
        this.stats = data;
      })
    })

    this.statOperationFrom();

  }

  applyOperation() {
    if(this.statOperation.valid) {
      if(this.currentStat == null) {
        this.statAdded = new StatsDaily;
        this.statAdded.countryId = this.countryId;
        this.statAdded.date = this.date;
        this.statAdded.death = this.death;
        this.statAdded.infected = this.infected;
        this.statAdded.recovered = this.recovered;
        this.save();
      } else {
        this.currentStat.date = this.date;
        this.currentStat.infected = this.infected;
        this.currentStat.recovered = this.recovered;
        this.currentStat.death = this.death;
        this.update();
      }
    }
    
  }

  save() {
    this.apiService.save(this.statAdded);
    location.reload();
  }

  update() {
    this.apiService.update(this.currentStat);
  }

  statSelect(stat:StatsDaily) {
    this.currentStat = stat;
    this.date = stat.date;
    this.infected = stat.infected;
    this.recovered = stat.recovered;
    this.death = stat.death;
  
  }

  delete(stat:StatsDaily) {
    this.currentStat = stat;
    this.apiService.delete(this.currentStat);
    location.reload();
  }

  clear() {
    this.currentStat = null;
    this.date = null;
    this.infected = null;
    this.recovered = null;
    this.death = null;
  }

}
