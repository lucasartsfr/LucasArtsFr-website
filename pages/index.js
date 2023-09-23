import Image from 'next/image';
import React from 'react';
import Head from 'next/head';

import { Parallax, Background  } from 'react-parallax';
import Buttons from '../components/Buttons';

import Interface from "../public/img/lightroom/interface.png";
import Mockup from "../public/img/lightroom/photomockup.png";
import Surface from "../public/img/lightroom/surfacemockup.png";
import WebDesign from "../public/img/design/WebDesign.png";
import Print from "../public/img/print/Print.jpg";
import Tilt from 'react-parallax-tilt';


function About(){

    return(
        <>
        <Head>
            <title>Lucas Pires - A propos de moi</title>
            <meta name="description" content="Je suis Lucas Pires, je fais de la photographie, du motion design, de la 3D et du Développement Web !" />
        </Head>

            <div className="SpaceHeaderContainer AboutContainer">

                <div className='MainAbout'>
                {/* <Parallax className='ParallaxBg' blur={0} bgImage="https://cdn.lucasarts.fr/full/91.jpg" bgImageAlt="LucasArtsFr Cover" strength={100}/> */}
                <Parallax strength={100} className="ParallaxBg Loader">
                    <Background >
                        <Image className='Cover' fill priority src="https://cdn.lucasarts.fr/img/91.jpg" alt="LucasArtsFr Cover" />
                    </Background>
                </Parallax>
                    <div className='InfoUser'>
                        <Image className='ImageUser Loader' alt='Lucas Pires' width={96} height={96} src="https://theme.lucasarts.fr/user.jpg" />
                        
                        <h1>Lucas Pires</h1>
                        <h2>UI et UX Designer</h2>
                        <p>Passionné de <b>Photographie</b>, <b>UI & d'UX</b>, vous retrouverez toutes mes réalisations sur ce portfolio.</p>
                        <p>Développé avec NextJS, il s'agit, au delà d'un simple portfolio, <br></br>d'une ambition d'en apprendre toujours plus avec le développement Web et la création d'interface.</p>
                        <div className='CVButtons'>
                            <Buttons target="_blank" Icon="PDF" Url="http://cv.lucasarts.fr/CV.pdf" Name="Voir le CV Papier"/>
                            <Buttons target="_blank" Icon="Camera" Url="http://cv.lucasarts.fr/CVideo.mp4" Name="Voir le CV Vidéo" className="Secondary-btn"/>
                        </div>
                    </div>                    
                </div>

                <div className='CardAbout WebDesign'>
                    <h2>UI et UX Design</h2>
                    <div className='Texte'>
                        <p>C'est lors de mon <b>DUT</b> que j'ai découvert l'<b>UI/UX Design</b> et tout ce qui l'entoure. Passionné de physique et de science, j'aime comprendre le monde qui nous entoure. Cette curiosité naturelle m'a poussé à approfondir mes connaissances en UX Design pour comprendre les personas, et créer des interfaces fluides, rassurantes et intuitives.</p>
                                             
                        <p>J'utilise de nombreux outils pour analyser les habitudes et les besoins des clients. Heatmaps, Clickmap, Scrollmap, Google Analytics (Event tracking, Audience, Bounce Rate...), Sondage, Funnels ou encore de l'A/B Testing.</p> 
                        
                        <p>Pour l'UI et la création d'éléments graphiques, j'ai appris à travailler sur de nombreux outils, comme la suite Adobe et Figma. Mais pour aller encore plus loin et comprendre au mieux les problématiques, j'ai également appris le développement Web et mobile, aussi bien Front que Back (ReactJs, React Native, NodeJs, Php, CSS...).</p>
                        
                        <p>L'intégration d'éléments repose également sur la communication avec les développeurs, mais aussi le temps qu'ils ont à disposition pour le faire. En ayant conscience du temps que peut prendre la création de ces éléments en développement web et mobile, j'ai une vision plus globale du projet et peux apporter des solutions optimisées et viables.</p>
                        <Buttons Icon="Atom" Url="/Projects" Name="Voir les projets Web"/>
                    </div>
                    <div className='ImageAbout'>    
                        <Image src={WebDesign} className="WebDesign" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 1 }}/>    
                    </div>   
                </div>

                <div className='CardAbout Lightroom'>
                    <h2>Photographie</h2>
                    <div className='Texte'>                
                        <p>Passionné de <b>photographie</b> et de <b>Randonnée</b>, j'allie mes deux passions pour voyager en France et dans le monde. Chaque composition de mes photos reflète ma vision du monde. Parcourir l'Auvergne à la recherche de nouvelles pépites est une grande source de motivation. Parce qu'il n'est pas nécessaire de partir loin pour voyager, le micro-voyage permet de découvrir tous les secrets de sa région.</p>
                    
                        <p>Je travaille avec un <b>Sony Alpha 7II</b> avec un 16-35 F4 et un 28-200 F2.8. Parce que je n'ai pas encore trouvé de quoi défier les lois de la gravité, j'utilise également un <b>Drone DJI Mini 2</b> pour photographier le monde d'en haut.</p>
                    
                        <p> J'utilise <b>Adobe Lightroom</b> et <b>Photoshop</b> associé au Plugin <b>Lumenzia</b> pour travailler avec des masques de luminances, ce qui offre des possibilités d'éditions plus précises.</p>

                        <Buttons Icon="Galerie" Url="/Photos" Name="Voir la galerie"/>
                    </div>
                    <div className='ImageAbout'>                   
                        <Image src={Surface} className="Surface" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 1 }}/>
                        <Image src={Interface} className="Interface" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 2 }}/>
                        <Image src={Mockup} className="Mockup" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 3 }}/>
                    </div>   
                </div>           

                <div className='CardAbout Marketing'>
                    <h2>Communication & Marketing</h2>
                    <div className='Texte'>
                        <p>Durant <b>6 ans</b> j'ai été <b>Assistant Marketing et Responsable Marketing</b> au sein d'une entreprise de eCommerce. Branding, Création de contenu Web, Vidéo et Print, Planification, Gestion des campagnes, Salons, Gestion de budget, Stratégie éditoriale et iconographique etc...</p>
                        
                        <p>Ces nombreuses missions m'ont permis d'avoir une <b>expertise globale et complète</b> sur la communication d'une entreprise, aussi bien en interne que pour différents clients. Je suis apte à gérer les processus de <b>création et de diffusion</b> pour différentes campagnes ciblées.</p>

                        <p>Les créations étaient nombreuses : <b>Flyers</b>, Kakémono, <b>Vidéos promotionnelles</b>, Photos de produits, Enseigne de boutique, Infographie et représentation de data etc.</p>
                        <Buttons Icon="Print" Url="/Projects" Name="Voir les projets Print"/>
                    </div>
                    <div className='ImageAbout'>                            
                        <Tilt className='Tilt'>
                            <Image src={Print} className="Print" alt="Exemple de print" style={{ aspectRatio : "515/725" , zIndex: 1 }}/>    
                        </Tilt>    
                    </div>   
                </div> 
            
                
                

                <div className='CardAbout Modelisation'>
                    <h2>Modelisation</h2>
                    <div className='Texte'>
                        <p>J'ai découvert la <b>modélisation 3D</b> sur Cinéma 4D avec mes premiers tutoriels YouTube. Mais c'est lors de ma deuxième année d'étude de DUT MMI que j'ai commencé de vraies formations pour créer des objets toujours plus poussés : Voitures, Robots, Sabre Laser...</p>
                        
                        <p> Lors de ma 3 ème année, en <b>Licence TAIS</b>, j'ai également appris à travailler sur un autre logiciel de modélisation 3D : <b>3DS Max</b>. Bien que puissant et très utilisé dans l'industrie, je n'ai pas souhaité continuer à travailler dessus. J'ai préféré m'orienter vers un autre logiciel très connu, qui est surtout Open Source et Gratuit avec une grande communauté de créateurs.</p>
                        
                        <p>Depuis plus de deux ans maintenant, je me suis donc formé sur le logiciel de modélisation 3D <b>Blender</b>. Il s'est naturellement présenté à moi grâce aux nombreuses formations présentes sur le Web. Pour toutes mes réalisations 3D, j'utilise désormais BLENDER, et impossible de m'en passer !</p>
                        <Buttons Icon="Three" Url="/Projects" Name="Voir les modélisations 3D"/>
                    </div>
                    <div className='ImageAbout'> 
                        <iframe src="web/LowPoly/index.html" title='Low Poly Planet' frameBorder={0} name="LowPoly"/>                  
                    </div>   
                </div>
                
            </div>
        </>
    )
}

export default About