const HeaderPrimaryMedium = ({ text}: {text:string}) => {
    return(
        <>
            <h1 className={`text-md font-bold text-primary`}>{text}</h1>
        </>
    )
}

export default HeaderPrimaryMedium