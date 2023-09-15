const Breadcrumbs = (props:any) => {
    const root1 = props.root1
    const root2 = props.root2
    const root3 = props.root3

    const url2 = props.root2 ? root2.replace(/\s+/g, '') : ''
    const url3 = props.root3 ? root3.replace(/\s+/g, '') : ''

    return(
        <>
            <div className='mx-6 my-3 text-sm breadcrumbs'>
            <ul>
                <li><h1 className="text-secondary-focus capitalize">{root1}</h1></li>
                <li className={`${!root2 && "invisible"}`}><a href={`/${url2}`}><h1 className={`${!root3 ? "text-primary" : "text-secondary-focus"} capitalize`}>{root2}</h1></a></li>
                <li className={`${!root3 && "invisible"}`}><a href={`/${url3}`}><h1 className="text-primary capitalize">{root3}</h1></a></li>
            </ul>
            </div>
        </>
    )
}

export default Breadcrumbs