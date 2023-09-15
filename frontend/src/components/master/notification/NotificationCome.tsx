import { useState, useEffect } from 'react';
import Link from "next/link"
import { HiBellAlert } from "react-icons/hi2"

const NotificationCome = ({ mobile, count, divLogout, setOpenDiv } : { mobile:boolean, count:number, divLogout: boolean, setOpenDiv: any}) => {
    var txtCount = ''

    if(count == 0){
        txtCount = ''
    }else if(count > 99){
        txtCount = '99+'
    }else{
        txtCount = count.toString()
    }


    useEffect(() => {
    
      }, [])

    return(
        <>
            <Link href={'#'} className="flex fex-row w-10 h-full justify-between items-center" onClick={setOpenDiv}>
                <HiBellAlert className={`flex text-lg ${mobile ? "text-white" : "text-secondary"}`}/>
                <h1 className={`${!count && "hidden" } flex p-1 text-xs bg-error text-white rounded-full text-center items-center duration-300 animate-bounce`}>{txtCount}</h1>
            </Link>
        </>
    )
}

export default NotificationCome