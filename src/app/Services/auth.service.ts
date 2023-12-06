import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router,private toastr: ToastrService) { }

  private isauthenticated = false;

  private userData = 'userData';

  successSnackbar(message:string) {
    this.toastr.success('', message, {
      timeOut: 3000
    });
  }

  errorSnackbar(message:string) {
    this.toastr.error('', message, {
      timeOut: 3000
    });
  }

  setUserData(userData: any): void {
    const userDataString = JSON.stringify(userData);
    localStorage.setItem(this.userData, userDataString);
  }

  getUserData(): any | null {
    const userDataString = localStorage.getItem(this.userData);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  removeUserData(): void {
    localStorage.removeItem(this.userData);
    this.isauthenticated = false;
    this.router.navigate(['/Login']);
  }

  isLoggedIn(): boolean {
    return !!this.getUserData();
  }
}
