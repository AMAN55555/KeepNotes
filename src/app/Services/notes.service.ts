import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { addNoteUrl, deleteNoteUrl, getAllNotesUrl, updateNoteUrl } from '../URls/urls';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpsvc: HttpClient) { }

  userNotes: any;

  addNotes(newNote:any){
    return this.httpsvc.post(addNoteUrl, newNote);
  }

  getNotes(username:any){
    return this.httpsvc.get(`${getAllNotesUrl}/${username}`);
  }

  deleteNote(id:any){
    return this.httpsvc.delete(`${deleteNoteUrl}/${id}`);
  }

  updateNote(updatedNote:any,id:any){
    return this.httpsvc.put(`${updateNoteUrl}/${id}`,updatedNote);
  }

}

