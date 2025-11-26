import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import heroSlice from "./slices/heroSlice";
import aboutSlice from "./slices/aboutSlice";
import projectSlice from "./slices/projectSlice";
import contactSlice from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    heroSectionData: heroSlice,
    aboutSectionData: aboutSlice,
    projects: projectSlice,
    contactData: contactSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
