import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";

export const MyFeed = () => {
  // Estados para los campos editables
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [profileImage, setProfileImage] = useState(""); // Inicializar como cadena vacía
  const [bannerImage, setBannerImage] = useState("path-to-banner-image.jpg"); // Estado para la imagen del banner
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || ""); // Estado para la biografía
  const [posts, setPosts] = useState([]); // Estado para los posts, inicializado vacío
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isAddingPost, setIsAddingPost] = useState(false); // Estado para mostrar el cuadro de añadir post
  const [newPostContent, setNewPostContent] = useState(""); // Estado para el contenido del nuevo post
  const [newPostImage, setNewPostImage] = useState(null); // Estado para la imagen del nuevo post

  useEffect(() => {
    if (!name) setIsEditingName(true);
    if (!location) setIsEditingLocation(true);
  }, [name, location]);

  // Handlers
  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("name", e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    localStorage.setItem("location", e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImage(URL.createObjectURL(file));
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleSaveBio = () => {
    localStorage.setItem("bio", bio);
    alert("Biografía guardada");
  };
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
    <div className="my-feed">
      {/* Banner */}
      <div className="banner">
        <img src={bannerImage} alt="" className="banner-image" />
        <input
          type="file"
          id="banner-image-upload"
          style={{ display: "none" }}
          onChange={handleBannerImageChange}
        />
        <button onClick={() => document.getElementById('banner-image-upload').click()} className="change-banner-button">
          Cambiar Imagen
        </button>
      </div>

      {/* User Profile Section */}
      <div className="profile-section">
        {/* Imagen editable */}
        <div className="profile-image-container">
          <label htmlFor="profile-image-upload">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="placeholder-image"></div>
            )}
          </label>
          <input
            type="file"
            id="profile-image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button onClick={() => document.getElementById('profile-image-upload').click()} className="change-image-button">
            Cambiar Foto
          </button>
        </div>
        
        {/* Contenedor para nombre y ubicación */}
        <div className="name-location-container">
          {/* Nombre editable */}
          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={() => setIsEditingName(false)}
              className="editable-input name-input"
            />
          ) : (
            <div className="editable-display">
              {name || "Ingresa tu nombre"}
            </div>
          )}

          {/* Ubicación editable */}
          {isEditingLocation ? (
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              onBlur={() => setIsEditingLocation(false)}
              className="editable-input location-input"
            />
          ) : (
            <div className="editable-display">
              {location || "Ingresa tu ubicación"}
            </div>
          )}
        </div>

        {/* Botones para editar */}
        <div className="edit-buttons-container">
          <button onClick={() => setIsEditingName(true)} className="edit-button">Editar Nombre</button>
          <button onClick={() => setIsEditingLocation(true)} className="edit-button">Editar Ubicación</button>
        </div>

        <div className="tabs">
          <a href="#posts">Publicaciones</a>
          <a href="#bio" className="active">
            Biografía
          </a>
          <a href="#followers">Seguidores</a>
          <a href="#following">Seguidos</a>
        </div>

        {/* Cuadro de biografía */}
        <div className="bio-section">
          <textarea
            value={bio}
            onChange={handleBioChange}
            placeholder="Escribe tu biografía aquí..."
            className="bio-input"
          />
          <button onClick={handleSaveBio} className="save-bio-button">
            Guardar Biografía
          </button>
        </div>
      </div>

      {/* Posts */}
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
    </div>
  );
};


