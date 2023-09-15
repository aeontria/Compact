import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import LayoutLogin from '../layouts/LayoutLogin';
import Head from 'next/head';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const storedToken = localStorage.getItem('workflowToken')
        if (storedToken) {
          router.push('/dashboard')
        }else{
            setIsLoading(false)
        }
      }, [])

    return(
        <>
            <Head>
                <title>Customer Gift Redemption - PT. AEON Indonesia</title>
            </Head>
            {!isLoading && <LayoutLogin/>}
        </>
    )
}

export default LoginPage
