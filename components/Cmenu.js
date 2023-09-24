import dynamic from 'next/dynamic'
import {MdPhotoLibrary as Gallery} from "react-icons/md";
import {FaUserAstronaut as User} from "react-icons/fa";
import {FaTools as Projects} from "react-icons/fa";
import {GiFiles as Files} from "react-icons/gi";
import { Link } from "react-scroll";
import { useRouter } from 'next/router';  
// import { CircleMenu,  CircleMenuItem,  TooltipPlacement } from "next-circular-menu";

const Cmenu = () => {

  // For Dynamic Import
  const CircleMenu = dynamic(() => import('next-circular-menu').then(mod => mod.CircleMenu), { ssr: false });
  const CircleMenuItem = dynamic(() => import('next-circular-menu').then(mod => mod.CircleMenuItem), { ssr: false });
  const TooltipPlacement = dynamic(() => import('next-circular-menu').then(mod => mod.TooltipPlacement), { ssr: false });

  const router = useRouter();

  const Redirect = (e) =>{     
    router.push(e.currentTarget.getAttribute('data-link'))
  };



  return (
    <CircleMenu open={true} className="CircularMenu" startAngle={180} rotationAngle={90} itemSize={2} radius={5} rotationAngleInclusive={true} >   

      <CircleMenuItem  className='MenuLink' data-link='/Photos' tooltipPlacement={TooltipPlacement.Left} tooltip='Galerie' onClick={Redirect}>      
        <Link href="/Photos" to="/Photos">
          <Gallery />
        </Link>
      </CircleMenuItem>   
      

      <CircleMenuItem  className='MenuLink' data-link='/' tooltipPlacement={TooltipPlacement.Left} tooltip='About' onClick={Redirect}>      
        <Link href="/"  to="/">
          <User />
        </Link>
      </CircleMenuItem>

      <CircleMenuItem  className='MenuLink' data-link='/Projects' tooltipPlacement={TooltipPlacement.Left} tooltip='Projets' onClick={Redirect}>      
        <Link href="/Projects" to="/Projects">
          <Files />
        </Link>
      </CircleMenuItem>   

  </CircleMenu>
  );
}

export default Cmenu;