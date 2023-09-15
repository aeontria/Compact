import Image from 'next/image'

const LogoAlternative = ({ width , height}: {width:number, height:number}) => {

    return(
        <>
         <Image className='mx-auto'
            width={width} height={height}
            src={'/aeon-white.png'}
            alt='Aeon Logo'
            />
        </>
    )
}

export default LogoAlternative