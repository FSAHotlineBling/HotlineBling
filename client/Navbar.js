import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <nav className="navbar" >
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <ul className="nav nav-tabs">
                            <li><Link to="/" className="nav-link">PHONES</Link></li>
                            <li><Link to="/cart" className="nav-link">CART</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
