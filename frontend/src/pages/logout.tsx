import router from "next/router";
import { useEffect } from "react"

const LogoutPage = () => {

    useEffect(()=>{
        localStorage.removeItem('cgrToken');
        localStorage.removeItem('cgrDataDetail');
        localStorage.removeItem('_XPlow');
        localStorage.removeItem('ally-supports-cache');
        router.push('/login')
    })

    return(
        <>
        </>
    )
}

export default LogoutPage