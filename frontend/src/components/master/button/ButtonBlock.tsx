import Link from 'next/link'

const ButtonBlock = ({ label , username, password, sendData}: {label:string, username:string, password:string, sendData: any}) => {

    return(
        <>
            <button 
            className="btn btn-primary w-full px-4 rounded focus:outline-none"
            onClick={sendData}>
            {label}</button>
        </>
    )
}

export default ButtonBlock 