import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Bienvenidos from  "../../img/Bienvenidos.png"
import recurso1 from  "../../img/Recurso_home.png"
import recurso2 from "../../img/Recurso_home_fondo.png"
import cookie from "../../img/Cookie.png"
import pers2 from "../../img/personaliza-2.png"
import gatuna from "../../img/gatuna-03.png"
import conocer from "../../img/conocer-04.png"
import presentacion from "../../img/presentacion-05.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div  className="background" style={{ backgroundImage: `url(${recurso2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundSize: 'cover', }}>
			<div className="text-center mt-5">
				<div className="cartel-bienvenida">
					< img src={Bienvenidos} className="welcome" alt="Bienvenidos" />
					<h5 className="intro">La red social donde <strong>tu mascota es la estrella.</strong> Personaliza tu perfil, comparte momentos especiales y conecta con otros amantes de las mascotas como tú.
					¡Únete a nuestros foros y mantente al día con noticias y eventos especiales!</h5>
				</div>
					<div className="inicio-registro">
						<button className='registro' type='submit' value="register" disabled={localStorage.getItem('token') ? true : false}>Registro</button>
						<button type="submit" className="entrar">Entrar</button>
					</div>
						<div className="recurso-perros">
							< img src={recurso1} className="recurso-home" alt="Famila perruna" />
						</div>
					<div className="pregunta-home">
					< img src={presentacion} className="present" alt="texto presentación" />
					</div>
					<div className="explain">
						<div className="personaliza">
							<h5 className="personaliza-h5">
								Crea un perfil único para ti y tu mascota. Sube fotos, agrega información divertida sobre tu amigo y personaliza tu cuenta para reflejar tu <strong>estilo</strong> y <strong>personalidad</strong>.
							</h5>
							< img src={cookie} className="personaliza-cookie" alt="Beagle" />
						</div>

						<div className="personaliza">
							< img src={pers2} className="captura" alt="Beagle" />
							<h5 className="captura-h5">
							<strong>Captura</strong> y <strong>guarda</strong> los mejores momentos con tu mascota. Comparte fotos y videos con la comunidad de PetPals y descubre las historias de otros miembros.
							</h5>
						</div>

						<div className="personaliza">
							<h5 className="gatuna-h5">
								Únete a los foros de cada comunidad que tratan sobre diversos temas relacionados con las mascotas, como <strong>salud</strong>, <strong>cuidados</strong> y <strong>entrenamiento</strong>. Participa en discusiones, haz preguntas y accede a una gran cantidad de información útil.
							</h5>
							< img src={gatuna} className="gatuna" alt="Famila perruna" />
						</div>

						<div className="personaliza">
							< img src={conocer} className="conocer" alt="Beagle" />
							<h5 className="conocer-h5">
							<strong>Crea conexiones</strong> y conoce a gente de todo el mundo que comparten tus mismos intereses y amor por las mascotas.
							A través de PetPals, puedes interactuar con ellos, intercambiando consejos, experiencias e historias.
							</h5>
						</div>

						<div className="pregunta">
							<h3><strong>¿Te gusta?</strong><br></br>
							<strong>¿A qué esperas?</strong><br></br>
							Crea tu perfíl y empieza a disfrutar
							</h3>
						</div>

					</div>

			</div>
		</div>
	);
};
