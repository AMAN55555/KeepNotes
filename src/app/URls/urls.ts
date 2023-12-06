import { environment } from "src/environments/environment";

const baseUrl=environment.production? '' : environment.baseUrl;

export const registerUrl=baseUrl+"api/register";
export const loginUrl=baseUrl+"api/login";
export const updateProfileUrl=baseUrl+"api/updateProfile";
export const updateProfileImageUrl=baseUrl+"api/updateProfileImage";
export const addNoteUrl=baseUrl+"api/addNote";
export const getAllNotesUrl=baseUrl+"api/getAllNotes"
export const updateNoteUrl=baseUrl+"api/note/update";
export const deleteNoteUrl=baseUrl+"api/note/deleteNote";
