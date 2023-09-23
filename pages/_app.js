import '../styles/globals.css'
import Container from '../components/Container';
import { useState, createContext, useEffect } from "react";
import { Poppins } from '@next/font/google'
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const NextContext = createContext();

function MyApp({ Component, pageProps }) {

  // Search State
  const [searchWord, setSearchWord] = useState("");
  const [searchFiltre, setSearchFiltre] = useState(false);
  const [mobile, setMobile] = useState(true);
  const [width, setWidth] = useState(false);
  

  useEffect(() =>{
    window.innerWidth > 800 && setMobile(false)
    setWidth(window.innerWidth)
  }, [])

  // Search Function for Input & Filter
  const SearchFunction = (Word) => {
      document.querySelector('.Focus')?.classList.remove('Focus');
      setSearchWord(Word.toLowerCase());
  }

  return (
    <>
    <style jsx global>{`* {font-family: ${poppins.style.fontFamily};}`}</style>    
    <NextContext.Provider value={{ searchWord, SearchFunction, setSearchFiltre,  searchFiltre, mobile, width}}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </NextContext.Provider>
    </>
  )
}

export default MyApp
