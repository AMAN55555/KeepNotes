import { Component } from '@angular/core';
import { NotesService } from '../Services/notes.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent {

  constructor(private noteSvc: NotesService, private authSvc: AuthService, private router: Router) { }

  title: any;
  note: any;
  newNote: any;
  userData: any;
  username: any;

  ngOnInit() {
    this.userData = this.authSvc.getUserData();

    if (this.userData) this.username = this.userData.user.username;
  }


  addNote(addNoteForm: NgForm) {
    if (addNoteForm.valid) {
      this.noteSvc.addNotes(addNoteForm.value).subscribe(
        (data: any) => {
          this.authSvc.successSnackbar('Note Added');
          this.title = " ";
          this.note = " ";
        },
        (error: any) => {
          const err = JSON.stringify(error.error);
          this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
        }
      )
    }

  }
}

