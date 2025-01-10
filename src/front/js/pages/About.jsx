import React from "react";
import "../../styles/about.css";
import dragon from "../../img/Dragon.png"; 

export const About = () => {
    return (
        <div className="about-wrapper">
            <div className="about-container">
                <div className="decorative-shape-1"></div>
                <div className="decorative-shape-2"></div>
                
                <div className="content-container">
                    <div className="text-section">
                        <h1 className="about-title"><strong>ABOUT</strong> US</h1>
                        <p className="about-text">
                            PetPals una red social basada en la interacción
                            entre usuarios sobre sus mascotas.
                            Customiza tu perfil, guarda los mejores momentos
                            con tu mascota y encuentra gente que comparta
                            tus mismos intereses. Dudas, cuidados, salud, y
                            mucho más, todo lo encontrarás en los diferentes
                            foros que hemos preparado para ti. Suscribite a los
                            que más te gustan y no te pierdas ninguna de sus
                            noticias y eventos.
                        </p>
                        <button className="read-more-btn">Leer más</button>
                    </div>
                    <div className="image-section">
                        <div className="circle-background"></div>
                        <img src={dragon} alt="Bearded Dragon" className="dragon-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};