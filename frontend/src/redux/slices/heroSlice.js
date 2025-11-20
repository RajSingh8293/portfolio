import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstansce";

const initialState = {
  heroSectionData: null,
  loading: false,
  error: null,
};

export const heroSlice = createSlice({
  name: "heroSectionData",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setHeroSectionData: (state, action) => {
      state.heroSectionData = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setHeroSectionData, setError } = heroSlice.actions;

export default heroSlice.reducer;

// create
export const createHeroSectionData = (heroData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(`/api/hero/create`, heroData);
    if (data?.success) {
      dispatch(setHeroSectionData(data?.heroData));
      toast.success(data.message || "Created Successfully!");
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Hero failed"));
  } finally {
    dispatch(setLoading(false));
  }
};
export const getHeroSectionData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.get(`/api/hero`);
    if (data?.success) {
      dispatch(setHeroSectionData(data?.heroData));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Hero failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Profile Image
export const updateHeroImage = (heroId, formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.put(
      `/api/hero/image/${heroId}`,
      formData
    );
    if (data?.success) {
      dispatch(setHeroSectionData(data?.heroData));
      toast.success(data?.message || "Hero Image Updated Successfully!");
    }
  } catch (error) {
    dispatch(
      setError(
        error?.response?.data?.message || "Profile Image Updated  failed"
      )
    );
    toast.error(
      error?.response?.data?.message || "ProfHeroile Image Updated  failed"
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Login
export const updateHeroSectionData = (heroId, heroData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.put(
      `/api/hero/update/${heroId}`,
      heroData
    );
    if (data?.success) {
      dispatch(setHeroSectionData(data?.heroData));
      toast.success(data?.message || "Hero Data Updated Successfully!");
    }
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Hero Updated  failed")
    );
    toast.error(error?.response?.data?.message || "Hero Updated  failed");
  } finally {
    dispatch(setLoading(false));
  }
};
