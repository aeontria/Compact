const InputDropDownForm = (props:any) => {
    return(
        <div className="flex md:flex-row md:w-1/2 flex-col w-full gap-1 md:items-center">
            <label className="block text-secondary-focus text-sm text capitalize w-1/2" htmlFor={props.label}>{props.label} sdsds</label>        
            <select className="select select-secondary appearance-none border border-primary rounded text-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none select-sm w-full md:w-1/2" onChange={props.onSelect} id={props.label}>
                {props.options.map((option:any) => (
                    <option key={option.value} value={option.name}>
                        {option.name}
                    </option>
            ))}
            </select>
        </div>
    )
}

export default InputDropDownForm