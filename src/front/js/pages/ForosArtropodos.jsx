import React from "react";

import { useNavigate } from 'react-router-dom';

import "../../styles/forosArtropodos.css";

import artropodos from "../../img/Artropodos.png";


export const ForosArtropodos = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Cuidados', members: '567 Miembros', icon: '🏥' },
        { name: 'Alimento', members: '4504 Miembros', icon: '🍽️' },
        { name: 'Etología', members: '3365 Miembros', icon: '🐱' },
        { name: 'Accesorios', members: '8554 Miembros', icon: '🧶' },
        { name: 'Adiestramiento', members: '185 Miembros', icon: '📝' }
    ];

    return (
        <div className="foros-artropodos-container">

            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

        
            <div className="content-section">
                <h1 className="main-title">MI COMUNIDAD</h1>
                <h2 className="subtitle">/ ARTRÓPODA /</h2>
                
                <p className="description-text">
                    Los gatos son adorables compañeros. Independientes pero cariñosos, disfrutan de jugar
                    y explorar. Necesitan una buena alimentación, agua fresca, y rascadores para sus garras.
                    ¡Estos peludos son pura alegría!
                </p>
            </div>

            {/* Cat Image and Categories */}
            <div className="main-content-grid">
    <div className="artropodos-image-section">
        <div className="artropodos-image-container">
        <img 
                            src={artropodos} 
                            alt="Artropodos" 
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

export default ForosArtropodos;