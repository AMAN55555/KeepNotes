import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { NotesService } from '../Services/notes.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userSvc: UserService, private authSvc: AuthService, private noteSvc: NotesService, private renderer: Renderer2, private el: ElementRef, private router: Router, private sanitizer: DomSanitizer) { }

  username: any;
  name: any;
  email: any;
  phone: any;
  token: any;
  profileImg: any;

  userData: any;

  isEditProfileVisible: boolean = true;
  isImageEditVisible: boolean = true;
  isImageSelected: boolean = false;
  selectedFile: File | undefined = undefined;

  base64ImageData:any;

  ngOnInit() {
    this.userData = this.authSvc.getUserData();

    this.token = this.userData.token;
    this.username = this.userData.user.username;
    this.name = this.userData.user.name;
    this.email = this.userData.user.email;
    this.phone = this.userData.user.phone;
    if (this.userData.user.profileImage) this.profileImg = this.userData.user.profileImage;
  }

  editProfile() {
    this.isEditProfileVisible = !this.isEditProfileVisible;
    const element = document.getElementById(`name`);
    this.renderer.setStyle(element, 'border-bottom', '1px solid grey');
    const element2 = document.getElementById(`email`);
    this.renderer.setStyle(element2, 'border-bottom', '1px solid grey');
    const element3 = document.getElementById(`phone`);
    this.renderer.setStyle(element3, 'border-bottom', '1px solid grey');
  }

  updateProfile(profileForm: NgForm) {

    if (profileForm.valid) {
      this.isEditProfileVisible = !this.isEditProfileVisible;

      this.userSvc.updateProfile(profileForm.value).subscribe(
        (data: any) => {
          this.updateLocalStorage();

          this.authSvc.successSnackbar('updated');

          const element = document.getElementById(`name`);
          this.renderer.setStyle(element, 'border-bottom', 'none');
          const element2 = document.getElementById(`email`);
          this.renderer.setStyle(element2, 'border-bottom', 'none');
          const element3 = document.getElementById(`phone`);
          this.renderer.setStyle(element3, 'border-bottom', 'none');
        },
        (error: any) => {
          const err = JSON.stringify(error.error);
          this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
        }
      );
    }
  }

  image:any;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files?.[0];
    this.image=this.selectedFile;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImg = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
    this.isImageSelected = true;
    this.isImageEditVisible = !this.isImageEditVisible;
  }

  SaveImage() {
    this.userSvc.uploadImage(this.image, this.username).subscribe(
      (data: any) => {
        this.authSvc.successSnackbar('updated');
        this.updateLocalStorage();
      },
      (error: any) => {
        const err = JSON.stringify(error.error);
        this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
      }
    );
    this.isImageEditVisible = !this.isImageEditVisible;
  }

  updateLocalStorage(){
    this.authSvc.setUserData({
      "token": this.token, 
      "user": {
        "name":this.name,
        "username":this.username,
        "email":this.email,
        "phone":this.phone,
        "profileImage":this.profileImg
      } 
    });
  }

}
