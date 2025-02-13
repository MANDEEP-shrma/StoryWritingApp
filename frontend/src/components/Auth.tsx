import { SignupInput } from "@lovermafia/medium-validation"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Auth = ({type} : {type:"signup" | "signin"}) =>{
    //this is an ugly pattern that we are using type at each place
    //We have to make different components for each 
    //Todo:- make different components for each and then integrate because this have a problem with signin that we are sending name also
    //for now it's okay because our backend will handle that thing
    const navigate = useNavigate();
    const [postInputs,setpostInputs] = useState<SignupInput>({
        email:"",
        password:"",
        name:""
    })

    async function sendRequestSignup() {
            try{
                const response  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signup" ? "signup":"signin"}`,postInputs)
                const jwt =  response.data.jwt;
                localStorage.setItem("token",jwt);
                navigate("/blogs")
            }catch(e){
                //alert the user that the request failed
                alert("The backend is down with some issuees")
                navigate("/signup")
            }
    }
    async function sendRequestSignin() {
        try{
            const response  = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type === "signup" ? "signup":"signin"}`,postInputs)
            const jwt =  response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        }catch(e){
            //alert the user that the request failed
            alert("The backend is down with some issuees")
            navigate("/signin")
        }
}
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center"> 
            <div>
                <div className="px-10">   
                    <div className="text-3xl font-extrabold ">
                       {type==="signup"?"Create an account":"Welcome Back"}
                    </div>
                    <div className="text-gray-500">
                        {type==="signup"?"Already have an account?":"Don't have an account?"}
                        <Link className="underline pl-3" to={type==="signup"?"/signin":"/signup"}>{type==="signup"?"Login":"Signup"}</Link>
                    </div>
                </div>
                <div className="mt-8">
                    <LabelledInput  placeholder="mandeep@gmail.com" label="Email" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            email:e.target.value
                        })
                    }} />

                     {type==="signup"?<LabelledInput placeholder="Mandeep" label="Name" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            name:e.target.value
                        })
                    }} />:<div></div>}

                     <LabelledInput type="password" placeholder="**password**" label="Password" onChange={(e)=>{
                        setpostInputs({
                            ...postInputs,
                            password:e.target.value
                        })
                    }} />
                    <button onClick={type === "signup"?sendRequestSignup:sendRequestSignin} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign Up":"Sign In"}</button>
                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    type?:string,
    label:string,
    placeholder:string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    
}

function LabelledInput({type,label,placeholder,onChange} : LabelledInputType){
    return <div className="mt-4">
            <label htmlFor={label}  className="block mb-2 text-md font-bold text-gray-900 ">{label}</label>
            <input onChange={onChange} type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5" placeholder={placeholder} required />
    </div>
}