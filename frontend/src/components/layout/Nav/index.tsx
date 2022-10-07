import { BsBootstrap, BsSearch } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import { LogoutPage } from 'components/feature';
import { AuthConsumer } from 'context';

export default function NavBar() {
  const { isAuth } = AuthConsumer();

  return (
    <nav className="navbar navbar-expand-lg navbar-info border-bottom  bg-info d-flex justify-content-between align-items-center flex-nowrap mb-3">
      <NavLink
        to="/products"
        className="navbar-brand p-2 text-black text-decoration-none">
        <BsBootstrap size={36} />
      </NavLink>
      <form className="form-inline flex-fill">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="input-group">
              <input
                className="form-control border-end-0 border rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
                  type="button">
                  <BsSearch size={24} />
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className="dropdown p-2 text-end">
        <NavLink
          to="/"
          className="d-block link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <BiUser size={36} />
        </NavLink>
        <div
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink">
          {isAuth ? (
            <>
              <NavLink to="/cart" className="dropdown-item">
                Cart
              </NavLink>
              <NavLink to="/profile" className="dropdown-item">
                Profile
              </NavLink>
              <NavLink to="/settings" className="dropdown-item">
                Settings
              </NavLink>
              <hr className="dropdown-divider" />
              <LogoutPage />
            </>
          ) : (
            <>
              <NavLink to="/auth" className="dropdown-item">
                Hello, Sign In
              </NavLink>
              <NavLink to="/cart" className="dropdown-item">
                Cart
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
