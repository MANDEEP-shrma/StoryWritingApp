import { useParams } from "react-router-dom";
import { BlogDetail } from "../components/BlogDetail";
import { useBlog } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

export const Blog = () =>{
    const {id} = useParams();
    const {loading,blog} = useBlog({id:Number(id)});

    if(loading){
        return <div>
            <Appbar/>
            <BlogSkeleton/>
        </div>
    }

    return <div>
        <BlogDetail blog={blog}/>
    </div>
}