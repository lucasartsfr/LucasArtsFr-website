import Link from 'next/link'
import {BiAtom as Atom} from "react-icons/bi";
import {FaUserAstronaut as User} from "react-icons/fa";
import {MdPhotoLibrary as Gallery} from "react-icons/md";
import {BsFillCameraVideoFill as Camera} from "react-icons/bs"
import {AiFillFilePdf as PDF} from "react-icons/ai"
import {AiFillPrinter as Print} from "react-icons/ai"
import {Tb3DCubeSphere as Three} from "react-icons/tb"
import {MdPhotoLibrary as Galerie} from "react-icons/md"
import {TbPhoto as Photos} from "react-icons/tb"
import {TbFileDescription as PDFB} from "react-icons/tb"
import {TbVideo as Video} from "react-icons/tb"
import {TbPrinter as Printer} from "react-icons/tb"

function Buttons({Url, Name, Icon, className, target}){

    const Icons = {
        Atom : <Atom  className='IconBtn'/>,
        User : <User  className='IconBtn'/>,
        Gallery : <Gallery  className='IconBtn'/>,
        Camera : <Camera  className='IconBtn'/>,
        PDF : <PDF  className='IconBtn'/>,
        Print : <Print  className='IconBtn'/>,
        Three : <Three  className='IconBtn'/>,
        Galerie : <Galerie  className='IconBtn'/>,
        PDFB : <PDFB  className='IconBtn'/>,
        Video : <Video  className='IconBtn'/>,
        Printer : <Printer  className='IconBtn'/>,
        Photos : <Photos  className='IconBtn'/>
    }

    const HasIcon = (Icon) ? Icons[Icon] : "";

    return(
        <Link className={`ButtonComp ${className}`} target={target} href={Url}>{HasIcon} {Name}</Link>
    )
}

export default Buttons;