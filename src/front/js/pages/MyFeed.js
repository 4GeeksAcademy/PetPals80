import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";
import { Publicaciones } from "./Publicaciones"; // Importar el nuevo componente

const MyFeed = () => {
  const [profileImage, setProfileImage] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [bannerImage, setBannerImage] = useState("path-to-banner-image.jpg"); // Estado para la imagen del banner
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || ""); // Estado para la biografía
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
    image: "", // Imagen de la mascota
    bioImage: "" // Imagen de la biografía
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
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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

  const handleBioImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPetDetails((prevDetails) => ({
        ...prevDetails,
        bioImage: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSavePet = () => {
    setPets((prevPets) => [...prevPets, petDetails]);
    setPetDetails({
      name: "",
      breed: "",
      age: "",
      bio: "",
      image: "",
      bioImage: ""
    });
    setIsAddingPet(false);
  };

  const handleDeletePet = (index) => {
    setPets((prevPets) => prevPets.filter((_, i) => i !== index));
  };

  const handleChangeImage = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setPets((prevPets) =>
          prevPets.map((pet, i) =>
            i === index ? { ...pet, image: URL.createObjectURL(file) } : pet
          )
        );
      }
    };
    fileInput.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
      setIsEditingLocation(false);
    }
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
            X
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
              onKeyPress={handleKeyPress}
              className="editable-input name-input"
            />
          ) : (
            <h3 onClick={() => setIsEditingName(true)}>{name || 'Nombre'}</h3>
          )}

          {/* Ubicación editable */}
          {isEditingLocation ? (
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              onBlur={() => setIsEditingLocation(false)}
              onKeyPress={handleKeyPress}
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
          <div className="pet-profile">
            <div className="pet-details-container">
              <div className="image-container">
                <img src={petDetails.image || 'placeholder-image-url'} alt="Nueva Mascota" className="profile-image" />
                <input type="file" onChange={handleImageChange} className="change-image-input" />
                <button onClick={() => setPetDetails((prevDetails) => ({ ...prevDetails, image: '' }))} className="change-image-button">X</button>
              </div>
              <div className="pet-details">
                <input
                  type="text"
                  name="name"
                  value={petDetails.name}
                  onChange={handlePetDetailsChange}
                  placeholder="Nombre"
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
              </div>
            </div>
            <textarea
              name="bio"
              value={petDetails.bio}
              onChange={handlePetDetailsChange}
              placeholder="Biografía del animal"
              className="bio-input"
            />
            <div className="bio-image-container">
            </div>
            <button onClick={handleSavePet} className="save-bio-button">Guardar Mascota</button>
          </div>
        )}

        {/* Mostrar mascotas */}
        <div className="pets-section">
          {pets.map((pet, index) => (
            <div key={index} className="pet-profile">
              <div className="pet-details-container">
                <div className="image-container">
                  <img src={pet.image} alt={pet.name} className="profile-image" />
                  <button onClick={() => handleChangeImage(index)} className="change-image-button">X</button>
                </div>
                <div className="pet-details">
                  <h3>{pet.name}</h3>
                  <p>Raza: {pet.breed}</p>
                  <p>Edad: {pet.age}</p>
                </div>
              </div>
              <p className="pet-bio">{pet.bio}</p>
              <button onClick={() => handleDeletePet(index)} className="delete-pet-button">X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFeed;
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet"></link>