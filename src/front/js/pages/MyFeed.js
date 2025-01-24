import React, { useState } from "react";
import { Link } from "react-router-dom";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";


const MyFeed = () => {
  // Estados para los campos editables
  const [name, setName] = useState("ELENAGÓMEZ");
  const [location, setLocation] = useState("Valladolid, España");
  const [profileImage, setProfileImage] = useState("path-to-default-profile.jpg");
  const [posts, setPosts] = useState([
    "El amor de un perro es tan puro y desinteresado que nos enseña el verdadero significado de la lealtad y la amistad.",
  ]);

  // Handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddPost = () => {
    const newPost = prompt("Escribe tu nuevo post:");
    if (newPost) setPosts([...posts, newPost]);
  };

  return (
    <div className="my-feed">
      {/* Header */}
      <div className="header">
        <h1>Petpals</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#my-feed" className="active">
            My Feed
          </a>
          <a href="#forums">Forums</a>
          <a href="#my-forums">My Forums</a>
        </nav>
      </div>

      {/* Banner */}
      <div className="banner">
        <img src="path-to-banner-image.jpg" alt="Dog Banner" />
      </div>

      {/* User Profile Section */}
      <div className="profile-section">
        {/* Imagen editable */}
        <label htmlFor="profile-image-upload">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </label>
        <input
          type="file"
          id="profile-image-upload"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* Nombre editable */}
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="editable-input name-input"
        />

        {/* Ubicación editable */}
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          className="editable-input location-input"
        />

        <div className="tabs">
          <a href="#posts">Publicaciones</a>
          <a href="#bio" className="active">
            Biografía
          </a>
          <a href="#followers">Seguidores</a>
          <a href="#following">Seguidos</a>
        </div>
      </div>

      {/* Posts */}
      <div className="posts-section">
        <h3>Posts</h3>
        <button onClick={handleAddPost} className="add-post-button">
          + Añadir Post
        </button>
        <ul className="posts-list">
          {posts.map((post, index) => (
            <li key={index} className="post-item">
              {post}
            </li>
          ))}
        </ul>
      </div>
      <Link to="/">Volver a Inicio</Link>
    </div>
  );
};

export default MyFeed;
