import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/forosReptiles.css";
import reptiles from "../../img/Reptiles.png";
import { FORUM_IDS } from "../pages/subForums/forumIds";

export const ForosReptiles = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({});

    const categories = [
        { name: 'Cuidados', icon: '🏥', id: FORUM_IDS.REPTILES.CUIDADOS },
        { name: 'Alimento', icon: '🥩', id: FORUM_IDS.REPTILES.ALIMENTO },
        { name: 'Etologia', icon: '🦎', id: FORUM_IDS.REPTILES.ETOLOGIA },
        { name: 'Accesorios', icon: '🌿', id: FORUM_IDS.REPTILES.ACCESORIOS },
        { name: 'Adiestramiento', icon: '📜', id: FORUM_IDS.REPTILES.ADIESTRAMIENTO }
    ];

    useEffect(() => {
        if (localStorage.getItem('token')) {
            loadFavorites();
        }
    }, []);

    const loadFavorites = async () => {
        const favs = await actions.getFavorites();
        if (favs) {
            const favsObj = favs.reduce((acc, forum) => {
                acc[forum.id] = true;
                return acc;
            }, {});
            setFavorites(favsObj);
        }
    };

    const handleFavorite = async (e, forumId) => {
        e.stopPropagation();
        
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        if (favorites[forumId]) {
            const success = await actions.removeFromFavorites(forumId);
            if (success) {
                setFavorites(prev => {
                    const newFavs = { ...prev };
                    delete newFavs[forumId];
                    return newFavs;
                });
            }
        } else {
            const success = await actions.addToFavorites(forumId);
            if (success) {
                setFavorites(prev => ({
                    ...prev,
                    [forumId]: true
                }));
            }
        }
    };

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
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            className="category-card"
                            onClick={() => navigate(`/foros-reptiles/${category.name.toLowerCase()}`)}
                        >
                            <div className="category-icon">
                                {category.icon}
                            </div>
                            <div className="category-info">
                                <span className="category-name">{category.name}</span>
                            </div>
                            {localStorage.getItem('token') && (
                                <button
                                    onClick={(e) => handleFavorite(e, category.id)}
                                    className="favorite-btn-new"
                                    aria-label={favorites[category.id] ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <span className={`star-icon ${favorites[category.id] ? 'active' : ''}`}>
                                        {favorites[category.id] ? '★' : '☆'}
                                    </span>
                                    <span className="tooltip-text">
                                        {favorites[category.id] ? 'Remove from favorites' : 'Add to favorites'}
                                    </span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForosReptiles;