import React from "react";

import { useNavigate } from 'react-router-dom';

import "../../styles/forosAves.css";

import aves from "../../img/Aves.png";


export const ForosAves = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Cuidados', members: '567 Miembros', icon: '🏥' },
        { name: 'Alimento', members: '4504 Miembros', icon: '🌾' },
        { name: 'Etologia', members: '3365 Miembros', icon: '🐦' },
        { name: 'Accesorios', members: '8554 Miembros', icon: '🪶' },
        { name: 'Adiestramiento', members: '185 Miembros', icon: '🦜' }
    ];

    return (
        <div className="foros-aves-container">

            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

        
            <div className="content-section">
                <h1 className="main-title">MI COMUNIDAD</h1>
                <h2 className="subtitle">/ AVIAR /</h2>
                
                <p className="description-text">
                Las aves son compañeras vibrantes y melodiosas. Muchas disfrutan de la interacción con sus cuidadores y pueden ser muy sociables. Necesitan una jaula espaciosa, una dieta variada y enriquecimiento ambiental para mantenerse saludables y felices. ¡Sus cantos y colores alegran cualquier espacio!
                </p>
            </div>

            {/* Cat Image and Categories */}
            <div className="main-content-grid">
    <div className="aves-image-section">
        <div className="aves-image-container">
        <img 
                            src={aves} 
                            alt="Aves" 
                            className="aves-image" 
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

export default ForosAves;