import Link from 'next/link'
import {BiAtom as Atom} from "react-icons/bi";
import {FaUserAstronaut as User} from "react-icons/fa";
import {MdPhotoLibrary as Gallery} from "react-icons/md";


function Buttons({Url, Name, Icon}){

    const Icons = {
        Atom : <Atom />,
        User : <User />,
        Gallery : <Gallery />
    }

    const HasIcon = (Icon) ? Icons[Icon] : "";

    return(
        <Link className='ButtonComp' href={Url}>{HasIcon} {Name}</Link>
    )
}

export default Buttons;