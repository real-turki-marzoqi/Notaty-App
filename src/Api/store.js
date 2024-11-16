import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Features/Auth/AuthSlice'
import noteReducer from './Features/Notes/notesSlice'
import userReducer from './Features/User/userSlice'

export const store  = configureStore ({

    reducer:{

        auth:authSlice,
        notes:noteReducer,
        user:userReducer
    },
})