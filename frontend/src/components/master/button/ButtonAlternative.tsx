import Link from "next/link"

const ButtonAlternative = ({ url, label}:{ url:string, label:string }) => {
    return(
        <>
         <Link href={url} className="rounded-md bg-white border-primary border-1 border px-3.5 py-2.5 mb-3 text-sm text-primary shadow-sm hover:bg-secondary-focus hover:border-secondary-focus hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-focus">{label}
         </Link>
        </>
    )
}

export default ButtonAlternative