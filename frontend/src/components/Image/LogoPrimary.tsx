import Image from 'next/image'

const LogoPrimary = () => {

    return(
        <>
            <Image className={`mx-auto`}
                alt='Workflow'
                width={120} height={50}
                src={'/aeonstore.jpg'}
                priority={true}
            />
        </>
    )
}

export default LogoPrimary