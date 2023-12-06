import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NotesService } from '../Services/notes.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent {

  constructor(private noteSvc: NotesService, private authSvc: AuthService, private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  userData: any;
  username: any;

  myNotes: any;

  toBeEditedTitle: any;
  toBeEditedNote: any;

  NoteBodyToBeUpdated: any;
  noteIdToBeUpdated: any;

  isNoteSelected: boolean = false;
  isEditSelected: boolean = false;
  isChanging=false;

  ngOnInit() {
    this.userData = this.authSvc.getUserData();

    if (this.userData) this.username = this.userData.user.username;
    else this.username = null;

    this.noteSvc.getNotes(this.username).subscribe(
      (data: any) => {
        this.myNotes = data;
      },
      (error: any) => {
        const err = JSON.stringify(error.error);
        this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
      }
    );
  }

  changeEdits(){
    this.isChanging=false;
  }

  smallWindow(id: any) {
    this.isNoteSelected = !this.isNoteSelected;

    if (this.isNoteSelected == true && !this.isEditSelected && this.isChanging==false) {
      const element = document.getElementById(id);
      const element2 = document.getElementById(`card-box${id}`);
      const element3 = document.getElementById(`close${id}`);

      this.renderer.addClass(element, 'full');
      this.renderer.addClass(element2, 'selectedNote');
      this.renderer.setStyle(element3, 'display', 'block');
      const element4 = document.getElementsByClassName('textarea');

      for (let i = 0; i < element4.length; i++) {
        const element = element4[i] as HTMLElement;
        this.renderer.removeClass(element, 'hideScrollBar');
      }
    }

    this.changeEdits();
  }

  close(id: any) {

    const element = document.getElementById(id);
    const element2 = document.getElementById(`card-box${id}`);
    const element3 = document.getElementById(`close${id}`);

    this.renderer.setStyle(element3, 'display', 'none');
    this.renderer.removeClass(element2, 'selectedNote');
    this.renderer.removeClass(element, 'full');
    const element4 = document.getElementsByClassName('textarea');

    for (let i = 0; i < element4.length; i++) {
      const element = element4[i] as HTMLElement;
      this.renderer.addClass(element, 'hideScrollBar');
    }
  }

  delete(id: any) {
    this.isChanging=true;
    this.noteSvc.deleteNote(id).subscribe(
      (data: any) => {
        const indexToDelete = this.myNotes.findIndex((note: { _id: any; }) => note._id === id);

        if (indexToDelete !== -1) {
          this.myNotes.splice(indexToDelete, 1);
        }

        this.ngOnInit;
        this.authSvc.successSnackbar('Deleted');
      },
      (error: any) => {
        const err = JSON.stringify(error.error);
        this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
      }
    );
  }

  edit(id: any) {
    this.isChanging=true;
    this.noteIdToBeUpdated = id;
    this.isEditSelected = !this.isEditSelected;

    const element = document.getElementById('editNoteBody');
    this.renderer.setStyle(element, 'display', 'block');
  }

  closeEdit() {
    this.isEditSelected = !this.isEditSelected;
    this.isNoteSelected= !this.isNoteSelected;
    const element = document.getElementById('editNoteBody');
    this.renderer.setStyle(element, 'display', 'none');
  }

  UpdateNote(updateForm: NgForm) {
    const element = document.getElementById('editNoteBody');
    this.renderer.setStyle(element, 'display', 'none');

    this.noteSvc.updateNote(updateForm.value, this.noteIdToBeUpdated).subscribe(
      (data: any) => {
        this.authSvc.successSnackbar('Updated');
        this.isNoteSelected=!this.isNoteSelected;
        this.isEditSelected = !this.isEditSelected;
      },
      (error: any) => {
        const err = JSON.stringify(error.error);
        this.authSvc.errorSnackbar(err.substr(1, err.length - 2))
      }
    );

  }

}
