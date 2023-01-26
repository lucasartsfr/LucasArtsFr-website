import Animaux from "../public/img/emoji/3d/Animaux.png";
import Nuage from "../public/img/emoji/3d/Nuage.png";
import Montagne from "../public/img/emoji/3d/Montagne.png";
import Champs from "../public/img/emoji/3d/Champs.png";
import Foret from "../public/img/emoji/3d/Foret.png";
import Cascade from "../public/img/emoji/3d/Cascade.png";
import Lac from "../public/img/emoji/3d/Lac.png";
import Riviere from "../public/img/emoji/3d/Riviere.png";
import Mer from "../public/img/emoji/3d/Mer.png";
import Sunrise from "../public/img/emoji/3d/Sunrise.png";
import Etoiles from "../public/img/emoji/3d/Etoiles.png";
import Neige from "../public/img/emoji/3d/Neige.png";
import Drone from "../public/img/emoji/3d/Drone.png";
import Nature from "../public/img/emoji/3d/Nature.png";
import Macro from "../public/img/emoji/3d/Macro.png";
import Grotte from "../public/img/emoji/3d/Grotte.png";
import Image from "next/image";
import { useContext } from 'react';
import { NextContext } from '../pages/_app';


function FiltresList({Filtres}){

    const { searchFiltre, searchWord, SearchFunction, setSearchFiltre } = useContext(NextContext);

    const FilterSort = (e) =>{
        // If Click on Same Filter
        if(searchWord === e.currentTarget.id && searchFiltre){
            SearchFunction("");
            setSearchFiltre(false);
        }
        else{
            SearchFunction(e.currentTarget.id);    
            setSearchFiltre(true);            
            e.currentTarget.classList.add('Focus');
        }
        document.querySelector('.Search').value = "";    
    }

    const Emoji = {
        nuage :{ Img : Nuage.src, Emj : 0},
        animaux:{ Img : Animaux.src, Emj : 0},
        mer:{ Img : Mer.src, Emj : 0},
        montagne:{ Img : Montagne.src, Emj : 0},
        champs:{ Img : Champs.src, Emj : 0},
        rivière:{ Img : Riviere.src, Emj : 0},
        lac:{ Img : Lac.src, Emj : 0},
        forêt:{ Img : Foret.src, Emj : 0},
        cascade:{ Img : Cascade.src, Emj : 0},
        sunrise:{ Img : Sunrise.src, Emj : 0},
        étoiles:{ Img : Etoiles.src, Emj : 0},
        neige:{ Img : Neige.src, Emj : 0},
        macro:{ Img : Macro.src, Emj : 0},
        drone:{ Img : Drone.src, Emj : 0},
        nature:{ Img : Nature.src, Emj : 0},
        grotte:{ Img : Grotte.src, Emj : 0},
    }

    // Create Filter Div
    const List = Object.keys(Filtres).sort((a, b) => Filtres[b] - Filtres[a]).map((name) =>{
        return(
            <div className="Filtre" key={name} id={name} onClick={FilterSort}>
                <div className="Emoji">
                    <Image width={40} height={40} src={Emoji[name].Img} alt={name} className="" />
                </div>
                <div className="FiltreName">{name}</div>
                <div className="FiltreNb">{Filtres[name]}</div>
            </div>
        )
    })

    return(
            <div className="FiltresList SpaceHeaderContainer Small">
                {List}
            </div>
    )
}

export default FiltresList;