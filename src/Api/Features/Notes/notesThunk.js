import {getAllNotesApi,changeNoteStatusApi,updateNoteApi,deleteNoteApi,createNoteApi} from "./notesApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllNotesThunk = createAsyncThunk(
  "Notes/GetAllNotes",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllNotesApi();
      return data;
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      return rejectWithValue([{ msg: errorMessage }]);
    }
  }
);

export const changeNoteStatusThunk = createAsyncThunk(
  'Notes/ChangeNoteStatus', // تعديل الاسم ليكون متناسقًا
  async (id, { rejectWithValue }) => {
    try {
      const data = await changeNoteStatusApi(id); 
      return data;
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      return rejectWithValue([{ msg: errorMessage }]);
    }
  }
);

export const updateNoteThunk = createAsyncThunk(
  'Notes/UpdateNote', 
  async ({ id, noteData }, { rejectWithValue }) => {
    try {
      const data = await updateNoteApi(noteData, id); 
      return data;
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      return rejectWithValue([{ msg: errorMessage }]);
    }
  }
);

export const deleteNoteThunk = createAsyncThunk(
  'Notes/DeleteNote', 
  async (id, { rejectWithValue }) => { 
    try {
      const data = await deleteNoteApi(id);
      return data;
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      return rejectWithValue([{ msg: errorMessage }]);
    }
  }
);

export const createNoteThunk = createAsyncThunk(
  'Notes/CreateNote', 
  async (noteData, { rejectWithValue }) => { 
    try {
      const data = await createNoteApi(noteData); // استدعاء createNoteApi لإرسال طلب POST
      return data; // إرجاع البيانات إذا نجحت العملية
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      return rejectWithValue([{ msg: errorMessage }]); // إرجاع الخطأ باستخدام rejectWithValue
    }
  }
);



