import { Component } from '@angular/core';
import { NotesService } from '../Services/notes.service';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userSvc: UserService,private authSvc: AuthService, private router: Router) { }

  name: any;
  username: any;
  phone: any;
  email: any;
  password: any;

  register(registerForm: NgForm) {
    if (registerForm.valid) {

      this.userSvc.register(registerForm.value).subscribe(
        (data: any) => {
        this.authSvc.successSnackbar('registerd');
        this.router.navigate(['/Login']);
      },
      (error:any)=>{
        const err=JSON.stringify(error.error);
        this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
      })

    }

  }

} 
