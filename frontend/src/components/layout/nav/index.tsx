import React from 'react';
import * as Icons from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import { AuthConsumer } from 'context/auth';

export default function NavBar() {
  const { isAuth } = AuthConsumer();

  return (
    <div>
      <nav className="py-3 border-bottom navbar-info bg-info">
        <div className="container-fluid d-flex flex-wrap">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none">
            <Icons.Bootstrap color="black" size={40} />
          </a>
          <ul className="nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link link-dark px-2">
                Product
              </NavLink>
            </li>
            {!isAuth && (
              <li className="nav-item">
                <NavLink to="/auth" className="nav-link link-dark px-2">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
          {isAuth && (
            <div className="dropdown text-end">
              <NavLink
                to="/"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <Icons.Person color="black" size={40} />
              </NavLink>
              <ul className="dropdown-menu text-small">
                <li>
                  <NavLink to="/" className="dropdown-item">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className="dropdown-item">
                    Settings
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink to="/" className="dropdown-item">
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom">
        <div className="container-fluid d-flex flex-wrap justify-content-center">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
            <svg className="bi me-2" width="40" height="32">
              <use></use>
            </svg>
            <span className="fs-4">eCommerce</span>
          </a>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
      </header>
    </div>
  );
}
