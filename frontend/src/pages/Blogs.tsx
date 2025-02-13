import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import {SkeletonLoaderBlogs} from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () =>{
    const {loading,blogs} = useBlogs();
    
    if(loading){
        return <div>
            <Appbar/>
            <SkeletonLoaderBlogs/>
        </div>
    }



    return <div>
        <Appbar name={"Create"}/>
        <div className="flex justify-center">
        <div className="max-w-3xl">
            {blogs.map(blog =><BlogCard id={blog.id} authorName={blog.author.name} title={blog.title} content={blog.content}
            publishedDate={"Dec 12,2023"}
            /> )}
            
    </div>
    </div>
    </div> 
}