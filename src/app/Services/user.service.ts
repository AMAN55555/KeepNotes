import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, firstValueFrom, map, switchMap } from 'rxjs';
import { loginUrl, registerUrl, updateProfileImageUrl, updateProfileUrl } from '../URls/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpsvc: HttpClient, private router: Router) { }

  private clientId = 'd3988af106828b8';
  
  userData: any;

  private triggerOnInitSource = new Subject<void>();
  triggerOnInit$ = this.triggerOnInitSource.asObservable();

  triggerOnInit() {
    this.triggerOnInitSource.next();
  }

  register(user: any) {
    return this.httpsvc.post(registerUrl, user);
  }

  login(user:any) {
    return this.httpsvc.post(loginUrl,user);
  }

  updateProfile(updatedUserData:any) {
    return this.httpsvc.put(updateProfileUrl,updatedUserData);
  }

  uploadImage(imageData: File,username:any): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', imageData);
    formData.append('username', username);

    return this.httpsvc.patch(updateProfileImageUrl,formData);
  }

}
