import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private userSvc: UserService, private router: Router, private authSvc: AuthService) { }

  username: any;
  password: any;
  name: any;
  email: any;
  phone: any;

  ngOnInit() {
    // Your ngOnInit logic here
  }

  triggerOnInit() {
    this.userSvc.triggerOnInit();
  }


  login(loginForm: NgForm) {
    if (loginForm.valid) {
      this.userSvc.login(loginForm.value).subscribe(
        (data: any) => {
          this.authSvc.successSnackbar('LoggedIn');
          this.authSvc.setUserData(data);
          this.triggerOnInit();
          this.router.navigate(['/']);
        },
        (error: any) => {
          const err=JSON.stringify(error.error);
          this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
        }
      )
    }
  }
}


