import axios from "axios";

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 9) => {
    try {
        const { data, headers } = await axios.get(
            `/api/blog/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
        )
        return { data, headers }
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const getSinglePost = async ({ slug }) => {
    try {
        const { data } = await axios.get(`/api/blog/post/${slug}`);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
}

export const updatePost = async ({ updatedData, slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.patch(`/api/blog/post/${slug}`, updatedData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const createPost = async ({ token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`/api/blog/post`, {}, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const deletePost = async ({ slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`/api/blog/post/${slug}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};