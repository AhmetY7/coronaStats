import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apiService : ApiService, private router: Router) {
    this.apiService.getUser().subscribe(data => {
      this.users = data;
    })
   }

  users:User;

  login(user:User):boolean { 
    if(user.name == this.users.name && user.password == this.users.password) {
      localStorage.setItem("isLogged", user.name);
      this.router.navigate(["countryList"]);
      return true;
    } 
    return false;
  }

  isLoggedIn() {
    if(localStorage.getItem("isLogged")) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.removeItem("isLogged");
  }
}
