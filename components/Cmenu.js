//import dynamic from 'next/dynamic'
import {MdPhotoLibrary as Gallery} from "react-icons/md";
import {FaUserAstronaut as User} from "react-icons/fa";
import {FaTools as Projects} from "react-icons/fa";

import { Link } from "react-scroll";
import { useRouter } from 'next/router';  
import { CircleMenu,  CircleMenuItem,  TooltipPlacement } from "next-circular-menu";

export default function Cmenu() {

  // For Dynamic Import
  // const CircleMenu = dynamic(() => import('next-circular-menu').then(mod => mod.CircleMenu), { ssr: false });
  // const CircleMenuItem = dynamic(() => import('next-circular-menu').then(mod => mod.CircleMenuItem), { ssr: false });
  // const TooltipPlacement = dynamic(() => import('next-circular-menu').then(mod => mod.TooltipPlacement), { ssr: false });

  const router = useRouter();

  const Redirect = (e) =>{ router.push(e.currentTarget.getAttribute('data-link')) };



  return (
    <CircleMenu  className="CircularMenu" startAngle={180} rotationAngle={90} itemSize={2}  radius={5} rotationAngleInclusive={true} >   

      <CircleMenuItem  className='MenuLink' data-link='/' tooltipPlacement={TooltipPlacement.Left} onClick={Redirect}>      
        <Link href="/" to="/">
          <Gallery />
        </Link>
      </CircleMenuItem>   
      

      <CircleMenuItem  className='MenuLink' data-link='/About' tooltipPlacement={TooltipPlacement.Left} onClick={Redirect}>      
        <Link href="/About"  to="/About">
          <User />
        </Link>
      </CircleMenuItem>

      <CircleMenuItem  className='MenuLink' data-link='/Projects' tooltipPlacement={TooltipPlacement.Left} onClick={Redirect}>      
        <Link href="/Projects" to="/Projects">
          <Projects />
        </Link>
      </CircleMenuItem>   

  </CircleMenu>
  );
}