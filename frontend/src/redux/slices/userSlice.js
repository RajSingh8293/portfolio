import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstansce";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, setProfileUser, setError } =
  userSlice.actions;

export default userSlice.reducer;

// Register
export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(`/api/users/register`, userData);
    if (data?.success) {
      dispatch(setUser(data?.user));
      toast.success(data.message || "Register Successfully!");
      navigate("/");
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Register failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Login
export const loginUser = (userData, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(`/api/users/login`, userData);
    if (data?.success) {
      dispatch(setUser(data?.user));
      toast.success(data.message || "Login Successfully!");
      navigate("/");
    }
  } catch (error) {
    // console.log("error :", error);
    // dispatch(setError(error?.response?.data?.message || "Login failed"));
    toast.error(error?.response?.data?.message || "Login failed");
  } finally {
    dispatch(setLoading(false));
  }
};

// Current User
export const fetchProfile = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.get(`/api/users/profile`);
    if (data?.success) {
      dispatch(setUser(data?.user));
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Profile failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Logout
export const logoutUser = (navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.get(`/api/users/logout`);
    if (data?.success) {
      dispatch(setUser(null));
      toast.success(data?.message || "Logout Successfully!");
      navigate("/");
    }
  } catch (error) {
    dispatch(setError(error?.response?.data?.message || "Logout failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Profile Image
export const updateProfileImage = (formData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(
      `/api/users/upload-profile`,
      formData
    );
    if (data?.success) {
      dispatch(setUser(data?.user));
      toast.success(data?.message || "Profile Image Updated Successfully!");
      // dispatch(fetchProfile());
    }
  } catch (error) {
    dispatch(
      setError(
        error?.response?.data?.message || "Profile Image Updated  failed"
      )
    );
    toast.error(
      error?.response?.data?.message || "Profile Image Updated  failed"
    );
  } finally {
    dispatch(setLoading(false));
  }
};

// Login
export const updateUserProfile = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.put(
      `/api/users/update-profile`,
      userData
    );
    if (data?.success) {
      dispatch(setUser(data?.user));
      toast.success(data?.message || "Profile Updated Successfully!");
    }
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Profile Updated  failed")
    );
    toast.error(error?.response?.data?.message || "Profile Updated  failed");
  } finally {
    dispatch(setLoading(false));
  }
};

// getUserByID User

export const getUserById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.get(`/api/users/${id}`);

    if (data?.success) {
      dispatch(setProfileUser(data?.user));
    }
  } catch (error) {
    dispatch(
      setError(error?.response?.data?.message || "Get Profile By Id failed")
    );
    toast.error(error?.response?.data?.message || "Get Profile By Id failed");
  } finally {
    dispatch(setLoading(false));
  }
};

/* ------------------- PASSWORD ------------------- */

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axiosInstance.post(`/api/users/forgot-password`, {
      email,
    });
    if (data?.success)
      toast.success(data.message || "Password reset link sent");
  } catch (err) {
    dispatch(setError(err?.response?.data?.message || "Request failed"));
    toast.error(err?.response?.data?.message || "Request failed");
  } finally {
    dispatch(setLoading(false));
  }
};

export const resetPassword =
  (token, passwordData, switchView) => async (dispatch) => {
    dispatch(setLoading(true));
    console.log("passwordData :", passwordData);

    try {
      const { data } = await axiosInstance.post(
        `/api/users/reset-password/${token}`,
        passwordData
      );

      if (data?.success) {
        toast.success(data.message || "Password reset successfully");
        switchView("login");
      }
    } catch (err) {
      dispatch(setError(err?.response?.data?.message || "Reset failed"));
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      dispatch(setLoading(false));
    }
  };
