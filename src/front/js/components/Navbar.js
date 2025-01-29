import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/publicaciones">Publicaciones</Link>
        </li>
        <li>
          <Link to="/myfeed">My Feed</Link>
        </li>
        {/* Agrega otros enlaces aquí */}
      </ul>
    </nav>
  );
};

export default Navbar;