import Head from 'next/head';
import Galerie from '../components/Galerie';
import FiltresList from '../components/FiltresList';
import { useContext } from 'react';
import { NextContext } from '../pages/_app';

export default function Home({GalerieList, FiltresObj}) {

  const { searchWord } = useContext(NextContext);

    return (
    <>
      <Head>
        <title>Lucas Pires - Photographie, Web Design et 3D</title>
        <meta name="description" content="Basé à Clermont-Ferrand, je partage mes photos et mes projets Web ! Passioné par l'Auvergne, je la parcours avec mon A7II et mon drone." />
      </Head>
      
      <div className='ContentNext'>
        <FiltresList Filtres={FiltresObj}/>
        <Galerie Filtres={FiltresObj} searchWord={searchWord} List={GalerieList}/>
      </div>
      
    </>
  )
}


export async function getStaticProps(){
  // REST API Firebase 
  const Filtres = [];
  const FiltresObj = {};
  const GalerieList = await fetch("https://api.lucasarts.fr/galerie/").then(response => response.json()).then(response => response['photos']);


  Object.keys(GalerieList).map((x) =>{
    GalerieList[x].Filtres.split(',').map((item) =>{
      !Filtres.includes(item) && Filtres.push(item) 
      FiltresObj[item] = FiltresObj[item] + 1 || 1;
    });       
  })


  return {
    props : {
      GalerieList,
      Filtres : Filtres,
      FiltresObj : FiltresObj
    },
    revalidate: 60,
  }
}
