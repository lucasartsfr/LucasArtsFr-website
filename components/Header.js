import {AiOutlineInstagram as Insta} from "react-icons/ai";
import {AiFillGithub as Git} from "react-icons/ai";

import {BiSearchAlt as Search} from "react-icons/bi"
import Image from "next/image"
import { useEffect, useState } from "react";
import Link from "next/link";

function Header({SearchFunction}){    

    const ShowSearch = (e) =>{  !e.target.classList.contains('Search') && e.currentTarget.classList.toggle('show') }    

    const SelectMenu = (e) =>{
        document.querySelector('.FocusMenu')?.classList.remove('FocusMenu');
        e.currentTarget.classList.add('FocusMenu');
    }

    return(
        <nav className="Header">
            <div className="Left" >
                <div className="LinkContainer FocusMenu" onClick={SelectMenu}>
                    <Link className="Link" href="/">Photo</Link>
                </div>
                <div className="LinkContainer" onClick={SelectMenu}>
                    <Link className="Link" href="/About">About</Link>  
                </div>
                <div className="LinkContainer" onClick={SelectMenu}>
                    <Link className="Link" href="/Projects">Projets</Link>    
                </div>           
            </div>
            <div className="Center">             
                <Image className="Logo" src="https://theme.lucasarts.fr/logo300.gif" width="100" height="53" alt="Lucas Pires Logo" />                
            </div>
            <div className="Right">           
            <div className="SearchContainer" onClick={ShowSearch}>
                <input type="search" className="Search" onChange={SearchFunction} />                
                <Search className="SearchButton"/>
            </div>     
                
                <Link href="https://instagram.com/LucasArtsFr"><Insta/></Link>
                <Link href="https://instagram.com/LucasArtsFr"><Git/></Link>
            </div>
        </nav>
    )
}

export default Header