import React from 'react';
import Image from 'next/image';

import ReactBeforeSliderComponent from 'next-before-after-slider-component';
import 'next-before-after-slider-component/dist/build.css';

import uuid from 'react-uuid';
import Carousel from './Carousel';
import Head from 'next/head';


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
            <div key={`3D-${Proj}`} className="ProjectContainer">               
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

        const CarouselImg = Item.Images.map(x => 
            <Image 
                fill 
                sizes="(max-width: 1000px) 33vw, (max-width: 768px) 50vw, 100vw" 
                key={uuid()} 
                className='embla__slide ProjectSlide'  
                alt={Item.Name} src={x} 
            />)    

        const Video = ('Video' in Item) && (
            <video key={uuid()} preload="none" poster={Item.Images[0]} onMouseLeave={HideControl} onMouseOver={HoverVideo}>
                <source src={Item.Video}  type="video/mp4"/>
            </video>
        )
        
        return(  <Carousel key={uuid()} Video={Video} CarouselImg={CarouselImg} Url={Item.Url} Name={Item.Name} Softwares={Item.Softwares} /> )
    })

    // Motion Project Only
    const ProjectMotion = Object.keys(ProjectList['Motion']).map((Proj) => {

        const Item = ProjectList['Motion'][Proj];

        return(
            <div  key={`Motion-${Proj}`} className="ProjectContainer" >           
                    <div className="ProjectImage Loader">
                        <video poster={Item.Poster} preload="none" onMouseLeave={HideControl} onMouseOver={HoverVideo}>
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

     // Print Project Only
     const ProjectPrint = Object.keys(ProjectList['Print']).map((Proj) => {
        const Item = ProjectList['Print'][Proj];
        const CarouselImg = Item.Images.map(x => 
            <Image 
                fill 
                sizes="(max-width: 1000px) 33vw, (max-width: 768px) 50vw, 100vw" 
                key={uuid()} 
                className='embla__slide ProjectSlide'  
                alt={Item.Name} 
                src={x} 
                />
            )
        return( <Carousel key={`Print-${Proj}`}  CarouselImg={CarouselImg} Url={Item.Url} Name={Item.Name} Softwares={Item.Softwares} /> )
    })

    // Logo Projects ONYL
     // Print Project Only
     const ProjectLogo = Object.keys(ProjectList['Logo']).map((Proj) => {
        const Item = ProjectList['Logo'][Proj];
        const CarouselImg = <Image 
            fill 
            sizes="(max-width: 1000px) 33vw, (max-width: 768px) 50vw, 100vw" 
            key={uuid()} 
            className='embla__slide ProjectSlide'  
            alt={Item.Name} 
            src={Item.Image} 
            />
        return( <Carousel key={`Logo-${Proj}`}  CarouselImg={CarouselImg} Url={Item.Url} Name={Item.Name} Softwares={Item.Softwares} /> )
    })


    return(
        <>
        <Head>
            <title>Lucas Pires - Mes Projets</title>
            <meta name="description" content="Découvrez tous mes projets en Modélisation 3D, Web Design ou encore Motion Design !" />
        </Head>
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

            <h2>Print</h2>
            <div className='ProjectWrapper AutoRatio'>
                {ProjectPrint}
            </div>

            <h2>Logos</h2>
            <div className='ProjectWrapper'>
                {ProjectLogo}
            </div>


        </div>
        </>
    )
}

// ISR
// export async function getStaticProps(){

//     // REST API Projects 
//     const ProjectList = await fetch("https://projects.lucasarts.fr/Projects.json").then(response => response.json());
  
//     return {
//       props : {
//         ProjectList,
//       },
//        revalidate: 60,
//     }
// }

export async function getServerSideProps() {
    // REST API Projects 
    const ProjectList = await fetch("https://projects.lucasarts.fr/Projects.json")
      .then((response) => response.json());
  
    return {
      props: {
        ProjectList,
      },
    };
}
  
  