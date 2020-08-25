import axios from "axios";
import { toast } from "react-toastify";

// For error handling
axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        console.log("Logging the error", error);
        toast.error("An unexpected error occured!");
    }
    return Promise.reject(error);
});

// BaseUrl setup
axios.defaults.baseURL = process.env.REACT_APP_TMDB_API_URL;

export default {
    get: axios.get,
    post: axios.post
};