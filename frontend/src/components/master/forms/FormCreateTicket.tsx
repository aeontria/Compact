import Link from "next/link"
import { useState } from "react";
import InputTextForm from "../input/InputTextForm";
import InputTextAreaForm from "../input/InputTextAreaForm";
import InputDropDownForm from "../input/InputDropDownForm";
import TextSubtitle from "../text/TextSubtitle";
import TextDisableForm from "../text/TextDisableForm";

const FormCreateTicket = (props:any) => {
    const [subject, setSubject] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState('');
    const [urgency, setUrgency] = useState('');
    const [dept, setDept] = useState('');
    const [quest, setQuest] = useState('');

    const handleSubject = (event:any) => {
        setSubject(event.target.value)
    }
    const handleNote = (event:any) => {
        setNote(event.target.value)
    }
    const handleType = (event:any) => {
        setType(event.target.value)
    }
    const handleUrgency = (event:any) => {
        setUrgency(event.target.value)
    }
    const handleDept = (event:any) => {
        setDept(event.target.value)
        console.log(
            opsQuest.find(p=>p.dept === dept)?.quest
        )
        setQuest('')
    }
    
    const handleQuest = (event:any) => {
        setQuest(event.target.value)
    }

    const compact = props.compact
    const opsType = ['Select type','Request', 'Support', 'Question'];
    const opsUrgency = ['Select urgency', 'Low', 'Medium', 'High', 'Urgent'];
    const opsDept = ['Select department', 'IT', 'GA', 'HR', 'Accounting'];
    const opsQuest = [
        {
            dept:"IT",
            quest: ["Quest 1 IT","Quest 2 IT"]
        },
        {
            dept:"GA",
            quest: ["Quest 1 GA"]
        },
        {
            dept:"HR",
            quest: ["Quest 1 HR","Quest 2 HR"]
        },
        {
            dept:"Accounting",
            quest: ["Quest 1 Accounting"]
        },
    ];
    const quests = dept ? opsQuest.find(p => p.dept == dept)?.quest || [] : [];


    return(
        <div className="flex flex-1 flex-col p-2 bg-white mx-5 shadow-md rounded-md">
        <div className="overflow-x-auto">
            <div className="py-2 min-w-full px-2">
                <div className='flex flex-row justify-between'>
                    <TextSubtitle text={'request form'}/>
                    <div className="flex flex-row gap-1">
                        <Link href="#" className="rounded-md bg-primary border-white border-1 border px-3.5 py-2.5 mb-3 text-sm text-white shadow-sm hover:bg-primary-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus">Save as draft</Link>
                        <Link href="#" className="rounded-md bg-white border-primary border-1 border px-3.5 py-2.5 mb-3 text-sm text-primary shadow-sm hover:bg-secondary-focus hover:border-secondary-focus hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-focus">Delete</Link>
                    </div>   
                </div>

                <div className={`flex ${compact ? "flex-col":"flex-row"} gap-2`}>
                    <div className={`flex flex-col gap-2 ${compact ? "w-full":"w-2/3"}`}>
                        <InputTextForm label={'subject'} type={'text'} onChange={handleSubject}/>
                        <textarea className={`text-sm input-secondary-focus input border border-1 bg-gray-200 border-transparent block h-64 cursor-not-allowed`} readOnly></textarea>
                        <InputTextAreaForm label={'note'} onChange={handleNote}/>
                    </div>
                    <div className={`flex ${compact ? "w-full gap-2":"w-1/3"} flex-col justify-between`}>
                        <div  className="flex flex-col gap-2">
                            <InputDropDownForm label={'request type'} onChange={handleType} options={opsType}/>
                            <InputDropDownForm label={'urgency'} onChange={handleUrgency} options={opsUrgency}/>
                            <div className="flex flex-col gap-1">
                                <label className="block text-secondary-focus text-sm text capitalize" htmlFor={'dept'}>Relate Department</label>
                                <select className="appearance-none border border-primary rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleDept} id='dept' value={dept}>
                                    {opsDept.map((option:any) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block text-secondary-focus text-sm text capitalize" htmlFor={'quest'}>Category</label>
                                <select className="appearance-none border border-primary rounded text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleQuest} id='quest'>
                                    {quests.map((option:any) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div  className="flex flex-col gap-2">
                            <TextDisableForm label={'assignee'}/>
                            <TextDisableForm label={'reference'}/>
                            <TextDisableForm label={'status'}/>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center items-center mt-5'>
                    <Link href="#" className="rounded-md bg-primary border-white border-1 border px-3.5 py-2.5 mb-3 text-sm text-white shadow-sm hover:bg-primary-focus focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus">Submit</Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default FormCreateTicket