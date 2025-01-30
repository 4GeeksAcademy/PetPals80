import React, { useState, useEffect } from "react";
import "/workspaces/PetPals80/src/front/styles/MyFeed.css";
import Publicaciones from "./Publicaciones"; // Importa el componente Publicaciones

const MyFeed = () => {
  const [profileImage, setProfileImage] = useState(() => localStorage.getItem("profileImage") || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [bannerImage, setBannerImage] = useState(() => localStorage.getItem("bannerImage") || "");
  const [bio, setBio] = useState(() => localStorage.getItem("bio") || "");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [activeTab, setActiveTab] = useState("posts"); // Control de pestañas
  const [posts, setPosts] = useState(() => JSON.parse(localStorage.getItem("posts")) || []); // Estado de publicaciones
  const [forumPosts, setForumPosts] = useState([]); // Estado para los posts de Foros
  const [pets, setPets] = useState(() => JSON.parse(localStorage.getItem("pets")) || []); // Estado para las mascotas
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [petDetails, setPetDetails] = useState({
    name: "",
    breed: "",
    age: "",
    bio: "",
    image: ""
  });
  const [newPost, setNewPost] = useState(""); // Estado para el nuevo post

  useEffect(() => {
    if (!name) setIsEditingName(true);
    if (!location) setIsEditingLocation(true);
  }, [name, location]);

  useEffect(() => {
    if (activeTab === "social") {
      loadForumPosts();
    }
  }, [activeTab]);

  const loadForumPosts = async () => {
    try {
      const response = await fetch("/api/foros/posts"); // Ajusta la URL según tu API
      const data = await response.json();
      setForumPosts(data);
    } catch (error) {
      console.error("Error loading forum posts:", error);
    }
  };

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
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
        localStorage.setItem("bannerImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveBio = () => {
    setIsEditingBio(false);
    localStorage.setItem("bio", bio);
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

  const handlePetImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPets((prevPets) => {
          const newPets = [...prevPets];
          newPets[index].image = reader.result;
          localStorage.setItem("pets", JSON.stringify(newPets));
          return newPets;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePet = () => {
    setPets((prevPets) => {
      const newPets = [...prevPets, petDetails];
      localStorage.setItem("pets", JSON.stringify(newPets));
      return newPets;
    });
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
    setPets((prevPets) => {
      const newPets = prevPets.filter((_, i) => i !== index);
      localStorage.setItem("pets", JSON.stringify(newPets));
      return newPets;
    });
  };

  const handleChangePetImage = (index) => {
    document.getElementById(`pet-image-upload-${index}`).click();
  };

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleSavePost = () => {
    const date = new Date();
    const newPosts = [...posts, { content: newPost, date: date.toLocaleString() }];
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    setNewPost("");
  };

  const handleDeletePost = (index) => {
    const newPosts = posts.filter((_, i) => i !== index);
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <div className="my-feed">
      {/* Banner */}
      <div className="banner">
        {bannerImage && <img src={bannerImage} alt="Banner" className="banner-image" />}
        <input type="file" id="banner-image-upload" style={{ display: "none" }} onChange={handleBannerImageChange} />
        <button onClick={() => document.getElementById("banner-image-upload").click()} className="change-banner-button">
          Cambiar Imagen del Banner
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
      </div>

      {/* Nombre y Ubicación */}
      <div className="name-location-container">
        <div className="name-container">
          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={() => setIsEditingName(false)}
              className="editable-input name-input"
            />
          ) : (
            <h3 onClick={() => setIsEditingName(true)}>{name || "Agregar Nombre"}</h3>
          )}
        </div>
        <div className="location-container">
          {isEditingLocation ? (
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              onBlur={() => setIsEditingLocation(false)}
              className="editable-input location-input"
            />
          ) : (
            <div className="editable-display" onClick={() => setIsEditingLocation(true)}>
              {location || "Agregar Ubicación"}
            </div>
          )}
        </div>
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
            <div>
              <p>{bio}</p>
              <div className="button-container">
                <button onClick={() => setIsEditingBio(true)} className="shared-button">Agregar/Editar Biografía</button>
                <button onClick={handleAddPet} className="shared-button">Agregar Mascota</button>
              </div>
            </div>
          )}

          {isAddingPet && (
            <div className="add-pet-form">
              <div className="pet-details">
                <input type="text" name="name" value={petDetails.name} onChange={handlePetDetailsChange} placeholder="Nombre" />
                <input type="text" name="breed" value={petDetails.breed} onChange={handlePetDetailsChange} placeholder="Raza" />
                <input type="text" name="age" value={petDetails.age} onChange={handlePetDetailsChange} placeholder="Edad" />
                <textarea name="bio" value={petDetails.bio} onChange={handlePetDetailsChange} placeholder="Biografía" />
              </div>
              <button onClick={handleSavePet} className="save-pet-button">Guardar Mascota</button>
            </div>
          )}

          <div className="pets-container">
            {pets.map((pet, index) => (
              <div key={index} className="pet-profile">
                <div className="pet-info">
                  <div className="pet-image-container">
                    <img src={pet.image} alt={pet.name} className="profile-image" />
                    <input type="file" id={`pet-image-upload-${index}`} style={{ display: "none" }} onChange={(e) => handlePetImageChange(e, index)} />
                    <button onClick={() => handleChangePetImage(index)} className="change-pet-image-button">X</button>
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
      )}

      {activeTab === "posts" && (
        <div className="posts-section">
          <div className="add-post-form">
            <textarea
              value={newPost}
              onChange={handleNewPostChange}
              placeholder="Escribe tu post aquí..."
              className="new-post-input"
            />
            <button onClick={handleSavePost} className="save-post-button">Guardar Post</button>
          </div>
          <div className="posts-container">
            {posts.map((post, index) => (
              <div key={index} className="post">
                <p>{post.content}</p>
                <p className="post-date">{post.date}</p>
                <button onClick={() => handleDeletePost(index)} className="delete-post-button">X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "social" && (
        <div className="social-section">
          <h2>Últimos Posts de Foros</h2>
          <div className="forum-posts-container">
            {forumPosts.map((post, index) => (
              <div key={index} className="forum-post">
                <p>{post.content}</p>
                <p className="post-date">{post.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFeed;