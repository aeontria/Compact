import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"

const ButtonSidebarShow = ({ statOpen, onClick }:{ statOpen:boolean, onClick:any }) => {
    return(
        <>
            <FaArrowLeft onClick={onClick} className={
                `text-white absolute text-3xl
                bg-primary rounded p-2 m-2
                cursor-pointer duration-700
                ${!statOpen && "rotate-[180deg]"}`}/>
        </>
    )
}

export default ButtonSidebarShow