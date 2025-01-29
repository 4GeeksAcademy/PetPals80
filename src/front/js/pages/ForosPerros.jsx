import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";  
import "../../styles/forosPerros.css";
import perros from "../../img/Perros.png";
import { FORUM_IDS } from "../pages/subForums/forumIds";  

export const ForosPerros = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({});

    const categories = [
        { name: 'Cuidados', icon: '🏥', id: FORUM_IDS.PERROS.CUIDADOS },
        { name: 'Alimento', icon: '🍖', id: FORUM_IDS.PERROS.ALIMENTO },
        { name: 'Etologia', icon: '🐶', id: FORUM_IDS.PERROS.ETOLOGIA },
        { name: 'Accesorios', icon: '🦴', id: FORUM_IDS.PERROS.ACCESORIOS },
        { name: 'Adiestramiento', icon: '🦮', id: FORUM_IDS.PERROS.ADIESTRAMIENTO }
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

            <div className="main-content-grid">
                <div className="perros-image-section">
                    <div className="perros-image-container">
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
                    {categories.map((category) => (
                        <div 
                            key={category.id} 
                            className="category-card"
                            onClick={() => navigate(`/foros-perros/${category.name.toLowerCase()}`)}
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

export default ForosPerros;