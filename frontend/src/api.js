import axios from 'axios';
import { LANGUAGE_VERSIONS } from "./constants";
// Existing API configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Piston API configuration
const API_PISTON = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
    withCredentials: false
});

export const executeCode = async (language, sourceCode) => {
    const response = await API_PISTON.post("/execute", {
        language: language,
        version: LANGUAGE_VERSIONS[language],
        files: [
            {
                content: sourceCode,
            },
        ],
    });
    return response.data;
};

export default api;