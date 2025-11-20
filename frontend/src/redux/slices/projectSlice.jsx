import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axiosInstansce";

const initialState = {
    projects: [],
    loading: false,
    error: null,
};

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setProjects: (state, action) => {
            state.projects = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setLoading, setProjects, setError } = projectSlice.actions;

export default projectSlice.reducer;

// create
export const createProject = (projectData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.post(`/api/projects/create`, projectData);
        if (data?.success) {
            dispatch(setProjects(data?.project));
            toast.success(data?.message || "Created Successfully!");
        }
    } catch (error) {
        dispatch(setError(error?.response?.data?.message || "Project created failed"));
    } finally {
        dispatch(setLoading(false));
    }
};
export const getAllProjects = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.get(`/api/projects`);
        if (data?.success) {
            dispatch(setProjects(data?.projects));
        }
    } catch (error) {
        dispatch(setError(error?.response?.data?.message || "Projects Data failed"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update Profile Image
export const updateProjectImage = (projectId, formData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await axiosInstance.put(
            `/api/projects/image/${projectId}`,
            formData
        );
        if (data?.success) {
            // dispatch(setProjects(data?.aboutData));
            dispatch(getAllProjects())
            toast.success(data?.message || "Project Image Updated Successfully!");
        }
    } catch (error) {
        dispatch(
            setError(error?.response?.data?.message || "Project Image Updated  failed")
        );
        toast.error(
            error?.response?.data?.message || "Project Image Updated  failed"
        );
    } finally {
        dispatch(setLoading(false));
    }
};

// Login
export const updateProjectSectionData =
    (projectId, projectData) => async (dispatch) => {
        console.log("projectId, projectData :", projectId, projectData);

        dispatch(setLoading(true));
        try {
            const { data } = await axiosInstance.put(
                `/api/projects/update/${projectId}`, projectData
            );
            console.log("data :", data);

            if (data?.success) {
                dispatch(getAllProjects());
                toast.success(data?.message || "Project Updated Successfully!");
            }
        } catch (error) {
            console.log("error :", error);

            dispatch(
                setError(error?.response?.data?.message || "Project Updated  failed")
            );
            toast.error(error?.response?.data?.message || "Project Updated  failed");
        } finally {
            dispatch(setLoading(false));
        }
    };
