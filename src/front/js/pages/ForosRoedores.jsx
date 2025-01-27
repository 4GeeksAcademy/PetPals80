import React from "react";

import { useNavigate } from 'react-router-dom';

import "../../styles/forosRoedores.css";

import roedores from "../../img/Roedores.png";


export const ForosRoedores = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Cuidados', members: '567 Miembros', icon: '🏥' },
        { name: 'Alimento', members: '4504 Miembros', icon: '🧀' },
        { name: 'Etologia', members: '3365 Miembros', icon: '🐭' },
        { name: 'Accesorios', members: '8554 Miembros', icon: '🏠' },
        { name: 'Adiestramiento', members: '185 Miembros', icon: '🔄' }
    ];

    
    return (
        <div className="foros-roedores-container">

            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

        
         
            <div className="content-section">
                <h1 className="main-title">MI COMUNIDAD</h1>
                <h2 className="subtitle">/ MURINA /</h2>
                
                <p className="description-text">
                Los roedores son pequeños y encantadores compañeros. Activos y curiosos, disfrutan explorando su entorno. Requieren una jaula limpia, una dieta balanceada y juguetes para mantener su mente y cuerpo activos. ¡Estos diminutos amigos aportan dinamismo y ternura a la vida diaria!
                </p>
            </div>

            {/* Cat Image and Categories */}
            <div className="main-content-grid">
    <div className="roedores-image-section">
        <div className="roedores-image-container">
        <img 
                            src={roedores} 
                            alt="Roedores" 
                            className="roedores-image" 
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

export default ForosRoedores;