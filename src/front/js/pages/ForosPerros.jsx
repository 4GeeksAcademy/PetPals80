import React from "react";

import { useNavigate } from 'react-router-dom';

import "../../styles/forosPerros.css";

import perros from "../../img/Perros.png";


export const ForosPerros = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Cuidados', members: '567 Miembros', icon: '🏥' },
        { name: 'Alimento', members: '4504 Miembros', icon: '🍖' },
        { name: 'Etología', members: '3365 Miembros', icon: '🐶' },
        { name: 'Accesorios', members: '8554 Miembros', icon: '🦴' },
        { name: 'Adiestramiento', members: '185 Miembros', icon: '🦮' }
    ];

    return (
        <div className="foros-perros-container">

            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

        
         
            <div className="content-section">
                <h1 className="main-title">MI COMUNIDAD</h1>
                <h2 className="subtitle">/ PERRUNA /</h2>
                
                <p className="description-text">
                Los perros son leales y afectuosos compañeros. Disfrutan de la compañía humana y son conocidos por su fidelidad. Necesitan ejercicio regular, una dieta equilibrada y atención veterinaria periódica. ¡Estos amigos de cuatro patas llenan de alegría nuestros hogares!
                </p>
            </div>

            {/* Cat Image and Categories */}
            <div className="main-content-grid">
    <div className="cat-image-section">
        <div className="cat-image-container">
        <img 
                            src={perros} 
                            alt="Perros" 
                            className="perros-image" 
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

export default ForosPerros;