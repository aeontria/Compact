import { ChangeEventHandler } from "react"

const InputTextForm = ({ label , type, onChange}: {label:string, type:string, onChange:ChangeEventHandler}) => {
    return(
        <div className="flex flex-col gap-1">
            <label className="block text-secondary-focus text-sm text capitalize" htmlFor={label}>{label}</label>
            <input
            className="appearance-none border border-primary rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChange}
            id={label} type={type} placeholder={`Enter ${label}`}> 
            </input>
        </div>
    )
}

export default InputTextForm