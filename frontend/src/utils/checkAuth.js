import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import TokenValidation from './tokenValidation'

const CheckAuth = () => {
  const [status, setStatus] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('cgrToken')
    const isValidToken = TokenValidation(storedToken)
   
    if (!isValidToken) {
      localStorage.removeItem('cgrMenu');
      localStorage.removeItem('cgrDataDetail');
      localStorage.removeItem('cgrToken');
      localStorage.removeItem('_XPlow');
      localStorage.removeItem('ally-supports-cache');
      setStatus(false)
      router.push('/login')
    }else{
      setStatus(true)
    }
  }, [])

  return status
}

export default CheckAuth
