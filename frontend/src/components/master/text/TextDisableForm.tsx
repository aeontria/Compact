import { ChangeEventHandler } from "react"

const TextDisableForm = ({ label }: { label:string }) => {
    return(
        <div className="flex flex-col gap-1">
            <label className="block text-secondary-focus text-sm text capitalize" htmlFor={label}>{label}</label>
            <input readOnly
            className="appearance-none border border-secondary rounded text-sm w-full py-2 px-3 text-gray-700 bg-gray-200 cursor-not-allowed leading-tight focus:outline-none focus:shadow-outline"
            id={label}>
            </input>
        </div>
    )
}

export default TextDisableForm