import NextImage from "next/image";
import Masonry from 'react-masonry-css'
import React, { useEffect } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

import { useContext } from 'react';
import { NextContext } from '../pages/_app';

function Galerie({List}){

    const { searchWord, searchFiltre } = useContext(NextContext);

    //   useEffect(()=>{
    //     setTimeout(() =>{
    //         [...document.querySelectorAll('[data-rmiz-modal-img]')].map((item =>{
    //             const Scale = parseFloat(item.style.transform.split("scale")[1].replace(/[^\d.-]/g, ''));
    //             item.style.borderRadius = 12/Scale+"px";
    //         }))
    //     },1000)            
    //   }, [])
      
    var RealId = 1; 
    const Photo = Object.keys(List).reverse().map((id, index) =>{
        // Shortcut for List Item
        const Img = List[id];
        // Image Size Factore
        const Factor = 8;        
        // Check if Input Of Filtre
        const Check = (searchFiltre) ? List[id].Filtres.toLowerCase().includes(searchWord) : searchWord == "" || List[id].Nom.toLowerCase().includes(searchWord) || List[id].Filtres.toLowerCase().includes(searchWord) || List[id].Localisation.Pays.toLowerCase().includes(searchWord) || List[id].Localisation.Departement.toLowerCase().includes(searchWord) || 
                      List[id].Localisation.Region.toLowerCase().includes(searchWord) || List[id].Localisation.Ville.toLowerCase().includes(searchWord) || List[id].Parametres.Ouverture.toLowerCase().includes(searchWord) || List[id].Parametres.ISO.toLowerCase().includes(searchWord) || List[id].Parametres.Shutter.toLowerCase().includes(searchWord) || List[id].Parametres.Focale.toLowerCase().includes(searchWord);
        // Set LCP Priority
        const Priority = (id == "141" || id == "138" || id == "139") && true;  
        // FadeInAnimation (With Individual Index to Allo Fast Animation on filter)
        const FadeIn = Check && {animationDelay: `${RealId++*80}ms`, opacity: 0};
        // Return Images
        return(
            Check && 
            // width={Img.Ratio.Width/Factor} height={Img.Ratio.Height/Factor}
            <div key={id} className="Masonry-Item"> 
                <Zoom classDialog="Dialog" zoomMargin={15} zoomImg={{src: 'https://cdn.lucasarts.fr/full/'+id+'.jpg', srcSet: 'https://cdn.lucasarts.fr/full/'+id+'.jpg'}}>         
                    <NextImage    
                        style={FadeIn}         
                        className="Masonry-Img FadeIn" 
                        id={id} 
                        width={Img.Ratio.Width/Factor} 
                        height={Img.Ratio.Height/Factor} 
                        alt={Img.Nom} 
                        priority={Priority}
                        src={`https://cdn.lucasarts.fr/full/${id}.jpg`}
                    />                    
                </Zoom>
                <NextImage width={20} height={20}  alt={`Glow for ${id}`} 
                        className="Glow Hidden" src={`https://cdn.lucasarts.fr/small/${id}.jpg`} 
                    />
            </div>
        )
    });

    return(
        <Masonry
            breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}}
            className="Masonry-Grid SpaceHeaderContainer"
            columnClassName="Masonry-Col">   
            {Photo}
        </Masonry>
     )
}

export default Galerie;