import '../styles/globals.css'
import Container from '../components/Container';
import { useState, createContext } from "react";

export const NextContext = createContext();

function MyApp({ Component, pageProps }) {

  // Search State
  const [searchWord, setSearchWord] = useState("")
  const [searchFiltre, setSearchFiltre] = useState(false)

  // Search Function for Input & Filter
  const SearchFunction = (Word) => {
      document.querySelector('.Focus')?.classList.remove('Focus');
      setSearchWord(Word.toLowerCase());
  }

  return (
    <NextContext.Provider value={{ searchWord, SearchFunction, setSearchFiltre,  searchFiltre}}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </NextContext.Provider>
  )
}

export default MyApp
