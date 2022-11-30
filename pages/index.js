import Head from 'next/head';
import Galerie from '../components/Galerie';

export default function Home({GalerieList, Filtres, searchWord}) {

    return (
    <>
      <Head>
        <title>Lucas Pires - Photographie, Web Design et Motion Design</title>
        <meta name="description" content="Basé à Clermont-Ferrand, je partage mes photos et mes projets Web ! Passioné par l'Auvergne, je la parcours avec mon A7II et mon drone." />
        <link rel="icon" href="https://theme.lucasarts.fr/logo.png" />
      </Head>

      <Galerie searchWord={searchWord} List={GalerieList}/>
    </>
  )
}


export async function getStaticProps(){
  // REST API Firebase 
  const Filtres = [];
  const GalerieList = await fetch("https://api.lucasarts.fr/galerie/").then(response => response.json()).then(response => response['photos']);
  const Test = Object.keys(GalerieList).map((x) =>{
    const ListFiltre = GalerieList[x].Filtres.split(',').map((item) =>{
      !Filtres.includes(item) && Filtres.push(item) 
    });       
  })


  return {
    props : {
      GalerieList,
      Filtres : Filtres
    },
    revalidate: 60,
  }
}
