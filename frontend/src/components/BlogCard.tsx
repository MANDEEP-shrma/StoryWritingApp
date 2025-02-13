import { Link } from "react-router-dom";

interface BlogCardProps{
    authorName : string;
    title:string;
    content:string;
    publishedDate:string;
    id:number
}

export const BlogCard = ({authorName,title,content,publishedDate,id} : BlogCardProps) =>{
    return <Link to={`/blog/${id}`}>
    <div className="m-4 border-b border-slate-400 pb-2 cursor-pointer">
        <div className="flex">
            <Avatar size="small" name={authorName}/>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName} 
            </div>
            <div className="pt-1 pl-2 flex justify-center flex-col">
                <Circle/>
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
            </div>
        </div>
        <div className="text-xl font-bold tracking-wide mt-4 mb-2">{title}</div>
        <div className="text-md font-normal tracking-wide text-gray-700" >{content.length > 200 ?content.slice(0,200) + "...":content} </div>
        <div className="text-slate-400 text-sm mt-6">
            {(Math.ceil(content.length / 100)) <= 1 ?`${(Math.ceil(content.length / 100))} minute read`:`${(Math.ceil(content.length / 100))} minutes read`}
        </div>
    </div>
    </Link>
}


function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({name,size="small"}:{name:string,size:"small" | "big"}){
    return  <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small"?"w-7 h-7" : "w-10 h-10"}`}>
        <span className={`${size === "small"?"text-xs":"text-md"} font-light text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
}