import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/misForos.css";  

export const MisForos = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
            return;
        }
        actions.getFavorites();
    }, []);

    return (
        <div className="mis-foros-container">
            <div className="decorative-line-1"></div>
            <div className="decorative-line-2"></div>

            <div className="content-section">
                <h1 className="main-title">MIS FOROS</h1>
                <h2 className="subtitle">/ FAVORITOS /</h2>
                
                <p className="description-text">
                    Aquí encontrarás todos los foros que has marcado como favoritos. 
                    Accede rápidamente a las comunidades que más te interesan.
                </p>
            </div>

            <div className="favorites-grid">
                {store.favoriteForums?.length === 0 ? (
                    <div className="no-favorites">
                        No tienes foros favoritos aún. 
                        Explora nuestras comunidades y añade las que más te interesen.
                    </div>
                ) : (
                    store.favoriteForums?.map((forum) => (
                        <div 
                            key={forum.id} 
                            className="forum-card"
                            onClick={() => {
                                // Extract pet type and category from forum title
                                const [category, pet] = forum.title.split(' - ');
                                navigate(`/foros-${pet.toLowerCase()}/${category.toLowerCase()}`);
                            }}
                        >
                            <div className="forum-info">
                                <span className="forum-name">/ {forum.title} /</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    actions.removeFromFavorites(forum.id);
                                }}
                                className="remove-btn"
                            >
                                ★
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MisForos;
