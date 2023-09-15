// @ts-nocheck

import router from "next/router"
import { useEffect, useState } from "react"
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"
import ButtonShowModal from '@/components/button/ButtonShowModal';
import ButtonAction from '@/components/button/ButtonAction';
import { AiFillInfoCircle, AiFillDelete } from "react-icons/ai";
import InputDropDownFormSecond from '@/components/input/InputDropDownFormSecond';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const TableTicket = (props: any) => {
    const mobile = props.mobile
    const data = props.data
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };
  

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };    


    const dataDepartment = [
        {
            name:"Purchase",
            value:1,
        },
        {
            name:"Non Purchase",
            value:2
        }
    ]      


    const dataPurpose = [
        {
            name:"Purchase",
            value:1,
        },
        {
            name:"Non Purchase",
            value:2
        }
    ]      


    useEffect(() => {

    }, [data])

    return (
        <>
            <div>
                <div className="overflow-x-auto m-4">
                    <table className="table table-compact w-full">
                        {/* <!-- head --> */}
                        <thead className="border-y">
                        <tr>
                            <th className="bg-gray-200 w-[7%] border-solid border-t border-slate-300 tableHeaderStyle text-gray-400 font-medium text-xs"></th>
                            <th className="bg-gray-200 w-[33%] border-solid border-t border-slate-300 tableHeaderStyle text-gray-400 font-medium text-xs">Name</th>
                            <th className="bg-gray-200 w-[30%] border-solid border-t border-slate-300 tableHeaderStyle text-gray-400 font-medium text-xs">No Ticket</th>
                            <th className="bg-gray-200 w-[20%] border-solid border-t border-slate-300 tableHeaderStyle text-gray-400 font-medium text-xs">Status</th>
                            <th className="bg-gray-200 w-[10%] border-solid border-t border-slate-300 tableHeaderStyle text-gray-400 font-medium text-xs">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* <!-- row 1 --> */}
                        <tr>
                            <th className="border-solid border-t border-slate-300 text-xs text-center">1</th>
                            <td className="border-solid border-t border-slate-300 text-xs">
                                <h1 className="font-bold text-primary">Anya Manggar</h1>
                                <h1 className="text-primary">IT</h1>
                            </td>
                            <td className="border-solid border-t border-slate-300 text-xs">
                                <h1 className="font-bold text-primary">RNP-20230516993324-EM001889</h1>
                                <h1 className="text-primary">2023-05-17 09:08:12</h1>
                            </td>
                            <td className="border-solid border-t border-slate-300 text-xs">Blue</td>
                            <td className="border-solid border-t border-slate-300 text-xs"><ButtonShowModal icon={<AiFillInfoCircle />} label={""} actionButton={undefined}/> <ButtonAction icon={<AiFillDelete />} label={""} actionButton={undefined}/></td>
                        </tr>
                        {/* <!-- row 2 --> */}
                        <tr>
                            <th className="border-solid border-t border-slate-300 bg-gray-100 text-xs text-center">2</th>
                            <td className="border-solid border-t border-slate-300 bg-gray-100 text-xs">
                                <h1 className="font-bold text-primary">Anya Manggar</h1>
                                <h1 className="text-primary">IT</h1>                                
                            </td>
                            <td className="border-solid border-t border-slate-300 bg-gray-100 text-xs">
                                <h1 className="font-bold text-primary">RNP-20230516993324-EM001889</h1>
                                <h1 className="text-primary">2023-05-17 09:08:12</h1>                                
                            </td>
                            <td className="border-solid border-t border-slate-300 bg-gray-100 text-xs">Purple</td>
                            <td className="border-solid border-t border-slate-300 bg-gray-100 text-xs"><ButtonShowModal icon={<AiFillInfoCircle />} label={""} actionButton={undefined}/> <ButtonAction icon={<AiFillDelete />} label={""} actionButton={undefined}/></td>
                        </tr>
                        {/* <!-- row 3 --> */}
                        <tr>
                            <th className="border-solid border-t border-slate-300 text-xs text-center">3</th>
                            <td className="border-solid border-t border-slate-300 text-xs">
                                <h1 className="font-bold text-primary">Anya Manggar</h1>
                                <h1 className="text-primary">IT</h1>                                
                            </td>
                            <td className="border-solid border-t border-slate-300 text-xs">
                                <h1 className="font-bold text-primary">RNP-20230516993324-EM001889</h1>
                                <h1 className="text-primary">2023-05-17 09:08:12</h1>                                
                            </td>
                            <td className="border-solid border-t border-slate-300 text-xs">Red</td>
                            <td className="border-solid border-t border-slate-300 text-xs"><ButtonShowModal icon={<AiFillInfoCircle />} label={""} actionButton={undefined}/> <ButtonAction icon={<AiFillDelete />} label={""} actionButton={undefined}/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                {/* Modal */}
                <div className="modal modal-close">
                <div className="modal-box w-11/12 max-w-5xl h-screen">
                    <div className="rnp_header_modal_detail_transaksi border-b pb-3">
                        <button className="btn btn-circle absolute right-5 top-4 btn-sm bg-transparent border-none text-gray-600 hover:bg-transparent focus:outline-none p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h3 className="font-bold text-lg">Detail Request</h3>
                    </div>

                    
                    <div className="flex flex-row justify-between">
                       
                       {/* Left */}
                        <div className="w-3/4 border-r-2 pt-5">
                            
                            <div className="tabs">
                                <a
                                    className={`text-xs tab tab-lifted ${activeTab === 0 ? 'tab-active' : ''}`}
                                    onClick={() => handleTabClick(0)}
                                >
                                    Header
                                    
                                </a>
                                <a
                                    className={`text-xs tab tab-lifted ${activeTab === 1 ? 'tab-active' : ''}`}
                                    onClick={() => handleTabClick(1)}
                                >
                                    Detail
                                </a>
                                <a
                                    className={`text-xs tab tab-lifted ${activeTab === 2 ? 'tab-active' : ''}`}
                                    onClick={() => handleTabClick(2)}
                                >
                                    List Detail
                                </a>
                                
                            </div>

                            <div className="tab-content">
                                <div
                                    key={0}
                                    className={` text-sm pr-5 pt-5 w-full tab-pane ${activeTab === 0 ? 'tab-pane-active' : ''}`}
                                >                                  

                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Application Name"}>Application Name</label>
                                            <input
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            
                                            placeholder={`Enter`}> 
                                            </input>
                                        </div>

                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Position Name"}>Position Name</label>
                                            <input
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            placeholder={`Enter`}> 
                                            </input>
                                        </div>                                 
                                    </div>

                                    <div className="flex flex-row gap-5">
                                        <div className="flex flex-row gap-5 w-1/2" >
                                            <div className="flex flex-col gap-1 w-2/5">
                                                <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Department"}>Department</label>
                                                <input
                                                className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                placeholder={`Enter`}> 
                                                </input>
                                            </div>     

                                            <div className="flex flex-col gap-1 w-3/5">
                                                <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Cost Center"}>Cost Center</label>
                                                <div className='flex mb-5'>
                                                    <label className="block text-secondary-focus text-sm text capitalize w-1/2" htmlFor={props.label}>{props.label}</label>        
                                                        <select className="select select-secondary appearance-none border border-primary rounded text-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none select-sm w-full" onChange={props.onSelect} id={props.label}>
                                                            {dataDepartment.map((option:any) => (
                                                                <option key={option.value} value={option.name}>
                                                                    {option.name}
                                                                </option>
                                                        ))}
                                                        </select>
                                                </div>
                                            </div> 
                                        </div>
     
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Purpose"}>Purpose</label>
                                            <div className='flex mb-5'>
                                                <label className="block text-secondary-focus text-sm text capitalize w-1/2" htmlFor={props.label}>{props.label}</label>        
                                                    <select className="select select-secondary appearance-none border border-primary rounded text-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none select-sm w-full" onChange={props.onSelect} id={props.label}>
                                                        {dataPurpose.map((option:any) => (
                                                            <option key={option.value} value={option.name}>
                                                                {option.name}
                                                            </option>
                                                    ))}
                                                    </select>
                                            </div>
                                        </div>                                      

                                    </div>

                                    <div className="flex flex-row gap-5">
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Requisition / Proposal"}>Requisition / Proposal</label>
                                            <textarea
                                            className="appearance-none h-56 border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            id={"Requisition / Proposal"} placeholder={`Enter`}>
                                            </textarea>
                                        </div>                                          
                                    </div>                                    

                                </div>

                                <div
                                    key={1}
                                    className={`text-sm pr-5 pt-5 w-full tab-pane ${activeTab === 1 ? 'tab-pane-active' : ''}`}
                                >
                                    

                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Content"}>Content</label>
                                            <textarea
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            id={"Content"} placeholder={`Enter`} rows={6}>
                                            </textarea>
                                        </div>                                          
                                    </div> 

                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Purpose"}>Purpose</label>
                                            <textarea
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            id={"Content"} placeholder={`Enter`} rows={6}>
                                            </textarea>
                                        </div>                                          
                                    </div>  

                                    <label className="mt-5 block text-secondary-focus text-xs text capitalize" htmlFor={"Type of RnP"}>Type of RnP</label>
                                    <div className="flex flex-row gap-5">
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Item Buying Assets</span>
                                            </label>
                                        </div>    
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Item Buying Routine</span>
                                            </label>
                                        </div>  
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Item Buying Non Routine ( Non Asset )</span>
                                            </label>
                                        </div>                                                                                                                      
                                    </div>       

                                    <div className="flex flex-row gap-5">
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Item Buying & Repairment - Caused Damage</span>
                                            </label>
                                        </div>    
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Payment</span>
                                            </label>
                                        </div>  
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Project</span>
                                            </label>
                                        </div>    
                                        <div className="form-control">
                                            <label className="cursor-pointer label mb-0 pb-0">
                                                <input type="checkbox" className="checkbox checkbox-sm mr-3" />
                                                <span className="label-text text-xs">Other</span>
                                            </label>
                                        </div>                                                                                                                                                            
                                    </div>                                                                    

                                    <div className="flex flex-row gap-5 mt-5">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Start using date"}>Start using date</label>
                                            <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            />
                                        </div>     

                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Budget Control"}>Budget Control</label>
                                            <input
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            placeholder={`Enter`}> 
                                            </input>
                                        </div>                                    
                                    </div>     

                                    <div className="flex flex-row gap-5 mt-5">
                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Amount"}>Amount (IDR)</label>
                                            <input
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            placeholder={`Enter`}> 
                                            </input>
                                        </div>      

                                        <div className="flex flex-col gap-1 w-1/2">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"mm/yy"}>mm/yy</label>
                                            <input
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            placeholder={`Enter`}> 
                                            </input>
                                        </div>                                    
                                    </div>  

                                    <div className="flex flex-row gap-5 mb-3 mt-3">
                                        <div className="flex flex-col gap-1 w-full">
                                            <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"reason"}>{`If you select "No" or "Over Budget". Reason`}</label>
                                            <textarea
                                            className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                            id={"Content"} placeholder={`Enter`} rows={6}>
                                            </textarea>
                                        </div>                                          
                                    </div>    

                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                        <fieldset className="border border-solid border-gray-300 p-3">
                                            <legend className="text-xs font-bold">Other Information</legend>
                                            <div className="flex flex-row gap-5">
            
                                                <div className="flex flex-col gap-1 w-[30%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Order Expected Date"}>Order Expected Date</label>
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={handleDateChange}
                                                        dateFormat="dd/MM/yyyy"
                                                        className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    />
                                                </div>     

                                                <div className="flex flex-col gap-1 w-[45%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Cost Center"}>Department in charge of ordering</label>
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>            
                                                <div className="flex flex-col gap-1 w-[45%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Purpose"}>Person in charge of ordering</label>
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>                                      

                                            </div>

                                            <div className="flex flex-row gap-5 mb-3 mt-3">
                                                <div className="flex flex-col gap-1 w-full">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"If you already ordered the reason and prevention measures"}>If you already ordered the reason and prevention measures</label>
                                                    <textarea
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    id={"Content"} placeholder={`Enter`} rows={6}>
                                                    </textarea>
                                                </div>                                          
                                            </div>                                             
                                        </fieldset>
                                        </div>                                          
                                    </div>      


                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                        <fieldset className="border border-solid border-gray-300 p-3">
                                            <legend className="text-xs font-bold">Suplier Detail</legend>
                                            <div className="flex flex-row mb-3 mr-5">
                                                <div className="flex flex-col gap-1 w-[50%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Suplier Name"}>Supplier Name</label>
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>                                     
                                            </div>

                                            <div className="flex flex-row gap-5">
                                                <div className="flex flex-col gap-1 w-[50%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Supplier person in charge"}>Supplier person in charge</label>
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>       
                                                <div className="flex flex-col gap-1 w-[50%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Phone Number"}>Phone Number</label>
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>                                                                                
                                            </div>                                            
                                            
                                        </fieldset>
                                        </div>                                          
                                    </div>    

                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                        <fieldset className="border border-solid border-gray-300 p-3">
                                            <legend className="text-xs font-bold">Payment Detail</legend>

                                            <div className="flex flex-row gap-5">
                                                <div className="flex flex-col gap-1 w-[50%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Method of Payment"}>Method of Payment</label>
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>       
                                                <div className="flex flex-col gap-1 w-[50%]">
                                                    <label className="block text-secondary-focus text-xs text capitalize" htmlFor={"Payment date (Term)"}>Payment date (Term)</label>
                                                    <DatePicker
                                                        selected={selectedDate}
                                                        onChange={handleDateChange}
                                                        dateFormat="dd/MM/yyyy"
                                                        className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    />
                                                </div>                                                                                
                                            </div>                                            
                                            
                                        </fieldset>
                                        </div>                                          
                                    </div>                                                                      

                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                        <fieldset className="border border-solid border-gray-300 p-3">
                                            <legend className="text-xs font-bold">Attachment Document</legend>

                                            <div className="flex flex-row gap-5">
                                                <div className="flex flex-col gap-1 w-full">
                                                    <input
                                                    className="appearance-none border border-primary rounded text-xs w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                                    placeholder={`Enter`}> 
                                                    </input>
                                                </div>                                                                                       
                                            </div>                                            
                                            
                                        </fieldset>
                                        </div>                                          
                                    </div> 

                                </div>      

                                <div
                                    key={2}
                                    className={`tab-pane ${activeTab === 2 ? 'tab-pane-active' : ''}`}
                                >
                                    <div className="flex flex-row gap-5 mb-3">
                                        <div className="flex flex-col gap-1 w-full">
                                        <fieldset className="border border-solid border-gray-300 p-3">
                                            <legend className="text-xs font-bold">Item</legend>

                                            <div className="flex flex-row gap-5">
                                                <div className="flex flex-col gap-1 w-[50%]">
                                                    <table className="table ">
                                                        <thead>
                                                        <tr>
                                                            <th></th> 
                                                            <th className="text-xs">Item</th> 
                                                            <th className="text-xs">Subtotal</th> 
                                                            <th className="text-xs">Local Current (IDR) Total</th> 
                                                        </tr>
                                                        </thead> 
                                                        <tbody>
                                                        <tr>
                                                            <th>1</th> 
                                                            <td>Cy Ganderton</td> 
                                                            <td>Quality Control Specialist</td> 
                                                            <td>Littel, Schaden and Vandervort</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>2</th> 
                                                            <td>Hart Hagerty</td> 
                                                            <td>Desktop Support Technician</td> 
                                                            <td>Zemlak, Daniel and Leannon</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>3</th> 
                                                            <td>Brice Swyre</td> 
                                                            <td>Tax Accountant</td> 
                                                            <td>Carroll Group</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>4</th> 
                                                            <td>Marjy Ferencz</td> 
                                                            <td>Office Assistant I</td> 
                                                            <td>Rowe-Schoen</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>5</th> 
                                                            <td>Yancy Tear</td> 
                                                            <td>Community Outreach Specialist</td> 
                                                            <td>Wyman-Ledner</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>6</th> 
                                                            <td>Irma Vasilik</td> 
                                                            <td>Editor</td> 
                                                            <td>Wiza, Bins and Emard</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>7</th> 
                                                            <td>Meghann Durtnal</td> 
                                                            <td>Staff Accountant IV</td> 
                                                            <td>Schuster-Schimmel</td> 
                                                        </tr>
                                                        <tr>
                                                            <th>8</th> 
                                                            <td>Lesya Tinham</td> 
                                                            <td>Safety Technician IV</td> 
                                                            <td>Turner-Kuhlman</td> 
                                                        </tr>
                                                        </tbody> 
                                                    </table>
                                                </div>                                                                                      
                                            </div>                                            
                                            
                                        </fieldset>
                                        </div>                                          
                                    </div> 
                                </div> 

                            </div>                            

                        </div>


                        {/* Right */}
                        <div className="w-1/4 pt-5 pl-5">
                            <button className="btn btn-block btn-sm btn-primary focus:outline-none mb-2">Approve</button>
                            <button className="btn btn-block btn-sm btn-secondary focus:outline-none">Reject</button>
                        </div>

                    </div>


                </div>
                </div>                

            </div>
        </>
    )
}

export default TableTicket
