import axios from "axios";

export const getAllTags = async () => {
    try {
        const { data } = await axios.get("/api/tag/tags")
        return data
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const createtags = async ({ token, title }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post("/api/tag/tags", title, config)
        return data
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}