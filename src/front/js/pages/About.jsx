import React from "react";
import "../../styles/about.css";
import all from "../../img/all-members.png"; 
import quest from "../../img/pregunta.png"; 
import beachdog from "../../img/doggy.png"; 
import barra from "../../img/barra.png"; 
import tropa from "../../img/tropa.png"; 

export const About = () => {
    return (
        <div className="about-wrapper">
            <div className="about-container">
                <div className="decorative-shape-1"></div>
                <div className="decorative-shape-2"></div>
                
                <div className="content-container">
                    <div className="text-section">
                        <h4 className="about-text">
                        PetPals se compone de tres apasionados desarrolladores web, Aless, Sebas y Aitor. Nuestra dedicación y amor por los animales nos llevó a crear esta red social única,
                        donde los amantes de las mascotas pueden compartir sus momentos más especiales y conectar con otros usuarios que comparten su pasión.

                        Imagina un lugar donde puedes personalizar tu perfil, guardar tus recuerdos más entrañables con tu mascota, y descubrir a personas con tus mismos intereses.
                        PetPals es más que una red social, es una comunidad donde podrás encontrar foros dedicados a dudas, cuidados, salud y mucho más. Suscríbete a tus favoritos para no
                        perderte ninguna noticia ni evento. <strong>¡Únete a nuestra familia y celebra el amor por las mascotas con nosotros!</strong>
                        </h4>
                    </div>
                    <div className="quest">
                        <img src={quest} alt="Bearded Dragon" className="dragon-image" />
                    </div>
                </div>
            </div>
            <div className="about-persons">
                        <img src={tropa} alt="All Members" className="Members" />
            </div>
            <div className="final">
                     <img src={barra} alt="recurso" className="linea"/>
                    <h4>En PetPals, celebramos momento especiales que compartimos con nuestras queridas mascotas. Nuestro objetivo es
                    crear un espacio donde puedas <strong>conectar</strong>, <strong>compartir</strong> y <strong>aprender</strong> sobre el maravilloso mundo de los animales.
                    Pero PetPals no sería nada sin ti. ¡Te necesitamos! Únete a nuestra creciente comunidad hoy mismo y participa en una red social construida por y para los amantes de las mascotas.</h4>
                <img src={barra} alt="recurso" className="lineados" />
            </div>
            <div className="about-persons">
                        <img src={beachdog} alt="Beach dog" className="beachdog" />
            </div>
                
            </div>
    );
};
