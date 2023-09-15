const TextSubtitle = ({ text }:{ text:string }) => {
    return(
        <>
            <h1 className='text-md font-semibold uppercase text-primary'>{text}</h1>
        </>
    )
}

export default TextSubtitle