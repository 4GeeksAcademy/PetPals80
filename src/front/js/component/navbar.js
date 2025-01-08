import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
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
			  <Link to="/my-feed">MY FEED</Link>
			</li>
			<li className="brand">
			  <Link to="/login">PETPALS</Link>
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

