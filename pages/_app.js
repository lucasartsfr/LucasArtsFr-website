import '../styles/globals.css'
import Container from '../components/Container';
import { useState } from "react";

function MyApp({ Component, pageProps }) {

  const [searchWord, setSearchWord] = useState("")
    const SearchFunction = (e) => {
        setSearchWord(e.target.value.toLowerCase());
    }

  return (
    <Container SearchFunction={SearchFunction}>
      <Component {...pageProps} searchWord={searchWord} />
    </Container>
  )
}

export default MyApp
