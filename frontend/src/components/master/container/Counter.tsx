import {GiSandsOfTime} from 'react-icons/gi'
import {MdCheckCircleOutline} from 'react-icons/md'
import {BiTimer} from 'react-icons/bi'
import {FaSignature} from 'react-icons/fa'
import {TiWarningOutline} from 'react-icons/ti'

const Counter = ({ mobile, unsolved, breach, ongoing, unassigned, solved }:{ mobile:boolean, unsolved:number, breach:number, ongoing:number, unassigned:number, solved:number }) => {
    return(
        <div>
            <div className={`carousel carousel-center max-w-md p-4 space-x-4 bg-white rounded-md mx-3 ${!mobile && "hidden"}`}>
                <div className="carousel-item">
                    <div className={`flex flex-row justify-between items-center py-3 px-4 w-full h-20 rounded-lg shadow-md`}>
                        <div className='flex flex-col h-full place-content-between'>
                            <h1 className='flex font-light text-xs text-secondary-focus'>Unsolved</h1>
                            <h1 className='flex font-bold text-lg text-secondary-focus'>{unsolved}</h1>                     
                        </div>
                        <GiSandsOfTime className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                    </div>
                </div> 
                <div className="carousel-item">
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Breach</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{breach}</h1>                       
                    </div>
                    <TiWarningOutline className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                </div> 
                <div className="carousel-item">
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>On Going</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{ongoing}</h1>                 
                    </div>
                    <BiTimer className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                </div> 
                <div className="carousel-item">
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Unassigned</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{unassigned}</h1>    
                    </div>
                    <FaSignature className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                </div> 
                <div className="carousel-item">
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Solved</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{solved}</h1>
                    </div>
                    <MdCheckCircleOutline className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                </div> 
            </div>

            <div className={`flex flex-1 mx-4 gap-2 ${mobile && "hidden"}`}>
                <div className={`flex flex-row justify-between items-center py-3 px-4 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Unsolved</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{unsolved}</h1>                     
                    </div>
                    <GiSandsOfTime className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Breach</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{breach}</h1> 
                    </div>
                    <TiWarningOutline className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>On Going</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{ongoing}</h1>   
                    </div>
                    <BiTimer className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Unassigned</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{unassigned}</h1>
                    </div>
                    <FaSignature className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
                <div className={`flex flex-row justify-between items-center py-3 px-5 w-full h-20 rounded-lg shadow-md`}>
                    <div className='flex flex-col h-full place-content-between'>
                        <h1 className='flex font-light text-xs text-secondary-focus'>Solved</h1>
                        <h1 className='flex font-bold text-lg text-secondary-focus'>{solved}</h1>
                    </div>
                    <MdCheckCircleOutline className='w-[40px] h-[40px] bg-primary text-white p-2 rounded-full'/>
                </div>
            </div>
        </div>
    )
}

export default Counter