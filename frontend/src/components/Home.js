import React from "react";
import { Navbar } from "./Navbar";

import "../App.css";
import "animate.css/animate.min.css";

export const Home = () => {
  return (
    <div className="App">
      <Navbar />
     
      <section className="banner contenedor " >
        <secrion className="banner_title" style={{textIndent: '10px'}} >
          <h2 className="animate__animated animate__zoomInDown animate__delay-1s"><center>Community <br/> Store</center></h2>
        </secrion>
 
      </section>

      <div className="burbujas">
        <div className="burbuja" />
        <div className="burbuja" />
        
        <div className="burbuja" />
        <div className="burbuja" />
        <div className="burbuja" />
        <div className="burbuja" />
        <div className="burbuja" />
        <div className="burbuja" />
        <div className="burbuja" />
        <div className="burbuja" />
      </div>
    </div>
  );
};
