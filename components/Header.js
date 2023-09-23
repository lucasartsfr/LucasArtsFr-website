import Image from "next/image"
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useContext } from 'react';
import { NextContext } from '../pages/_app';
import Buttons from "./Buttons";
import Social from "./Social";
import Cmenu from "./Cmenu";
import {MdOutlineLightMode as Light} from "react-icons/md";

export default function Header(){    

    const router = useRouter(); // Get Pages Informations
    const { SearchFunction, setSearchFiltre } = useContext(NextContext);
    const menuRef = useRef();

    const InputSearch = (e) =>{
        SearchFunction(e.target.value);
        setSearchFiltre(false);
    }

    const ToggleDarkMode = () =>{
        const Theme = document.querySelector('html');
        console.log(Theme.toggleAttribute('data-light'))
    }

    const UpdateTheme = (e) =>{
        console.log()
        document.documentElement.style.setProperty('--ThemeColor', e.currentTarget.value);
    }

    // useEffect((e)=>{

    //     const handleScroll = (e) => {
    //         const currentScrollY = window.scrollY;
            
    //       };

    //     window.addEventListener("scroll", handleScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [])

    const ShowSearch = (e) =>{  !e.target.classList.contains('Search') && e.currentTarget.classList.toggle('show') }  // Show Search Bar

    return(
        <>
        
        <Cmenu menuRef={menuRef} />     
        
        <nav className="Header">          
            <div className="Left Small">
                <div className="LeftContent">
                    <div className="UserContainer">
                        <Image alt="Lucas Pires" width={32} height={32} className="User Loader" src="https://theme.lucasarts.fr/user.jpg" />
                    </div>
                   <div className="QuoteContainer">
                        <Link href="/">
                            <h2>Lucas Pires</h2>
                        </Link>
                   </div>
                </div>                
            </div>
           
            {                
            router.pathname == "/Photos" && 
            <div className="Center">
                
                <div className="SearchContainer">
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="SearchIcon StyledIconBase-ea9ulj-0 cQRlpE SearchCreation__StyledSearchIcon-sc-167mz5d-1 jzRVtd"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
                    <input  placeholder="Type : Montagnes, Nuages, Voie lactée... / Localisation : France, Suisse... / Paramètres : 200mm, 5.6, 1/1250" onChange={InputSearch}  type="text" className="Search" />
                </div>            
            </div>            
            }    

            <div className={`Right ${(router.pathname == "/" && "Home")}`}>
                <Social Url="https://github.com/lucasartsfr" Icon="Github"/>
                <Social Url="https://dribbble.com/LucasArtsFr" Icon="Dribbble"/>
                <Social Url="https://www.linkedin.com/in/lucasarts" Icon="Linkedin"/>
                <Social Url="https://instagram.com/lucasartsfr" Icon="Instagram"/>
                <hr></hr>
                <div className="ColorGeneratorContainer">
                    <input type="color" className="ColorGenerator"  defaultValue="#0070f3" onChange={UpdateTheme}/>
                </div>
                <a onClick={ToggleDarkMode} className="RSIcon DarkMode" data-color="#6e6e6e" aria-label="Light Mode" rel="noreferrer" target="_blank">
                    <Light />
                </a>
            </div>

        </nav>
        </>
    )
}