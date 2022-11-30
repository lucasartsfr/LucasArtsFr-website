import Header from "./Header";
// import { useState } from "react";

function Container({children, SearchFunction}){

    return(
        <>
            <Header SearchFunction={SearchFunction} />
            {children}
        </>
    )
}

export default Container;