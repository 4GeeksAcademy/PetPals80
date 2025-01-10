import React from "react";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';  
import "swiper/css";
import "../../styles/foros.css";


import reptiles from "../../img/Reptiles.png";
import gatos from "../../img/Gatos.png";
import perros from "../../img/Perros.png";
import roedores from "../../img/Roedores.png";
import artropodos from "../../img/Artropodos.png";
import aves from "../../img/Aves.png";

const sliderSettings = {
    slidesPerView: 5,  
    spaceBetween: 10, 
    loop: true,
    modules: [Autoplay],  
    autoplay: {
        delay: 3000,  
        disableOnInteraction: false,  
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 5,  
        }
    }
};

const SliderButtons = () => {
    const swiper = useSwiper();
    return (
        <div className="carousel-buttons">
            <button onClick={() => swiper.slidePrev()} className="carousel-button prev">&lt;</button>
            <button onClick={() => swiper.slideNext()} className="carousel-button next">&gt;</button>
        </div>
    );
};

export const Foros = () => {
    const pets = [
        { image: reptiles, label: 'REPTILES' },
        { image: gatos, label: 'GATOS' },
        { image: perros, label: 'PERROS' },
        { image: roedores, label: 'ROEDORES' },
        { image: artropodos, label: 'ARTRÓPODOS' },
        { image: aves, label: 'AVES' }
    ];

    return (
        <div className="foros-container">
            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

            <div className="content-section">
                <h1 className="main-title">
                    <span className="pink-text">CONSEJOS Y</span><br />
                    <span className="pink-text">COMUNIDAD</span>
                </h1>
                <h2 className="subtitle">/ A UN CLICK /</h2>
                
                <p className="welcome-text">
                    Bienvenidos a la comunidad de <strong>Petpals</strong>. <br/> Este es el lugar donde podrás encontrar todo
                    lo que necesitas para el día a día con tu mascota.
                    Entra en un foro y habla con gente de todo el mundo, sigue sus perfiles y acompañanos
                    en esta nueva aventura. No olvides visitar nuestras secciones secundarias para saber más sobre los cuidados, salud,
                    alimentaición y bienestar de tus pequeños. 
                </p>
            </div>

            <div className="carousel-section">
                <Swiper {...sliderSettings} className="custom-carousel">
                    <SliderButtons />
                    {pets.map((pet, i) => (
                        <SwiperSlide key={i}>
                            <div className="pet-card">
                                <img src={pet.image} alt={pet.label} />
                                <span className="pet-label">{pet.label}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};