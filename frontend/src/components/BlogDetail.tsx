import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const BlogDetail = ({blog}:{blog:Blog | null}) =>{
  if(!blog){
    return <div>Loading Blog details...</div>
  }
     return <div>
        <Appbar/>
        <div className="grid grid-cols-12 px-10 w-full pt-200">
            <div className=" col-start-3 col-span-7 pt-12 mr-10">
                <div className="text-3xl tracking-wide font-extrabold mb-2">{blog.title}</div>
                <div className="text-lg text-slate-600 mb-8">Posted on  January 3, 2023</div>
                <div className="text-lg tracking-wide text-gray-800 font-normal">{blog.content}</div>
            </div>
            <div className="col-span-3 pt-12">
              <div className="text-xl font-semibold mb-5">Author</div>
              <div className="grid grid-cols-6">
                <div className="col-span-1 content-center">
                    <Avatar name={blog.author.name} size="big"/>
                </div>
                <div className="col-start-2 col-span-5">
                    <div className="text-2xl font-bold pb-1">{blog.author.name}</div>
                    <div className="text-md font-medium text-slate-600">Master of Myths ,and the funniest person in the kingdom</div>
                </div>
              </div>
            </div>
        </div>
     </div>
}