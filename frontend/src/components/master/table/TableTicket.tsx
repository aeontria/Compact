// @ts-nocheck

import router from "next/router"
import { useEffect, useState } from "react"
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi"
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti"

const TableTicket = (props: any) => {
    const mobile = props.mobile
    const data = props.data
    const [allData, setAllData] = useState([])
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortColumn, setSortColumn] = useState("name");

    const [detailTitle, setDetailTitle] = useState('');
    const [detailCaller, setDetailCaller] = useState('');
    const [detailDate, setDetailDate] = useState('');
    const [detailDept, setDetailDept] = useState('');
    const [detailCat, setDetailCat] = useState('');
    const [detailSubject, setDetailSubject] = useState('');

    // Sorting
    function sortData(column: string, order: string) {
        return function(a: any, b: any) {
            const aValue = a[column];
            const bValue = b[column];

            if (aValue < bValue) {
            return order === "asc" ? -1 : 1;
            } else if (aValue > bValue) {
            return order === "asc" ? 1 : -1;
            } else {
            return 0;
            }
        };
    }

    useEffect(() => {

        let sortedData : any = [];
        sortedData = [...data];
        if (sortColumn && sortOrder) {
          sortedData = sortedData.sort(sortData(sortColumn, sortOrder));
        }
        setAllData(sortedData);
        setValueOption("none");
    }, [data, sortColumn, sortOrder])

    function handleSort(column: string) {
        const newSortOrder = column === sortColumn ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
        setSortOrder(newSortOrder);
        setSortColumn(column);
    }


    // Search
    const [search, setSearch] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const res = await data
            {
                search ? setAllData(res.filter((item:any) =>
                Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase()))) : setAllData(res)
            }
            setCurrentPage(0)
        }
        fetchData()
    }, [data, search])

    // Pagination
    const pageNumbers = [];
    const [currentPage, setCurrentPage] = useState(props.currentPage);
    const [dataPerPage, setDataPerPage] = useState(props.pageSize)
    const startIndex = parseInt(currentPage) * parseInt(dataPerPage);
    const endIndex = startIndex + parseInt(dataPerPage)
    const pageData = allData.slice(startIndex, endIndex);
    const [valueOption, setValueOption] = useState("none");
    const changePageRow = (curPage:any) => {
        setDataPerPage(curPage)
        setCurrentPage(0)
    }

    const maxPageLinks = 5;
    const totalPages = Math.ceil(allData.length / dataPerPage);
    let startPage = currentPage - Math.floor(maxPageLinks / 2);
    if (startPage < 1) {
        startPage = 1;
    }
    let endPage = startPage + maxPageLinks - 1;
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxPageLinks + 1;
        if (startPage < 1) {
        startPage = 1;
        }
    }

    // create the page links
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    function showDetail(title:string, caller:string, dept:string, date:string, cat:string, subject:string){
        setDetailTitle(title)
        setDetailCaller(caller)
        setDetailDate(date)
        setDetailDept(dept)
        setDetailCat(cat)
        setDetailSubject(subject)
    }

    function showDetailPage(id:string, type:string){
        sessionStorage.setItem('trans_id',id)
        sessionStorage.setItem('trans_type',type)
        router.push({
            pathname: '/ticketdetail',
          });
    }


    const handleChangeSelect = (param: any) => {   
        
        switch (param) {
            case "none":
                setValueOption("none")
              break;
            case "Purchase":
                setValueOption("Requisition and Proposal (R&P) - Purchase")
              break;
            case "Non Purchase":
                setValueOption("Requisition and Proposal (R&P) - Non Purchase")
              break;              
            case "PO":
                setValueOption("Purchase Order (PO)")
              break;
            case "PC":
                setValueOption("Payment Confirmation (PC)")
          }
    };



    return (
        <>
            <input type="checkbox" id="modalCompatDetail" className="modal-toggle" />
            <label htmlFor="modalCompatDetail" className="modal">
                <label className="modal-box relative" htmlFor="">
                    <h1 className="text-sm font-bold text-primary mb-2">{detailTitle}</h1>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1">
                            <div className="text-xs text-secondary flex w-[100px]">Caller</div>
                            <div className="flex text-xs text-secondary">:</div>
                            <div className="flex text-xs text-secondary">{detailCaller}</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <div className="text-xs text-secondary flex w-[100px]">Dept. Caller</div>
                            <div className="flex text-xs text-secondary">:</div>
                            <div className="flex text-xs text-secondary">{detailDept}</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <div className="text-xs text-secondary flex w-[100px]">Created at</div>
                            <div className="flex text-xs text-secondary">:</div>
                            <div className="flex text-xs text-secondary">{detailDate}</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <div className="text-xs text-secondary flex w-[100px]">Category</div>
                            <div className="flex text-xs text-secondary">:</div>
                            <div className="flex text-xs text-secondary">{detailCat}</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <div className="text-xs text-secondary flex w-[100px]">Subject</div>
                            <div className="flex text-xs text-secondary">:</div>
                            <div className="flex text-xs text-secondary">{detailSubject}</div>
                        </div>
                    </div>
                </label>
            </label>
            <div className={`flex ${mobile ? "flex-col gap-2" : "flex-row ml-3"} justify-between mb-3 `}>
                <div className='flex flex-row items-center gap-1'>
                    <h1 className='text-sm'>Show</h1>
                    <select className="select select-primary select-sm w-16" defaultValue={dataPerPage} onChange={(e) => changePageRow(e.target.value)} >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <h1 className='text-sm'>entries</h1>
                </div>              

                <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} className={`text-sm ${mobile ? "input-md w-full max-w-full":"input-sm min-w-min max-w-md"} input-primary input border border-1 border-primary`}/>
            </div>


            {
                valueOption === "Requisition and Proposal (R&P) - Purchase" ? 
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg overflow-y-auto flex flex-1 mt-5">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Ticket</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Request</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-400 border border-gray-400`} colSpan={6}>Request Approval {valueOption} Progress</th>
                    </tr>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User Superior</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>Related Dept.</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>Accounting</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>GM User</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>Admin GM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>1</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>2</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    </tr>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    </tr>
                </tbody>
                </table>
            </div>

            : null }


            {
                valueOption === "Requisition and Proposal (R&P) - Non Purchase" ? 
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg overflow-y-auto flex flex-1 mt-5">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Ticket</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Request</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-400 border border-gray-400`} colSpan={6}>Request Approval {valueOption} Progress</th>
                    </tr>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User Superior</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>Related Dept.</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>Accounting</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>GM User</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>Admin GM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>1</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>2</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    </tr>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    </tr>
                </tbody>
                </table>
            </div>

            : null }            


            {
                valueOption === "Purchase Order (PO)" ? 
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg overflow-y-auto flex flex-1 mt-5">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Ticket</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Request</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-400 border border-gray-400`} colSpan={6}>Request Approval {valueOption} Progress</th>
                    </tr>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User Superior</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>1</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>2</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    </tr>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    </tr>
                </tbody>
                </table>
            </div>

            : null }


            {
                valueOption === "Payment Confirmation (PC)" ? 
            <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg overflow-y-auto flex flex-1 mt-5">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Ticket</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`} rowSpan={2}>No. Request</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-400 border border-gray-400`} colSpan={6}>Request Approval {valueOption} Progress</th>
                    </tr>
                    <tr>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User</th>
                    <th className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-slate-200 border border-gray-400`}>User Superior</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>1</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}>2</td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-400`}><div className="p-3 badge badge-xs badge-accent">Approved</div></td>
                    </tr>
                    <tr>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    <td className={`w-[20px] cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}></td>
                    </tr>
                </tbody>
                </table>
            </div>

            : null }         


            <div className='flex w-full my-3 items-center justify-between'>
                <p className="text-sm text-secondary-focus">Showing data {((currentPage + 1) * dataPerPage) - dataPerPage + 1} - {(allData.length / ((currentPage + 1) * dataPerPage)) >= 1 ? ((currentPage + 1) * dataPerPage) : ((allData.length % dataPerPage) + (currentPage * dataPerPage))} of {allData.length}</p>
            
                <div className="flex btn-group justify-end items-center gap-3">
                    <p className={`text-sm text-secondary-focus`}>Page :</p>
                    <input type="number" value={currentPage+1} min={1} max={Math.ceil(allData.length/dataPerPage)} onChange={(e)=>{parseInt(e.target.value) <= Math.ceil(allData.length/dataPerPage) && (e.target.value && setCurrentPage(parseInt(e.target.value)-1))}} className={`text-sm ${mobile ? "input-md":"input-sm"} w-16 input-primary input border border-1 border-primary h-8`}/>
                    <p className={`text-sm text-secondary-focus`}>of {Math.ceil(allData.length/dataPerPage)}</p>
                </div>
            </div>
            <div className="flex mb-5 w-full items-center justify-center gap-1">
                    <FiChevronsLeft onClick={() => setCurrentPage(0)} className=" text-primary hover:text-secondary w-7 h-7 cursor-pointer"/>                    
                    <FiChevronLeft onClick={() => (currentPage > 0) && setCurrentPage(currentPage - 1)} className=" text-primary hover:text-secondary w-7 h-7 cursor-pointer"/>
                    {
                        pageNumbers.map(number => (
                            <button
                              key={number}
                              onClick={() => {setCurrentPage(number-1)}}
                              className={`${
                                number-1 === currentPage
                                  ? 'bg-primary text-white'
                                  : 'bg-white text-primary'
                              } btn btn-sm border rounded-md w-10 border-gray-200 hover:bg-primary-focus hover:text-white hover:border-primary-focus`}
                            >
                              {number}
                            </button>
                          ))
                    }
                    <FiChevronRight onClick={() => (currentPage < (Math.ceil(allData.length/dataPerPage)-1)) && setCurrentPage(currentPage + 1)} className=" text-primary hover:text-secondary w-7 h-7 cursor-pointer"/>
                    <FiChevronsRight onClick={() => setCurrentPage(Math.ceil(allData.length/dataPerPage)-1)} className=" text-primary hover:text-secondary w-7 h-7 cursor-pointer"/> 
                </div>
        </>
    )
}

export default TableTicket
