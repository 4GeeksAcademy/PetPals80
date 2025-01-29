import React, { useState, useEffect } from "react";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";
import Publicaciones from "./Publicaciones"; // Importa el componente Publicaciones

const MyFeed = () => {
  const [profileImage, setProfileImage] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [bannerImage, setBannerImage] = useState("path-to-banner-image.jpg");
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || "");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [activeTab, setActiveTab] = useState("bio"); // Control de pestañas
  const [posts, setPosts] = useState([]); // Estado de publicaciones
  const [pets, setPets] = useState([]); // Estado para las mascotas
  const [isAddingPet, setIsAddingPet] = useState(false);
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetDetails((prevDetails) => ({
          ...prevDetails,
          image: reader.result
        }));
      };
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
        <img src={bannerImage} alt="Banner" className="banner-image" />
        <input type="file" id="banner-image-upload" style={{ display: "none" }} onChange={handleBannerImageChange} />
        <button onClick={() => document.getElementById("banner-image-upload").click()} className="change-banner-button">
          Cambiar Imagen
        </button>
      </div>

      {/* Perfil de usuario */}
      <div className="profile-section">
        <div className="profile-image-container">
          <label htmlFor="profile-image-upload">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="placeholder-image"></div>
            )}
          </label>
          <input type="file" id="profile-image-upload" style={{ display: "none" }} onChange={handleImageChange} />
          <button onClick={() => document.getElementById("profile-image-upload").click()} className="change-image-button">
            X
          </button>
        </div>

        {/* Nombre y Ubicación */}
        <div className="name-location-container">
          {isEditingName ? (
            <input type="text" value={name} onChange={handleNameChange} onBlur={() => setIsEditingName(false)} className="editable-input name-input" />
          ) : (
            <h3 onClick={() => setIsEditingName(true)}>{name || "Nombre"}</h3>
          )}

          {isEditingLocation ? (
            <input type="text" value={location} onChange={handleLocationChange} onBlur={() => setIsEditingLocation(false)} className="editable-input location-input" />
          ) : (
            <div className="editable-display">{location || "Ingresa tu ubicación"}</div>
          )}
        </div>

        {/* Pestañas de navegación */}
        <div className="tabs">
          <a href="#posts" className={activeTab === "posts" ? "active" : ""} onClick={() => setActiveTab("posts")}>Publicaciones</a>
          <a href="#bio" className={activeTab === "bio" ? "active" : ""} onClick={() => setActiveTab("bio")}>Biografía</a>
          <a href="#social" className={activeTab === "social" ? "active" : ""} onClick={() => setActiveTab("social")}>Social</a>
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === "bio" && (
          <div className="bio-section">
            {isEditingBio ? (
              <div>
                <textarea value={bio} onChange={handleBioChange} placeholder="Escribe tu biografía aquí..." className="bio-input" />
                <button onClick={handleSaveBio} className="save-bio-button">Guardar Biografía</button>
              </div>
            ) : (
              <div onClick={() => setIsEditingBio(true)}>
                <p>{bio}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "posts" && <Publicaciones posts={posts} setPosts={setPosts} />}

        {activeTab === "bio" && (
          <div className="pets-section">
            <button onClick={handleAddPet} className="save-bio-button">Agregar Mascota</button>
            {isAddingPet && (
              <div className="pet-form-container">
                <div className="pet-form">
                  <div className="pet-image-upload">
                    <input type="file" onChange={handlePetImageChange} />
                  </div>
                  <div className="pet-details">
                    <input type="text" name="name" value={petDetails.name} onChange={handlePetDetailsChange} placeholder="Nombre" />
                    <input type="text" name="breed" value={petDetails.breed} onChange={handlePetDetailsChange} placeholder="Raza" />
                    <input type="text" name="age" value={petDetails.age} onChange={handlePetDetailsChange} placeholder="Edad" />
                    <textarea name="bio" value={petDetails.bio} onChange={handlePetDetailsChange} placeholder="Biografía" />
                  </div>
                  <button onClick={handleSavePet} className="save-bio-button">Guardar Mascota</button>
                </div>
              </div>
            )}
            {pets.map((pet, index) => (
              <div key={index} className="pet-profile">
                <img src={pet.image} alt={pet.name} className="profile-image" />
                <h3>{pet.name}</h3>
                <p>Raza: {pet.breed}</p>
                <p>Edad: {pet.age}</p>
                <p>{pet.bio}</p>
                <button onClick={() => handleDeletePet(index)}>Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFeed;





