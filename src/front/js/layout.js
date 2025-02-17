import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import MyFeed from "./pages/MyFeed"; // Importar el componente MyFeed
import { Publicaciones } from "./pages/Publicaciones";


import { Navbar } from "./component/navbar";
import { Foros } from "./pages/Foros.jsx";
import { About } from "./pages/About.jsx";
import { Login } from "./pages/Login.jsx";
import { MyRegister } from "./pages/MyRegister.jsx";
import { MyLogin } from "./pages/MyLogin.jsx";

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
                        <Route element={<Publicaciones />} path="/Publicaciones" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);