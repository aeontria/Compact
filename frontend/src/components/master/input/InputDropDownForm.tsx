const InputDropDownForm = (props:any) => {
    return(
        <div className="flex flex-col gap-1">
            <label className="block text-secondary-focus text-sm text capitalize" htmlFor={props.label}>{props.label}</label>
            <select className="appearance-none border border-primary rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={props.onSelect} id={props.label}>
                {props.options.map((option:any) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
            ))}
            </select>
        </div>
    )
}

export default InputDropDownForm