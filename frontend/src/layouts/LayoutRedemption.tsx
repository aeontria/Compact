import { useEffect, useState, useRef, useCallback } from "react"
import Compact from "@/utils/compact";
import axios from "axios";
import Image from 'next/image'
import { BsCheckCircleFill, BsFillExclamationCircleFill } from "react-icons/bs";
// import { io } from "socket.io-client";

// const socket = io('https://1f2bbp5n-3027.asse.devtunnels.ms',{
//         path: '/socket.io',
//         transports: ['websocket'],
//         secure: true,
//     });

const LayoutRedemption = (props: any) => {
    const mobile = Compact()
    const [qrCode, setQrCode] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [data,setData]=useState([])
    const [giftRemaining, setGiftRemaining] = useState(0)

    // const socket = io('ws://localhost:3022',{
    //   transports: ['websocket'],
    // });

    const endpoint = process.env.NEXT_PUBLIC_EP
    
    // NOTIF
    const [showNotification, setShowNotification] = useState(false)
    const [statNotif, setStatNotif] = useState(true)
    const [msgNotif, setMsgNotif] = useState('')

    const getRemaining = useCallback(async () => {
        try {
          // const config = {
          //   headers: {
          //     Authorization: `Bearer ${localStorage.getItem('cgrToken')}`,
          //   },
          // };
          
          const response = await axios.post(endpoint + 'redemption/get-remaining', {}, {});
          setGiftRemaining(response.data.data);
        } catch (error) {
          // Handle error here
        }
      }, [setGiftRemaining, endpoint]);

    useEffect(()=>{
      getRemaining()
    },[getRemaining])

    const handleSubmitData = useCallback(async (event:any) => {
        event.preventDefault()
        try {
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('cgrToken')}`,
            //     },
            // };

            const x = {
                in_qr:qrCode.substring(0,10)
            };
            // console.log(x)
            await axios.post(endpoint + 'redemption/submit', x, {})
            .then(response => {
                // console.log(response.data)
                setStatNotif(response.data.status)
                setMsgNotif(response.data.message)
                setShowNotification(true)
                setTimeout(() => {
                  setShowNotification(false)
                }, 2000)
            })
            .catch(error => {
                console.error(error);
            });
        } catch (error) {
            setQrCode('')
          // Handle error here
        }
        // socket.emit('in_chat');
        getRemaining()
        setQrCode('')
      }, [
        endpoint,
        qrCode
      ]
    );

    // useEffect(() => {
      // socket.on('out_chat', (message) => {
      //   getRemaining()
      // });
    
      // return () => {
      //   socket.off('out_chat');
      // };
  //  }, []);

    return(
      <>
        {
          showNotification &&
              <div className={`absolute max-w-[80%] top-5 right-5`}>
                {
                  statNotif ?
                    <div className='flex flex-row h-20 bg-success justify-center items-center gap-1 p-3 shadow-md radius-xs rounded-lg'>
                        <span className='text-white'><BsCheckCircleFill/></span>
                        <span className={`${mobile && 'text-xs'} text-white`}>{msgNotif}</span>
                    </div>:
                        <div className='flex flex-row h-20 border-white border-2 bg-error justify-center items-center gap-1 p-3 shadow-md radius-xs rounded-lg'>
                        <span className='text-white'><BsFillExclamationCircleFill/></span>
                        <span className={`${mobile && 'text-xs'} text-white`}>{msgNotif}</span>
                    </div>
                }
              </div>
        }
        <div className="flex w-full overflow-y-hidden h-screen bg-primary">
            <div className="flex flex-col w-full h-full px-5 items-center">

                <form className='flex flex-col w-full items-center justify-center' onSubmit={handleSubmitData}>
                <Image
                        src={'/aeonstore.jpg'}
                        width={250} height={10}
                        alt='Arena'
                        className={`p-1 mb-5`}/>
                    <input
                        className={`flex appearance-none border rounded text-sm ${mobile ? 'w-full' : 'w-1/3'}  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        onChange={(e)=>setQrCode(e.target.value)} type="text" placeholder={`Scan Barcode`} value={qrCode}
                        autoFocus>
                    </input>
                </form>

                <div className={`${mobile ? 'w-full' : 'w-1/3'} flex w-1/3 h-1/3 bg-white mt-5 rounded-lg flex-col items-center p-5 justify-center`}>
                    <div className="text-secondary">Remaining</div>
                    <div className="text-primary text-[100px] font-bold">{giftRemaining}</div>
                </div>
            </div>
        </div>
      </>
    )
}

export default LayoutRedemption