import Head from 'next/head';
import LayoutRedemption from '@/layouts/LayoutRedemption';

const Index = () => {
    return(
        <div className='bg-white'>
            <Head>
                <title>Customer Gift Redemption - PT. AEON Indonesia</title>
            </Head>
            {
                <LayoutRedemption/>
            }
        </div>
    )
}

export default Index;
