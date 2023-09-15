import { ChangeEventHandler } from "react"

const InputAuth = ({ label , type, onChange}: {label:string, type:string, onChange:ChangeEventHandler}) => {
    return(
        <>
            <label className="block text-gray-700 text-sm font-bold mb-2 text capitalize" htmlFor={label}>{label}</label>
            <input
            className="appearance-none border rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChange}
            id={label} type={type} placeholder={`Enter ${label}`}>
            </input>
        </>
    )
}

export default InputAuth