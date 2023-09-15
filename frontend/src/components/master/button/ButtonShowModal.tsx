import Link from 'next/link'

const ButtonShowModal = ({ label , icon, actionButton}: {label:string, icon:any, actionButton: any}) => {

    return(
        <>
            <button 
            className="btn bg-white border-primary text-primary hover:bg-secondary-focus hover:text-white rounded btn-sm p-2 text-xs focus:outline-none"
            onClick={actionButton}>
            {label} {icon}</button>
        </>
    )
}

export default ButtonShowModal 