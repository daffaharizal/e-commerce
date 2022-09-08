import React from 'react';
import * as Icons from 'react-bootstrap-icons';

export default function NavBar() {
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
              <a href="/home" className="nav-link link-dark px-2">
                Product
              </a>
            </li>

            <li className="nav-item">
              <a href="/home" className="nav-link link-dark px-2">
                Customer Service
              </a>
            </li>
          </ul>
          <div className="dropdown text-end">
            <a
              href="/home"
              className="d-block link-dark text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <Icons.Person color="black" size={40} />
            </a>
            <ul className="dropdown-menu text-small">
              <li>
                <a className="dropdown-item" href="/home">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/home">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/home">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
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
