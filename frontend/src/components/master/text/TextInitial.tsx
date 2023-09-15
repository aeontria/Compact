const TextInitial = ({ text }:{ text:string }) => {
    
    var getInitials = function (text:string) {
        var names = text.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();
        
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    return(
        <>
             <h1 className='text-sm mx-3 bg-secondary-focus rounded-full w-8 h-8 text-center text-white pt-1.5 font-bold styleInitial'>{getInitials(text)}</h1>
        </>
    )
}

export default TextInitial
