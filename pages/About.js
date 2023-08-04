import Image from 'next/image';
import React from 'react';
import Head from 'next/head';

import { Parallax, Background  } from 'react-parallax';
import Buttons from '../components/Buttons';

import Interface from "../public/img/lightroom/interface.png";
import Mockup from "../public/img/lightroom/photomockup.png";
import Surface from "../public/img/lightroom/surfacemockup.png";
import WebDesign from "../public/img/design/WebDesign.png"


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
                        <h1>Lucas Pires.</h1>
                        <h2>Photographie, Web Design & 3D.</h2>
                        <p>Passionné de Photographie, de Web et de 3D, vous retrouverez toutes mes réalisations sur ce Site. <br />Développé avec NextJS, il s'agit, au delà d'un projet personnel, d'une ambition d'en apprendre toujours plus avec le JavaScript.</p>
                    </div>
                    
                </div>

                <div className='CardAbout Lightroom'>
                    <h2>Photographie</h2>
                    <div className='Texte'>                
                        <p>Passionné de <b>photographie</b> et de <b>Randonnée</b>, j'allie mes deux passions pour voyager en France et dans le monde. Chaque composition de mes photos reflète ma vision du monde. Parcourir l'Auvergne à la recherche de nouvelles pépites est une grande source de motivation. Parce qu'il n'est pas nécessaire de partir loin pour voyager, le micro-voyage permet de découvrir tous les secrets de sa région.</p>
                    
                        <p>Je travaille avec un <b>Sony Alpha 7II</b> avec un 16-35 F4 et un 28-200 F2.8. Parce que je n'ai pas encore trouvé de quoi défier les lois de la gravité, j'utilise également un <b>Drone DJI Mini 2</b> pour photographier le monde d'en haut.</p>
                    
                        <p> J'utilise <b>Adobe Lightroom</b> et <b>Photoshop</b> associé au Plugin <b>Lumenzia</b> pour travailler avec des masques de luminances, ce qui offre des possibilités d'éditions plus précises.</p>

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
                        <p>J'ai découvert la <b>modélisation 3D</b> sur Cinéma 4D avec mes premiers tutoriels YouTube. Mais c'est lors de ma deuxième année d'étude de DUT MMI que j'ai commencé de vraies formations pour créer des objets toujours plus poussés : Voitures, Robots, Sabre Laser...</p>
                        
                        <p> Lors de ma 3 ème année, en <b>Licence TAIS</b>, j'ai également appris à travailler sur un autre logiciel de modélisation 3D : <b>3DS Max</b>. Bien que puissant et très utilisés dans l'industrie, je n'ai pas souhaité continuer à travailler dessus. J'ai préféré m'orienter vers un autre logiciel très connu, qui est surtout Open Source et Gratuit.</p>
                        
                        <p>Depuis plus d'un an maintenant, je me suis donc formé sur le logiciel de modélisation 3D <b>Blender</b>. Il s'est naturellement présenté à moi grâce aux nombreuses formations présentes sur le Web. Pour toutes mes réalisations 3D, j'utilise désormais BLENDER, et impossible de m'en passer !</p>
                        <Buttons Icon="Atom" Url="/Projects" Name="Voir les modélisations"/>
                    </div>
                    <div className='ImageAbout'> 
                        <iframe src="web/LowPoly/index.html" title='Low Poly Planet' frameBorder={0} name="LowPoly"/>                  
                    </div>   
                </div>

            
                <div className='CardAbout WebDesign'>
                    <h2>Web Design</h2>
                    <div className='Texte'>
                        <p>C'est lors de mon <b>DUT</b> que j'ai découvert le<b>Web Design</b> et tout ce qui l'entoure. Mais c'est après mes études que je me suis pleinement investi dans le Web et plus particulièrement en code (<b>JavaScript, ReactJs, NextJs, Php...</b>). </p>
                        
                        <p>J'ai découvert toutes les possibilités que ce monde offrait ! Chaque projet personnel prenait alors une place importante dans mon processus de formation, et ce site en fait partie. Je voulais un site épuré, mais moderne et <b>optimisé pour le SEO</b>. Il a donc été développé avec <b>NextJS</b> et est déployé sur <b>Vercel</b> Vous pouvez découvrir le résultat de mes autres travaux dans l'onglet <b>projets</b>.</p>
                        <Buttons Icon="Atom" Url="/Projects" Name="Voir les projets"/>
                    </div>
                    <div className='ImageAbout'>    
                        <Image src={WebDesign} className="WebDesign" alt="Interface de Lightroom" style={{ width: '100%', height: 'auto', zIndex: 1 }}/>    
                    </div>   
                </div>
                
            </div>
        </>
    )
}

export default About