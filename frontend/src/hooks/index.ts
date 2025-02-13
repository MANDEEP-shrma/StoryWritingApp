import { useEffect, useState } from "react"
import axios from "axios"


export interface Blog {
    content: string
    title: string
    id: number
    author: {
        name: string
    }
}

export const useBlog = ({ id }: { id: number }) => {
    //you can use here atom and selector this will be the best use case but for now we are doing it with 
    // state variables willl see them afterwards when we are done with this one for all
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog?id=${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);

                setLoading(false)
            })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false)
            })
    }, [])

    return {
        loading,
        blogs
    }
}