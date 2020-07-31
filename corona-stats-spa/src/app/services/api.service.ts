import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatsDaily } from '../models/StatsDaily';
import { Country } from '../models/Country';
import { User } from '../models/User';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getCountryTotal() {
    return this.http.get<StatsDaily[]>(
      'http://localhost:8080/api/countrytotal'
    );
  }

  getCountries() {
    return this.http.get<Country[]>('http://localhost:8080/api/countries');
  }
  getUser() {
    return this.http.get<User>('http://localhost:8080/api/user');
  }

  getWorldTotal() {
    return this.http.get<StatsDaily>('http://localhost:8080/api/worldtotal');
  }

  getWorldDays() {
    return this.http.get<StatsDaily[]>(
      'http://localhost:8080/api/worldtotaldays'
    );
  }

  getCountriesDays() {
    return this.http.get<StatsDaily[]>(
      'http://localhost:8080/api/countrytotaldays'
    );
  }

  getStatByCountryId(statsCountryId) {
    return this.http.get<StatsDaily[]>(
      'http://localhost:8080/api/statscountryid/' + statsCountryId
    );
  }

  save(stat:StatsDaily) {
    this.http.post("http://localhost:8080/api/add",stat).subscribe();
  }

  update(stat:StatsDaily) {
    this.http.post("http://localhost:8080/api/update",stat).subscribe();
  }

  delete(stat:StatsDaily) {
    this.http.post("http://localhost:8080/api/delete",stat).subscribe();
  }
}
