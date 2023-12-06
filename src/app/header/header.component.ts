import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userSvc: UserService, private authSvc: AuthService, private renderer: Renderer2, private el: ElementRef,private router: Router,private cdr: ChangeDetectorRef) {}

  userData:any;
  username:any;

  isNavClose: boolean = true;

  subscription: Subscription | undefined;

  ngOnInit() {
    this.userData = this.authSvc.getUserData();

    if(this.userData)this.username=this.userData.user.username;
    else this.username=null;

    this.userSvc.triggerOnInit$.subscribe(() => {
      this.ngOnInit();
    });
  }

  LogOut() {
    this.authSvc.removeUserData();
    this.ngOnInit();
  }

  openNav() {
    if (this.isNavClose == true) {
      const element = document.getElementById('navContent');
      const element2 = document.getElementById('ham');
      const element3 = document.getElementsByTagName('span');

      this.renderer.addClass(element, 'navDown');
      this.renderer.addClass(element2, 'rotateHam');
      for (let i = 0; i < element3.length; i++) {
        this.renderer.addClass(element3[i], 'changeColorHam');
      }
    }
    else {
      const element = document.getElementById('navContent');
      const element2 = document.getElementById('ham');
      const element3 = document.getElementsByTagName('span');

      this.renderer.removeClass(element, 'navDown');
      this.renderer.removeClass(element2, 'rotateHam');
      for (let i = 0; i < element3.length; i++) {
        this.renderer.removeClass(element3[i], 'changeColorHam');
      }
    }
    this.isNavClose = !this.isNavClose;
  }

}


