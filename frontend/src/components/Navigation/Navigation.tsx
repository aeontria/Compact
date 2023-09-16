import { useCallback, useEffect, useState } from "react"
import Image from 'next/image'
import { MdArrowBack, MdClose, MdMenu, MdSearch, MdSettings, MdViewCompact } from "react-icons/md"
import Compact from "@/utils/compact"
import router from "next/router"
import Link from "next/link"
import axios from "axios"
import * as Icons from "react-icons/ri"
import TextSubtitle from "../TextSubtitle"
import { BsCheckCircleFill, BsFillExclamationCircleFill } from "react-icons/bs"

const Navigation = (props:any) => {
    const mobile = Compact()
    const [token, setToken] = useState<string | null>(null)
    const endpoint = process.env.NEXT_PUBLIC_EP

    const [openMenu, setOpenMenu] = useState(true)
    const [openArena, setOpenArena] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)

    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('cgrDataDetail')!))
    const [menuCategory, setMenuCategory] = useState<any[]>([])
    const [menuCategoryActive, setMenuCategoryActive] = useState<any[]>([])
    const [menus, setMenus] = useState<any[]>([])
    const [allData, setAllData] = useState<any[]>([])

    const [search, setSearch] =useState('')

    const [dailyQuota, setDailyQuota] = useState(0)
    const storedToken = localStorage.getItem('cgrToken')

    type IconNames = keyof typeof Icons; 

    // NOTIF
    const [showNotification, setShowNotification] = useState(false)
    const [statNotif, setStatNotif] = useState(true)
    const [msgNotif, setMsgNotif] = useState('')

    const fetchData = useCallback(async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('cgrToken')}`,
            },
          };
          const response = await axios.post(endpoint + 'redemption/get-config', {}, config);
          setDailyQuota(response.data.data);

        } catch (error) {
          // Handle error here
        }
      }, []);

        useEffect(() => {
            fetchData()
      }, [router,fetchData])

    // useEffect(() => {
    //     if (!storedToken) {
    //       router.push('/login')
    //     } else {
    //       setToken(storedToken)
    //       fetchAllMenu()
    //     }
    //   }, [router,fetchAllMenu])

      // const groupedData = menus.reduce((res, menu) => {
      //   const existingParent = res.find((item:any) => item.parent === menu.parent);
      //   if (existingParent) {
      //       existingParent.menus.push(menu);
      //   } else {
      //     res.push({ parent: menu.parent, menus: [menu] });
      //   }
      //   return res;
      // }, []);

    // const DynamicIcon = ({ icon }: { icon: IconNames }) => {
    //     const IconComponent = Icons[icon];
      
    //     if (!IconComponent) {
    //       return <Icons.RiLoaderFill/>;
    //     }
      
    //     return <IconComponent/>;
    // };

    // const handleSearch = (inputText:any) =>{
    //     setSearch(inputText)
    // }

    // useEffect(()=>{
    //     if(mobile)
    //     {
    //         setOpenMenu(false)
    //     }
    // },[mobile])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await menuCategory
    //         {
    //             search ? setAllData(res.filter((item:any) =>
    //             Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase()))) : setAllData(res)
    //         }
    //     }
    //     fetchData()
    // }, [search])
    
    function handleSaveQuota() {
        const x = {
            p_new_quota:dailyQuota
        }
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('cgrToken')}`,
            },
        };

        axios.post(`${endpoint}redemption/update-config`,x, config)
            .then(response => {
                setStatNotif(true)
                setMsgNotif('Quota has been updated')
                setShowNotification(true)
                setOpenArena(false)
                setTimeout(() => {
                    setShowNotification(false)
                  }, 2000)
                
            })
            .catch(error => {
        })
    }

    return (
        <div className='flex flex-row w-screen h-screen'>
            {
          showNotification &&
              <div className={`absolute max-w-[80%] top-5 right-5 z-10`}>
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
            <div id="sidebar" className={`hidden flex-col h-screen overflow-x-hidden overflow-y-hidden ${openMenu ? (mobile ? 'w-[300px]':'w-[320px]') : 'w-0'} duration-700 bg-primary ${mobile ? 'absolute z-10' : 'relative'}`}>
                <div className={`flex mt-4 mb-5 mx-5 items-center ${mobile ? ' justify-between' : 'justify-center'}`}>
                    <Link href={'/dashboard'}>
                        <Image
                            src={'/aeonstore.jpg'}
                            width={mobile ? 100:150} height={10}
                            alt='Arena'
                            className={` ${openMenu ? 'duration-[2000ms]':' opacity-0'} items-start`}/>
                    </Link>
                    <MdArrowBack className={`text-white ${!mobile && 'hidden'}`} onClick={() => setOpenMenu(!openMenu)}/>
                </div>

                <div className={`flex flex-col h-full  gap-1 overflow-y-auto ${openMenu ? 'duration-[2000ms]':'opacity-0'}`}>
                  <label className={`flex flex-row text-xs text-white mx-1 p-3 rounded-lg items-center h-5 mt-2 -mb-3 uppercase font-semibold opacity-50`}>Menu</label>
                  {/* {
                    groupedData.map((parent:any) => (
                      <ul key={parent.parent} className="menu menu-xs w-full">
                          <li>
                            <details>
                              <summary className="text-white ml-3 hover:text-white hover:bg-primary-focus">
                                <div className="py-1 ">{parent.parent}</div>
                              </summary>
                              <ul>
                              {
                                parent.menus.map((menu:any) => (
                                  <Link href={menu.url} className="flex flex-row gap-2 text-xs cursor-pointer text-white p-2 hover:bg-primary-focus rounded-md" key={menu.id}>
                                    <DynamicIcon icon={menu.icon}/>
                                    {menu.menu}
                                  </Link>
                                ))
                              }
                              </ul>
                            </details>
                          </li>
                      </ul>
                    ))
                  }   */}
                </div>
              </div>
              <div className={`flex flex-col w-full duration-1000`}>

                <div className={`justify-between flex flex-row w-full items-center  bg-gray-100 px-3 gap-1 py-3`}>
                <TextSubtitle text={`${mobile ? 'Customer Gift' : 'Customer Gift Redemption'}`}/>
                {/* <Image
                        src={'/aeonstore.jpg'}
                        width={50} height={10}
                        alt='Arena'
                        className={`mx-2 p-1`}/> */}
                    {/* <MdMenu className={`flex text-3xl text-primary h-10 w-10 hover:bg-gray-200 rounded-3xl p-2 cursor-pointer mx-3 ${!mobile && ''}`} onClick={() => setOpenMenu(!openMenu)}/> */}
                    {/* <div className={`hidden z-10 relative bg-white w-[500px] rounded-2xl p-1 items-center px-3 gap-1`}>
                           
                        <div className={`${(search.length < 3) ? 'h-0 text-white' : 'max-h-[210px]'} overflow-y-auto -z-10 duration-300 w-[500px] flex top-5 left-0 bg-white absolute rounded-b-2xl`}>
                            <div className="w-full h-full p-2 m-2">
                                {
                                    allData.map((item:any,index:number)=>(
                                        <Link href={item.isactive ? (item.sso ? (item.url + 'sso?token=' + localStorage.getItem('_XPlow') + 'x5*y84fw3421ss35-f43t=' + item.sso) :  item.url) : '#' } target={`${item.isactive ? '_blank' : ''}`} className="w-full justify-between flex flex-row items-center py-1 px-2 border-b-[0.5px] cursor-pointer" key={index}>
                                            <div className={`text-xs font-bold gap-2 flex flex-row ${item.isactive ? 'text-primary':'text-gray-300'}`}><DynamicIcon icon={item.icon}/>{item.menu}</div>
                                            <div className="text-[10px] text-gray-300 ">{item.category}</div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                        <input type={'text'} value={search} placeholder={'search application'} className={` text-xs text-gray-400 w-full appearance-none focus:outline-none focus:shadow-outline p-1 rounded-xl`} onChange={(e)=>handleSearch(e.target.value)}/>
                        <MdSearch className="text-primary"/> 
                        <MdClose onClick={()=>setSearch('')} className="text-secondary rounded-3xl cursor-pointer hover:bg-gray-200"/>
                    </div> */}
                    

                    <div className={`flex flex-row gap-1 ${openMenu && mobile && 'opacity-5'}`}>
                     
                        <MdSettings onClick={()=>{setOpenArena(!openArena);setOpenProfile(false)}}  className={` btn btn-sm btn-circle btn-primary p-1 cursor-pointer`}/>
                        <div onClick={()=>{setOpenProfile(!openProfile);setOpenArena(false)}}  className={`${openMenu && mobile && ''} duration-1000 flex max-w-sm px-4 py-2 text-xs gap-1 bg-primary rounded-2xl justify-center cursor-pointer hover:bg-primary-focus`}>
                            <div className='text-white opacity-50'>
                                Login as
                            </div>
                            <div className='text-white font-bold'>
                                {userData[0].name}
                            </div>
                        </div>
                    </div>
                </div>
{/* 
                <div className={`${search == '' ? 'h-0' : 'h-1/2'} duration-1000 w-full flex top-16 bg-secondary`}>

                </div> */}

                <div id='content' className={`flex w-full overflow-y-hidden`}>
                    {props.content}
                </div>


            </div>

            <div className={`${!openArena && 'hidden'} ${mobile ? 'w-full mt-16 px-3' : 'right-3 mt-[70px]'} flex justify-center absolute`}>
                {/* <div className={`w-[300px] ${openMenu && mobile && 'opacity-0'} duration-1000 bg-gray-200 shadow-md shadow-gray-300 rounded-[40px] p-2`}> */}
                    {/* <div className={` max-h-[500px] w-full bg-gray-100 rounded-[33px] overflow-y-auto p-2 flex-wrap flex flex-col`}> */}
                    <div className={` max-h-[500px] w-full bg-gray-100 rounded-md overflow-y-auto p-2 flex-wrap flex flex-col`}>
                            {/* <div className=" text-xs">Total Quota</div>
                            <div className={`flex justify-center text-sm w-full py-2 px-3 text-gray-700 leading-tight font-bold`}>4000</div>
                            <div className=" text-xs">Total Quota Remaining</div>
                            <div className={`flex justify-center text-sm w-full py-2 px-3 text-gray-700 leading-tight font-bold`}>3500</div> */}
                            <div className=" text-xs">Maximum Daily Quota</div>
                            <div className="flex flex-row gap-2 items-center">
                            <input type="number" min={0} value={dailyQuota} name="dailyQuota" id="dailyQuota" placeholder="Daily Quota" className="input input-sm input-bordered w-full mb-3 text-xs" onChange={(dailyQuota) => setDailyQuota(parseInt(dailyQuota.target.value))} />
                                <div className="flex rounded-md bg-secondary p-2 text-xs text-white cursor-pointer" onClick={()=>{handleSaveQuota()}}>Save</div>
                            </div>
                            {/* {
                                menuCategoryActive.map((item:any,index:number)=>(
                                    <Link href={item.isactive ? (item.sso ? (item.url + 'sso?token=' + localStorage.getItem('_XPlow') + 'x5*y84fw3421ss35-f43t=' + item.sso) :  item.url) : '#' } target={`${item.isactive ? '_blank' : ''}`} key={index} className={`flex flex-col w-1/2 px-3 justify-center items-center gap-1 cursor-pointer hover:animate-pulse`}>
                                        <div className=" text-5xl text-primary"><DynamicIcon icon={item.icon}/></div>
                                        <h1 className="flex text-secondary text-xs whitespace-nowrap truncate ">{item.menu}</h1>
                                    </Link>
                                ))
                            } */}
                    </div>
                {/* </div> */}
            </div>

            <div className={`${!openProfile && 'hidden'} right-3 mt-[55px] flex justify-center absolute cursor-pointer`}>
                <Link href={'/logout'} className={`flex flex-row duration-1000 h-10 w-[250px] items-center justify-center gap-1 bg-white border-2 border-primary shadow-md shadow-gray-300 rounded-3xl p-2`}>
                    {/* <div className={`h-full w-full bg-gray-100 rounded-[33px]`}> */}
                        <Icons.RiCloseCircleFill className="text-primary"/>
                        <h1 className="text-primary">Logout</h1>
                    {/* </div> */}
                </Link>
            </div>
        </div>
    )
}

export default Navigation