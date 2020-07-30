import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})
export class LoginComponent implements OnInit {

  constructor(private apiService : ApiService, private accountService:AccountService) { }

  model:User = new User();

  ngOnInit() {
  }

  login(form:NgForm) {
    this.accountService.login(this.model);
  }

}
