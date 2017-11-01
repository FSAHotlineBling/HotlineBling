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
                            <li><Link to="/account" className="nav-link">ACCOUNT</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3" id="nav-user-control">
                        <Link to="/login"><button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">LOGIN</button></Link>
                        <Link to="/login"><button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">SIGN UP</button></Link>
                        <a href="/auth/logout"><button className="btn btn-outline-secondary my-2 my-sm-0">LOGOUT</button></a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
