import NextImage from "next/image";
import Masonry from 'react-masonry-css'
import React from "react";
import Expand from "./Expand";
import { useState, useRef } from "react";

function Galerie({List, searchWord}){


    const [StateExpand, setStateExpand] = useState({
        Width : 0,
        Height : 0,
        Left : 0,
        Top : 0,
        Src : "",
        SrcFull : ""
    })
    const [Initial, setInitial] = useState("0");

    const ExpandClose = (e) =>{     
        document.body.classList.remove('NoScroll');   
        const CloseExpand = e.currentTarget; //
        const Select = document.querySelector('.Expand'); // Get Expanded Item
        // Set New State Property

    
        //const Coord = document.getElementById(Initial).getBoundingClientRect(); // Get Coord Initial element If Resize
        // StateExpand["Width"] = Coord.width;
        // StateExpand["Height"] = Coord.height;
        // StateExpand["Top"] = Coord.top;
        // StateExpand["Left"] = Coord.left;
        // setStateExpand({...StateExpand})
        
        Select.classList.remove('Center'); // Let Item Go Back
        setTimeout(()=>{
            document.querySelector('.invisible').classList.remove('invisible'); 
         }, 300)        
               
        setTimeout(()=>{
            Select.classList.remove('Smooth');               
            Select.classList.add('hidden');    
            CloseExpand.classList.remove('Show');
         }, 400)
    }

    const ExpandFunction = (e) =>{        
        document.body.classList.add('NoScroll') // No Scroll
        const Source = e.currentTarget;
        const Coord = Source.getBoundingClientRect(); // Get Coords of Clicked Item   
        const CloseExpand = document.querySelector('.CloseExpand'); // Get Closer DIV
        const Select = document.querySelector('.Expand'); // Get Image To Expand
        Select.classList.remove('hidden') // Show Select Image
        const Ratio = ((Coord.width / Coord.height) > 1) ? "Horizontal" : "Vertical";
        
        CloseExpand.classList.add('Show') // Show Hide Button       
        
        Select.setAttribute('data-ratio', Ratio);
        StateExpand["Src"] = window.location.origin+e.currentTarget.getAttribute('srcset').split(',')[0];
        StateExpand["SrcFull"] = e.currentTarget.src.split('q')[0]+"q=100";
        StateExpand["Width"] = Coord.width;
        StateExpand["Height"] = Coord.height;
        StateExpand["Top"] = Coord.top;
        StateExpand["Left"] = Coord.left;

        setStateExpand({...StateExpand})
        setInitial(e.currentTarget.id);
        
        setTimeout(()=>{            
            Source.classList.add('invisible');
            Select.classList.add('Center', 'Smooth')
        }, 400)
        setTimeout(()=>{
            Select.src = StateExpand.SrcFull;
            console.log('ok')
        },1000)
    }
    
    const Photo = Object.keys(List).reverse().map((id) =>{
        const Img = List[id];
        const Factor = 5;
        
        const Check = searchWord == "" || List[id].Nom.toLowerCase().includes(searchWord) || List[id].Filtres.toLowerCase().includes(searchWord) || 
                      List[id].Localisation.Pays.toLowerCase().includes(searchWord) || List[id].Localisation.Departement.toLowerCase().includes(searchWord) || 
                      List[id].Localisation.Region.toLowerCase().includes(searchWord) || List[id].Localisation.Ville.toLowerCase().includes(searchWord);
        return(
            Check && <div key={id} className="Masonry-Item" width={Img.Ratio.Width/Factor} height={Img.Ratio.Height/Factor}>                
                <NextImage  
                    onClick={ExpandFunction}
                    className="Masonry-Img" 
                    layout="responsive"
                    // sizes="(max-width: 10px) 2px"
                    // placeholder="blur" blurDataURL={`https://cdn.lucasarts.fr/small/${id}.jpg`}
                    id={id} 
                    width={Img.Ratio.Width/Factor} 
                    height={Img.Ratio.Height/Factor} 
                    alt={Img.Nom} 
                    // data-full={`https://cdn.lucasarts.fr/full/${id}.jpg`}
                    src={`https://cdn.lucasarts.fr/full/${id}.jpg`}
                /> 
            </div>
        )
    });

    return(
        <>
            <Expand Close={ExpandClose} key="change" Data={StateExpand}/>  
            <Masonry
                breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}}
                className="Masonry-Grid"
                columnClassName="Masonry-Col">   
                {Photo}
            </Masonry>
        </>
    )
}

export default Galerie;