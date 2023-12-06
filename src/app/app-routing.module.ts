import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'Profile',component:ProfileComponent,canActivate: [AuthGuard]},
  {path:'MyNotes',component:MyNotesComponent,canActivate: [AuthGuard]},
  {path:'AddNotes',component:AddNotesComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
