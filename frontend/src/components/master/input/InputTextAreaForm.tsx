import { ChangeEventHandler } from "react"

const InputTextAreaForm = ({ label , onChange}: {label:string, onChange:ChangeEventHandler}) => {
    return(
        <div className="flex flex-col gap-1">
            <label className="block text-secondary-focus text-sm text capitalize" htmlFor={label}>{label}</label>
            <textarea
            className="appearance-none h-56 border border-primary rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={onChange}
            id={label} placeholder={`Enter ${label}`}>
            </textarea>
        </div>
    )
}

export default InputTextAreaForm