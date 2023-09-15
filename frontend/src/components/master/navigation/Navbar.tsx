import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {BsFillCaretDownFill} from 'react-icons/bs'
import {HiBellAlert} from 'react-icons/hi2'
import NotificationCome from '../notification/NotificationCome';
import TextInitial from '../text/TextInitial';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';
import styles from "@/styles/NotificationPopupDiv.module.css";

// import { myFunction } from '../../lib/checklogin';

interface Props {
  onClickOutside: () => void;
  onClickOutsideDua: () => void;
}

const Navbar = ({ mobile }:{ mobile:boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const refDua = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);
    const router = useRouter();
    const logout = (param:any) => {
      localStorage.removeItem('data');
      window.location.href = "/";
    }
    
    const setOpenLogOut = () => {
      setOpenNotif(!openNotif);
      if(open === true){
        setOpen(false);
      }       
    }

    const setOpenDiv = (param:any) => {

      setOpen(!open);
      if(openNotif === true){
        setOpenNotif(false);
      }  

    }

    // const onClickOutside = () => {
    //   setOpen(false);
    // }

    // const onClickOutsideDua = () => {
    //   setOpenNotif(false);
    // }

    useEffect(() => {
      // myFunction('Param', 123);

      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          // onClickOutside();
        }
      };

      const handleClickOutsideDua = (event: MouseEvent) => {
        if (refDua.current && !refDua.current.contains(event.target as Node)) {
          // onClickOutsideDua();
        }
      };      

      document.addEventListener("mousedown", handleClickOutside);

      document.addEventListener("mousedown", handleClickOutsideDua);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("mousedown", handleClickOutsideDua);
      };      

    }, [ref, refDua])    

    return(
      <div ref={ref} className="h-12 flex flex-grow items-center justify-end px-3">
        <NotificationCome mobile={mobile} count={10} divLogout={openNotif} setOpenDiv={setOpenLogOut}/>
        <div ref={refDua} className={`origin-top-right absolute right-0 top-11 mt-2 ${mobile ? 'w-full '+ styles.divPopUpNotifFull : 'w-90 ' + styles.divPopUpNotif} rounded-sm px-5 ${!openNotif && "hidden"}`}>
        <div className={styles.divDalamNotif}>
          <div className="p-4 rounded-md bg-white shadow-md overscroll-contain">
              {/* <div className="border-t border-gray-100"></div> */}
              <div className="flex flex-row justify-between">
                  <div className={styles.itheadSection+" flex"}>Notifications</div>
              </div>
              <ul className={styles.listUlNotification}>
                  <li><a>Tracking ID #242424. Your process has been updated</a></li>
                  <li><a>Tracking ID #242424. Your process has been updated</a></li>
                  <li><a>Tracking ID #242424. Your process has been updated</a></li>
              </ul>
          </div>          
        </div>
        </div>
        <TextInitial text='Arnando Harlianto'/>
        <BsFillCaretDownFill className={`float-right duration-500 cursor-pointer ${mobile ? "text-white" : "text-primary"}`} onClick={()=>setOpenDiv("LogOut")}/>

        <div className={`origin-top-right absolute right-1 top-11 mt-2 w-56 rounded-md shadow-lg ${!open && "hidden"} z-50`}>
          <div className="py-1 rounded-md bg-white shadow-xs">
            {/* <div className="border-t border-gray-100"></div> */}
            <Link onClick={logout} className={`block px-4 py-2 text-sm hover:bg-gray-100 transition duration-150 ease-in-out text-primary`} href={''}>Logout</Link>
          </div>
        </div>

      </div>
    )
}

export default Navbar