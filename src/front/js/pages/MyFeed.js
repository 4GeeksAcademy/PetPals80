import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";
import { Publicaciones } from "./Publicaciones"; // Importar el nuevo componente

const MyFeed = () => {
  // Estados para los campos editables
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [profileImage, setProfileImage] = useState(""); // Inicializar como cadena vacía
  const [bannerImage, setBannerImage] = useState("path-to-banner-image.jpg"); // Estado para la imagen del banner
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || ""); // Estado para la biografía
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false); // Estado para editar la biografía
  const [activeTab, setActiveTab] = useState("bio"); // Estado para la pestaña activa
  const [posts, setPosts] = useState([]); // Estado para los posts, inicializado vacío
  const [pets, setPets] = useState([]); // Estado para las mascotas
  const [isAddingPet, setIsAddingPet] = useState(false); // Estado para agregar mascota
  const [petDetails, setPetDetails] = useState({
    name: "",
    breed: "",
    age: "",
    bio: "",
    image: ""
  });

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
    setIsEditingBio(false);
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handleAddPet = () => {
    setIsAddingPet(true);
  };

  const handlePetDetailsChange = (e) => {
    const { name, value } = e.target;
    setPetDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePetImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPetDetails((prevDetails) => ({
        ...prevDetails,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const handleSavePet = () => {
    setPets((prevPets) => [...prevPets, petDetails]);
    setPetDetails({
      name: "",
      breed: "",
      age: "",
      bio: "",
      image: ""
    });
    setIsAddingPet(false);
  };

  const handleDeletePet = (index) => {
    setPets((prevPets) => prevPets.filter((_, i) => i !== index));
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
              <button onClick={() => setIsEditingName(true)} className="edit-button">Editar</button>
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
              <button onClick={() => setIsEditingLocation(true)} className="edit-button">Editar</button>
            </div>
          )}
        </div>

        {/* Botones para editar */}
        <div className="edit-buttons-container">
          <button onClick={() => setIsEditingName(true)} className="edit-button">Editar Nombre</button>
          <button onClick={() => setIsEditingLocation(true)} className="edit-button">Editar Ubicación</button>
        </div>

        <div className="tabs">
          <a href="#posts" onClick={() => setActiveTab("posts")}>Publicaciones</a>
          <a href="#social" onClick={() => setActiveTab("social")}>Social</a>
          <a href="#bio" className={activeTab === "bio" ? "active" : ""} onClick={() => setActiveTab("bio")}>
            Biografía
          </a>
          <a href="#followers" onClick={() => setActiveTab("followers")}>Seguidores</a>
          <a href="#following" onClick={() => setActiveTab("following")}>Seguidos</a>
        </div>
        <div className="tabs-line"></div> {/* Línea de color debajo de las pestañas */}

        {/* Contenido de las pestañas */}
        {activeTab === "posts" && <Publicaciones posts={posts} setPosts={setPosts} />} {/* Mostrar componente Publicaciones */}
        {activeTab === "social" && <Publicaciones posts={posts} setPosts={setPosts} />} {/* Mostrar componente Publicaciones en Social */}

        {/* Sección de biografía más abajo */}
        {activeTab === "bio" && (
          <div className="bio-section">
            {isEditingBio ? (
              <div>
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
            ) : (
              <div onClick={handleEditBio}>
                <p>{bio}</p>
              </div>
            )}
          </div>
        )}

        {/* Botón para agregar mascota */}
        <button onClick={handleAddPet} className="save-bio-button">Agregar Mascota</button>

        {/* Formulario para agregar mascota */}
        {isAddingPet && (
          <div className="add-pet-form">
            <div className="profile-image-container">
              <label htmlFor="pet-image-upload">
                {petDetails.image ? (
                  <img src={petDetails.image} alt="Pet" className="profile-image" />
                ) : (
                  <div className="placeholder-image"></div>
                )}
              </label>
              <input
                type="file"
                id="pet-image-upload"
                style={{ display: "none" }}
                onChange={handlePetImageChange}
              />
              <button onClick={() => document.getElementById('pet-image-upload').click()} className="change-image-button">
                Cambiar Foto
              </button>
            </div>
            <input
              type="text"
              name="name"
              value={petDetails.name}
              onChange={handlePetDetailsChange}
              placeholder="Nombre de la mascota"
              className="editable-input"
            />
            <input
              type="text"
              name="breed"
              value={petDetails.breed}
              onChange={handlePetDetailsChange}
              placeholder="Raza"
              className="editable-input"
            />
            <input
              type="text"
              name="age"
              value={petDetails.age}
              onChange={handlePetDetailsChange}
              placeholder="Edad"
              className="editable-input"
            />
            <textarea
              name="bio"
              value={petDetails.bio}
              onChange={handlePetDetailsChange}
              placeholder="Biografía del animal"
              className="bio-input"
            />
            <button onClick={handleSavePet} className="save-bio-button">Guardar Mascota</button>
          </div>
        )}

        {/* Mostrar mascotas */}
        <div className="pets-section">
          {pets.map((pet, index) => (
            <div key={index} className="pet-profile">
              <img src={pet.image} alt={pet.name} className="profile-image" />
              <div className="pet-details">
                <h3>{pet.name}</h3>
                <p>Raza: {pet.breed}</p>
                <p>Edad: {pet.age}</p>
                <p>{pet.bio}</p>
              </div>
              <button onClick={() => handleDeletePet(index)} className="delete-pet-button">Eliminar Mascota</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFeed;