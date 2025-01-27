import React from "react";

import { useNavigate } from 'react-router-dom';

import "../../styles/forosReptiles.css";

import reptiles from "../../img/Reptiles.png";


export const ForosReptiles = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Cuidados', members: '567 Miembros', icon: '🏥' },
        { name: 'Alimento', members: '4504 Miembros', icon: '🥩' },
        { name: 'Etología', members: '3365 Miembros', icon: '🦎' },
        { name: 'Accesorios', members: '8554 Miembros', icon: '🌿' },
        { name: 'Adiestramiento', members: '185 Miembros', icon: '📜' }
    ];

    return (
        <div className="foros-reptiles-container">

            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

        
            <div className="content-section">
                <h1 className="main-title">MI COMUNIDAD</h1>
                <h2 className="subtitle">/ REPTILIANA /</h2>
                
                <p className="description-text">
                Los reptiles son mascotas fascinantes y tranquilas. Aunque no requieren tanta interacción como otros animales, es esencial proporcionarles un hábitat adecuado con temperatura y humedad controladas. Una alimentación apropiada y cuidados específicos garantizan su bienestar. ¡Son criaturas únicas que aportan serenidad al hogar!
                </p>
            </div>

            {/* Cat Image and Categories */}
            <div className="main-content-grid">
    <div className="reptiles-image-section">
        <div className="reptiles-image-container">
        <img 
                            src={reptiles} 
                            alt="Reptiles" 
                            className="reptiles-image" 
                            onClick={() => navigate('/foros')}
                            style={{ cursor: 'pointer' }} 
                        />
        </div>
    
    </div>

    <div className="categories-section">
        {categories.map((category, index) => (
            <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <div className="category-info">
                    <span className="category-name">/ {category.name} /</span>
                    <span className="member-count">{category.members}</span>
                </div>
            </div>
        ))}
    </div>
</div>
        </div>
    );
};

export default ForosReptiles;