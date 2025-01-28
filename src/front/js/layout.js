import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import MyFeed from "./pages/MyFeed"; // Importar el componente MyFeed



import { Navbar } from "./component/navbar";


import { Foros } from "./pages/Foros.jsx";
import { About } from "./pages/About.jsx";
import { Login } from "./pages/Login.jsx";
import { MyRegister } from "./pages/MyRegister.jsx";
import { MyLogin } from "./pages/MyLogin.jsx";

import { ForosGatos } from "./pages/ForosGatos.jsx"; 
import { ForosPerros } from "./pages/ForosPerros.jsx";
import { ForosRoedores } from "./pages/ForosRoedores.jsx";
import { ForosAves} from "./pages/ForosAves.jsx";
import { ForosArtropodos } from "./pages/ForosArtropodos.jsx";
import { ForosReptiles } from "./pages/ForosReptiles.jsx";


import CuidadosGatos from "./pages/subForums/gatos/Cuidados.jsx";
import AlimentoGatos from "./pages/subForums/gatos/Alimento.jsx";
import EtologiaGatos from "./pages/subForums/gatos/Etologia.jsx";
import AccesoriosGatos from "./pages/subForums/gatos/Accesorios.jsx";
import AdiestramientoGatos from "./pages/subForums/gatos/Adiestramiento.jsx";

import CuidadosPerros from "./pages/subForums/perros/Cuidados.jsx";
import AlimentoPerros from "./pages/subForums/perros/Alimento.jsx";
import EtologiaPerros from "./pages/subForums/perros/Etologia.jsx";
import AccesoriosPerros from "./pages/subForums/perros/Accesorios.jsx";
import AdiestramientoPerros from "./pages/subForums/perros/Adiestramiento.jsx";

import CuidadosRoedores from "./pages/subForums/roedores/Cuidados.jsx";
import AlimentoRoedores from "./pages/subForums/roedores/Alimento.jsx";
import EtologiaRoedores from "./pages/subForums/roedores/Etologia.jsx";
import AccesoriosRoedores from "./pages/subForums/roedores/Accesorios.jsx";
import AdiestramientoRoedores from "./pages/subForums/roedores/Adiestramiento.jsx";

import CuidadosArtropodos from "./pages/subForums/artropodos/Cuidados.jsx";
import AlimentoArtropodos from "./pages/subForums/artropodos/Alimento.jsx";
import EtologiaArtropodos from "./pages/subForums/artropodos/Etologia.jsx";
import AccesoriosArtropodos from "./pages/subForums/artropodos/Accesorios.jsx";
import AdiestramientoArtropodos from "./pages/subForums/artropodos/Adiestramiento.jsx";

import CuidadosAves from "./pages/subForums/aves/Cuidados.jsx";
import AlimentoAves from "./pages/subForums/aves/Alimento.jsx";
import EtologiaAves from "./pages/subForums/aves/Etologia.jsx";
import AccesoriosAves from "./pages/subForums/aves/Accesorios.jsx";
import AdiestramientoAves from "./pages/subForums/aves/Adiestramiento.jsx";

import CuidadosReptiles from "./pages/subForums/reptiles/Cuidados.jsx";
import AlimentoReptiles from "./pages/subForums/reptiles/Alimento.jsx";
import EtologiaReptiles from "./pages/subForums/reptiles/Etologia.jsx";
import AccesoriosReptiles from "./pages/subForums/reptiles/Accesorios.jsx";
import AdiestramientoReptiles from "./pages/subForums/reptiles/Adiestramiento.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route path="/foros" element={<Foros />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/MyRegister" element={<MyRegister />} />
                        <Route element={<MyFeed />} path="/MyFeed" />
                        <Route element={<MyLogin />} path="/MyLogin" />
                        

                        <Route path="/foros-gatos" element={<ForosGatos />} /> 
                            <Route path="/foros-gatos/cuidados" element={<CuidadosGatos />} />
                            <Route path="/foros-gatos/alimento" element={<AlimentoGatos />} />
                            <Route path="/foros-gatos/etologia" element={<EtologiaGatos />} />
                            <Route path="/foros-gatos/accesorios" element={<AccesoriosGatos />} />
                            <Route path="/foros-gatos/adiestramiento" element={<AdiestramientoGatos />} />

                        <Route path="/foros-perros" element={<ForosPerros />} /> 
                            <Route path="/foros-perros/cuidados" element={<CuidadosPerros />} />
                            <Route path="/foros-perros/alimento" element={<AlimentoPerros />} />
                            <Route path="/foros-perros/etologia" element={<EtologiaPerros />} />
                            <Route path="/foros-perros/accesorios" element={<AccesoriosPerros />} />
                            <Route path="/foros-perros/adiestramiento" element={<AdiestramientoPerros />} />

                        <Route path="/foros-roedores" element={<ForosRoedores />} /> 
                            <Route path="/foros-roedores/cuidados" element={<CuidadosRoedores />} />
                            <Route path="/foros-roedores/alimento" element={<AlimentoRoedores />} />
                            <Route path="/foros-roedores/etologia" element={<EtologiaRoedores />} />
                            <Route path="/foros-roedores/accesorios" element={<AccesoriosRoedores />} />
                            <Route path="/foros-roedores/adiestramiento" element={<AdiestramientoRoedores />} />

                        <Route path="/foros-artropodos" element={<ForosArtropodos />} /> 
                            <Route path="/foros-artropodos/cuidados" element={<CuidadosArtropodos />} />
                            <Route path="/foros-artropodos/alimento" element={<AlimentoArtropodos />} />
                            <Route path="/foros-artropodos/etologia" element={<EtologiaArtropodos />} />
                            <Route path="/foros-artropodos/accesorios" element={<AccesoriosArtropodos />} />
                            <Route path="/foros-artropodos/adiestramiento" element={<AdiestramientoArtropodos />} />

                        <Route path="/foros-aves" element={<ForosAves />} /> 
                            <Route path="/foros-aves/cuidados" element={<CuidadosAves />} />
                            <Route path="/foros-aves/alimento" element={<AlimentoAves />} />
                            <Route path="/foros-aves/etologia" element={<EtologiaAves />} />
                            <Route path="/foros-aves/accesorios" element={<AccesoriosAves />} />
                            <Route path="/foros-aves/adiestramiento" element={<AdiestramientoAves />} />

                        <Route path="/foros-reptiles" element={<ForosReptiles />} /> 
                            <Route path="/foros-reptiles/cuidados" element={<CuidadosReptiles />} />
                            <Route path="/foros-reptiles/alimento" element={<AlimentoReptiles />} />
                            <Route path="/foros-reptiles/etologia" element={<EtologiaReptiles />} />
                            <Route path="/foros-reptiles/accesorios" element={<AccesoriosReptiles />} />
                            <Route path="/foros-reptiles/adiestramiento" element={<AdiestramientoReptiles />} />

                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);