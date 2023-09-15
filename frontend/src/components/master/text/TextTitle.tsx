const TextTitle = ({ mobile, text }:{ mobile:boolean, text:string }) => {
    return(
        <>
            <h1 className={`text-justify mx-6 my-3 font-bold text-xl text-secondary ${mobile && "hidden"} uppercase`}>{text}</h1>
        </>
    )
}

export default TextTitle
