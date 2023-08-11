import React from 'react';
import Image from 'next/image';

import ReactBeforeSliderComponent from 'next-before-after-slider-component';
import 'next-before-after-slider-component/dist/build.css';

import uuid from 'react-uuid';
import Carousel from './Carousel';
import Head from 'next/head';

export default function Project3D({type}){
// 3D Projects ONYL
Object.keys(ProjectList['3D']).map((Proj) => {

    const Item = ProjectList['3D'][Proj];
    const Before = { imageUrl: Item.Before, alt : Item.Name+" Before" };
    const After = { imageUrl: Item.After, alt : Item.Name+" Before"};

    return(
        <div key={Proj} className="ProjectContainer">               
            <div className="ProjectImage Loader">
                <ReactBeforeSliderComponent  
                    ComponentBefore={<Image className='ImageAfter' alt={After.alt} draggable={false} width={100} height={300} src={After.imageUrl}/>} 
                    ComponentAfter={<Image className='ImageBefore' alt={Before.alt} draggable={false} width={100} height={300} src={Before.imageUrl} />} 
                />
            </div>
            <a className='ProjectLink' target="_blank" rel="noreferrer" href={Item.Url}>
                <div className="ProjectContent">
                    <div className="ProjectIcon Loader">
                        <Image width={36} height={36} alt="Lucas Pires" src="https://theme.lucasarts.fr/user.jpg" />
                    </div>
                    <div className='ProjectTexte'>                        
                        <h3>{Item.Name}</h3>
                        <span>{Item.Softwares.join(' • ')}</span>
                    </div>
                </div>                
            </a>
        </div>
    )
})
}



