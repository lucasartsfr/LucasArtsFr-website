import Image from 'next/image';
import React from 'react';

import { Parallax, Background  } from 'react-parallax';
import Buttons from '../components/Buttons';

import Interface from "../public/img/lightroom/interface.png";
import Mockup from "../public/img/lightroom/photomockup.png";
import Surface from "../public/img/lightroom/surfacemockup.png";
import WebDesign from "../public/img/design/WebDesign.png"


function About(){

    return(
        <div className="SpaceHeaderContainer AboutContainer">

            <div className='MainAbout'>
            {/* <Parallax className='ParallaxBg' blur={0} bgImage="https://cdn.lucasarts.fr/full/91.jpg" bgImageAlt="LucasArtsFr Cover" strength={100}/> */}
            <Parallax strength={100} className="ParallaxBg Loader">
                <Background >
                    <Image className='Cover' fill priority src="https://cdn.lucasarts.fr/full/91.jpg" alt="LucasArtsFr Cover" />
                </Background>
            </Parallax>
                <div className='InfoUser'>
                    <Image className='ImageUser Loader' alt='Lucas Pires' width={96} height={96} src="https://theme.lucasarts.fr/user.jpg" />
                    <h1>Lucas Pires.</h1>
                    <h2>Photographie, Web Design & 3D.</h2>
                    <p>Passionné de Photographie, de Web et de 3D, vous retrouverez toutes mes réalisations sur ce Site. <br />Développé avec NextJS, il s'agit, au delà d'un projet personnel, d'une ambition d'en apprendre toujours plus avec le JavaScript.</p>
                </div>
                
            </div>

            <div className='CardAbout Lightroom'>
                <h2>Photographie</h2>
                <div className='Texte'>                
                    <p>Passionné de photographie et de Randonnée, j'allie mes deux passions pour voyager en France et dans le monde. Chaque composition de mes photos reflète ma vision du monde. Parcourir l'Auvergne à la recherche de nouvelles pépites est une grande source de motivation. Parce qu'il n'est pas nécessaire de partir loin pour voyager, le micro-voyage permet de découvrir tous les secrets de sa région.</p>
                
                    <p>Je travaille avec un Sony Alpha 7II avec un 16-35 F4 et un 28-200 F2.8. Parce que je n'ai pas encore trouvé de quoi défier les lois de la gravité, j'utilise également un Drone DJI Mini 2 pour photographier le monde d'en haut.</p>
                
                    <p> J'utilise Adobe Lightroom et Photoshop associé au Plugin Lumenzia pour travailler avec des masques de luminances, ce qui offre des possibilités d'éditions plus précises.</p>

                    <Buttons Icon="Atom" Url="/" Name="Voir la galerie"/>
                </div>
                <div className='ImageAbout'>                   
                    <Image src={Surface} className="Surface" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 1 }}/>
                    <Image src={Interface} className="Interface" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 2 }}/>
                    <Image src={Mockup} className="Mockup" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 3 }}/>
                </div>   
            </div>

            <div className='CardAbout Modelisation'>
                <h2>Modelisation</h2>
                <div className='Texte'>
                    <p>J'ai découvers la modélisation 3D sur Cinéma 4D avec mes premiers tutoriels YouTube. Mais c'est lors de ma deuxième année d'étude de DUT MMI que j'ai commencé de vraies formations pour créer des objets toujours plus poussés : Voitures, Robots, Sabre Laser...</p>
                    
                    <p> Lors de ma 3 ème année, en Licence TAIS, j'ai également appris à travailler sur un autre logiciel de modélisation 3D : 3DS Max. Bien que puissant et très utilisés dans l'industrie, je n'ai pas souhaité continuer à travailler dessus. J'ai préféré m'orienter vers un autre logiciel très connu, qui est surtout Open Source et Gratuit.</p>
                    
                    <p>Depuis plus d'un an maintenant, je me suis formé sur le logiciel de modélisation Blender. Il s'est naturellement présenté à moi grâce aux nombreuses formations présentes sur le Web. Pour toutes mes réalisations 3D, j'utilise désormais BLENDER, et impossible de m'en passer !</p>
                    <Buttons Icon="Atom" Url="/Projects" Name="Voir les modélisations"/>
                </div>
                <div className='ImageAbout'> 
                    <iframe src="web/LowPoly/index.html" title='Low Poly Planet' frameBorder={0} name="LowPoly"/>                  
                </div>   
            </div>

          
            <div className='CardAbout WebDesign'>
                <h2>Web Design</h2>
                <div className='Texte'>
                    <p>C'est lors de mon DUT que j'ai découvers le Web Design et tout ce qui l'entoure. Mais c'est après mes études que je me suis pleinement investi dans le Web et plus particulièrement en code (JavaScript, ReactJs, NextJs, Php...). </p>
                    
                    <p>J'ai découvers toutes les possibilités que ce monde offrait ! Chaque projet personnel prennait alors une place importante dans mon processus de formation, et ce site en fait partie. Je voulais un site épuré mais moderne et optimisé pour le SEO. Vous pouvez découvrir le résultat de mes autres travaux dans l'onglet projets.</p>
                    <Buttons Icon="Atom" Url="/Projects" Name="Voir les projets"/>
                </div>
                <div className='ImageAbout'>    
                    <Image src={WebDesign} className="WebDesign" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 1 }}/>    
                </div>   
            </div>
            
        </div>
    )
}

export default About