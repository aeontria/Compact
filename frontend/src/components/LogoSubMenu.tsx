import Image from 'next/image'

const LogoSubMenu = ({ mobile}: {mobile:boolean}) => {
    return(
        <>
            <Image className={
                `mx-auto py-3 px-3 ${mobile && "ml-8"}`}
            width={100} height={50}
            src={'/aeon-white.png'}
            alt='Aeon Logo'
            priority={true}/>
        </>
    )
}

export default LogoSubMenu