import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  authCredentials = {
    username: 'mohakchugh',
    password: 'testtesttest'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login = () => {
    if (this.username === this.authCredentials.username && this.password === this.authCredentials.password) {
      console.log(this.username);
      console.log(this.password);
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password);
      this.router.navigateByUrl('/feed');
    } else {
      alert('Username or password incorrect! Please try again!');
    }
  }

}
