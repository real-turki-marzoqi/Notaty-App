import {
  getAllNotesThunk,
  changeNoteStatusThunk,
  updateNoteThunk,
  deleteNoteThunk,
  createNoteThunk, // استيراد createNoteThunk
} from "./notesThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  getAllNotesStatus: "idle",
  getAllNotesError: null,
  
  statusOfChangeNoteStatus: "idle",
  errorOfChangeNoteStatus: null,

  updateNoteStatus: "idle",
  updateNoteError: null,

  deleteNoteStatus: "idle",
  deleteNoteError: null,

  createNoteStatus: "idle", // إضافة حالة createNote
  createNoteError: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetStatusOfChangeNoteStatus: (state) => {
      state.statusOfChangeNoteStatus = "idle";
    },
    resetUpdateNoteStatus: (state) => {
      state.updateNoteStatus = "idle";
    },
    resetDeleteNoteStatus: (state) => {
      state.deleteNoteStatus = "idle";
    },
    resetCreateNoteStatus: (state) => { // دالة إعادة تعيين createNote
      state.createNoteStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotesThunk.pending, (state) => {
        state.getAllNotesStatus = "loading";
        state.getAllNotesError = null;
      })
      .addCase(getAllNotesThunk.fulfilled, (state, action) => {
        console.log("Data received:", action.payload);
        state.getAllNotesStatus = "succeeded";
        state.notes = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      })
      .addCase(getAllNotesThunk.rejected, (state, action) => {
        state.getAllNotesStatus = "failed";
        state.getAllNotesError = action.error.message;
        state.notes = [];
      })

      .addCase(changeNoteStatusThunk.pending, (state) => {
        state.statusOfChangeNoteStatus = "loading";
        state.errorOfChangeNoteStatus = null;
      })
      .addCase(changeNoteStatusThunk.fulfilled, (state, action) => {
        state.statusOfChangeNoteStatus = "succeeded";
        const updatedNote = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id
            ? { ...note, isCompleted: updatedNote.isCompleted }
            : note
        );
      })
      .addCase(changeNoteStatusThunk.rejected, (state, action) => {
        state.statusOfChangeNoteStatus = "failed";
        state.errorOfChangeNoteStatus = action.error.message;
      })

      // updateNote Cases
      .addCase(updateNoteThunk.pending, (state) => {
        state.updateNoteStatus = "loading";
        state.updateNoteError = null;
      })
      .addCase(updateNoteThunk.fulfilled, (state, action) => {
        state.updateNoteStatus = "succeeded";
        const updatedNote = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id ? { ...note, ...updatedNote } : note
        );
      })
      .addCase(updateNoteThunk.rejected, (state, action) => {
        state.updateNoteStatus = "failed";
        state.updateNoteError = action.error.message;
      })

      // deleteNote Cases
      .addCase(deleteNoteThunk.pending, (state) => {
        state.deleteNoteStatus = "loading";
        state.deleteNoteError = null;
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.deleteNoteStatus = "succeeded";
        const deletedNoteId = action.meta.arg; 
        state.notes = state.notes.filter(note => note._id !== deletedNoteId);
      })
      .addCase(deleteNoteThunk.rejected, (state, action) => {
        state.deleteNoteStatus = "failed";
        state.deleteNoteError = action.error.message;
      })

      // createNote Cases
      .addCase(createNoteThunk.pending, (state) => {
        state.createNoteStatus = "loading";
        state.createNoteError = null;
      })
      .addCase(createNoteThunk.fulfilled, (state, action) => {
        state.createNoteStatus = "succeeded";
        state.notes.push(action.payload); 
      })
      .addCase(createNoteThunk.rejected, (state, action) => {
        state.createNoteStatus = "failed";
        state.createNoteError = action.error.message;
      });
  },
});

export const {
  resetStatusOfChangeNoteStatus,
  resetUpdateNoteStatus,
  resetDeleteNoteStatus,
  resetCreateNoteStatus,
} = notesSlice.actions;
export default notesSlice.reducer;
