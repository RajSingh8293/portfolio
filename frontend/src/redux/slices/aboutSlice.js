import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstansce";

const initialState = {
  aboutSectionData: null,
  loading: false,
  error: null,
};

export const aboutSlice = createSlice({
  name: "aboutSectionData",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAboutSectionData: (state, action) => {
      state.aboutSectionData = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setAboutSectionData, setError } = aboutSlice.actions;

export default aboutSlice.reducer;

// create
export const createAboutSectionData = (aboutData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(`/api/about/create`, aboutData);
    if (data?.success) {
      dispatch(setAboutSectionData(data?.aboutData));
      toast.success(data.message || "Created Successfully!");
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "About failed"));
  } finally {
    dispatch(setLoading(false));
  }
};
export const getAboutSectionData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.get(`/api/about`);
    if (data?.success) {
      dispatch(setAboutSectionData(data?.aboutData));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "About Data failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Profile Image
export const updateAboutImage = (aboutId, formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.put(
      `/api/about/image/${aboutId}`,
      formData
    );
    if (data?.success) {
      dispatch(setAboutSectionData(data?.aboutData));
      toast.success(data?.message || "About Image Updated Successfully!");
    }
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "About Image Updated  failed")
    );
    toast.error(
      error?.response?.data?.message || "About Image Updated  failed"
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Login
export const updateAboutSectionData =
  (aboutId, aboutData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.put(
        `/api/about/update/${aboutId}`,
        aboutData
      );
      if (data?.success) {
        dispatch(setAboutSectionData(data?.aboutData));
        toast.success(data?.message || "About Data Updated Successfully!");
      }
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "About Updated  failed")
      );
      toast.error(error?.response?.data?.message || "About Updated  failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
