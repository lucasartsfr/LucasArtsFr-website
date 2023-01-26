import React from 'react';
import Image from 'next/image';

import ReactBeforeSliderComponent from 'next-before-after-slider-component';
import 'next-before-after-slider-component/dist/build.css';

import uuid from 'react-uuid';
import Carousel from './Carousel';


export default function Projects({ProjectList}){

    const HoverVideo = (e) =>{
        e.currentTarget.toggleAttribute('controls')
    }
    const HideControl = (e) =>{
        e.currentTarget.toggleAttribute('controls')
    }

    // 3D Projects ONYL
    const Project3D = Object.keys(ProjectList['3D']).map((Proj) => {

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

    // Web Project Only
    const ProjectWeb = Object.keys(ProjectList['Web']).map((Proj) => {
        const Item = ProjectList['Web'][Proj];

        const CarouselImg = Item.Images.map((x => <Image fill sizes="(max-width: 1000px) 33vw, (max-width: 768px) 50vw, 100vw" key={uuid()} className='embla__slide ProjectSlide'  alt={Item.Name} src={x} />))

        const Video = ('Video' in Item) && (<video key={uuid()} muted autoPlay poster={Item.Images[0]} onMouseLeave={HideControl} onMouseOver={HoverVideo}>
            <source src={Item.Video}  type="video/mp4"/>
        </video>)
        
        return( <Carousel key={uuid()} Video={Video} CarouselImg={CarouselImg} Url={Item.Url} Name={Item.Name} Softwares={Item.Softwares} /> )
    })

    // Motion Project Only
    const ProjectMotion = Object.keys(ProjectList['Motion']).map((Proj) => {

        const Item = ProjectList['Motion'][Proj];

        return(
            <div key={Proj} className="ProjectContainer" >           
                    <div className="ProjectImage Loader">
                        <video poster={Item.Poster} onMouseLeave={HideControl} onMouseOver={HoverVideo}>
                            <source src={Item.Url}  type="video/mp4"/>
                        </video>
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

    return(
        <div className="SpaceHeaderContainer ProjectsContainer">
            <h2>Modélisation 3D</h2>
            <div className='ProjectWrapper'>
                {Project3D}
            </div>           
            <h2>Motion Design</h2>
            <div className='ProjectWrapper'>
                {ProjectMotion}
            </div>
            <h2>Web Design</h2>
            <div className='ProjectWrapper'>
                {ProjectWeb}
            </div>
        </div>
    )
}


export async function getStaticProps(){

    // REST API Projects 
    const ProjectList = await fetch("https://api.lucasarts.fr/projects/Projects.json").then(response => response.json());
  
    return {
      props : {
        ProjectList,
      },
      revalidate: 60,
    }
  }
  