import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../../../store/appContext";
import "../../../../styles/subForum.css";
import perros from "../../../../img/Perros.png";

import { FORUM_IDS } from "../forumIds";


const AccesoriosPerros = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [newPost, setNewPost] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const FORUM_ID = FORUM_IDS.PERROS.ACCESORIOS;

    // Fetch posts when component mounts
    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setIsLoading(true);
        const posts = await actions.getForumPosts(FORUM_ID);
        setIsLoading(false);
        if (!posts) {
            setError("Error loading posts. Please try again.");
        }
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        // Check if user is logged in
        if (!localStorage.getItem('token')) {
            navigate('/login');
            return;
        }

        const success = await actions.createForumPost(FORUM_ID, newPost);
        if (success) {
            setNewPost("");
            await loadPosts();
        } else {
            setError("Error creating post. Please try again.");
        }
    };

    return (
        <div className="subforum-page">
            <div className="subforum-content">
                <div className="forum-image">
                    <img 
                        src={perros} 
                        alt="Perros" 
                        className="dog-image"
                        style={{ 
                            width: '200px',  
                            display: 'block',
                            margin: '0 auto 20px auto'
                        }} 
                    />
                </div>
                
                <h1 className="forum-title">Accesorios</h1>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmitPost} className="post-form">
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder={localStorage.getItem('token') ? 
                            "Write your post here..." : 
                            "Please log in to post"}
                        className="post-input"
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!newPost.trim() || !localStorage.getItem('token')}
                    >
                        Post
                    </button>
                </form>

                <div className="posts-list">
                    {isLoading ? (
                        <div>Loading posts...</div>
                    ) : store.currentForumPosts?.length === 0 ? (
                        <div>No posts yet. Be the first to post!</div>
                    ) : (
                        store.currentForumPosts?.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {/* Placeholder avatar using the first letter of username */}
                                            <div className="avatar-circle">
                                                {post.username ? post.username[0].toUpperCase() : '?'}
                                            </div>
                                        </div>
                                        <div className="user-details">
                                            <span className="username">{post.username}</span>
                                            <span className="post-time">
                                                {new Date(post.created_at).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    {post.content}
                                </div>
                            </div>
                            
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccesoriosPerros;