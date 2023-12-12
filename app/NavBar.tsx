import { link } from 'fs';
import Link from 'next/link'
import React from 'react'
import { BsBug } from "react-icons/bs";
const NavBar = () => {
    const links =[
        {label:"Dashboard",href:"/" },
        {label:"Issues",href:"/issues" },
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><BsBug/></Link>
        <ul className='flex space-x-6'>
            {links.map(link => <Link key={link.href} className='text-zinc-500 hover:text-zinc-800 transiti' href={link.href}>{link.label}</Link>)}
            
        </ul>
    </nav>
  )
}

export default NavBar