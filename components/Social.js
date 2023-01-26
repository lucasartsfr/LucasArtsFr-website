import {FiDribbble as Dribbble} from "react-icons/fi";
import {FiGithub as Github} from "react-icons/fi";
import {FiInstagram as Instagram} from "react-icons/fi";
import {RiLinkedinFill as Linkedin} from "react-icons/ri";

import {BiAtom as Atom} from "react-icons/bi";
import {MdPhotoLibrary as Gallery} from "react-icons/md";
import {FaUserAstronaut as User} from "react-icons/fa";
import {FaTools as Projects} from "react-icons/fa";


function Social({Url, Icon, Color}){

    const IconList = {
        Github : {
            Node : <Github />,
            Color : "#33333380"
        },
        Dribbble : {
            Node : <Dribbble />,
            Color : "#ea4c8980"
        },
        Instagram : {
            Node : <Instagram />,
            Color : "#c1358480"
        },
        Linkedin : {
            Node : <Linkedin />,
            Color : "#0077b580"
        },
        Atom : {
            Node : <Atom />,
            Color : "#0077b580"
        },
        User : {
            Node : <User />,
            Color : "#0077b580"
        },
        Gallery : {
            Node : <Gallery />,
            Color : "#0077b580"
        },
        Projects : {
            Node : <Projects />,
            Color : "#0077b580"
        },
    }


    const handleOver = (e) =>{ document.documentElement.style.setProperty('--HoverSocial', e.currentTarget.getAttribute('data-color')); }

    return(
        <>
            <a className="RSIcon" data-color={IconList[Icon].Color} onMouseOver={handleOver} href={Url} aria-label={Icon} rel="noreferrer" target="_blank">
                {IconList[Icon].Node}
            </a>
        </>
    )
}

export default Social;