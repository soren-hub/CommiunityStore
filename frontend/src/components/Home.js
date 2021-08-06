import React from "react";
import { Navbar } from "./Navbar";

import "../App.css";

export const Home = () => {
  return (
    <div className="App">
      <Navbar />
     
      <section className="banner contenedor" >
        <secrion className="banner_title" style={{textIndent: '60px'}} >
          <h2><center>Community <br/> Store</center></h2>
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
