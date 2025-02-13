import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import axios from "axios"


export const Appbar = ({name = "Create",title,content}:{name?:"Publish" | "Create",title?:string,content?:string}) => {
    const navigate = useNavigate();
    return <div className="border-b flex justify-between px-10 py-4 mb-2">
        <Link to={`/`} className="flex flex-col justify-center cursor-pointer">
            Medium
        </Link>
        <div>
            {name === "Create"?<Link to={"/publish"}>
                <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-6">Create</button>
            </Link>:
                <button onClick={async ()=>{
                    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,{
                        title,
                        content
                    },
                {
                    headers:{
                        Authorization: "Bearer "+localStorage.getItem("token")
                    }
                });
                    navigate(`/blog?id=${response.data.id}`)
                }} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-6">Publish</button>
            }

<button 
                    onClick={() => {navigate('/signin')}} 
                    type="button" 
                    className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-2"
                >
                    Sign In
                </button>
                <button 
                    onClick={() => {navigate('/signup')}} 
                    type="button" 
                    className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-2"
                >
                    Sign Up
                </button>
            <Avatar size={"big"} name="Mandeep"/>
        </div>
    </div>
}