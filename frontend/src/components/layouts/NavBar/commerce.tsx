import {
  AiOutlineDashboard,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList
} from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { BsBootstrap } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaRegAddressCard } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdAccountBalance } from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault
} from 'use-query-params';

import { LogoutPage } from 'components/features';
import { SearchInput } from 'components/shared';

import ROLES from 'constant/roles';
import ROUTES from 'constant/routes';

import { AuthConsumer } from 'context';

import { IReactRouterLocation } from 'types';

export default function CommerceNavbar() {
  const { isAuth, user } = AuthConsumer();
  const navigate = useNavigate();
  const location = useLocation() as IReactRouterLocation;

  const [urlQuery, setUrlQuery] = useQueryParams({
    search: withDefault(StringParam, ''),
    page: withDefault(NumberParam, 1)
  });

  const handleSubmit = (search: string) => {
    if ([ROUTES.PRODUCTS, `${ROUTES.PRODUCTS}/`].includes(location.pathname)) {
      setUrlQuery((current) => ({
        ...current,
        search,
        page: 1
      }));
    } else {
      navigate(`${ROUTES.PRODUCTS}?search=${search}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-info border-bottom  bg-info d-flex justify-content-between align-items-center flex-nowrap mb-3">
      <NavLink
        to={ROUTES.PRODUCTS}
        className="navbar-brand p-2 text-black text-decoration-none">
        <BsBootstrap size={36} />
      </NavLink>
      <form className="form-inline flex-fill">
        <div className="row justify-content-md-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <SearchInput
              defaultValue={urlQuery.search}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </form>
      <NavLink
        to={ROUTES.CART}
        className="d-block link-dark text-decoration-none pe-1">
        <AiOutlineShoppingCart size={36} />
      </NavLink>
      <div className="dropdown p-2 text-end">
        <NavLink
          to={ROUTES.INDEX}
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
              {user?.role == ROLES.USER ? (
                <>
                  <NavLink to={ROUTES.ACCOUNT} className="dropdown-item">
                    <MdAccountBalance size={20} />
                    <span className="ps-2">Account</span>
                  </NavLink>
                  <NavLink to={ROUTES.PROFILE} className="dropdown-item">
                    <CgProfile size={20} />
                    <span className="ps-2">Profile</span>
                  </NavLink>
                  <NavLink to={ROUTES.ADDRESSES} className="dropdown-item">
                    <FaRegAddressCard size={20} />
                    <span className="ps-2">Address</span>
                  </NavLink>
                  <NavLink to={ROUTES.WISHLIST} className="dropdown-item">
                    <AiOutlineUnorderedList size={20} />
                    <span className="ps-2">Wishlist</span>
                  </NavLink>
                </>
              ) : (
                <NavLink to={ROUTES.ADMINDASH} className="dropdown-item">
                  <AiOutlineDashboard size={20} />
                  <span className="ps-2">Dashboard</span>
                </NavLink>
              )}
              <NavLink to={ROUTES.SETTINGS} className="dropdown-item">
                <FiSettings size={20} />
                <span className="ps-2">Settings</span>
              </NavLink>
              <hr className="dropdown-divider" />
              <LogoutPage />
            </>
          ) : (
            <>
              <NavLink to={ROUTES.LOGIN} className="dropdown-item">
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
