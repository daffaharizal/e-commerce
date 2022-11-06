import React from 'react';

import {
  AiOutlineDashboard,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList
} from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsBootstrap, BsSearch } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { LogoutPage } from 'components/features';

import { AuthConsumer } from 'context';

export default function CommerceNavbar() {
  const { isAuth, user } = AuthConsumer();
  // const ref = React.useRef<HTMLInputElement>(null);

  const [urlQuery, setUrlQuery] = useQueryParams({
    search: withDefault(StringParam, '')
  });

  const [search, setSearch] = React.useState(urlQuery.search);

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
                // ref={ref}
                className="form-control border-end-0 border rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
                  onClick={() => {
                    setUrlQuery((current) => ({
                      ...current,
                      search
                    }));
                  }}>
                  <BsSearch size={24} />
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
      <NavLink
        to="/cart"
        className="d-block link-dark text-decoration-none pe-1">
        <AiOutlineShoppingCart size={36} />
      </NavLink>
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
              {user?.role == 'user' ? (
                <>
                  <NavLink to="/profile" className="dropdown-item">
                    <CgProfile size={20} />
                    <span className="ps-2">Profile</span>
                  </NavLink>
                  <NavLink to="/wishlist" className="dropdown-item">
                    <AiOutlineUnorderedList size={20} />
                    <span className="ps-2">Wishlist</span>
                  </NavLink>
                </>
              ) : (
                <NavLink to="/admin/dash" className="dropdown-item">
                  <AiOutlineDashboard size={20} />
                  <span className="ps-2">Dashboard</span>
                </NavLink>
              )}
              <NavLink to="/settings" className="dropdown-item">
                <FiSettings size={20} />
                <span className="ps-2">Settings</span>
              </NavLink>
              <hr className="dropdown-divider" />
              <LogoutPage />
            </>
          ) : (
            <>
              <NavLink to="/auth" className="dropdown-item">
                <AiOutlineLogin size={20} />
                <span className="ps-2">Hello, Sign In</span>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
