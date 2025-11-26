import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstansce";

const initialState = {
  contactData: null,
  loading: false,
  error: null,
};

export const contactSlice = createSlice({
  name: "contactData",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setContactSectionData: (state, action) => {
      state.contactData = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setContactSectionData, setError } =
  contactSlice.actions;

export default contactSlice.reducer;

// create
export const createContactSectionData = (contactData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(
      `/api/contact/create`,
      contactData
    );
    console.log("data:", data);

    if (data?.success) {
      dispatch(setContactSectionData(data?.contact));
      toast.success(data.message || "Contact created Successfully!");
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Contact failed"));
  } finally {
    dispatch(setLoading(false));
  }
};
export const getContactSectionData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.get(`/api/contact`);
    if (data?.success) {
      dispatch(setContactSectionData(data?.contactData));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Contact failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateContactSectionData =
  (contactId, contactData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axiosInstance.put(
        `/api/contact/update/${contactId}`,
        contactData
      );
      if (data?.success) {
        dispatch(setContactSectionData(data?.contactData));
        toast.success(data?.message || "Contact Data Updated Successfully!");
      }
    } catch (error) {
      dispatch(
        setError(error?.response?.data?.message || "Contact Updated  failed")
      );
      toast.error(error?.response?.data?.message || "Contact Updated  failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
