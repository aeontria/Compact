import Link from 'next/link'

const ButtonShowModal = ({ label , icon, actionButton}: {label:string, icon:any, actionButton: any}) => {

    return(
        <>
            <button 
            className="btn btn-primary rounded focus:outline-none btn-sm p-2 text-xs"
            onClick={actionButton}>
            {label} {icon}</button>
        </>
    )
}

export default ButtonShowModal 