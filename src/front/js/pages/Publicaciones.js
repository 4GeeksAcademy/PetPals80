import React, { useState } from "react";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";

export const Publicaciones = ({ posts, setPosts }) => {
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImage, setNewPostImage] = useState(null);

  const handleAddPost = () => {
    setIsAddingPost(true);
  };

  const handleSavePost = () => {
    if (newPostContent || newPostImage) {
      const newPost = { content: newPostContent, image: newPostImage };
      setPosts([...posts, newPost]);
      setNewPostContent("");
      setNewPostImage(null);
      setIsAddingPost(false);
    }
  };

  const handleNewPostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewPostImage(URL.createObjectURL(file));
  };

  const handleDeletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  return (
    <div className="posts-section">
      <div className="posts-header">
        <div className="posts-title">
          <h3 className="posts-title-text">Posts</h3>
          <button onClick={handleAddPost} className="add-post-button">
            + Añadir Post
          </button>
        </div>
        {isAddingPost && (
          <div className="add-post-form">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Escribe tu post aquí..."
              className="new-post-input"
            />
            <input
              type="file"
              id="new-post-image-upload"
              onChange={handleNewPostImageChange}
              className="new-post-image-input"
            />
            <button onClick={handleSavePost} className="save-post-button">
              Guardar Post
            </button>
          </div>
        )}
      </div>
      <ul className="posts-list">
        {posts.map((post, index) => (
          <li key={index} className="post-item">
            <div className="post-box">
              {post.content}
              {post.image && <img src={post.image} alt="Post" className="post-image" />}
              <button onClick={() => handleDeletePost(index)} className="delete-post-button">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
