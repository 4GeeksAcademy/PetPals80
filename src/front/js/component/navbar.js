import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import Logo from "../../img/Logo.png";

export const Navbar = (props) => {
	return (
	  <nav className="custom-navbar">
		<div className="nav-background">
		  <div className="pink-square"></div>
		  <div className="purple-triangle"></div>
		</div>
		<div className="nav-content">
		  <ul className="nav-links">
			<li>
			  <Link to="/about">ABOUT</Link>
			</li>
			<li>
			  <Link to="/MyFeed">MY FEED</Link>
			</li>
			<li className="brand">
			  <Link to="/">
			  	<img src={Logo} alt="MyRegisterLogo" style={{width: '150px', height: '40px'}} />
			  </Link>
			</li>
			<li>
			  <Link to="/foros">FOROS</Link>
			</li>
			<li>
			  <Link to="/mis-foros">MIS FOROS</Link>
			</li>
		  </ul>
		</div>
	  </nav>
	);
  };

