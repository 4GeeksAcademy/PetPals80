import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../../../styles/subForum.css";
import aves from "../../../../img/Artropodos.png";

const AdiestramientoArtropodos = () => {
    const navigate = useNavigate();


    // Sample posts data
    const posts = [
        {
            id: 1,
            username: "ElPepe_55",
            time: "15:02",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod magna aliqua. Ut enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit laboris nisi ut aliquip ex ea commodo consequat. Dougiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit nunc vel feugiat nulla facilisis."
        },
        {
            id: 2,
            username: "Latula_92",
            time: "12:05",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore"
        },
       
    ];

    return (
        <div className="subforum-page">
            {/* Main Content */}
            <div className="subforum-content">
                {/* Added image section */}
                <div className="forum-image">
                    <img 
                        src={aves} 
                        alt="Aves" 
                        className="aves-image"
                        style={{ 
                            width: '200px',  
                            display: 'block',
                            margin: '0 auto 20px auto'
                        }} 
                    />
                </div>
                
                <h1 className="forum-title">Adiestramiento</h1>

                {/* Posts List */}
                <div className="posts-list">
                    {posts.map((post) => (
                        <div key={post.id} className="post-card">
                            <div className="post-header">
                                <div className="user-info">
                                    <div className="user-avatar"></div>
                                    <span className="username">{post.username}</span>
                                </div>
                                <span className="post-time">{post.time}</span>
                            </div>
                            <div className="post-content">
                                {post.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdiestramientoArtropodos;