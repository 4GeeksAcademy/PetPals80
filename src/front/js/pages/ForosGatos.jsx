import React from "react";

import { useNavigate } from 'react-router-dom';


import "../../styles/forosGatos.css";

import gatos from "../../img/Gatos.png";


export const ForosGatos = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Cuidados', members: '567 Miembros', icon: '🏥' },
        { name: 'Alimento', members: '4504 Miembros', icon: '🍽️' },
        { name: 'Etologia', members: '3365 Miembros', icon: '🐱' },
        { name: 'Accesorios', members: '8554 Miembros', icon: '🧶' },
        { name: 'Adiestramiento', members: '185 Miembros', icon: '📝' }
    ];

    return (
        <div className="foros-gatos-container">

            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

        
         
            <div className="content-section">
                <h1 className="main-title">MI COMUNIDAD</h1>
                <h2 className="subtitle">/ GATUNA /</h2>
                
                <p className="description-text">
                    Los gatos son adorables compañeros. Independientes pero cariñosos, disfrutan de jugar
                    y explorar. Necesitan una buena alimentación, agua fresca, y rascadores para sus garras.
                    ¡Estos peludos son pura alegría!
                </p>
            </div>

            {/* Cat Image and Categories */}
            <div className="main-content-grid">
    <div className="cat-image-section">
        <div className="cat-image-container">
        <img 
                            src={gatos} 
                            alt="Gatos" 
                            className="cats-image" 
                            onClick={() => navigate('/foros')}
                            style={{ cursor: 'pointer' }} 
                        />
        </div>
    
    </div>

    <div className="categories-section">
    {categories.map((category, index) => (
        <div 
            key={index} 
            className="category-card"
            onClick={() => navigate(`/foros-gatos/${category.name.toLowerCase()}`)}
            style={{ cursor: 'pointer' }}
        >
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

export default ForosGatos;