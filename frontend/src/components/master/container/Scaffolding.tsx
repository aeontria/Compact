import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Compact from '../../../utils/compact'

import { BsChevronDown } from 'react-icons/bs'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { FaHome, FaList, FaSitemap, FaUserCog, FaShapes, FaClock, FaArrowLeft, FaSearch, } from 'react-icons/fa'
import { FiChevronsRight } from 'react-icons/fi'
import { IconType } from 'react-icons';

import React from 'react';
import Link from 'next/link';
import Navbar from '../navigation/Navbar'
// import LogoSubMenu from '../../../components/image/LogoSubMenu';
import ButtonSidebarShow from '../button/ButtonSidebarShow';
import axios from 'axios';
import Constant from '@/lib/constant.js'

const Scaffolding = ({pageContent}:any) => {

    const router = useRouter();

    type MenuItem = {
        name: string;
        link: string;
        icon: string;
      };
      
    type SubmenuItem = MenuItem;
    
    type Menu = {
        // name: "MENU", 
        // menu_id : 99,
        // menu_parent_id : null,
        // link: null, 
        // icon: null, 
        // submenu: false, 
        // submenuItems:[],
        // menuposition: 0,
        // title: true

        name: string;
        menu_id: number;
        menu_parent_id: number | null;
        link: string | null;
        icon: string | null;
        submenu: boolean;
        submenuItems: SubmenuItem[];
        menuposition: number,
        title: boolean
      };    
    
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuPos, setMenuPos] = useState(0);
    const [spinner, setSpinner] = useState(false);
    const menus = [
        {
            name: "MENU",
            title:true
        },
        {
            name: "Dashboard",
            link:'/dashboard',
            icon:<FaHome/>
        },
        {
            name: "Create Form",
            link:'/adminga',
            icon:<MdOutlineCreateNewFolder/>
        },        
        {
            name: "RnP", 
            link:'', 
            icon:<FaList/>, 
            submenu: true, 
            submenuItems:[
                {name:"Purchase",link:'/rnp/purchase', icon:<FaList/>},
                {name:"non Purchase",link:'/rnp/nonpurchase', icon:<FaList/>}
            ]
        },
        // {name: "Parent Menu 2", link:'', icon:<FaList/>, submenu: true, submenuItems:[
        //     {name:"Submenu 1",link:'/', icon:<FaList/>},
        //     {name:"Submenu 2",link:'/', icon:<FaList/>},
        //     {name:"Submenu 3",link:'/', icon:<FaList/>},
        // ]},
    ]

    const mobile = Compact()
    const [open, setOpen] = useState(false)
    const [submenuOpen, setSubMenuOpen] = useState<SubMenuOpen>({});
    const [menukiri, setMenukiri] = useState<any[]>([])
    // const [menukiri, setMenukiri] = useState(null)
    const [test, setTest] = useState('')

    interface SubMenuOpen {
        [key: string]: boolean;
    }

    const handleMenuClick = (menu: {name: string}) => {
        setSubMenuOpen({
          ...submenuOpen,
          [menu.name]: !submenuOpen[menu.name],
        });
    };

    const renderIcon = (param : any) => {

        // console.log("param icon", param);
        switch (param) {
            case 'FaList':
                return <FaList />
                console.log('Selected fruit is apple');
              break;
            case 'FiChevronsRight':
                return <FiChevronsRight />
                console.log('Selected fruit is banana');
              break;
            case 'orange':
              console.log('Selected fruit is orange');
              break;
            default:
              console.log('Selected fruit is unknown');
              break;
          }

    }

    const sliceString = (param:any) => {

        const maxLength = 15;
        const truncatedString = param.replace(
            new RegExp(`^(.{${maxLength - 3}}).+`), 
            '$1...'
          );    

        return truncatedString;

    }

    const handleClick = (param:any, path:any) => {


        const currentPath = router.asPath;
        let result = currentPath.replace('#', '');     

        console.log("request path", path);
        console.log("currentPath", result);

        if (path !== result) {
            router.push(path);
        }else{
            router.reload();
        }

    };

    useEffect(() => {
        const checkdata = async () => {

          if (localStorage.getItem('workflowMenu')) {
            
            let arrayAllMenu: Menu[] = []
            let myArray: SubmenuItem[] = []     

            arrayAllMenu.push({
                name: "MENU",
                menu_id: 99,
                menu_parent_id: null,
                link: null,
                icon: null,
                submenu: false,
                submenuItems: [],
                menuposition: 0,
                title: true,
            });

            var storedObj = await JSON.parse(localStorage.getItem('workflowMenu') || '{}');

            for await (const value of storedObj.values())
            {

                if(value.menu_parent_id === 0){
                    
                    arrayAllMenu.push({
                        name: value.menu_name, 
                        menu_id : value.menu_id,
                        menu_parent_id : value.menu_parent_id,
                        link: value.menu_link !== '#' ? value.menu_link : null, 
                        icon: value.menu_icon, 
                        submenu: false, 
                        submenuItems:[],
                        menuposition: value.menu_position,
                        title: false                        
                    });

                }               

            }


            for await (const value of storedObj.values())
            {

                if(value.menu_parent_id !== 0){

                    const index = arrayAllMenu.findIndex(object => {

                        if(object.menu_id === value.menu_parent_id){

                            myArray.push({
                                name: value.menu_name,
                                link: value.menu_link, 
                                icon: value.menu_icon
                            });        
                            
                            object.submenuItems = myArray;
                        }

                        return object.menu_id === value.menu_parent_id;
                      });

                    if (index !== -1) {

                        arrayAllMenu[index].submenu = true;                 
                        
                    }

                }                

            }

            var sortedArray = arrayAllMenu.sort(function(a, b) {
                return a.menuposition - b.menuposition 
            });

            setMenukiri(sortedArray);

          } else {
            console.log('The key does not exist.');
          }
        };
      
        checkdata();
      }, []);
      
      useEffect(() => {
      }, [menukiri]);

    return (
        <div className='flex font-poppins w-screen overflow-hidden'>
            
            {/* SIDEBAR */}
            <div className={`overflow-hidden ${mobile ? "fixed inset-0 z-50 mt-12 bg-primary-focus" : "bg-primary"}  flex-none duration-700 ${open ? "w-[210px] min-w-[210px]" : `${mobile ? "w-[0px] min-w-[0px]" : "w-[70px] min-w-[70px]"}`} h-screen overflow-y-auto`}>
                {/* Logo */}
                <div className={`sticky flex top-0 flex-col items-center mb-4 bg-primary ${open ? "mb-4" : "mb-14"} ${mobile && "hidden"}`}>
                    {/* <LogoSubMenu mobile={mobile}/> */}
                </div>
                
                {/* Search */}
                {/* <div className={`mx-4 flex items-center rounded-md bg-primary-focus mt-6 duration-500 ${mobile && "hidden"} ${!open ? "hidden" : "px-4"} py-2`}>
                    {open}
                    <FaSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`}/>
                    <input type={"search"} placeholder="Search" className={`placeholder-white placeholder-opacity-50 text-xs bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}>
                    </input>
                </div> */}

                {/* Menus */}
                <div className='flex h-screen'>
                    <div className='w-full'>
                        
                        {menukiri?.map((menu,i)=>(
                                <div key={i} className={`${isHovered ? 'hovered' : ''}`}>
                                    <Link  
                                        href={`${menu?.link === null ? "#" : '/'+menu?.link}`} key={i} onClick={() => handleMenuClick(menu)}
                                        className={`flex gap-x-2 text-xs font-medium py-2 ${!mobile ? (open ? 'mx-4 px-5' : 'mx-3 pl-3 pr-1 z-50') : 'mx-4 px-5'} rounded-md ${menu?.title ? "cursor-default mt-2 px-2" : "hover:bg-primary-focus"}`}
                                        onMouseEnter={() => {setIsHovered(true);setMenuPos(i)}}
                                        onMouseLeave={() => setIsHovered(false)}
                                        >
                                        <span className={`text-white duration-500 ${menu?.title && "hidden"} ${!mobile ? (open ? 'text-lg' : 'text-xl') : 'text-lg'}`} title={`${!open && (menu?.name)}`}>
                                            {menu?.icon ? renderIcon(menu?.icon) : ''} 
                                            </span>

                                        <span data-tip={menu?.name} className={`tooltip text-left flex-1 whitespace-nowrap text-primary-content float-left ${!open && !mobile && "scale-0"} `}>
                                            {!mobile ? (open ? sliceString(menu?.name) : ''): sliceString(menu?.name)}
                                        </span>
                                        {(isHovered && !open && !mobile) &&
                                            <div onMouseLeave={() => setIsHovered(false)} className={` -mt-2 py-[0.13rem] text-white rounded-r-lg bg-[#c21d93] w-1/5 absolute z-50 left-[50px] ${menu?.submenu && 'rounded-bl-xl'} ${(menu?.title) && "hidden"} ${isMenuPos == i ? '' : 'hidden'}`}>{(menu?.submenu) ? 
                                                menu?.submenu && (
                                                    <div className='justify-end'>
                                                        <ul>
                                                            {
                                                            menu?.submenuItems.length > 0 ?
                                                            menu?.submenuItems.map((submenuItems: { link: any; name: any; }, index: React.Key | null | undefined)=>(
                                                                <Link href={`${submenuItems?.link}`} key={index} className={`flex pl-3 mx-1 text-xs font-medium py-2 hover:text-[#f720bb]`}>
                                                                    {sliceString(submenuItems?.name)}
                                                                </Link>
                                                            ))
                                                            
                                                            : null

                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                                : <div className='flex pl-3 mx-1 text-xs font-medium py-2 hover:text-[#f720bb]'>{menu?.name}</div>}</div>
                                        }
                                        {menu?.submenu && open &&(
                                            <BsChevronDown className={`float-right text-white duration-500 ${submenuOpen[menu.name] && "rotate-180"}`}/>
                                        )}
                                        
                                    </Link>
                                    {/* {(isHovered && !open) && <div className="absolute flex items-center gap-x-2 text-xs font-medium py-2 left-20 top-20 z-50 bg-red-400"> */}
                                    {/* {menu?.link} */}
                                    {/* </div>} */}
                                    {menu?.submenu && open && (
                                        <div className={`${submenuOpen[menu.name] ? "" : "hidden scale-0"}`} >
                                            
                                            <ul >
                                                {menu?.submenuItems.map((submenuItems: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; link: any; icon: any; }, index: React.Key | null | undefined)=>(
                                                    
                                                    <a onClick={(e) => handleClick(e, `${submenuItems?.link}`)} data-tip={submenuItems?.name} 
                                                        key={index} className={`rnp_link_submenu_kiri tooltip text-left flex mx-4 items-center text-xs gap-2.5 font-medium py-2 rounded-md hover:bg-primary-focus`}>
                                                        <span className='text-white opacity-50 ml-6'>
                                                            { renderIcon(submenuItems?.icon) }
                                                        </span>
                                                        <span className='ml-1 text-white'>
                                                            {submenuItems?.name}
                                                        </span>
                                                    </a>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            
            <div className={`flex flex-col h-screen w-full`}>
                {/* HEADER */}
                <div className={`flex h-12 ${mobile ? "bg-primary top-0" : "bg-gray-200"}`}>
                    <ButtonSidebarShow onClick={()=>setOpen(!open)} statOpen={open}/>
                    {/* <div className={`${!mobile && "hidden"}`}><LogoSubMenu mobile={mobile}/></div> */}
                    <Navbar mobile={mobile}/>
                </div>
                
                {/* CONTENT */}
                <div className='overflow-y-auto'>
                    {pageContent}
                </div>
            </div>
        </div>
    );
}

export default Scaffolding