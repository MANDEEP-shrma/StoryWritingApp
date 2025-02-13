export const Input = ({label,type}:{label:string,type:string}) =>{
    return <div className="text-left">
        <label htmlFor={label}>{label}</label>
        <br />
        <input className="border-solid border-current" id={label} type={type}/>
    </div>
}