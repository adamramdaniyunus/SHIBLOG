import axios from "axios";

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post("/api/user/register", {
            name,
            email,
            password
        });

        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    }
}

export const signin = async ({ email, password }) => {
    try {
        const { data } = await axios.post("api/user/login", {
            email,
            password
        })

        return data
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    }
}

export const getUserProfile = async ({ token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.get('/api/user/profile', config);

        return data
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    }
}

export const updateProfile = async ({ token, userData }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.patch('/api/user/update-profile', userData, config);

        return data
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    }
}

export const updateProfilePicture = async ({ token, formData }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.patch('/api/user/update-avatar', formData, config);

        return data
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    }
}